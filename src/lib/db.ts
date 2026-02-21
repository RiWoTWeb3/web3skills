import { PrismaClient } from '@prisma/client';
import os from 'os';
import path from 'path';
import fs from 'fs';

const getDbPath = () => {
  const home = os.homedir();
  const dbDir = path.join(home, '.CFD', 'database');

  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  const dbPath = path.join(dbDir, 'custom.db');
  return `file:${dbPath}`;
};

const databaseUrl = getDbPath();
process.env.DATABASE_URL = databaseUrl;

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
});
