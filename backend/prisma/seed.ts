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
  console.log('Seeding data');
  try {
    const responseLogs = fs.readFileSync('prisma/mock_logs.json', 'utf8');
    const logs: LogEntry[] = JSON.parse(responseLogs);

    const responseProperties = fs.readFileSync('prisma/mock_properties.json', 'utf8');
    const properties: Property[] = JSON.parse(responseProperties);
    
    console.log(logs);
    console.log(properties);

    for (const property of properties) {
      await prisma.generalProperty.create({
        data: {
          id: property.id,
          name: property.name
        }
      });
    }

    for (const log of logs) {
      try {
        await prisma.monitoringLog.create({
          data: {
            id: log.id,
            service: log.service,
            task: log.task,
            property_id: log.property_id,
            datetime: new Date(log.datetime),
            status: log.status
          }
        });
      } catch(e) {
        console.log(log)
      }
    }
  } catch (error) {
    console.error(error);
  }

  prisma.$disconnect();
  console.log('Seed completed');
}

run().catch(e => console.error)