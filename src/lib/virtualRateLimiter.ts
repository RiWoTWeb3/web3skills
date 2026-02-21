import { prisma } from './db';

export class VirtualRateLimiter {
  private RPM_LIMIT = 15;  // From .env: GEMINI_RPM_LIMIT
  private RPD_LIMIT = 1500; // From .env: GEMINI_RPD_LIMIT

  async canUseKey(keyId: string): Promise<boolean> {
    const key = await prisma.keyPool.findUnique({ where: { id: keyId } });
    if (!key) return false;

    // Check if in cooling down period (hit RPM limit)
    const now = new Date();
    const lastUsed = new Date(key.last_used);
    const secondsSinceUse = (now.getTime() - lastUsed.getTime()) / 1000;

    // If less than 60 seconds and at RPM limit, can't use
    if (secondsSinceUse < 60 && key.current_rpm >= this.RPM_LIMIT) {
      await this.setCoolingDown(keyId);
      return false;
    }

    // Check daily limit
    if (key.daily_usage >= this.RPD_LIMIT) {
      await this.setExhausted(keyId);
      return false;
    }

    // Reset RPM counter if more than 60 seconds passed
    // This is the "Key Revival" logic integrated into the check
    if (secondsSinceUse >= 60 && (key.status === 'CoolingDown' || key.current_rpm > 0)) {
      await prisma.keyPool.update({
        where: { id: keyId },
        data: { current_rpm: 0, status: 'Active' }
      });
    }

    return true;
  }

  async getNextAvailableKey(): Promise<string | null> {
    // Get all active or cooling down keys (to revive them if possible)
    const keys = await prisma.keyPool.findMany({
      where: { status: { in: ['Active', 'CoolingDown'] } },
      orderBy: [
        { priority: 'asc' },
        { daily_usage: 'asc' }
      ]
    });

    for (const key of keys) {
      if (await this.canUseKey(key.id)) {
        return key.id;
      }
    }

    return null; // All keys exhausted
  }

  async incrementUsage(keyId: string) {
    await prisma.keyPool.update({
      where: { id: keyId },
      data: {
        current_rpm: { increment: 1 },
        daily_usage: { increment: 1 },
        last_used: new Date(),
        status: 'Active'
      }
    });
  }

  private async setCoolingDown(keyId: string) {
    await prisma.keyPool.update({
      where: { id: keyId },
      data: { status: 'CoolingDown' }
    });
  }

  private async setExhausted(keyId: string) {
    await prisma.keyPool.update({
      where: { id: keyId },
      data: { status: 'Exhausted' }
    });
  }

  // Background worker to revive keys periodically
  async reviveKeys() {
    const now = new Date();
    const sixtySecondsAgo = new Date(now.getTime() - 60000);

    await prisma.keyPool.updateMany({
      where: {
        status: 'CoolingDown',
        last_used: { lt: sixtySecondsAgo }
      },
      data: {
        status: 'Active',
        current_rpm: 0
      }
    });
  }
}
