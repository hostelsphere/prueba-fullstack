import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import { sendAlertToGoogleChat, getFilteredLogs } from './index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const prisma = new PrismaClient();

jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => {
      return {
        monitoringLog: {
          findMany: jest.fn().mockResolvedValue([
            {
              id: '1',
              service: 'test-service',
              task: 'register_diary',
              status: 'FAIL',
              generalPropertyId: '1',
              datetime: new Date().toString(),
            },
            {
              id: '2',
              service: 'test-service',
              task: 'other_task',
              status: 'WARN',
              generalPropertyId: '2',
              datetime: new Date().toString(),
            },
          ]),
        },
        generalProperty: {
          findUnique: jest.fn().mockImplementation(({ where: { id } }) => {
            return {
              name: id === '1' ? 'test-property' : 'other-property',
            };
          }),
        },
        $disconnect: jest.fn(),
      };
    }),
  };
});

describe('Test de envío de alertas', () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('debería enviar una alerta correctamente a Google Chat', async () => {
    const mockLog = {
      id: '1',
      service: 'test-service',
      task: 'register_diary',
      status: 'FAIL',
      generalPropertyId: '1',
      datetime: new Date().toString(),
    };

    mockedAxios.post.mockResolvedValue({ status: 200 });

    await sendAlertToGoogleChat(mockLog);

    expect(mockedAxios.post).toHaveBeenCalledWith(
      process.env.GOOGLE_CHAT_WEBHOOK_URL,
      expect.objectContaining({
        cards: expect.arrayContaining([
          expect.objectContaining({
            header: expect.objectContaining({
              title: `Alerta: Log de monitoreo de ${mockLog.service}`,
              subtitle: `Task: ${mockLog.task}`,
            }),
            sections: expect.arrayContaining([
              expect.objectContaining({
                widgets: expect.arrayContaining([
                  expect.objectContaining({
                    textParagraph: expect.objectContaining({
                      text: `**Propiedad:** test-property`,
                    }),
                  }),
                  expect.objectContaining({
                    textParagraph: expect.objectContaining({
                      text: `**Estado:** ${mockLog.status}`,
                    }),
                  }),
                  expect.objectContaining({
                    textParagraph: expect.objectContaining({
                      text: `**Fecha:** ${mockLog.datetime}`,
                    }),
                  }),
                ]),
              }),
            ]),
          }),
        ]),
      })
    );
  });

  it('debería filtrar los logs correctamente', async () => {
    const logs = await getFilteredLogs();

    expect(logs.length).toBe(2);

    expect(logs[0].status).toBe('FAIL');
    expect(logs[1].status).toBe('WARN');
  });
});
