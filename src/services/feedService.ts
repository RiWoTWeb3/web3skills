import web3FeedData from '../data/web3Feed.json';

export interface FeedItem {
  date: string;
  type: 'job' | 'news' | 'hack';
  title: string;
  description: string;
  link: string;
}

class FeedService {
  private feed: FeedItem[] = web3FeedData as FeedItem[];

  /**
   * Fetches the web3 feed, optionally filtered by type.
   * Newest items are always at the top.
   */
  getFeed(type?: FeedItem['type']): FeedItem[] {
    let result = [...this.feed];

    if (type) {
      result = result.filter(item => item.type === type);
    }

    // Sort by date descending
    return result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  /**
   * Returns the latest feed items with a limit.
   */
  getLatest(limit: number = 60): FeedItem[] {
    return this.getFeed().slice(0, limit);
  }
}

export const feedService = new FeedService();
