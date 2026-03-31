import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { prisma } from '../lib/db';
import fs from 'fs/promises';
import path from 'path';

const app = new Hono();

// Health check
app.get('/', (c: any) => c.text('RiWoT Backend Server - Port 3001'));

// API Stats endpoint
app.get('/api/stats', async (c: any) => {
  try {
    const keysCount = await prisma.keyPool.count({ where: { status: 'Active' } });
    const auditsCount = await prisma.auditJobs.count();
    const bugsFound = await prisma.vulnerabilityEvidence.count({ where: { is_confirmed: true } });

    return c.json({
      activeKeys: keysCount,
      totalAudits: auditsCount,
      bugsFound: bugsFound,
      systemStatus: 'ONLINE',
      uptime: '14d 6h 22m'
    });
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

// API Keys endpoint
app.get('/api/keys', async (c: any) => {
  try {
    const keys = await prisma.keyPool.findMany();
    // Ensure limit is returned for UI percentage calculation
    const keysWithLimit = keys.map(k => ({
      ...k,
      limit: k.model === 'gemini-1.5-pro' ? 1000 : 1500
    }));
    return c.json(keysWithLimit);
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

// API Audits endpoint
app.get('/api/audits', async (c: any) => {
  try {
    const audits = await prisma.auditJobs.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' }
    });

    const mappedAudits = await Promise.all(audits.map(async (audit: any) => {
      const findings = await prisma.vulnerabilityEvidence.count({
        where: { job_id: audit.id }
      });
      return {
        id: audit.id.slice(0, 8),
        project: audit.project_name,
        phase: audit.current_phase,
        status: audit.is_running ? 'IN_PROGRESS' : 'COMPLETED',
        findings: findings
      };
    }));

    return c.json(mappedAudits);
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

// System Logs endpoint
app.get('/api/logs', async (c: any) => {
  try {
    const logsPath = path.join(process.cwd(), 'src/data/system_logs.json');
    const logsData = await fs.readFile(logsPath, 'utf-8');
    return c.json(JSON.parse(logsData));
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

const port = 3001;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port
});
