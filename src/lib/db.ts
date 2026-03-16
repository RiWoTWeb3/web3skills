import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'file:../../prisma/dev.db',
    },
  },
});
