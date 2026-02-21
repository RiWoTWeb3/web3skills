import { prisma } from './db';
import dotenv from 'dotenv';
dotenv.config();

export async function seedKeys() {
  const envKeys = Object.keys(process.env).filter(k => k.startsWith('GEMINI_API_KEY'));

  for (const envKey of envKeys) {
    const key = process.env[envKey];
    if (!key) continue;

    // Default model assignment based on key name or generic default
    let model = 'gemini-2.0-flash';
    if (envKey.includes('PRO')) model = 'gemini-1.5-pro';
    if (envKey.includes('LITE')) model = 'gemini-2.0-flash-lite';

    await prisma.keyPool.upsert({
      where: { key: key },
      update: { model: model },
      create: {
        key: key,
        model: model,
        priority: model.includes('pro') ? 2 : 1, // Prefer flash for volume
        status: 'Active'
      }
    });
  }

  console.log(`Seeded ${envKeys.length} API keys into KeyPool.`);
}
