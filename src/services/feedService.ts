import jobsData from '../data/jobs.json';
import intelData from '../data/intel.json';
import web3FeedData from '../data/web3Feed.json';

export interface JobListing {
  id: string;
  title: string;
  company: string;
  type: 'EVM' | 'SVM' | 'Backend';
  workType: string;
  experience: string;
  salaryRange: string;
  requirements: string[];
  applyLink: string;
  isSystemExample?: boolean;
}

export interface IntelItem {
  title: string;
  category: 'HACK' | 'INFRA' | 'BOUNTY';
  summary: string;
  date: string;
  sourceLink: string;
}

export interface FeedItem {
  date: string;
  type: 'job' | 'news' | 'hack';
  title: string;
  description: string;
  link: string;
}

export const feedService = {
  getJobs: (): JobListing[] => {
    return jobsData as JobListing[];
  },

  getIntel: (): IntelItem[] => {
    return intelData as IntelItem[];
  },

  getWeb3Feed: (limit: number = 60): FeedItem[] => {
    return (web3FeedData as FeedItem[])
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);
  }
};
