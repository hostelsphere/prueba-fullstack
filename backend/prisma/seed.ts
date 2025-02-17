import { MonitoringStatus, PrismaClient } from '@prisma/client';
import { UUID } from 'crypto';
import fs from 'fs';

interface LogEntry {
  id: UUID;
  service: string;
  task: string;
  property_id: UUID;
  datetime: Date;
  status: MonitoringStatus;
}

interface Property {
  id: UUID;
  name: string;
}

const prisma = new PrismaClient();

const run = async () => {
  try {
    const responseLogs = fs.readFileSync('prisma/mock_logs.json', 'utf8');
    const logs: LogEntry[] = JSON.parse(responseLogs);

    const responseProperties = fs.readFileSync('prisma/mock_properties.json', 'utf8');
    const properties: Property[] = JSON.parse(responseProperties);

    await prisma.generalProperty.createMany({
        data: properties,
        skipDuplicates: true
    })

    for (let i = 0; i < logs.length; i += 2000) {
        const data = logs.slice(i, i + 1000).map((r) => ({ ...r, datetime: new Date(r.datetime) }));

        await prisma.monitoringLog.createMany({
            data,
            skipDuplicates: true
        });

        console.log(`saving ${((i / logs.length) * 100).toFixed(2)}%`)
    }
  } catch (error) {
    console.error(error);
  }

  prisma.$disconnect();
  console.log('Seed completed');
}

run();