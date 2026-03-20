import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { prisma } from '../lib/db';

const app = new Hono();

app.get('/', (c) => {
  return c.text('Web3 Skills RiWoT API - Status: Online');
});

// Admin Panel API endpoints
app.get('/api/stats', async (c) => {
  try {
    const keyCount = await prisma.keyPool.count({ where: { status: 'Active' } });
    const auditCount = await prisma.auditJobs.count();
    const findingsCount = await prisma.vulnerabilityEvidence.count();

    return c.json({
      activeKeys: keyCount,
      totalAudits: auditCount,
      bugsFound: findingsCount,
      systemStatus: 'ONLINE',
      uptime: '14d 6h 22m' // Simulated uptime
    });
  } catch (error) {
    return c.json({ error: 'Database connection error' }, 500);
  }
});

app.get('/api/keys', async (c) => {
  try {
    const keys = await prisma.keyPool.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return c.json(keys);
  } catch (error) {
    return c.json({ error: 'Failed to fetch keys' }, 500);
  }
});

app.get('/api/audits', async (c) => {
  try {
    const audits = await prisma.auditJobs.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' }
    });
    return c.json(audits);
  } catch (error) {
    return c.json({ error: 'Failed to fetch audits' }, 500);
  }
});

const port = 3001;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port
});
