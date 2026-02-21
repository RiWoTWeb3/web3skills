import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { cors } from 'hono/cors';
import { prisma } from '../lib/db';
import { seedKeys } from '../lib/seedKeys';

const app = new Hono();

app.use('/*', cors());

// Admin Routes
app.get('/api/admin/keys', async (c) => {
  const keys = await prisma.keyPool.findMany({
    orderBy: { priority: 'asc' }
  });
  return c.json({ keys });
});

app.get('/api/admin/jobs', async (c) => {
  const jobs = await prisma.auditJobs.findMany({
    include: { vulnerabilities: true },
    orderBy: { started_at: 'desc' }
  });
  return c.json({ jobs });
});

app.post('/api/admin/auth', async (c) => {
  const { password } = await c.req.json();
  if (password === 'antigravity2025') {
    return c.json({ success: true });
  }
  return c.json({ success: false }, 401);
});

// Seed keys if empty
app.get('/api/admin/seed', async (c) => {
    await seedKeys();
    return c.json({ message: 'Keys seeded successfully' });
});

const port = 3001;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port
});
