import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { cors } from 'hono/cors';
import { prisma } from '../lib/db';

const app = new Hono();

app.use('*', cors());

app.get('/', (c: any) => {
  return c.json({ status: 'RiWoT Core System Online', version: '2.0.0' });
});

app.get('/api/stats', async (c: any) => {
  try {
    const activeKeys = await prisma.keyPool.count({ where: { status: 'Active' } });
    const totalAudits = await prisma.auditJobs.count();
    const bugsFound = await prisma.vulnerabilityEvidence.count({ where: { is_confirmed: true } });

    return c.json({
      activeKeys,
      totalAudits,
      bugsFound,
      systemStatus: 'ONLINE',
      uptime: '14d 6h 22m' // Hardcoded for consistency with existing mock
    });
  } catch (error) {
    return c.json({ error: 'Database connection failed' }, 500);
  }
});

app.get('/api/keys', async (c: any) => {
  try {
    const keys = await prisma.keyPool.findMany({
      select: {
        id: true,
        model: true,
        status: true,
        usage: true
      }
    });
    // Add default limit if not in DB to match frontend expectations
    const keysWithLimit = keys.map((k: any) => ({ ...k, limit: 1500 }));
    return c.json(keysWithLimit);
  } catch (error) {
    return c.json({ error: 'Failed to fetch keys' }, 500);
  }
});

app.get('/api/audits', async (c: any) => {
  try {
    const audits = await prisma.auditJobs.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' }
    });

    const auditsWithFindings = await Promise.all(audits.map(async (audit: any) => {
      const findings = await prisma.vulnerabilityEvidence.count({
        where: { job_id: audit.id }
      });
      return {
        id: audit.id.slice(0, 8).toUpperCase(),
        project: audit.project_name,
        phase: audit.current_phase,
        status: audit.is_running ? 'IN_PROGRESS' : 'COMPLETED',
        findings
      };
    }));

    return c.json(auditsWithFindings);
  } catch (error) {
    return c.json({ error: 'Failed to fetch audits' }, 500);
  }
});

console.log('Starting RiWoT Backend on port 3001...');
serve({
  fetch: app.fetch,
  port: 3001
});
