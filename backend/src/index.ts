import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

const GOOGLE_CHAT_WEBHOOK_URL = process.env.GOOGLE_CHAT_WEBHOOK_URL as string;

export async function getFilteredLogs() {
  const logs = await prisma.monitoringLog.findMany({
    where: {
      AND: [
        {
          status: {
            in: ['FAIL', 'WARN'],
          },
        },
      ],
      OR: [
        {
          task: 'register_diary',
          status: 'FAIL',
        },
        {
          task: { not: 'register_diary' },
        },
      ],
    },
  });
  return logs;
}

export async function sendAlertToGoogleChat(log: any) {
  const property = await prisma.generalProperty.findUnique({
    where: {
      id: log.generalPropertyId,
    },
    select: {
      name: true,
    },
  });
  
  const name = property?.name || 'Unknown Property';

  const message = {
    cards: [
      {
        header: {
          title: `Alerta: Log de monitoreo de ${log.service}`,
          subtitle: `Task: ${log.task}`,
        },
        sections: [
          {
            widgets: [
              {
                textParagraph: {
                  text: `**Propiedad:** ${name}`,
                },
              },
              {
                textParagraph: {
                  text: `**Estado:** ${log.status}`,
                },
              },
              {
                textParagraph: {
                  text: `**Fecha:** ${log.datetime}`,
                },
              },
            ],
          },
        ],
      },
    ],
  };

  try {
    await axios.post(GOOGLE_CHAT_WEBHOOK_URL, message);
    console.log('Alerta enviada correctamente a Google Chat');
  } catch (error) {
    console.error('Error al enviar la alerta a Google Chat:', error);
  }
}

async function main() {
  const logs = await getFilteredLogs();

  for (const log of logs) {
    await sendAlertToGoogleChat(log);
  }

  console.log(logs);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });