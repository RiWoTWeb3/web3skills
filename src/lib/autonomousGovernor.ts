import { prisma } from './db';
import fs from 'fs';
import path from 'path';

export class AutonomousGovernor {
  async calculateAuditVelocity(projectPath: string): Promise<{
    estimatedDuration: number; // minutes
    auditVelocity: number; // requests per hour
    recommendedPhaseTime: number; // minutes per phase
    sleepMsBetweenFiles: number;
  }> {
    // Count lines of code in project
    const stats = await this.analyzeProject(projectPath);

    // Get available key budget
    const activeKeys = await prisma.keyPool.count({
      where: { status: 'Active' }
    });

    const keysCount = activeKeys || 1; // Default to 1 if none found to avoid division by zero
    const totalRPM = keysCount * 14; // Using 14 as safety margin as per user request
    const totalRPD = keysCount * 1500;

    // Estimate requests needed (rough formula)
    const requestsPerPhase = Math.ceil(stats.totalLines / 100); // 1 request per 100 lines
    const totalRequests = requestsPerPhase * 6; // 6 phases

    // Calculate duration to stay within limits
    // Velocity calculation for "Quota-Stretcher"
    const requestsPerHourLimit = totalRPM * 60;
    const hoursNeeded = totalRequests / requestsPerHourLimit;
    const minutesNeeded = Math.ceil(hoursNeeded * 60);

    // Safety margin: add 20% buffer
    const estimatedDuration = Math.ceil(minutesNeeded * 1.2);
    const recommendedPhaseTime = Math.ceil(estimatedDuration / 6);

    // Calculate sleep_ms between files (Quota-Stretcher logic)
    // totalDuration (ms) / totalFiles
    const totalMs = estimatedDuration * 60 * 1000;
    const sleepMsBetweenFiles = stats.totalFiles > 0 ? Math.ceil(totalMs / stats.totalFiles) : 0;

    return {
      estimatedDuration,
      auditVelocity: totalRequests / (estimatedDuration / 60),
      recommendedPhaseTime,
      sleepMsBetweenFiles
    };
  }

  async analyzeProject(dirPath: string): Promise<{ totalFiles: number; totalLines: number }> {
    let totalFiles = 0;
    let totalLines = 0;

    const walk = (dir: string) => {
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);
            if (stat.isDirectory()) {
                if (file !== 'node_modules' && file !== '.git') {
                    walk(filePath);
                }
            } else if (file.endsWith('.sol')) {
                totalFiles++;
                const content = fs.readFileSync(filePath, 'utf-8');
                totalLines += content.split('\n').length;
            }
        }
    };

    walk(dirPath);
    return { totalFiles, totalLines };
  }

  // Stateful recovery helper
  async getLastJobState(jobId: string) {
    return await prisma.auditJobs.findUnique({
      where: { id: jobId }
    });
  }

  async updateJobProgress(jobId: string, data: Partial<{
    current_phase: number,
    last_processed_file: string,
    last_processed_line: number,
    is_running: boolean
  }>) {
    await prisma.auditJobs.update({
      where: { id: jobId },
      data: data
    });
  }
}
