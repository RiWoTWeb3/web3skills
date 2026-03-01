export interface Web3FeedItem {
  date: string;
  type: 'job' | 'news' | 'hack';
  title: string;
  description: string;
  link: string;
}

export const getFeed = async (): Promise<Web3FeedItem[]> => {
  try {
    const response = await fetch('/data/web3Feed.json');
    if (!response.ok) {
      throw new Error('Failed to fetch feed data');
    }
    const data: Web3FeedItem[] = await response.json();

    // Enforce max 60 entries and sort by date (descending)
    return data
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 60);
  } catch (error) {
    console.error('Error loading Web3 feed:', error);
    return [];
  }
};
