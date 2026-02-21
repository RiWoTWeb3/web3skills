import { GoogleGenerativeAI } from '@google/generative-ai';
import { VirtualRateLimiter } from './virtualRateLimiter';
import { prisma } from './db';

export class MultiKeyGeminiClient {
  private limiter = new VirtualRateLimiter();
  private clients: Map<string, GoogleGenerativeAI> = new Map();

  async initialize() {
    // Load all keys from database
    const keys = await prisma.keyPool.findMany();
    keys.forEach(k => {
      this.clients.set(k.id, new GoogleGenerativeAI(k.key));
    });
  }

  async generate(prompt: string, preferredModel?: string): Promise<string> {
    const keyId = await this.limiter.getNextAvailableKey();

    if (!keyId) {
      throw new Error('All API keys exhausted. Please wait or add more keys.');
    }

    const keyData = await prisma.keyPool.findUnique({ where: { id: keyId } });

    // Ensure client exists (in case it was added after initialization)
    if (!this.clients.has(keyId)) {
        this.clients.set(keyId, new GoogleGenerativeAI(keyData!.key));
    }

    const client = this.clients.get(keyId)!;
    const model = client.getGenerativeModel({
      model: preferredModel || keyData!.model
    });

    try {
      const result = await model.generateContent(prompt);
      await this.limiter.incrementUsage(keyId);
      return result.response.text();
    } catch (error: any) {
      if (error.message?.includes('429') || error.message?.includes('quota')) {
        // Mark this key as exhausted and retry with next key
        await prisma.keyPool.update({
          where: { id: keyId },
          data: { status: 'Exhausted' }
        });
        return this.generate(prompt, preferredModel); // Retry with next key
      }
      throw error;
    }
  }
}
