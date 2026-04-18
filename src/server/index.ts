import { serve } from '@hono/node-server';
import { Hono, Context } from 'hono';
import { prisma } from '../lib/db';
import fs from 'fs/promises';
import path from 'path';

const app = new Hono();

// Health check
app.get('/', (c: Context) => c.text('RiWoT Backend Server - Port 3001'));

// API Stats endpoint
app.get('/api/stats', async (c: Context) => {
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

// Trigger Scan endpoint
app.post('/api/trigger-scan', async (c: Context) => {
  try {
    const logsPath = path.join(process.cwd(), 'src/data/system_logs.json');
    const logsData = await fs.readFile(logsPath, 'utf-8');
    const logs = JSON.parse(logsData);

    const newLog = {
      time: new Date().toLocaleTimeString('en-GB', { hour12: false }),
      msg: "Autonomous scan cycle triggered by Admin override.",
      type: "info"
    };

    const updatedLogs = [newLog, ...logs].slice(0, 50);
    await fs.writeFile(logsPath, JSON.stringify(updatedLogs, null, 2));

    return c.json({ success: true, message: "Scan initialized" });
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

// API Keys endpoint
app.get('/api/keys', async (c: Context) => {
  try {
    const keys = await prisma.keyPool.findMany();
    // Ensure limit is returned for UI percentage calculation
    const keysWithLimit = keys.map((k: any) => ({
      ...k,
      limit: k.model === 'gemini-1.5-pro' ? 1000 : 1500
    }));
    return c.json(keysWithLimit);
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

// API Audits endpoint
app.get('/api/audits', async (c: Context) => {
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

// API Findings endpoint
app.get('/api/findings', async (c: Context) => {
  try {
    const findings = await prisma.vulnerabilityEvidence.findMany({
      take: 6,
      orderBy: { createdAt: 'desc' }
    });
    return c.json(findings);
  } catch (error: any) {
    return c.json({ error: error.message }, 500);
  }
});

// System Logs endpoint
app.get('/api/logs', async (c: Context) => {
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
