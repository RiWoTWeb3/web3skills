import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  BookOpen, Code, Shield, DollarSign, Layout, Server, Network, 
  GraduationCap, Palette, Target, TrendingUp, Award, CheckCircle, 
  Circle, Download, Upload, Share2, Eye, X, Copy, Check, Moon, Sun,
  ChevronDown, ChevronUp, Search, MessageCircle, Github, ArrowRight,
  Rocket, Users, Zap, Star, ExternalLink, Menu, XCircle, Filter,
  Briefcase, Newspaper, ShieldAlert, Sparkles
} from 'lucide-react';
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  useParams
} from 'react-router-dom';

import skillCategoriesRaw from './data/skills.json';
import jobsDataRaw from './data/jobs.json';
import intelDataRaw from './data/web3Feed.json';

// --- Types & Data ---

const skillCategories = skillCategoriesRaw as Record<string, string[]>;

interface JobListing {
  id: string;
  title: string;
  company: string;
  type: 'EVM' | 'SVM' | 'Backend';
  workType: string;
  experience: string;
  salaryRange: string;
  requirements: string[];
  applyLink: string;
}

interface IntelItem {
  title: string;
  type: 'job' | 'news' | 'hack';
  description: string;
  date: string;
  link: string;
}

const jobsData = jobsDataRaw as JobListing[];
const intelData = [...intelDataRaw].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) as IntelItem[];

const careerPaths = {
  'EVM Smart Contract Developer': {
    icon: Code,
    ecosystem: 'EVM',
    description: 'Master Solidity development and build secure, efficient smart contracts for Ethereum and EVM-compatible chains',
    requiredSkills: [
      'Solidity', 'Foundry', 'Hardhat', 'Smart Contract Development',
      'Production EVM Smart Contracts', 'EVM Mechanics', 'Security Best Practices',
      'Gas Optimization', 'Unit Testing', 'Integration Testing', 'Fuzz Testing',
      'Ethers.js', 'Viem'
    ],
    roadmap: [
      {
        phase: 'Foundation',
        duration: '1-1.5 months',
        skills: ['Blockchain Fundamentals', 'Solidity Basics', 'JavaScript/TypeScript', 'Git Version Control'],
        resources: [
          { name: 'Cyfrin Updraft - Blockchain Basics', url: 'https://updraft.cyfrin.io/courses/blockchain-basics', type: 'FREE', duration: '~5 hours' },
          { name: 'Cyfrin Updraft - Solidity 101', url: 'https://updraft.cyfrin.io/courses/solidity', type: 'FREE', duration: '~10 hours' },
          { name: 'CryptoZombies', url: 'https://cryptozombies.io', type: 'FREE', duration: '~3 hours' },
          { name: 'Ethereum.org Developer Docs', url: 'https://ethereum.org/en/developers/', type: 'FREE' },
          { name: 'Solidity Official Documentation', url: 'https://docs.soliditylang.org', type: 'FREE' }
        ]
      },
      {
        phase: 'Core Development',
        duration: '1.5-2 months',
        skills: ['Foundry', 'Hardhat', 'Unit Testing', 'Smart Contract Development', 'EVM Opcodes'],
        resources: [
          { name: 'Cyfrin Updraft - Foundry Fundamentals', url: 'https://updraft.cyfrin.io/courses/foundry', type: 'FREE', duration: '~13 hours' },
          { name: 'Foundry Book', url: 'https://book.getfoundry.sh', type: 'FREE' },
          { name: 'Hardhat Documentation', url: 'https://hardhat.org/docs', type: 'FREE' },
          { name: 'OpenZeppelin Contracts', url: 'https://docs.openzeppelin.com/contracts', type: 'FREE' },
          { name: 'Ethernaut CTF', url: 'https://ethernaut.openzeppelin.com', type: 'FREE' }
        ]
      },
      {
        phase: 'Advanced Concepts',
        duration: '1.5-2 months',
        skills: ['Gas Optimization', 'Security Best Practices', 'Upgradeable Contracts', 'Fuzz Testing'],
        resources: [
          { name: 'Cyfrin Updraft - Advanced Foundry', url: 'https://updraft.cyfrin.io/courses/advanced-foundry', type: 'FREE', duration: '~17 hours' },
          { name: 'Solidity Patterns', url: 'https://fravoll.github.io/solidity-patterns/', type: 'FREE' },
          { name: 'EIP Standards', url: 'https://eips.ethereum.org', type: 'FREE' },
          { name: 'Yul Documentation', url: 'https://docs.soliditylang.org/en/latest/yul.html', type: 'FREE' }
        ]
      },
      {
        phase: 'Specialization & Production',
        duration: '2 months',
        skills: ['High-TVL Contracts', 'DeFi Protocol Design', 'Production Deployment', 'Multi-chain'],
        resources: [
          { name: 'Uniswap V2/V3 Source Code', url: 'https://github.com/Uniswap', type: 'FREE' },
          { name: 'Aave V3 Contracts', url: 'https://github.com/aave/aave-v3-core', type: 'FREE' },
          { name: 'ETHGlobal Hackathons', url: 'https://ethglobal.com', type: 'FREE/Prizes' },
          { name: 'RiWoT Community', url: 'https://discord.gg/qMd7jwV7UG', type: 'FREE' }
        ]
      }
    ],
    outcomes: {
      junior: '$80k-$120k',
      mid: '$120k-$180k',
      senior: '$180k-$250k+',
      lead: '$250k-$400k+'
    }
  },
  'Smart Contract Security Auditor': {
    icon: Shield,
    ecosystem: 'EVM',
    description: 'Become a security researcher and auditor for smart contracts. Identify vulnerabilities and earn through bug bounties',
    requiredSkills: [
      'Solidity', 'Rust', 'Security Tools Experience', 'Smart Contract Auditing',
      'Slither', 'Echidna', 'Certora', 'Aderyn', 'Vulnerability Assessment',
      'Formal Verification', 'Exploit Development', 'Audit Report Writing'
    ],
    roadmap: [
      {
        phase: 'Foundation',
        duration: '1.5-2 months',
        skills: ['Solidity Advanced', 'Smart Contract Development', 'EVM Mechanics', 'Security Best Practices'],
        resources: [
          { name: 'Cyfrin Updraft - Solidity 101', url: 'https://updraft.cyfrin.io/courses/solidity', type: 'FREE', duration: '~30 hours' },
          { name: 'Cyfrin Updraft - Foundry Fundamentals', url: 'https://updraft.cyfrin.io/courses/foundry', type: 'FREE', duration: '~40 hours' },
          { name: 'Ethereum Security Documentation', url: 'https://ethereum.org/en/developers/docs/security/', type: 'FREE' },
          { name: 'SWC Registry', url: 'https://swcregistry.io', type: 'FREE' }
        ]
      },
      {
        phase: 'Security Fundamentals',
        duration: '1.5-2 months',
        skills: ['Vulnerability Assessment', 'Slither', 'Aderyn', 'Common Attack Vectors'],
        resources: [
          { name: 'Cyfrin Updraft - Smart Contract Security', url: 'https://updraft.cyfrin.io/courses/security', type: 'FREE', duration: '~60 hours' },
          { name: 'Damn Vulnerable DeFi', url: 'https://www.damnvulnerabledefi.xyz', type: 'FREE' },
          { name: 'Ethernaut by OpenZeppelin', url: 'https://ethernaut.openzeppelin.com', type: 'FREE' },
          { name: 'Not So Smart Contracts', url: 'https://github.com/crytic/not-so-smart-contracts', type: 'FREE' }
        ]
      },
      {
        phase: 'Advanced Security',
        duration: '2 months',
        skills: ['Formal Verification', 'Echidna Fuzzing', 'Certora', 'Smart Contract Auditing'],
        resources: [
          { name: 'Cyfrin Updraft - Assembly and Formal Verification', url: 'https://updraft.cyfrin.io/courses/formal-verification', type: 'FREE', duration: '~40 hours' },
          { name: 'Echidna Documentation', url: 'https://github.com/crytic/echidna', type: 'FREE' },
          { name: 'Certora Documentation', url: 'https://docs.certora.com', type: 'FREE' },
          { name: 'Secureum Bootcamp', url: 'https://secureum.substack.com', type: 'FREE' }
        ]
      },
      {
        phase: 'Professional Auditing',
        duration: '2-2.5 months',
        skills: ['Audit Workflow', 'Bug Bounty Hunting', 'Report Writing', 'Client Communication'],
        resources: [
          { name: 'Code4rena Contests', url: 'https://code4rena.com', type: 'PAID - Earn Money' },
          { name: 'Immunefi Bug Bounties', url: 'https://immunefi.com', type: 'PAID - Earn Money' },
          { name: 'Sherlock Audit Contests', url: 'https://www.sherlock.xyz', type: 'PAID - Earn Money' },
          { name: 'CodeHawks by Cyfrin', url: 'https://codehawks.com', type: 'PAID - Earn Money' },
          { name: 'Solodit Audit Database', url: 'https://solodit.xyz', type: 'FREE' }
        ]
      }
    ],
    outcomes: {
      junior: '$90k-$140k',
      mid: '$140k-$200k',
      senior: '$200k-$300k',
      lead: '$300k-$500k+',
      bounty: '$0-$10M per finding'
    }
  },
  'DeFi Developer (EVM)': {
    icon: DollarSign,
    ecosystem: 'EVM',
    description: 'Build decentralized finance protocols - AMMs, lending platforms, yield aggregators on Ethereum and EVM chains',
    requiredSkills: [
      'Solidity', 'DeFi Understanding', 'DeFi Products', 'AMMs', 'Oracles',
      'Uniswap V2/V3/V4', 'Curve Finance', 'Aave Protocol', 'High-TVL Contracts'
    ],
    roadmap: [
      {
        phase: 'DeFi Basics',
        duration: '1-1.5 months',
        skills: ['DeFi Concepts', 'Smart Contract Development', 'Token Standards'],
        resources: [
          { name: 'DeFi MOOC by UC Berkeley', url: 'https://defi-learning.org', type: 'FREE' },
          { name: 'Finematics YouTube', url: 'https://www.youtube.com/@Finematics', type: 'FREE' },
          { name: 'Cyfrin Updraft - Blockchain Basics', url: 'https://updraft.cyfrin.io/courses/blockchain-basics', type: 'FREE' }
        ]
      },
      {
        phase: 'Core Protocols',
        duration: '1.5-2 months',
        skills: ['AMMs', 'Lending Protocols', 'Oracles', 'Tokenomics'],
        resources: [
          { name: 'Cyfrin Updraft - Uniswap V4', url: 'https://updraft.cyfrin.io/courses/uniswap-v4', type: 'FREE', duration: '~25 hours' },
          { name: 'Cyfrin Updraft - Chainlink Fundamentals', url: 'https://updraft.cyfrin.io/courses/chainlink', type: 'FREE', duration: '~20 hours' },
          { name: 'Uniswap V2/V3 Documentation', url: 'https://docs.uniswap.org', type: 'FREE' },
          { name: 'Aave V3 Documentation', url: 'https://docs.aave.com/developers/', type: 'FREE' }
        ]
      },
      {
        phase: 'Advanced DeFi',
        duration: '2 months',
        skills: ['MEV', 'Cross-chain', 'L2s', 'Advanced AMM Curves'],
        resources: [
          { name: 'Cyfrin Updraft - Curve Stableswap', url: 'https://updraft.cyfrin.io/courses/curve-stableswap', type: 'FREE', duration: '~30 hours' },
          { name: 'Cyfrin Updraft - Curve Cryptoswap', url: 'https://updraft.cyfrin.io/courses/curve-cryptoswap', type: 'FREE', duration: '~30 hours' },
          { name: 'Flashbots Documentation', url: 'https://docs.flashbots.net', type: 'FREE' }
        ]
      },
      {
        phase: 'Production',
        duration: '1.5-2 months',
        skills: ['High-TVL Contracts', 'Security', 'Gas Optimization'],
        resources: [
          { name: 'Cyfrin Updraft - Uniswap V2 Deep Dive', url: 'https://updraft.cyfrin.io/courses/uniswap-v2', type: 'FREE', duration: '~40 hours' },
          { name: 'Cyfrin Updraft - Uniswap V3 Deep Dive', url: 'https://updraft.cyfrin.io/courses/uniswap-v3', type: 'FREE', duration: '~50 hours' }
        ]
      }
    ]
  },
  'Frontend Web3 Developer': {
    icon: Layout,
    ecosystem: 'EVM',
    description: 'Build beautiful user interfaces for decentralized applications with React, Next.js, and Web3 integration',
    requiredSkills: [
      'React', 'Next.js', 'TypeScript', 'TailwindCSS', 'Wagmi', 'RainbowKit',
      'Web3 Wallets', 'dApps', 'Ethers.js', 'Viem'
    ],
    roadmap: [
      {
        phase: 'Frontend Foundation',
        duration: '3-4 weeks',
        skills: ['JavaScript', 'React', 'TypeScript', 'TailwindCSS'],
        resources: [
          { name: 'React Official Tutorial', url: 'https://react.dev', type: 'FREE' },
          { name: 'TypeScript Handbook', url: 'https://www.typescriptlang.org/docs/', type: 'FREE' },
          { name: 'TailwindCSS Docs', url: 'https://tailwindcss.com/docs', type: 'FREE' }
        ]
      },
      {
        phase: 'Web3 Integration',
        duration: '3-4 weeks',
        skills: ['Web3 Wallets', 'Blockchain Fundamentals', 'dApps'],
        resources: [
          { name: 'Cyfrin Updraft - Full-Stack Web3 Crash Course', url: 'https://updraft.cyfrin.io/courses/full-stack-web3-development-crash-course', type: 'FREE' },
          { name: 'Wagmi Documentation', url: 'https://wagmi.sh', type: 'FREE' },
          { name: 'RainbowKit Docs', url: 'https://www.rainbowkit.com', type: 'FREE' }
        ]
      },
      {
        phase: 'dApp Development',
        duration: '1-1.5 months',
        skills: ['Smart Contract Interaction', 'IPFS', 'The Graph'],
        resources: [
          { name: 'Scaffold-ETH', url: 'https://scaffoldeth.io', type: 'FREE' },
          { name: 'The Graph Documentation', url: 'https://thegraph.com/docs', type: 'FREE' },
          { name: 'IPFS Documentation', url: 'https://docs.ipfs.tech', type: 'FREE' }
        ]
      },
      {
        phase: 'Advanced UI/UX',
        duration: '3-4 weeks',
        skills: ['Next.js', 'Redux', 'React Query', 'Responsive Design'],
        resources: [
          { name: 'Next.js Documentation', url: 'https://nextjs.org/docs', type: 'FREE' },
          { name: 'React Query Docs', url: 'https://tanstack.com/query', type: 'FREE' }
        ]
      }
    ]
  },
  'Backend Infrastructure Engineer': {
    icon: Server,
    ecosystem: 'EVM',
    description: 'Build scalable backend systems and infrastructure for Web3 applications',
    requiredSkills: [
      'Go', 'Rust', 'Python', 'Distributed Systems', 'API Building & Scaling',
      'Database Design', 'High-Throughput Systems', 'Kubernetes'
    ],
    roadmap: [
      {
        phase: 'Backend Basics',
        duration: '1-1.5 months',
        skills: ['Python', 'REST API', 'Database Design', 'Git Advanced'],
        resources: [
          { name: 'Python Official Tutorial', url: 'https://docs.python.org/3/tutorial/', type: 'FREE' },
          { name: 'REST API Best Practices', url: 'https://restfulapi.net', type: 'FREE' }
        ]
      },
      {
        phase: 'Distributed Systems',
        duration: '1-1.5 months',
        skills: ['Microservices', 'Redis', 'Distributed Systems', 'Kubernetes'],
        resources: [
          { name: 'Kubernetes Documentation', url: 'https://kubernetes.io/docs/', type: 'FREE' },
          { name: 'System Design Primer', url: 'https://github.com/donnemartin/system-design-primer', type: 'FREE' }
        ]
      },
      {
        phase: 'Blockchain Integration',
        duration: '1-1.5 months',
        skills: ['Developer Infrastructure', 'The Graph', 'Event-Driven Architecture'],
        resources: [
          { name: 'Alchemy Documentation', url: 'https://docs.alchemy.com', type: 'FREE' },
          { name: 'The Graph Protocol', url: 'https://thegraph.com/docs', type: 'FREE' }
        ]
      },
      {
        phase: 'Scale & Performance',
        duration: '1.5-2 months',
        skills: ['High-Throughput Systems', 'Database Optimization', 'Cloud Architecture'],
        resources: [
          { name: 'AWS Documentation', url: 'https://docs.aws.amazon.com', type: 'FREE' }
        ]
      }
    ]
  },
  'Blockchain Architect': {
    icon: Network,
    ecosystem: 'EVM',
    description: 'Design and architect blockchain systems, L2 solutions, and infrastructure at scale',
    requiredSkills: [
      'System Architecture', 'Blockchain Fundamentals', 'L2s', 'Bridges',
      'Distributed Systems', 'High-Throughput Systems', 'EVM Mechanics', 'Consensus Mechanisms'
    ],
    roadmap: [
      {
        phase: 'Deep Blockchain Knowledge',
        duration: '1.5-2 months',
        skills: ['Blockchain Fundamentals', 'Consensus Mechanisms', 'EVM Mechanics'],
        resources: [
          { name: 'Ethereum.org', url: 'https://ethereum.org', type: 'FREE' },
          { name: 'Bitcoin Whitepaper', url: 'https://bitcoin.org/bitcoin.pdf', type: 'FREE' },
          { name: 'Ethereum Whitepaper', url: 'https://ethereum.org/en/whitepaper/', type: 'FREE' }
        ]
      },
      {
        phase: 'System Design',
        duration: '1-1.5 months',
        skills: ['System Design', 'Distributed Systems', 'Large-Scale Cloud Systems'],
        resources: [
          { name: 'System Design Primer', url: 'https://github.com/donnemartin/system-design-primer', type: 'FREE' }
        ]
      },
      {
        phase: 'Layer 2 & Scaling',
        duration: '1.5-2 months',
        skills: ['L2s', 'ZK Proofs', 'Bridges', 'Cross-chain Protocols'],
        resources: [
          { name: 'Cyfrin Updraft - ZK Proofs Fundamentals', url: 'https://updraft.cyfrin.io/courses/fundamentals-of-zero-knowledge-proofs', type: 'FREE' },
          { name: 'Optimism Docs', url: 'https://docs.optimism.io', type: 'FREE' },
          { name: 'Arbitrum Docs', url: 'https://docs.arbitrum.io', type: 'FREE' },
          { name: 'zkSync Docs', url: 'https://docs.zksync.io', type: 'FREE' }
        ]
      },
      {
        phase: 'Advanced Architecture',
        duration: '2 months',
        skills: ['High-Throughput Systems', 'Performance Testing', 'Production Systems'],
        resources: [
          { name: 'L2Beat', url: 'https://l2beat.com', type: 'FREE' }
        ]
      }
    ]
  },
  'Solana Developer': {
    icon: Zap,
    ecosystem: 'Solana',
    description: 'Build high-performance dApps on Solana using Rust and the Anchor framework',
    requiredSkills: [
      'Rust', 'TypeScript', 'Solana Fundamentals', 'Solana Program Development', 'Anchor Framework',
      'Solana Web3.js', 'SPL Tokens', 'Solana Account Model', 'PDAs'
    ],
    roadmap: [
      {
        phase: 'Solana Basics',
        duration: '1-1.5 months',
        skills: ['Rust Basics', 'TypeScript Basics', 'Solana Fundamentals', 'Solana CLI'],
        resources: [
          { name: 'Cyfrin Updraft - Rust Programming Basics', url: 'https://updraft.cyfrin.io/courses/rust-programming-basics', type: 'FREE' },
          { name: 'Turbin3 Bootcamp', url: 'https://www.turbin3.org/', type: 'FREE' },
          { name: 'Blueshift - Solana Development Courses', url: 'https://learn.blueshift.gg/en', type: 'FREE' },
          { name: 'Solana Foundation - Solana Bootcamp', url: 'https://www.youtube.com/watch?v=pRYs49MqapI&list=PLilwLeBwGuK51Ji870apdb88dnBr1Xqhm', type: 'FREE' },
          { name: 'Solana Foundation - Solana Bytes', url: 'https://www.youtube.com/watch?v=pRYs49MqapI&list=PLilwLeBwGuK51Ji870apdb88dnBr1Xqhm', type: 'FREE', duration: '4-min tutorials' },
          { name: 'RiseIn - Build on Solana', url: 'https://www.risein.com/courses/build-on-solana', type: 'FREE', duration: 'Native Rust & Solana' },
          { name: 'Solana Documentation', url: 'https://docs.solana.com', type: 'FREE' },
          { name: 'Rust Book', url: 'https://doc.rust-lang.org/book/', type: 'FREE' }
        ]
      },
      {
        phase: 'Program Development',
        duration: '1.5-2 months',
        skills: ['Anchor Framework', 'Solana Program Development', 'SPL Tokens'],
        resources: [
          { name: 'Solana Developer Bootcamp 2024 (Projects 1-9)', url: 'https://www.youtube.com/watch?v=amAq-WHAFs8', type: 'FREE' },
          { name: 'Solana Developer Bootcamp 2024 (Projects 10-13)', url: 'https://www.youtube.com/watch?v=5JRVnxGW8kc', type: 'FREE' },
          { name: 'RareSkills - Ethereum to Solana Developer Course', url: 'https://rareskills.io/post/hello-world-solana', type: 'FREE' },
          { name: 'Hackquest - Solana Learning Track', url: 'https://www.hackquest.io/learning-track/Solana', type: 'FREE' },
          { name: 'Anchor Documentation', url: 'https://www.anchor-lang.com', type: 'FREE' }
        ]
      },
      {
        phase: 'Advanced Solana',
        duration: '1.5-2 months',
        skills: ['PDAs', 'CPI', 'Solana Security', 'Solana Testing'],
        resources: [
          { name: 'Solana Auditors Bootcamp 2024', url: 'https://www.youtube.com/playlist?list=PLzUrW5H8-hDdU-pzHjZrgupi5Wis6zWNJ', type: 'FREE' },
          { name: 'Ackee Blockchain Security', url: 'https://ackeeblockchain.com', type: 'FREE' }
        ]
      },
      {
        phase: 'Production & DeFi',
        duration: '2 months',
        skills: ['Solana DeFi', 'Jupiter', 'Raydium', 'Metaplex NFTs'],
        resources: [
          { name: 'Jupiter Documentation', url: 'https://docs.jup.ag', type: 'FREE' },
          { name: 'Metaplex Documentation', url: 'https://docs.metaplex.com', type: 'FREE' }
        ]
      }
    ]
  },
  'Solana Security Auditor': {
    icon: Shield,
    ecosystem: 'Solana',
    description: 'Audit Rust-based Solana programs and identify vulnerabilities in SVM applications',
    requiredSkills: [
      'Rust', 'TypeScript', 'Solana Program Development', 'Solana Security Best Practices',
      'Anchor Framework', 'Vulnerability Assessment', 'Aderyn', 'Audit Report Writing'
    ],
    roadmap: [
      {
        phase: 'Rust & Solana Foundation',
        duration: '1.5-2 months',
        skills: ['Rust Basics', 'TypeScript Basics', 'Solana Fundamentals', 'Anchor Framework'],
        resources: [
          { name: 'Cyfrin Updraft - Rust Programming', url: 'https://updraft.cyfrin.io/courses/rust-programming-basics', type: 'FREE' },
          { name: 'Turbin3 Bootcamp', url: 'https://www.turbin3.org/', type: 'FREE' },
          { name: 'Blueshift - Solana Development Courses', url: 'https://learn.blueshift.gg/en', type: 'FREE' },
          { name: 'Solana Foundation - Solana Bootcamp', url: 'https://www.youtube.com/watch?v=pRYs49MqapI&list=PLilwLeBwGuK51Ji870apdb88dnBr1Xqhm', type: 'FREE' },
          { name: 'Solana Foundation - Solana Bytes', url: 'https://www.youtube.com/watch?v=pRYs49MqapI&list=PLilwLeBwGuK51Ji870apdb88dnBr1Xqhm', type: 'FREE', duration: '4-min tutorials' },
          { name: 'RiseIn - Build on Solana', url: 'https://www.risein.com/courses/build-on-solana', type: 'FREE', duration: 'Native Rust & Solana' }
        ]
      },
      {
        phase: 'Security Fundamentals',
        duration: '1.5-2 months',
        skills: ['Solana Security Best Practices', 'Common Vulnerabilities', 'Aderyn'],
        resources: [
          { name: 'Solana Auditors Bootcamp 2024', url: 'https://www.youtube.com/playlist?list=PLzUrW5H8-hDdU-pzHjZrgupi5Wis6zWNJ', type: 'FREE' },
          { name: 'RareSkills - Ethereum to Solana Developer Course', url: 'https://rareskills.io/post/hello-world-solana', type: 'FREE' },
          { name: 'Hackquest - Solana Learning Track', url: 'https://www.hackquest.io/learning-track/Solana', type: 'FREE' },
          { name: 'Ackee Blockchain Resources', url: 'https://ackeeblockchain.com', type: 'FREE' }
        ]
      },
      {
        phase: 'Advanced Auditing',
        duration: '2 months',
        skills: ['Exploit Development', 'Audit Report Writing', 'Testing'],
        resources: [
          { name: 'Solana Security Best Practices', url: 'https://docs.solana.com/developers', type: 'FREE' }
        ]
      },
      {
        phase: 'Professional Practice',
        duration: '2-2.5 months',
        skills: ['Bug Bounties', 'Audit Contests', 'Client Work'],
        resources: [
          { name: 'Immunefi Solana Programs', url: 'https://immunefi.com', type: 'PAID - Earn Money' }
        ]
      }
    ]
  },
  'UI/UX Designer (Web3)': {
    icon: Palette,
    ecosystem: 'Cross-chain',
    description: 'Design beautiful and intuitive user experiences for Web3 applications',
    requiredSkills: [
      'UI/UX Design', 'Design Tools', 'Adobe Creative Suite', 'Wireframing', 'Prototyping',
      'Responsive Design', 'Web3 User Flows', 'Blockchain Fundamentals'
    ],
    roadmap: [
      {
        phase: 'Design Fundamentals',
        duration: '3-4 weeks',
        skills: ['UI/UX Design', 'Design Tools', 'Adobe Creative Suite'],
        resources: [
          { name: 'UI/UX Design Course', url: 'https://www.interaction-design.org/courses', type: 'FREE' },
          { name: 'Adobe XD Tutorials', url: 'https://www.adobe.com/products/xd/learn.html', type: 'FREE' }
        ]
      },
      {
        phase: 'Web3 Design Patterns',
        duration: '3-4 weeks',
        skills: ['Web3 User Flows', 'Wallet UX', 'Transaction Design'],
        resources: [
          { name: 'Web3 Design Principles', url: 'https://web3designprinciples.com', type: 'FREE' },
          { name: 'Blockchain Fundamentals for Designers', url: 'https://ethereum.org/en/developers/', type: 'FREE' }
        ]
      },
      {
        phase: 'Advanced Design',
        duration: '1-1.5 months',
        skills: ['Prototyping', 'Design Systems', 'Responsive Design'],
        resources: [
          { name: 'Design Systems Handbook', url: 'https://www.designbetter.co/design-systems-handbook', type: 'FREE' }
        ]
      },
      {
        phase: 'Portfolio & Practice',
        duration: '1-1.5 months',
        skills: ['Portfolio Building', 'Client Work', 'Collaborative Design'],
        resources: [
          { name: 'Dribbble for Inspiration', url: 'https://dribbble.com', type: 'FREE' }
        ]
      }
    ]
  }
};

// --- Helper Functions ---

const matchRoadmapSkill = (roadmapSkill, userSkills) => {
  if (userSkills[roadmapSkill]) return true;
  if (roadmapSkill.endsWith(' Basics')) {
    const baseSkill = roadmapSkill.replace(' Basics', '');
    if (userSkills[baseSkill]) return true;
  }
  if (roadmapSkill.endsWith(' Advanced')) {
    const baseSkill = roadmapSkill.replace(' Advanced', '');
    if (userSkills[baseSkill]) return true;
  }
  return false;
};

// --- Components ---

const Navigation = ({ theme, setTheme, setShowShareModal, setShowViewModal, viewMode, mobileMenuOpen, setMobileMenuOpen }) => {
  const location = useLocation();
  const darkMode = theme === 'dark';
  const recommendedMode = theme === 'recommended';

  const cycleTheme = (e: React.MouseEvent) => {
    const nextTheme = theme === 'dark' ? 'light' : theme === 'light' ? 'recommended' : 'dark';

    // UI Trick: Circular Clip-Path Transition
    const x = e.clientX;
    const y = e.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    if (!document.startViewTransition) {
      setTheme(nextTheme);
      return;
    }

    const transition = document.startViewTransition(() => {
      setTheme(nextTheme);
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];
      document.documentElement.animate(
        {
          clipPath: [...clipPath],
        },
        {
          duration: 400,
          easing: 'ease-in-out',
          pseudoElement: '::view-transition-new(root)',
        }
      );
    });
  };

  return (
    <nav className={`${recommendedMode ? 'navbar-recommended top-0 rounded-none border-b' : darkMode ? 'navbar-industrial mx-0 md:mx-0 top-0 rounded-none border-b' : 'navbar-light top-4 mx-4 md:mx-8 rounded-2xl'} sticky z-40 transition-all duration-300 focus-visible:outline-none`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className={`flex items-center space-x-3 group focus-visible:ring-2 ${recommendedMode ? 'focus-visible:ring-indigo-600' : 'focus-visible:ring-accent-blue'} focus-visible:outline-none rounded-[4px]`}>
            <div className="flex items-center space-x-3">
              <div className={`${recommendedMode ? 'bg-indigo-600 rounded-lg border-white/20' : darkMode ? 'bg-accent-blue rounded-[4px] border-cyan-300/40' : 'bg-accent-blue rounded-xl border-cyan-300/40'} w-12 h-12 p-1.5 border transition-all duration-300 flex items-center justify-center overflow-hidden`}>
                <img src="https://i.postimg.cc/G25Xszzm/Web3-Skills-LOGO.png" alt="Web3 Skills Logo" className="w-full h-full object-cover rounded-[2px]" />
              </div>
              <div>
                <h1 className={`font-bold text-xl tracking-tight ${recommendedMode ? 'text-slate-900 font-heading' : darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Antigravity <span className={recommendedMode ? 'text-indigo-600' : darkMode ? 'text-white' : 'text-accent-blue'}>Bughunter-CFD</span>
                </h1>
                <p className={`${recommendedMode ? 'text-[10px] font-medium text-slate-500 uppercase tracking-widest' : darkMode ? 'label-industrial text-accent-blue/60' : 'text-[10px] font-mono uppercase tracking-[0.2em] text-gray-600'}`}>System.Core.v2</p>
              </div>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-2">
            {!viewMode && (
              <Link
                to="/"
                className={`transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none ${
                  location.pathname === '/'
                  ? (recommendedMode ? 'btn-recommended-primary' : darkMode ? 'btn-industrial-primary' : 'btn-primary-light')
                    : (recommendedMode ? 'btn-recommended-ghost' : darkMode ? 'btn-glass-dark text-xs font-mono uppercase tracking-wider' : 'btn-glass-light text-xs font-mono uppercase tracking-wider')
                }`}
              >
                Home
              </Link>
            )}
            <Link
              to="/skills"
              className={`transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none ${
                location.pathname === '/skills'
                  ? (recommendedMode ? 'btn-recommended-primary' : darkMode ? 'btn-industrial-primary' : 'btn-primary-light')
                  : (recommendedMode ? 'btn-recommended-ghost' : darkMode ? 'btn-glass-dark text-xs font-mono uppercase tracking-wider' : 'btn-glass-light text-xs font-mono uppercase tracking-wider')
              }`}
            >
              Skills
            </Link>
            <Link
              to="/careers"
              className={`transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none ${
                location.pathname === '/careers' || location.pathname.startsWith('/career/')
                  ? (recommendedMode ? 'btn-recommended-primary' : darkMode ? 'btn-industrial-primary' : 'btn-primary-light')
                  : (recommendedMode ? 'btn-recommended-ghost' : darkMode ? 'btn-glass-dark text-xs font-mono uppercase tracking-wider' : 'btn-glass-light text-xs font-mono uppercase tracking-wider')
              }`}
            >
              {viewMode ? 'Match' : 'Careers'}
            </Link>
            <Link
              to="/jobs"
              className={`transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none ${
                location.pathname === '/jobs'
                  ? (recommendedMode ? 'btn-recommended-primary' : darkMode ? 'btn-industrial-primary' : 'btn-primary-light')
                  : (recommendedMode ? 'btn-recommended-ghost' : darkMode ? 'btn-glass-dark text-xs font-mono uppercase tracking-wider' : 'btn-glass-light text-xs font-mono uppercase tracking-wider')
              }`}
            >
              Jobs
            </Link>
            <Link
              to="/news"
              className={`transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none ${
                location.pathname === '/news'
                  ? (recommendedMode ? 'btn-recommended-primary' : darkMode ? 'btn-industrial-primary' : 'btn-primary-light')
                  : (recommendedMode ? 'btn-recommended-ghost' : darkMode ? 'btn-glass-dark text-xs font-mono uppercase tracking-wider' : 'btn-glass-light text-xs font-mono uppercase tracking-wider')
              }`}
            >
              Intel
            </Link>
            
            {!viewMode && (
              <>
                <button
                  onClick={() => setShowShareModal(true)}
                  className={`transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none ${recommendedMode ? 'btn-recommended-icon' : darkMode ? 'btn-icon-dark' : 'btn-glass-light'}`}
                  title="Share Progress"
                >
                  <Share2 size={20} />
                </button>
                <button
                  onClick={() => setShowViewModal(true)}
                  className={`transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none ${recommendedMode ? 'btn-recommended-icon' : darkMode ? 'btn-icon-dark' : 'btn-glass-light'}`}
                  title="View Shared"
                >
                  <Eye size={20} />
                </button>
              </>
            )}
            
            <div className="flex items-center space-x-1 ml-2">
              <button
                onClick={cycleTheme}
                className={`transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none w-11 h-11 flex items-center justify-center ${
                  theme === 'dark'
                    ? 'btn-icon-dark text-yellow-300'
                    : theme === 'light'
                    ? 'btn-glass-light p-2.5'
                    : 'btn-recommended-icon text-slate-700'
                }`}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : theme === 'light' ? 'recommended' : 'dark'} mode`}
              >
                {theme === 'dark' && <Sun size={22} />}
                {theme === 'light' && (
                  <img src="https://i.postimg.cc/G25Xszzm/Web3-Skills-LOGO.png" alt="Recommended" className="w-full h-full object-contain" />
                )}
                {theme === 'recommended' && <Moon size={22} />}
              </button>
            </div>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none ${recommendedMode ? 'rounded-lg' : darkMode ? 'rounded-[4px]' : 'rounded-lg'}`}
          >
            {mobileMenuOpen ? (
              <XCircle className={recommendedMode ? 'text-slate-900' : darkMode ? 'text-white' : 'text-gray-600'} size={24} />
            ) : (
              <Menu className={recommendedMode ? 'text-slate-900' : darkMode ? 'text-white' : 'text-gray-600'} size={24} />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            {!viewMode && (
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2 text-sm font-medium focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none ${
                  location.pathname === '/'
                    ? (recommendedMode ? 'bg-indigo-50 text-indigo-600 rounded-lg' : darkMode ? 'bg-accent-blue text-black rounded-[4px]' : 'bg-blue-50 text-blue-600 rounded-lg')
                    : (recommendedMode ? 'text-slate-600 rounded-lg' : darkMode ? 'text-slate-400 font-mono uppercase rounded-[4px]' : 'text-gray-600 rounded-lg')
                }`}
              >
                Home
              </Link>
            )}
            <Link
              to="/skills"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2 text-sm font-medium focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none ${
                location.pathname === '/skills'
                  ? (recommendedMode ? 'bg-indigo-50 text-indigo-600 rounded-lg' : darkMode ? 'bg-accent-blue text-black rounded-[4px]' : 'bg-blue-50 text-blue-600 rounded-lg')
                  : (recommendedMode ? 'text-slate-600 rounded-lg' : darkMode ? 'text-slate-400 font-mono uppercase rounded-[4px]' : 'text-gray-600 rounded-lg')
              }`}
            >
              Skills
            </Link>
            <Link
              to="/careers"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2 text-sm font-medium focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none ${
                location.pathname === '/careers'
                  ? (recommendedMode ? 'bg-indigo-50 text-indigo-600 rounded-lg' : darkMode ? 'bg-accent-blue text-black rounded-[4px]' : 'bg-blue-50 text-blue-600 rounded-lg')
                  : (recommendedMode ? 'text-slate-600 rounded-lg' : darkMode ? 'text-slate-400 font-mono uppercase rounded-[4px]' : 'text-gray-600 rounded-lg')
              }`}
            >
              {viewMode ? 'Career Match' : 'Careers'}
            </Link>
            <Link
              to="/jobs"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2 text-sm font-medium focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none ${
                location.pathname === '/jobs'
                  ? (recommendedMode ? 'bg-indigo-50 text-indigo-600 rounded-lg' : darkMode ? 'bg-accent-blue text-black rounded-[4px]' : 'bg-blue-50 text-blue-600 rounded-lg')
                  : (recommendedMode ? 'text-slate-600 rounded-lg' : darkMode ? 'text-slate-400 font-mono uppercase rounded-[4px]' : 'text-gray-600 rounded-lg')
              }`}
            >
              Jobs
            </Link>
            <Link
              to="/news"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2 text-sm font-medium focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none ${
                location.pathname === '/news'
                  ? (recommendedMode ? 'bg-indigo-50 text-indigo-600 rounded-lg' : darkMode ? 'bg-accent-blue text-black rounded-[4px]' : 'bg-blue-50 text-blue-600 rounded-lg')
                  : (recommendedMode ? 'text-slate-600 rounded-lg' : darkMode ? 'text-slate-400 font-mono uppercase rounded-[4px]' : 'text-gray-600 rounded-lg')
              }`}
            >
              Intel Feed
            </Link>
            <div className="flex gap-2 px-4 pt-2">
              <button
                onClick={(e) => { cycleTheme(e); setMobileMenuOpen(false); }}
                className={`flex-1 py-3 rounded-lg flex items-center justify-center ${
                  theme === 'dark'
                    ? (recommendedMode ? 'bg-slate-100 text-orange-500' : 'bg-gray-800 text-yellow-300')
                    : theme === 'light'
                    ? 'bg-gray-100 text-blue-600 p-2'
                    : 'bg-slate-100 text-slate-700'
                }`}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : theme === 'light' ? 'recommended' : 'dark'} mode`}
              >
                {theme === 'dark' && <Sun size={20} />}
                {theme === 'light' && (
                  <img src="https://i.postimg.cc/G25Xszzm/Web3-Skills-LOGO.png" alt="Recommended" className="h-5 w-5 object-contain" />
                )}
                {theme === 'recommended' && <Moon size={20} />}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const HomePage = ({ theme, viewMode, setViewMode, setSharedSkills, checkedSkills, totalSkills, overallProgress, getCareerMatch, getCategoryProgress, exportData, importData }) => {
  const darkMode = theme === 'dark';
  const recommendedMode = theme === 'recommended';

  const bestMatchName = useMemo(() => {
    return Object.keys(careerPaths).reduce((best, name) => {
      const match = getCareerMatch(name);
      const bestMatchData = getCareerMatch(best);
      return match.percentage > bestMatchData.percentage ? name : best;
    }, Object.keys(careerPaths)[0]);
  }, [getCareerMatch]);

  return (
    <div className={recommendedMode ? 'space-y-20' : 'space-y-12'}>
      {viewMode && (
        <div className={`${recommendedMode ? 'card-recommended' : darkMode ? 'surface-industrial border-accent-blue/10' : 'bg-white border border-gray-200 rounded-xl'} border p-6`}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <Eye className={recommendedMode ? 'text-indigo-600' : darkMode ? 'text-accent-blue' : 'text-blue-600'} size={24} />
                <h3 className={`text-xl font-bold ${recommendedMode ? 'text-slate-900 font-heading' : darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Viewing Shared Skills Profile
                </h3>
              </div>
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className={`text-sm ${recommendedMode ? 'text-slate-500' : darkMode ? 'text-white' : 'text-gray-600'}`}>Total Skills</p>
                  <p className={`text-2xl font-bold ${recommendedMode ? 'text-slate-900' : darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {checkedSkills}<span className={`text-base ${recommendedMode ? 'text-slate-400' : darkMode ? 'text-white' : 'text-gray-500'}`}>/{totalSkills}</span>
                  </p>
                </div>
                <div>
                  <p className={`text-sm ${recommendedMode ? 'text-slate-500' : darkMode ? 'text-white' : 'text-gray-600'}`}>Progress</p>
                  <p className={`text-2xl font-bold ${recommendedMode ? 'text-indigo-600' : darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {overallProgress.toFixed(1)}%
                  </p>
                </div>
                <div>
                  <p className={`text-sm ${recommendedMode ? 'text-slate-500' : darkMode ? 'text-white' : 'text-gray-600'}`}>Best Match</p>
                  <p className={`text-base font-bold ${recommendedMode ? 'text-slate-900' : darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {bestMatchName}
                  </p>
                  <p className={`text-sm ${recommendedMode ? 'text-slate-600 font-medium' : darkMode ? 'text-white' : 'text-gray-600'}`}>
                    {getCareerMatch(bestMatchName).percentage.toFixed(0)}% match
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                setViewMode(false);
                setSharedSkills(null);
              }}
              className={`px-4 py-2 font-medium text-sm transition-colors ${
                recommendedMode ? 'btn-recommended-primary' : darkMode ? 'btn-glass-dark' : 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-200'
              }`}
            >
              Exit View Mode
            </button>
          </div>
        </div>
      )}

      {recommendedMode ? (
        <div className="pt-24 pb-12 grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-left space-y-8 stagger-item">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-widest border border-indigo-100">
              <Sparkles size={14} /> Intelligence Platform v2.0
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter font-heading">
              Future of <span className="text-indigo-600">Web3</span> Talent.
            </h1>
            <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-xl">
              The professional standard for Web3 technical skills. Track, optimize, and connect with high-tier ecosystem opportunities.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/skills" className="btn-recommended-primary px-10 py-5 text-lg flex items-center gap-3 shadow-indigo-200 shadow-2xl">
                Get Started <ArrowRight size={20} />
              </Link>
              <Link to="/careers" className="btn-recommended-ghost px-10 py-5 text-lg border-slate-200 bg-white">
                Learn Paths
              </Link>
            </div>
          </div>
          <div className="relative stagger-item" style={{ animationDelay: '0.2s' }}>
             <div className="absolute -inset-4 bg-indigo-500/5 blur-3xl rounded-full"></div>
             <img
               src="https://i.postimg.cc/G25Xszzm/Web3-Skills-LOGO.png"
               alt="Hero"
               className="relative z-10 w-full max-w-md mx-auto transform hover:rotate-2 transition-transform duration-500"
             />
          </div>
        </div>
      ) : (
        <div className={`text-center pt-16 pb-12 relative overflow-hidden ${darkMode ? 'bg-[#070B12]' : 'mesh-gradient'}`}>
          {!recommendedMode && darkMode && <div className="absolute inset-0 grid-bg-industrial opacity-[0.05]"></div>}
          <div className="relative z-10">
            <div className="flex justify-center mb-6">
              <div className={`${darkMode ? 'bg-accent-blue rounded-2xl shadow-[0_0_20px_rgba(0,255,255,0.3)]' : 'bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl'} p-3 border ${darkMode ? 'border-cyan-300/50' : 'border-transparent'} flex items-center justify-center`}>
                <img src="https://i.postimg.cc/G25Xszzm/Web3-Skills-LOGO.png" alt="Web3 Skills Logo" className="w-12 h-12 md:w-14 md:h-14 object-cover rounded-xl" />
              </div>
            </div>
            <h1 className={`text-5xl md:text-7xl font-extrabold mb-6 leading-tight ${darkMode ? 'text-white' : 'gradient-text-purple'}`}>
              {darkMode ? 'SYSTEM.SKILLS.ENGINE' : 'Web3 Skills Learning Platform'}
            </h1>
            <p className={`text-xl md:text-2xl max-w-3xl mx-auto mb-8 ${darkMode ? 'text-slate-400 font-mono text-sm uppercase tracking-tight' : 'text-gray-700'}`}>
              Master Web3 development with curated resources, track your progress, and join the RiWoT community
            </p>
            {!viewMode && (
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  to="/skills"
                  className={`flex items-center gap-2 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none ${
                    darkMode
                      ? 'btn-industrial-primary px-10 py-5 text-lg'
                      : 'bg-purple-600 hover:bg-purple-700 text-white shadow-xl rounded-xl px-8 py-4 font-bold text-lg'
                  }`}
                >
                  <Rocket size={24} />
                  {darkMode ? 'START_TRACKING' : 'Initialize Learning'}
                </Link>
                <Link
                  to="/careers"
                  className={`flex items-center gap-2 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none ${
                    darkMode
                      ? 'btn-glass-dark px-10 py-5 text-lg border-white/10 font-mono uppercase tracking-widest rounded-[4px]'
                      : 'bg-white hover:bg-gray-50 border-2 border-purple-300 text-gray-900 shadow-xl rounded-xl px-8 py-4 font-bold text-lg'
                  }`}
                >
                  <Target size={24} />
                  {darkMode ? 'VIEW_ROADMAPS' : 'Explore Careers'}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {!viewMode && (
          <div className={`${recommendedMode ? 'card-recommended' : darkMode ? 'surface-industrial corner-animate text-white' : 'card-white-light text-gray-900 rounded-2xl'} p-8 group transition-all duration-300 stagger-item overflow-hidden relative`}>
            {darkMode && !recommendedMode && <div className="corner-bottom" />}
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 flex items-center justify-center ${recommendedMode ? 'bg-indigo-50 rounded-lg' : darkMode ? 'bg-accent-blue rounded-[4px]' : 'bg-black rounded-xl'}`}>
                  <TrendingUp className={recommendedMode ? 'text-indigo-600' : darkMode ? 'text-black' : 'text-white'} size={24} />
                </div>
                <h3 className={`text-lg font-bold ${recommendedMode ? 'text-slate-900 font-heading' : darkMode ? 'text-white' : 'text-gray-900'}`}>Your Progress</h3>
              </div>
              <div className="mb-4">
                <div className={`text-5xl font-extrabold mb-2 ${recommendedMode ? 'text-slate-900' : darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {checkedSkills}<span className={`text-2xl font-mono ${recommendedMode ? 'text-slate-400' : darkMode ? 'text-slate-400' : 'text-gray-500'}`}>/{totalSkills}</span>
                </div>
              </div>
              <div className={`${recommendedMode ? 'h-2 bg-slate-100 rounded-full' : darkMode ? 'progress-bar-dark' : 'progress-bar-light'} mb-3 overflow-hidden`}>
                <div className={`h-full transition-all duration-1000 ${recommendedMode ? 'bg-indigo-600 rounded-full' : 'progress-fill'}`} style={{ width: `${overallProgress}%` }} />
              </div>
              <p className={`${recommendedMode ? 'text-xs font-medium text-slate-500' : darkMode ? 'label-industrial text-accent-blue/60' : 'text-xs font-mono uppercase tracking-wider text-gray-600'}`}>{overallProgress.toFixed(1)}% Platform Mastery</p>
            </div>
          </div>
        )}

        <div className={`${recommendedMode ? 'card-recommended' : darkMode ? 'surface-industrial corner-animate text-white' : 'gradient-card-purple text-white card-lift'} p-8 group transition-all duration-300 stagger-item overflow-hidden relative`}>
          {darkMode && !recommendedMode && <div className="corner-bottom" />}
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 flex items-center justify-center ${recommendedMode ? 'bg-indigo-50 rounded-lg' : darkMode ? 'bg-accent-blue rounded-[4px]' : 'bg-white/20 backdrop-blur-sm rounded-xl'}`}>
                <Award className={recommendedMode ? 'text-indigo-600' : darkMode ? 'text-black' : 'text-white'} size={24} />
              </div>
              <h3 className={`text-lg font-bold ${recommendedMode ? 'text-slate-900 font-heading' : 'text-white'}`}>Specializations</h3>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex flex-wrap gap-2">
                <span className={`badge ${recommendedMode ? 'bg-indigo-100 text-indigo-700' : darkMode ? 'badge-blue rounded' : 'badge-blue'}`}>Essentials</span>
                <span className={`badge ${recommendedMode ? 'bg-indigo-100 text-indigo-700' : darkMode ? 'badge-blue rounded' : 'badge-blue'}`}>Security</span>
                <span className={`badge ${recommendedMode ? 'bg-indigo-100 text-indigo-700' : darkMode ? 'badge-blue rounded' : 'badge-blue'}`}>Architecture</span>
              </div>
            </div>
            <p className={`${recommendedMode ? 'text-xs font-medium text-slate-500' : darkMode ? 'label-industrial text-accent-blue/60' : 'text-xs font-mono uppercase tracking-wider opacity-80'}`}>Multiple Ecosystem Paths</p>
          </div>
        </div>

        {!viewMode && (
          <div className={`${recommendedMode ? 'card-recommended' : darkMode ? 'surface-industrial corner-animate' : 'glass-card-light rounded-2xl'} p-8 group transition-all duration-300 stagger-item overflow-hidden relative`}>
            {darkMode && !recommendedMode && <div className="corner-bottom" />}
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 flex items-center justify-center ${recommendedMode ? 'bg-indigo-50 rounded-lg' : darkMode ? 'bg-accent-blue rounded-[4px]' : 'w-12 h-12 rounded-xl icon-gradient-blue'}`}>
                  <Target className={recommendedMode ? 'text-indigo-600' : 'text-black'} size={24} />
                </div>
                <h3 className={`text-lg font-bold ${recommendedMode ? 'text-slate-900 font-heading' : darkMode ? 'text-white' : 'text-gray-900'}`}>Career Metrics</h3>
              </div>
              <div className={`text-5xl font-extrabold mb-4 ${recommendedMode ? 'text-slate-900' : darkMode ? 'text-white' : 'text-gray-900'}`}>{Object.keys(careerPaths).length}</div>
              <p className={`${recommendedMode ? 'text-xs font-medium text-slate-500' : darkMode ? 'label-industrial text-accent-blue/60' : 'text-xs font-mono uppercase tracking-wider text-gray-600'}`}>Live Technical Roles</p>
            </div>
          </div>
        )}
      </div>

      {!viewMode && (
        <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link
            to="/skills"
          className={`${recommendedMode ? 'card-recommended' : darkMode ? 'surface-industrial corner-animate border-accent-blue/10 rounded-[6px]' : 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:from-blue-100 hover:to-blue-200 rounded-2xl'} p-6 border transition-all text-left group focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none`}
          >
            {darkMode && !recommendedMode && <div className="corner-bottom" />}
          <BookOpen className={`${recommendedMode ? 'text-indigo-600' : darkMode ? 'text-accent-blue' : 'text-blue-600'} mb-4`} size={32} />
          <h3 className={`text-xl font-bold mb-2 ${recommendedMode ? 'text-slate-900 font-heading' : darkMode ? 'text-white' : 'text-gray-900'}`}>Track Skills</h3>
          <p className={`text-sm mb-4 line-clamp-2 ${recommendedMode ? 'text-slate-600' : darkMode ? 'text-slate-400 font-mono text-xs' : 'text-gray-600'}`}>
              Browse and track 300+ Web3 skills across 15 categories
            </p>
          <span className={`text-xs font-bold flex items-center gap-2 ${recommendedMode ? 'text-indigo-600' : darkMode ? 'text-accent-blue font-mono' : 'text-blue-600'}`}>
            {recommendedMode ? 'Start Tracking' : darkMode ? 'ACCESS_TREE' : 'Start Tracking'} <ArrowRight size={14} />
            </span>
          </Link>

          <Link
            to="/careers"
          className={`${recommendedMode ? 'card-recommended' : darkMode ? 'surface-industrial corner-animate border-accent-blue/10 rounded-[6px]' : 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:from-purple-100 hover:to-purple-200 rounded-2xl'} p-6 border transition-all text-left group focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none`}
          >
            {darkMode && !recommendedMode && <div className="corner-bottom" />}
          <Target className={`${recommendedMode ? 'text-indigo-600' : darkMode ? 'text-accent-blue' : 'text-purple-600'} mb-4`} size={32} />
          <h3 className={`text-xl font-bold mb-2 ${recommendedMode ? 'text-slate-900 font-heading' : darkMode ? 'text-white' : 'text-gray-900'}`}>Career Paths</h3>
          <p className={`text-sm mb-4 line-clamp-2 ${recommendedMode ? 'text-slate-600' : darkMode ? 'text-slate-400 font-mono text-xs' : 'text-gray-600'}`}>
            Discover roadmaps and check your professional alignment
            </p>
          <span className={`text-xs font-bold flex items-center gap-2 ${recommendedMode ? 'text-indigo-600' : darkMode ? 'text-accent-blue font-mono' : 'text-purple-600'}`}>
            {recommendedMode ? 'View Roadmaps' : darkMode ? 'VIEW_ROADMAPS' : 'View Careers'} <ArrowRight size={14} />
            </span>
          </Link>

        <Link
          to="/jobs"
          className={`${recommendedMode ? 'card-recommended' : darkMode ? 'surface-industrial corner-animate border-accent-blue/10 rounded-[6px]' : 'bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:from-green-100 hover:to-green-200 rounded-2xl'} p-6 border transition-all text-left group focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none`}
        >
          {darkMode && !recommendedMode && <div className="corner-bottom" />}
          <Briefcase className={`${recommendedMode ? 'text-indigo-600' : darkMode ? 'text-accent-blue' : 'text-green-600'} mb-4`} size={32} />
          <h3 className={`text-xl font-bold mb-2 ${recommendedMode ? 'text-slate-900 font-heading' : darkMode ? 'text-white' : 'text-gray-900'}`}>Job Board</h3>
          <p className={`text-sm mb-4 line-clamp-2 ${recommendedMode ? 'text-slate-600' : darkMode ? 'text-slate-400 font-mono text-xs' : 'text-gray-600'}`}>
            Find active opportunities matching your current skill set
          </p>
          <span className={`text-xs font-bold flex items-center gap-2 ${recommendedMode ? 'text-indigo-600' : darkMode ? 'text-accent-blue font-mono' : 'text-green-600'}`}>
            {recommendedMode ? 'Explore Jobs' : darkMode ? 'FIND_WORK' : 'Explore Jobs'} <ArrowRight size={14} />
          </span>
        </Link>

        <Link
          to="/news"
          className={`${recommendedMode ? 'card-recommended' : darkMode ? 'surface-industrial corner-animate border-accent-blue/10 rounded-[6px]' : 'bg-gradient-to-br from-cyan-50 to-cyan-100 border-cyan-200 hover:from-cyan-100 hover:to-cyan-200 rounded-2xl'} p-6 border transition-all text-left group focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none`}
        >
          {darkMode && !recommendedMode && <div className="corner-bottom" />}
          <Newspaper className={`${recommendedMode ? 'text-indigo-600' : darkMode ? 'text-accent-blue' : 'text-cyan-600'} mb-4`} size={32} />
          <h3 className={`text-xl font-bold mb-2 ${recommendedMode ? 'text-slate-900 font-heading' : darkMode ? 'text-white' : 'text-gray-900'}`}>Intel Feed</h3>
          <p className={`text-sm mb-4 line-clamp-2 ${recommendedMode ? 'text-slate-600' : darkMode ? 'text-slate-400 font-mono text-xs' : 'text-gray-600'}`}>
            Stay updated with exploits, infra, and bounty news
          </p>
          <span className={`text-xs font-bold flex items-center gap-2 ${recommendedMode ? 'text-indigo-600' : darkMode ? 'text-accent-blue font-mono' : 'text-cyan-600'}`}>
            {recommendedMode ? 'View Intel' : darkMode ? 'GET_INTEL' : 'View Feed'} <ArrowRight size={14} />
          </span>
        </Link>
      </div>

      {/* Latest Intel Preview Section */}
      <div className={`${recommendedMode ? 'card-recommended' : darkMode ? 'surface-industrial border-white/5' : 'bg-white border-gray-200 rounded-2xl'} p-8 border`}>
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <ShieldAlert className={recommendedMode ? 'text-indigo-600' : darkMode ? 'text-accent-blue' : 'text-red-600'} size={24} />
            <h2 className={`text-2xl font-bold ${recommendedMode ? 'text-slate-900 font-heading' : darkMode ? 'text-white font-mono uppercase text-sm tracking-widest' : 'text-gray-900'}`}>
              {recommendedMode ? 'Market Intelligence' : 'Latest System Intel'}
            </h2>
          </div>
          <Link to="/news" className={`text-xs font-bold uppercase tracking-widest ${recommendedMode ? 'text-indigo-600 hover:text-indigo-700' : darkMode ? 'text-accent-blue hover:underline' : 'text-blue-600 hover:underline'}`}>View All</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {intelData.slice(0, 3).map((item, i) => (
            <div key={i} className={`p-4 ${recommendedMode ? 'bg-slate-50 border border-slate-100 rounded-lg' : darkMode ? 'bg-white/[0.02] border border-white/5 rounded-[4px]' : 'bg-gray-50 border border-gray-100 rounded-xl'}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-[10px] font-mono px-2 py-0.5 border rounded-[2px] ${
                  item.type === 'hack' ? (recommendedMode ? 'bg-red-50 text-red-600 border-red-100' : darkMode ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-red-50 text-red-600 border-red-200') :
                  item.type === 'news' ? (recommendedMode ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : darkMode ? 'bg-accent-blue/10 text-accent-blue border-accent-blue/20' : 'bg-blue-50 text-blue-600 border-blue-200') :
                  (recommendedMode ? 'bg-green-50 text-green-700 border-green-100' : darkMode ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-green-50 text-green-600 border-green-200')
                }`}>
                  {item.type.toUpperCase()}
                </span>
                <span className={`text-[10px] font-mono ${recommendedMode ? 'text-slate-500' : darkMode ? 'text-slate-500' : 'text-gray-500'}`}>{item.date}</span>
              </div>
              <h4 className={`font-bold text-sm mb-2 line-clamp-1 ${recommendedMode ? 'text-slate-900 font-heading' : darkMode ? 'text-white' : 'text-gray-900'}`}>{item.title}</h4>
              <p className={`text-xs leading-relaxed line-clamp-2 ${recommendedMode ? 'text-slate-600' : darkMode ? 'text-slate-400 font-mono text-[10px]' : 'text-gray-600'}`}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
        </>
      )}

      {/* RiWoT Community Section */}
      <div className={`${recommendedMode ? 'card-recommended' : darkMode ? 'surface-industrial border-accent-blue/10' : 'bg-gradient-to-br from-green-50 to-blue-50 border-green-200 rounded-2xl'} p-8 md:p-12 border relative overflow-hidden`}>
        {!recommendedMode && darkMode && <div className="absolute inset-0 grid-bg-industrial opacity-[0.03]"></div>}
        <div className="text-center mb-8 relative z-10">
          <div className="flex justify-center mb-4">
            <Users className={recommendedMode ? 'text-indigo-600' : darkMode ? 'text-accent-blue' : 'text-green-600'} size={48} />
          </div>
          <h2 className={`text-3xl font-bold mb-3 ${recommendedMode ? 'text-slate-900 font-heading' : darkMode ? 'text-white' : 'text-gray-900'}`}>
            {recommendedMode ? 'Community Ecosystem' : darkMode ? 'RIWOT_COMMUNITY.CONNECT' : 'Join RiWoT Community'}
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${recommendedMode ? 'text-slate-600 font-medium' : darkMode ? 'text-slate-400 font-mono text-sm' : 'text-gray-600'}`}>
            Connect with Web3 developers, get mentorship, and accelerate your learning journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8 relative z-10">
          <div className={`${recommendedMode ? 'bg-slate-50 p-6 rounded-xl border border-slate-100' : darkMode ? 'bg-white/[0.02] p-6 rounded border border-white/5' : ''}`}>
            <h3 className={`font-bold text-lg mb-4 ${recommendedMode ? 'text-slate-900 font-heading' : darkMode ? 'text-white font-mono uppercase text-sm' : 'text-gray-900'}`}>Target Knowledge:</h3>
            <ul className="space-y-3">
              {[
                'Smart contract development & security',
                'DeFi protocols & blockchain architecture',
                'Frontend dApp development',
                'Web3 infrastructure & backend',
                'Career guidance from professionals',
                'Latest blockchain trends'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Code className={recommendedMode ? 'text-indigo-600 flex-shrink-0' : darkMode ? 'text-accent-blue flex-shrink-0' : 'text-blue-600 flex-shrink-0'} size={18} />
                  <span className={recommendedMode ? 'text-slate-700 text-sm font-medium' : darkMode ? 'text-slate-300 text-sm' : 'text-gray-700'}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={`${recommendedMode ? 'bg-slate-50 p-6 rounded-xl border border-slate-100' : darkMode ? 'bg-white/[0.02] p-6 rounded border border-white/5' : ''}`}>
            <h3 className={`font-bold text-lg mb-4 ${recommendedMode ? 'text-slate-900 font-heading' : darkMode ? 'text-white font-mono uppercase text-sm' : 'text-gray-900'}`}>Access Benefits:</h3>
            <ul className="space-y-3">
              {[
                'Active developer community',
                'Weekly learning sessions',
                'Project collaboration',
                'Code reviews & mentorship',
                'Job opportunities & resources',
                'Open-source contributions'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Star className={recommendedMode ? 'text-indigo-600 flex-shrink-0' : darkMode ? 'text-accent-blue flex-shrink-0' : 'text-blue-600 flex-shrink-0'} size={18} />
                  <span className={recommendedMode ? 'text-slate-700 text-sm font-medium' : darkMode ? 'text-slate-300 text-sm' : 'text-gray-700'}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 justify-center relative z-10">
          <a
            href="https://discord.gg/qMd7jwV7UG"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 transition-all ${
              recommendedMode ? 'btn-recommended-primary px-10 py-4' : darkMode ? 'btn-industrial-primary px-8 py-3' : 'bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium'
            }`}
          >
            <MessageCircle size={20} />
            {recommendedMode ? 'Connect Discord' : darkMode ? 'CONNECT_DISCORD' : 'Join Discord'}
            <ArrowRight size={18} />
          </a>
          <a
            href="https://github.com/RiWoT"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 transition-all ${
              recommendedMode ? 'btn-recommended-ghost bg-white border border-slate-200 px-10 py-4' : darkMode ? 'btn-glass-dark px-8 py-3 border-white/10 text-xs font-mono uppercase tracking-widest' : 'bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg font-medium'
            }`}
          >
            <Github size={20} />
            {recommendedMode ? 'View Repositories' : darkMode ? 'VIEW_REPOS' : 'View GitHub'}
            <ArrowRight size={18} />
          </a>
        </div>
      </div>

      {/* Data Management Section */}
      {!viewMode && (
        <div className={`${recommendedMode ? 'card-recommended' : darkMode ? 'surface-industrial border-accent-blue/10' : 'bg-white border-gray-200 rounded-xl'} p-6 border`}>
          <div className="flex flex-wrap justify-between items-center gap-4">
            <h3 className={`font-semibold ${recommendedMode ? 'text-slate-900 font-heading' : darkMode ? 'text-white font-mono uppercase text-sm' : 'text-gray-900'}`}>Manage Progress</h3>
            <div className="flex gap-3">
              <button
                onClick={exportData}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  recommendedMode ? 'btn-recommended-ghost bg-slate-50 border-slate-100 text-slate-700' : darkMode ? 'btn-glass-dark text-xs font-mono uppercase' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Download size={16} />
                Export
              </button>
              <label className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                recommendedMode ? 'btn-recommended-ghost bg-slate-50 border-slate-100 text-slate-700' : darkMode ? 'btn-glass-dark text-xs font-mono uppercase' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}>
                <Upload size={16} />
                Import
                <input type="file" accept=".json" onChange={importData} className="hidden" />
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SkillsView = ({ theme, viewMode, searchQuery, setSearchQuery, filterComplete, setFilterComplete, getCategoryProgress, displaySkills, toggleSkill, expandedCategories, setExpandedCategories }) => {
  const darkMode = theme === 'dark';
  const recommendedMode = theme === 'recommended';

  const filteredSkills = (categorySkills) => {
    return categorySkills.filter(skill => {
      const matchesSearch = skill.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter =
        filterComplete === 'all' ||
        (filterComplete === 'complete' && displaySkills[skill]) ||
        (filterComplete === 'incomplete' && !displaySkills[skill]);
      return matchesSearch && matchesFilter;
    });
  };

  return (
    <div className="space-y-8">
      <div className={recommendedMode ? 'mb-12 pt-8' : 'mb-8'}>
        <h1 className={`text-5xl md:text-7xl font-extrabold mb-4 ${recommendedMode ? 'text-slate-900 font-heading tracking-tighter' : darkMode ? 'text-white' : 'text-gray-900 text-shadow'}`}>
          {recommendedMode ? 'Skills Ecosystem.' : darkMode ? 'MODULE_DATABASE' : 'All Skills'}
        </h1>
        <p className={`text-xl ${recommendedMode ? 'text-slate-500 font-medium max-w-2xl' : darkMode ? 'text-slate-400 font-mono text-sm uppercase' : 'text-gray-700'}`}>
          {recommendedMode ? 'A comprehensive registry of technical competencies required for the decentralized future.' : 'Track your progress across Web3 skills'}
        </p>
      </div>

      {!viewMode && (
        <div className={`${recommendedMode ? 'card-recommended' : darkMode ? 'surface-industrial' : 'glass-card-light rounded-2xl'} p-6`}>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1">
              <div className="relative">
                <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${recommendedMode ? 'text-indigo-600' : darkMode ? 'text-accent-blue' : 'text-gray-500'}`} size={20} />
                <input
                  type="text"
                  placeholder={recommendedMode ? 'Search skills...' : darkMode ? 'SEARCH_SYSTEM_REGISTRY...' : 'Search skills...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`${recommendedMode ? 'bg-slate-50 border border-slate-200 rounded-lg text-slate-900' : darkMode ? 'input-glass-dark font-mono rounded-[4px]' : 'input-glass-light rounded-xl'} w-full pl-12 pr-4 py-3 focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none`}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFilterComplete('all')}
                className={`px-5 py-3 text-sm font-semibold transition-all focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none ${
                  filterComplete === 'all'
                    ? (recommendedMode ? 'btn-recommended-primary' : darkMode ? 'btn-industrial-primary' : 'btn-primary-light rounded-xl')
                    : (recommendedMode ? 'btn-recommended-ghost border-slate-200' : darkMode ? 'btn-glass-dark text-xs font-mono uppercase rounded-[4px]' : 'btn-glass-light rounded-xl')
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterComplete('complete')}
                className={`px-5 py-3 text-sm font-semibold transition-all focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none ${
                  filterComplete === 'complete'
                    ? (recommendedMode ? 'bg-green-600 text-white rounded-lg shadow-sm' : darkMode ? 'bg-green-500 text-black font-mono uppercase rounded-[4px]' : 'bg-green-500 text-black rounded-xl')
                    : (recommendedMode ? 'btn-recommended-ghost border-slate-200' : darkMode ? 'btn-glass-dark text-xs font-mono uppercase rounded-[4px]' : 'btn-glass-light rounded-xl')
                }`}
              >
                Complete
              </button>
              <button
                onClick={() => setFilterComplete('incomplete')}
                className={`px-5 py-3 text-sm font-semibold transition-all focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none ${
                  filterComplete === 'incomplete'
                    ? (recommendedMode ? 'bg-red-600 text-white rounded-lg shadow-sm' : darkMode ? 'bg-red-500 text-white font-mono uppercase rounded-[4px]' : 'bg-red-500 text-white rounded-xl')
                    : (recommendedMode ? 'btn-recommended-ghost border-slate-200' : darkMode ? 'btn-glass-dark text-xs font-mono uppercase rounded-[4px]' : 'btn-glass-light rounded-xl')
                }`}
              >
                Incomplete
              </button>
            </div>
          </div>
        </div>
      )}

      {Object.entries(skillCategories).map(([categoryName, categorySkills]) => {
        const progress = getCategoryProgress(categoryName);
        const filtered = filteredSkills(categorySkills);
        if (filtered.length === 0) return null;

        return (
          <div key={categoryName} className={`${recommendedMode ? 'bg-white rounded-3xl border border-slate-100 shadow-sm' : darkMode ? 'surface-industrial corner-animate border-white/5 rounded-[6px]' : 'glass-card-light rounded-2xl'} p-8 overflow-hidden transition-all duration-500`}>
            {darkMode && !recommendedMode && <div className="corner-bottom" />}
            <div
              className="flex flex-wrap justify-between items-center mb-6 gap-3 cursor-pointer group"
              onClick={() => setExpandedCategories(prev => ({ ...prev, [categoryName]: !prev[categoryName] }))}
            >
              <div className="flex items-center gap-4">
                <div className={`w-2 h-8 rounded-full transition-all duration-300 ${recommendedMode ? (progress.percentage === 100 ? 'bg-green-500' : 'bg-indigo-600') : 'hidden'}`} />
                <h2 className={`text-3xl font-bold transition-colors ${recommendedMode ? 'text-slate-900 font-heading group-hover:text-indigo-600' : darkMode ? 'text-white group-hover:text-accent-blue' : 'text-gray-900 group-hover:text-purple-600'}`}>
                  {categoryName}
                </h2>
                {expandedCategories[categoryName] ? (
                  <ChevronUp className={recommendedMode ? 'text-indigo-600' : darkMode ? 'text-accent-blue' : 'text-gray-600'} size={24} />
                ) : (
                  <ChevronDown className={recommendedMode ? 'text-indigo-600' : darkMode ? 'text-accent-blue' : 'text-gray-600'} size={24} />
                )}
              </div>
              <div className="flex items-center gap-4">
                <span className={`text-sm font-mono ${recommendedMode ? 'text-slate-500 font-bold' : darkMode ? 'text-slate-400' : 'text-gray-700'}`}>
                  {progress.checked}/{progress.total}
                </span>
                <div className={`w-32 ${recommendedMode ? 'h-2 bg-slate-100 rounded-full' : darkMode ? 'progress-bar-dark' : 'progress-bar-light'} overflow-hidden`}>
                  <div
                    className={`h-full transition-all duration-1000 ${recommendedMode ? 'bg-indigo-600 rounded-full' : 'progress-fill'}`}
                    style={{ width: `${progress.percentage}%` }}
                  />
                </div>
              </div>
            </div>

            {expandedCategories[categoryName] && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {filtered.map(skill => (
                  <label
                    key={skill}
                    className={`flex items-center gap-3 p-3 ${
                      viewMode ? '' : 'cursor-pointer'
                    } transition-all duration-300 group ${
                      displaySkills[skill]
                        ? (recommendedMode ? 'bg-indigo-50 border border-indigo-100 rounded-lg' : darkMode ? 'bg-accent-blue/10 border border-accent-blue/30 rounded-[4px]' : 'bg-green-50 rounded-xl')
                        : (recommendedMode ? 'hover:bg-slate-50 border border-transparent rounded-lg' : darkMode ? 'hover:bg-white/5 border border-transparent rounded-[4px]' : 'hover:bg-purple-100/50 rounded-xl')
                    }`}
                  >
                    {!viewMode && (
                      <div className="relative flex items-center justify-center">
                        <input
                          type="checkbox"
                          checked={displaySkills[skill] || false}
                          onChange={() => toggleSkill(skill)}
                          className={`peer appearance-none w-5 h-5 transition-all cursor-pointer ${recommendedMode ? 'border border-slate-300 rounded checked:bg-indigo-600' : darkMode ? 'border border-accent-blue/30 rounded-sm checked:bg-accent-blue' : 'border-2 border-white/20 rounded-md checked:bg-accent-blue'}`}
                        />
                        {displaySkills[skill] && (
                          <Check className={`absolute w-3.5 h-3.5 transition-opacity pointer-events-none ${recommendedMode ? 'text-white' : 'text-black'}`} strokeWidth={4} />
                        )}
                      </div>
                    )}
                    {viewMode && (
                      displaySkills[skill] ? (
                        <CheckCircle className={recommendedMode ? 'text-indigo-600' : 'text-accent-blue flex-shrink-0'} size={20} />
                      ) : (
                        <Circle className={recommendedMode ? 'text-slate-200' : darkMode ? 'text-white/10' : 'text-gray-400'} size={20} />
                      )
                    )}
                    <span
                      className={`transition-all duration-300 font-medium ${
                        displaySkills[skill]
                          ? (recommendedMode ? 'text-slate-900' : darkMode ? 'text-white' : 'text-gray-400 line-through')
                          : (recommendedMode ? 'text-slate-500 group-hover:text-slate-900' : darkMode ? 'text-slate-400 group-hover:text-white' : 'text-gray-700 group-hover:text-gray-900')
                      } ${recommendedMode ? 'text-sm' : darkMode ? 'text-sm font-mono uppercase tracking-tight' : ''}`}
                    >
                      {skill}
                    </span>
                    {displaySkills[skill] && !recommendedMode && darkMode && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-[1px] bg-accent-blue shadow-[0_0_8px_rgba(0,255,255,0.8)]" />
                    )}
                  </label>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const JobsView = ({ theme, displaySkills }) => {
  const darkMode = theme === 'dark';
  const recommendedMode = theme === 'recommended';

  const getJobAlignment = (requirements: string[]) => {
    const matched = requirements.filter(req => displaySkills[req]);
    return (matched.length / requirements.length) * 100;
  };

  const getMissingSkills = (requirements: string[]) => {
    return requirements.filter(req => !displaySkills[req]);
  };

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className={`text-5xl font-extrabold mb-4 ${recommendedMode ? 'text-slate-900 font-heading' : darkMode ? 'text-white' : 'text-gray-900 text-shadow'}`}>
          {recommendedMode ? 'Available Opportunities' : darkMode ? 'JOB_BOARD.INFRA' : 'Active Web3 Jobs'}
        </h1>
        <p className={`text-xl ${recommendedMode ? 'text-slate-600 font-medium' : darkMode ? 'text-slate-400 font-mono text-sm uppercase' : 'text-gray-700'}`}>
          Identify opportunities and check your alignment
        </p>
      </div>

      <div className={`${recommendedMode ? 'bg-indigo-50 border-indigo-100 rounded-xl' : darkMode ? 'surface-industrial' : 'bg-blue-50 border-blue-200 rounded-2xl'} p-6 border`}>
        <div className="flex items-start gap-4">
          <ShieldAlert className={recommendedMode ? 'text-indigo-600' : darkMode ? 'text-accent-blue' : 'text-blue-600'} size={24} />
          <div>
            <h3 className={`font-bold mb-2 ${recommendedMode ? 'text-slate-900 font-heading' : darkMode ? 'text-white font-mono uppercase text-sm' : 'text-gray-900'}`}>Educational Policy Notice</h3>
            <p className={`text-sm ${recommendedMode ? 'text-slate-600' : darkMode ? 'text-slate-400 font-mono text-xs' : 'text-gray-700'}`}>
              These listings are displayed for educational and skill alignment purposes only. Salary ranges are estimates and roles represent current market requirements. We do not provide direct job placement or guarantees.
            </p>
          </div>
        </div>
      </div>

      <div className={`grid grid-cols-1 ${recommendedMode ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-6`}>
        {jobsData.map(job => {
          const alignment = getJobAlignment(job.requirements);
          const missingSkills = getMissingSkills(job.requirements);

          return (
            <div
              key={job.id}
              className={`${recommendedMode ? 'bg-white rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl hover:border-indigo-200' : darkMode ? 'surface-industrial corner-animate border-white/5 rounded-[6px]' : 'glass-card-light rounded-2xl'} p-6 transition-all duration-300 relative overflow-hidden flex flex-col`}
            >
              {darkMode && <div className="corner-bottom" />}
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <div className="space-y-1">
                    <h3 className={`${recommendedMode ? 'text-xl font-heading font-bold text-slate-900' : 'text-2xl font-extrabold'} ${darkMode ? 'text-white' : 'text-gray-900'}`}>{job.title}</h3>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-2 py-0.5 text-[9px] font-mono border ${
                        recommendedMode ? 'bg-indigo-50 text-indigo-600 border-indigo-100 rounded' : darkMode ? 'bg-accent-blue/10 text-accent-blue border-accent-blue/30 rounded-[2px]' : 'bg-blue-100 text-blue-700 border-blue-200 rounded-full'
                      }`}>
                        {job.isSystemExample ? 'SYSTEM EXAMPLE' : 'AVAILABLE ROLE'}
                      </span>
                      <span className={`text-[10px] font-mono font-bold ${recommendedMode ? 'text-indigo-600' : darkMode ? 'text-accent-blue' : 'text-blue-600'}`}>{alignment.toFixed(0)}% MATCH</span>
                    </div>
                  </div>
                  <a
                    href={job.applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-1.5 text-[10px] font-mono uppercase tracking-wider px-3 py-1.5 border transition-all ${
                      recommendedMode ? 'bg-indigo-600 text-white border-transparent hover:bg-indigo-700 rounded-md' : darkMode ? 'bg-accent-blue/10 border-accent-blue/30 text-accent-blue hover:bg-accent-blue/20 rounded-[2px]' : 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 rounded-md'
                    }`}
                    title="Visit Protocol Page"
                  >
                    LINK <ExternalLink size={12} />
                  </a>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div>
                    <p className={`text-[9px] font-mono uppercase tracking-widest mb-0.5 ${recommendedMode ? 'text-slate-400' : darkMode ? 'text-slate-500' : 'text-gray-500'}`}>Company</p>
                    <p className={`text-xs font-bold ${recommendedMode ? 'text-slate-700' : darkMode ? 'text-white' : 'text-gray-900'}`}>{job.company}</p>
                  </div>
                  <div>
                    <p className={`text-[9px] font-mono uppercase tracking-widest mb-0.5 ${recommendedMode ? 'text-slate-400' : darkMode ? 'text-slate-500' : 'text-gray-500'}`}>Stack</p>
                    <p className={`text-xs font-bold ${recommendedMode ? 'text-slate-700' : darkMode ? 'text-white' : 'text-gray-900'}`}>{job.type}</p>
                  </div>
                  <div>
                    <p className={`text-[9px] font-mono uppercase tracking-widest mb-0.5 ${recommendedMode ? 'text-slate-400' : darkMode ? 'text-slate-500' : 'text-gray-500'}`}>Salary</p>
                    <p className={`text-xs font-bold ${recommendedMode ? 'text-indigo-600' : darkMode ? 'text-accent-blue' : 'text-green-600'}`}>{job.salaryRange}</p>
                  </div>
                </div>

                <div className="flex-1">
                  <p className={`text-[9px] font-mono uppercase tracking-widest mb-2 ${recommendedMode ? 'text-slate-400' : darkMode ? 'text-slate-500' : 'text-gray-500'}`}>Required Stack</p>
                  <div className="flex flex-wrap gap-1.5">
                    {job.requirements.map(req => (
                      <div
                        key={req}
                        className={`flex items-center gap-1.5 px-2 py-1 border ${
                          displaySkills[req]
                            ? (recommendedMode ? 'bg-green-50 text-green-700 border-green-100 rounded' : darkMode ? 'bg-accent-blue/10 text-accent-blue border-accent-blue/40 rounded-[2px]' : 'bg-green-50 text-green-700 border-green-200 rounded')
                            : (recommendedMode ? 'bg-slate-50 text-slate-400 border-slate-100 rounded' : darkMode ? 'bg-white/[0.02] text-slate-500 border-white/10 rounded-[2px]' : 'bg-gray-100 text-gray-500 border-gray-200 rounded')
                        }`}
                      >
                        {displaySkills[req] ? <CheckCircle size={10} className={recommendedMode ? 'text-green-600' : 'text-accent-blue'} /> : <Circle size={10} className="opacity-30" />}
                        <span className="text-[10px] font-mono">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {missingSkills.length > 0 && (
                  <div className={`mt-4 p-3 ${recommendedMode ? 'bg-indigo-50 border border-indigo-100 rounded-lg' : darkMode ? 'bg-white/[0.02] border border-white/5 rounded-[4px]' : 'bg-orange-50 border border-orange-100 rounded-xl'}`}>
                    <p className={`text-[9px] font-mono uppercase tracking-widest mb-1 ${recommendedMode ? 'text-indigo-700' : darkMode ? 'text-accent-blue' : 'text-orange-700'}`}>Recommended Learning</p>
                    <p className={`text-[10px] leading-relaxed ${recommendedMode ? 'text-indigo-600' : darkMode ? 'text-slate-400 font-mono' : 'text-gray-600'}`}>
                      Missing: <span className="font-bold">{missingSkills.slice(0, 3).join(', ')}{missingSkills.length > 3 && ` +${missingSkills.length - 3} more`}</span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const NewsView = ({ theme }) => {
  const darkMode = theme === 'dark';
  const recommendedMode = theme === 'recommended';

  const getCategoryColor = (type: string) => {
    switch (type) {
      case 'hack': return recommendedMode ? 'text-red-600' : darkMode ? 'text-red-500' : 'text-red-600';
      case 'news': return recommendedMode ? 'text-indigo-600' : darkMode ? 'text-accent-blue' : 'text-blue-600';
      case 'job': return recommendedMode ? 'text-green-600' : darkMode ? 'text-green-500' : 'text-green-600';
      default: return recommendedMode ? 'text-slate-900' : darkMode ? 'text-white' : 'text-gray-900';
    }
  };

  const getCategoryBg = (type: string) => {
    switch (type) {
      case 'hack': return recommendedMode ? 'bg-red-50 border-red-100' : darkMode ? 'bg-red-500/10 border-red-500/30' : 'bg-red-50 border-red-200';
      case 'news': return recommendedMode ? 'bg-indigo-50 border-indigo-100' : darkMode ? 'bg-accent-blue/10 border-accent-blue/30' : 'bg-blue-50 border-blue-200';
      case 'job': return recommendedMode ? 'bg-green-50 border-green-100' : darkMode ? 'bg-green-500/10 border-green-500/30' : 'bg-green-50 border-green-200';
      default: return recommendedMode ? 'bg-slate-50 border-slate-200' : darkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200';
    }
  };

  const getCategoryIcon = (type: string) => {
    switch (type) {
      case 'hack': return <ShieldAlert className="flex-shrink-0" size={18} />;
      case 'news': return <Newspaper className="flex-shrink-0" size={18} />;
      case 'job': return <Briefcase className="flex-shrink-0" size={18} />;
      default: return <Server className="flex-shrink-0" size={18} />;
    }
  };

  return (
    <div className="space-y-8">
      <div className={recommendedMode ? 'mb-12 pt-8' : 'mb-8'}>
        <h1 className={`text-5xl md:text-7xl font-extrabold mb-4 ${recommendedMode ? 'text-slate-900 font-heading tracking-tighter' : darkMode ? 'text-white' : 'text-gray-900 text-shadow'}`}>
          {recommendedMode ? 'Intelligence Feed.' : darkMode ? 'SYSTEM_LOG.INTEL' : 'Web3 Intel Feed'}
        </h1>
        <p className={`text-xl ${recommendedMode ? 'text-slate-500 font-medium max-w-2xl' : darkMode ? 'text-slate-400 font-mono text-sm uppercase' : 'text-gray-700'}`}>
          {recommendedMode ? 'Real-time ecosystem updates, security analysis, and infrastructure developments.' : 'Latest updates from the blockchain ecosystem'}
        </p>
      </div>

      <div className={`grid grid-cols-1 ${recommendedMode ? 'md:grid-cols-2' : ''} gap-4`}>
        {intelData.map((item, idx) => (
          <div
            key={idx}
            className={`${recommendedMode ? 'bg-white border border-slate-200 shadow-sm rounded-2xl hover:shadow-md' : darkMode ? 'surface-industrial border-white/5' : 'bg-white border-gray-200 rounded-2xl'} p-6 border transition-all overflow-hidden relative group`}
          >
            {!recommendedMode && darkMode && <div className="absolute top-0 right-0 p-4 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity">
              {getCategoryIcon(item.type)}
            </div>}

            <div className="flex items-start gap-6 relative z-10">
              <div className={`mt-1 p-2 rounded ${getCategoryBg(item.type)} ${getCategoryColor(item.type)}`}>
                {getCategoryIcon(item.type)}
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-mono px-2 py-0.5 border rounded-[2px] ${getCategoryBg(item.type)} ${getCategoryColor(item.type)}`}>
                      {item.type.toUpperCase()}
                    </span>
                    <span className={`text-[10px] font-mono ${recommendedMode ? 'text-slate-500 font-bold' : darkMode ? 'text-slate-500' : 'text-gray-500'}`}>{item.date}</span>
                  </div>
                </div>

                <h3 className={`text-xl font-bold mb-3 ${recommendedMode ? 'text-slate-900 font-heading' : darkMode ? 'text-white group-hover:text-accent-blue' : 'text-gray-900'}`}>
                  {item.title}
                </h3>

                <p className={`text-sm leading-relaxed mb-6 ${recommendedMode ? 'text-slate-600' : darkMode ? 'text-slate-400 font-mono text-xs' : 'text-gray-600'}`}>
                  {item.description}
                </p>

                <div className="flex items-center justify-between">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest border border-transparent hover:border-current px-0 py-1 transition-all ${recommendedMode ? 'text-indigo-600' : darkMode ? 'text-accent-blue font-mono' : 'text-blue-600'}`}
                  >
                    {recommendedMode ? 'Source Protocol' : 'Establishing Secure Link'} <ExternalLink size={12} />
                  </a>
                  {!recommendedMode && darkMode && <div className="text-[8px] font-mono text-slate-700 uppercase tracking-tighter">Verified_Source_Protocol // 0x...{item.title.length.toString(16)}</div>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CareersView = ({ theme, viewMode, getCareerMatch }) => {
  const darkMode = theme === 'dark';
  const recommendedMode = theme === 'recommended';

  const evmCareers = Object.entries(careerPaths).filter(([_, career]) => career.ecosystem === 'EVM');
  const solanaCareers = Object.entries(careerPaths).filter(([_, career]) => career.ecosystem === 'Solana');

  const CareerCard = ({ careerName, career }) => {
    const match = getCareerMatch(careerName);
    const Icon = career.icon;
    return (
      <div
        key={careerName}
        className={`${recommendedMode ? 'bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-indigo-200' : darkMode ? 'surface-industrial corner-animate border-white/5 rounded-[6px]' : 'glass-card-light rounded-2xl'} p-8 transition-all duration-500 group relative overflow-hidden flex flex-col h-full`}
      >
        {darkMode && !recommendedMode && <div className="corner-bottom" />}
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-start justify-between mb-6">
            <div className={`${recommendedMode ? 'bg-indigo-50 text-indigo-600' : darkMode ? 'bg-accent-blue text-black' : 'icon-gradient-blue text-white'} p-4 rounded-2xl transition-transform group-hover:scale-110 duration-500`}>
              <Icon size={28} />
            </div>
            <div className="text-right">
               <p className={`${recommendedMode ? 'text-[10px] font-bold text-indigo-600 uppercase tracking-widest' : darkMode ? 'label-industrial text-accent-blue/60' : 'text-xs font-mono uppercase tracking-wider text-gray-600'}`}>{career.ecosystem}</p>
               <p className={`text-sm font-bold ${recommendedMode ? 'text-slate-900' : darkMode ? 'text-white' : 'text-gray-900'}`}>{match.percentage.toFixed(0)}% Match</p>
            </div>
          </div>

          <h3 className={`text-2xl font-bold mb-3 ${recommendedMode ? 'text-slate-900 font-heading' : darkMode ? 'text-white' : 'text-gray-900'}`}>{careerName}</h3>

          <p className={`text-sm mb-8 line-clamp-3 flex-1 ${recommendedMode ? 'text-slate-600 font-medium' : darkMode ? 'text-slate-400 font-mono text-xs' : 'text-gray-600'}`}>{career.description}</p>

          <div className="mb-6">
            <div className={`${recommendedMode ? 'h-1.5 bg-slate-100 rounded-full' : darkMode ? 'progress-bar-dark' : 'progress-bar-light'} mb-2 overflow-hidden`}>
              <div className={`h-full transition-all duration-1000 ${recommendedMode ? (match.percentage === 100 ? 'bg-green-500' : 'bg-indigo-600') : 'progress-fill'}`} style={{ width: `${match.percentage}%` }} />
            </div>
          </div>

          {!viewMode && (
            <Link
              to={`/career/${encodeURIComponent(careerName)}`}
              className={`${recommendedMode ? 'bg-slate-900 text-white hover:bg-indigo-600' : darkMode ? 'btn-industrial-primary' : 'btn-primary-light rounded-xl'} w-full py-4 px-6 font-bold transition-all duration-300 flex items-center justify-center gap-2 rounded-2xl focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none`}
            >
              {recommendedMode ? 'Explore Path' : darkMode ? 'ACCESS_ROADMAP' : 'View Roadmap'}
              <ArrowRight size={16} />
            </Link>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-12 pt-8">
      <div className="mb-8 animate-slideUp">
        <h1 className={`text-5xl md:text-7xl font-extrabold mb-4 ${recommendedMode ? 'text-slate-900 font-heading tracking-tighter' : darkMode ? 'text-white' : 'text-gray-900 text-shadow'}`}>
          {recommendedMode ? 'Professional Matrices.' : darkMode ? 'CAREER_MATRICES' : 'Career Paths'}
        </h1>
        <p className={`text-xl ${recommendedMode ? 'text-slate-500 font-medium max-w-2xl' : darkMode ? 'text-slate-400 font-mono text-sm uppercase' : 'text-gray-700'}`}>
          {recommendedMode ? 'Curated progression paths for high-impact technical roles in the Web3 ecosystem.' : 'Explore Web3 career paths with detailed roadmaps'}
        </p>
      </div>

      <div>
        <div className="flex items-center gap-4 mb-8">
          <div className={`h-1 w-12 ${recommendedMode ? 'bg-indigo-600' : 'bg-accent-blue'} ${darkMode ? '' : 'rounded-full'}`} />
          <h2 className={`text-3xl font-bold ${recommendedMode ? 'text-slate-900 font-heading' : darkMode ? 'text-white font-mono uppercase text-lg' : 'text-gray-900'}`}>EVM Ecosystem</h2>
        </div>
        <div className={`grid grid-cols-1 ${recommendedMode ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-3'} gap-8`}>
          {evmCareers.map(([name, career]) => (
            <CareerCard key={name} careerName={name} career={career} />
          ))}
        </div>
      </div>

      <div className="pt-8">
        <div className="flex items-center gap-4 mb-8">
          <div className={`h-1 w-12 ${recommendedMode ? 'bg-indigo-600' : 'bg-accent-blue'} ${darkMode ? '' : 'rounded-full'}`} />
          <h2 className={`text-3xl font-bold ${recommendedMode ? 'text-slate-900 font-heading' : darkMode ? 'text-white font-mono uppercase text-lg' : 'text-gray-900'}`}>Solana Ecosystem</h2>
        </div>
        <div className={`grid grid-cols-1 ${recommendedMode ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-3'} gap-8`}>
          {solanaCareers.map(([name, career]) => (
            <CareerCard key={name} careerName={name} career={career} />
          ))}
        </div>
      </div>
    </div>
  );
};

const CareerDetailView = ({ theme, displaySkills, getCareerMatch }) => {
  const darkMode = theme === 'dark';
  const recommendedMode = theme === 'recommended';

  const { id } = useParams();
  const careerName = decodeURIComponent(id || "");
  const career = careerPaths[careerName];

  if (!career) return (
      <div className="text-center py-20">
          <h2 className={`text-2xl font-bold ${recommendedMode ? 'text-slate-900 font-heading' : darkMode ? 'text-white' : 'text-gray-900'}`}>Career path not found</h2>
          <Link to="/careers" className={`${recommendedMode ? 'text-indigo-600 font-bold' : darkMode ? 'text-white' : 'text-accent-blue'} mt-4 inline-block`}>Back to Careers</Link>
      </div>
  );

  const match = getCareerMatch(careerName);
  const Icon = career.icon;

  return (
    <div className="space-y-8">
      <Link
        to="/careers"
        className={`flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition-colors ${
          recommendedMode ? 'text-indigo-600 hover:text-indigo-700 font-heading' : darkMode ? 'text-slate-500 hover:text-white' : 'text-blue-600 hover:text-blue-700'
        }`}
      >
        <ArrowRight size={16} className="rotate-180" />
        Back to Careers
      </Link>

      <div className={recommendedMode ? 'pt-8' : ''}>
        <div className="flex items-start gap-6 mb-12">
          <div className={`${recommendedMode ? 'p-6 bg-indigo-600 rounded-2xl shadow-xl' : darkMode ? 'p-4 bg-accent-blue rounded' : 'p-4 rounded-xl bg-gray-100 border'}`}>
            <Icon className={recommendedMode ? 'text-white' : darkMode ? 'text-black' : 'text-blue-600'} size={40} />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <h1 className={`text-5xl md:text-6xl font-black ${recommendedMode ? 'text-slate-900 font-heading tracking-tighter' : darkMode ? 'text-white' : 'text-gray-900 text-shadow'}`}>{careerName}</h1>
              <span className={`px-4 py-1.5 text-xs font-bold uppercase tracking-widest ${
                recommendedMode ? 'bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100' :
                darkMode
                  ? 'bg-accent-blue/10 text-accent-blue border border-accent-blue/30 rounded-[2px]'
                  : (career.ecosystem === 'EVM'
                    ? 'bg-blue-500/10 text-blue-600 border border-blue-500/20 rounded-full'
                    : career.ecosystem === 'Solana'
                      ? 'bg-purple-500/10 text-purple-600 border border-purple-500/20 rounded-full'
                      : 'bg-green-500/10 text-green-600 border border-green-500/20 rounded-full')
              }`}>
                {career.ecosystem}
              </span>
            </div>
            <p className={`text-xl leading-relaxed max-w-3xl ${recommendedMode ? 'text-slate-600 font-medium' : darkMode ? 'text-slate-400 font-mono text-sm uppercase' : 'text-gray-600'}`}>{career.description}</p>
          </div>
        </div>

        <div className={`${recommendedMode ? 'bg-white rounded-3xl border border-slate-100 shadow-sm' : darkMode ? 'surface-industrial border-white/5' : 'bg-blue-50 border-blue-200 rounded-2xl'} p-8 md:p-12`}>
          <div className="flex justify-between items-center mb-4">
            <span className={`text-sm font-bold uppercase tracking-widest ${recommendedMode ? 'text-slate-900' : darkMode ? 'text-accent-blue font-mono' : 'text-gray-900'}`}>{recommendedMode ? 'Ecosystem Alignment' : darkMode ? 'COMPATIBILITY_ALIGNMENT' : 'System Compatibility'}</span>
            <span className={`text-sm font-bold ${recommendedMode ? 'text-slate-500' : darkMode ? 'text-slate-400 font-mono' : 'text-gray-600'}`}>
              {match.matched}/{match.total} Units
            </span>
          </div>
    <div className={`w-full ${recommendedMode ? 'h-3 bg-slate-100 rounded-full' : darkMode ? 'bg-white/5 h-3' : 'bg-white h-3 rounded-full'} overflow-hidden border ${recommendedMode ? 'border-transparent' : darkMode ? 'border-white/5' : 'border-gray-100'}`}>
            <div
              className={`${recommendedMode ? 'bg-indigo-600' : 'bg-accent-blue'} h-full transition-all duration-1000 ease-out ${recommendedMode ? 'rounded-full' : darkMode ? '' : 'rounded-full'}`}
              style={{ width: `${match.percentage}%` }}
            />
          </div>
          <p className={`text-xs font-bold uppercase tracking-widest ${recommendedMode ? 'text-indigo-600' : darkMode ? 'text-slate-400' : 'text-gray-500'} mt-3`}>
            {match.percentage.toFixed(1)}% Alignment
          </p>
        </div>
      </div>

      <div className={`${recommendedMode ? 'card-recommended' : darkMode ? 'surface-industrial border-white/5 rounded-[6px]' : 'bg-white border-gray-200 rounded-2xl'} p-8`}>
        <h2 className={`${recommendedMode ? 'text-slate-900 font-heading font-bold' : darkMode ? 'label-industrial text-accent-blue/80' : 'text-sm font-mono uppercase tracking-[0.2em] text-gray-900'} mb-8`}>{recommendedMode ? 'Technical Prerequisites' : darkMode ? 'CORE_PREREQUISITES' : 'Core Prerequisites'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {career.requiredSkills.map(skill => (
            <div
              key={skill}
              className={`flex items-center gap-3 p-4 transition-all duration-300 ${
                recommendedMode ? 'bg-slate-50 border border-slate-100 hover:border-indigo-300 rounded-lg' :
                darkMode ? 'bg-white/[0.03] border border-white/5 hover:border-accent-blue/30 rounded-[4px]' : 'bg-gray-50 rounded'
              }`}
            >
              {displaySkills.hasOwnProperty(skill) && displaySkills[skill] ? (
                <CheckCircle className={recommendedMode ? 'text-indigo-600' : 'text-accent-blue flex-shrink-0'} size={20} />
              ) : (
                <Circle className={recommendedMode ? 'text-slate-200' : darkMode ? 'text-white/10' : 'text-gray-300'} size={20} />
              )}
              <span
                className={`text-sm font-bold ${
                  displaySkills[skill]
                    ? (recommendedMode ? 'text-slate-900' : darkMode ? 'text-white' : 'text-gray-900')
                    : (recommendedMode ? 'text-slate-500' : darkMode ? 'text-slate-400' : 'text-gray-600')
                } ${!recommendedMode && darkMode ? 'font-mono uppercase text-xs tracking-tight' : ''}`}
              >
                {skill}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className={`${recommendedMode ? 'card-recommended' : darkMode ? 'surface-industrial border-white/5 rounded-[6px]' : 'bg-white border-gray-200 rounded-2xl'} p-8`}>
        <h2 className={`${recommendedMode ? 'text-slate-900 font-heading font-bold' : darkMode ? 'label-industrial text-accent-blue/80' : 'text-sm font-mono uppercase tracking-[0.2em] text-gray-900'} mb-12`}>
          {recommendedMode ? 'Learning Roadmap' : darkMode ? 'PHASE_SEQUENCING' : 'System Roadmap Phases'}
        </h2>
        <div className="space-y-12">
          {career.roadmap.map((phase, index) => (
            <div key={index} className="relative">
              <div className={`flex items-start gap-6 ${recommendedMode ? 'border-slate-100' : darkMode ? 'border-accent-blue/10' : 'border-gray-200'} border-l-2 pl-8 pb-12`}>
                <div className={`absolute -left-[15px] top-0 ${recommendedMode ? 'bg-indigo-600 text-white rounded-lg shadow-md' : darkMode ? 'bg-[#070B12] border-accent-blue text-accent-blue shadow-[0_0_10px_rgba(0,255,255,0.3)] rounded-[4px]' : 'bg-white border-blue-600 text-blue-600 rounded-full'} border-2 font-bold w-8 h-8 flex items-center justify-center text-xs z-10 mt-[2px]`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <h3 className={`text-xl font-bold ${recommendedMode ? 'text-slate-900 font-heading' : darkMode ? 'text-white font-mono uppercase tracking-tight' : 'text-gray-900'}`}>
                      {phase.phase}
                    </h3>
                    <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                      recommendedMode ? 'bg-slate-100 text-slate-700 rounded-md border border-slate-200' :
                      darkMode ? 'bg-accent-blue/10 text-accent-blue border border-accent-blue/20 rounded-[2px]' : 'bg-gray-100 text-gray-600 rounded'
                    }`}>
                      {phase.duration}
                    </span>
                  </div>

                  <div className="mb-8">
                    <h4 className={`text-xs font-bold uppercase tracking-widest mb-4 ${recommendedMode ? 'text-slate-400' : darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                      {recommendedMode ? 'Curriculum Units' : darkMode ? 'TARGET_UNIT_DATABASE' : 'Target Modules'}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {phase.skills.map(skill => {
                        const isCompleted = matchRoadmapSkill(skill, displaySkills);
                        return (
                          <span
                            key={skill}
                            className={`px-3 py-1.5 text-xs font-bold transition-all ${
                              isCompleted
                                ? (recommendedMode ? 'bg-green-100 text-green-700 rounded-md border border-green-200' : darkMode ? 'bg-accent-blue/20 text-accent-blue border border-accent-blue/40 shadow-[0_0_8px_rgba(0,255,255,0.2)] rounded-[2px]' : 'bg-green-100 text-green-700 rounded')
                                : (recommendedMode ? 'bg-slate-50 text-slate-400 border border-slate-100 rounded-md' : darkMode ? 'bg-white/[0.02] text-slate-400 border border-white/5 rounded-[2px]' : 'bg-gray-100 text-gray-600 rounded')
                            }`}
                          >
                            {skill}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <h4 className={`text-xs font-bold uppercase tracking-widest mb-4 ${recommendedMode ? 'text-slate-400' : darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                      {recommendedMode ? 'Recommended Resources' : darkMode ? 'ACCESS_PROTOCOLS' : 'Access Protocols'}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {phase.resources.map((resource, idx) => (
                        <a
                          key={idx}
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-start gap-4 p-4 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none ${
                            recommendedMode ? 'bg-white border border-slate-200 hover:border-indigo-600 hover:shadow-md rounded-xl' :
                            darkMode ? 'bg-white/[0.03] border border-white/5 hover:border-accent-blue/30 hover:bg-white/[0.06] rounded-[4px]' : 'bg-gray-50 hover:bg-gray-100 border rounded'
                          }`}
                        >
                          <BookOpen className={recommendedMode ? 'text-indigo-600 flex-shrink-0' : darkMode ? 'text-accent-blue flex-shrink-0' : 'text-blue-600 flex-shrink-0'} size={20} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-sm font-bold truncate ${recommendedMode ? 'text-slate-900 font-heading' : darkMode ? 'text-white' : 'text-gray-900'}`}>
                                {resource.name}
                              </span>
                              <ExternalLink className={recommendedMode ? 'text-slate-300' : darkMode ? 'text-slate-400' : 'text-gray-400'} size={14} />
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`text-[10px] font-bold px-2 py-0.5 border ${
                                resource.type.includes('FREE')
                                  ? (recommendedMode ? 'bg-green-50 text-green-700 border-green-100 rounded' : darkMode ? 'bg-green-500/10 text-green-400 border-green-500/20 rounded-[2px]' : 'bg-green-100 text-green-700 rounded')
                                  : (recommendedMode ? 'bg-indigo-50 text-indigo-600 border-indigo-100 rounded' : darkMode ? 'bg-accent-blue/10 text-accent-blue border-accent-blue/20 rounded-[2px]' : 'bg-blue-100 text-blue-700 rounded')
                              }`}>
                                {resource.type}
                              </span>
                              {resource.duration && (
                                <span className={`text-[10px] font-bold ${recommendedMode ? 'text-slate-400' : darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                                  {resource.duration}
                                </span>
                              )}
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {career.outcomes && (
        <div className={`${recommendedMode ? 'card-recommended border-indigo-100 bg-gradient-to-br from-white to-indigo-50/30' : darkMode ? 'surface-industrial border-accent-blue/10 rounded-[6px]' : 'bg-gradient-to-br from-green-50 to-blue-50 border-green-200 rounded-2xl'} p-8`}>
          <h2 className={`${recommendedMode ? 'text-slate-900 font-heading font-bold' : darkMode ? 'label-industrial text-accent-blue/80' : 'text-sm font-mono uppercase tracking-[0.2em] text-gray-900'} mb-8`}>
            {recommendedMode ? 'Estimated Compensation' : darkMode ? 'ESTIMATED_ECOSYSTEM_YIELD' : 'Estimated Ecosystem Yield'}
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {career.outcomes.junior && (
              <div className="space-y-1">
                <p className={`text-[10px] font-mono uppercase tracking-widest ${recommendedMode ? 'text-slate-500 font-bold' : darkMode ? 'text-slate-400' : 'text-gray-600'}`}>Entry Level</p>
                <p className={`text-xl font-bold ${recommendedMode ? 'text-indigo-600' : darkMode ? 'text-white' : 'text-green-600'}`}>{career.outcomes.junior}</p>
              </div>
            )}
            {career.outcomes.mid && (
              <div className="space-y-1">
                <p className={`text-[10px] font-mono uppercase tracking-widest ${recommendedMode ? 'text-slate-500 font-bold' : darkMode ? 'text-slate-400' : 'text-gray-600'}`}>Intermediate</p>
                <p className={`text-xl font-bold ${recommendedMode ? 'text-indigo-600' : darkMode ? 'text-white' : 'text-green-600'}`}>{career.outcomes.mid}</p>
              </div>
            )}
            {career.outcomes.senior && (
              <div className="space-y-1">
                <p className={`text-[10px] font-mono uppercase tracking-widest ${recommendedMode ? 'text-slate-500 font-bold' : darkMode ? 'text-slate-400' : 'text-gray-600'}`}>Advanced</p>
                <p className={`text-xl font-bold ${recommendedMode ? 'text-indigo-600' : darkMode ? 'text-white' : 'text-green-600'}`}>{career.outcomes.senior}</p>
              </div>
            )}
            {career.outcomes.lead && (
              <div className="space-y-1">
                <p className={`text-[10px] font-mono uppercase tracking-widest ${recommendedMode ? 'text-slate-500 font-bold' : darkMode ? 'text-slate-400' : 'text-gray-600'}`}>Principal</p>
                <p className={`text-xl font-bold ${recommendedMode ? 'text-indigo-600' : darkMode ? 'text-white' : 'text-green-600'}`}>{career.outcomes.lead}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const ShareModal = ({ theme, setShowShareModal, generateShareCode, copyToClipboard, copiedShare, setCopiedShare }) => {
  const darkMode = theme === 'dark';
  const recommendedMode = theme === 'recommended';

  return (
  <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
    <div className={`${recommendedMode ? 'bg-white rounded-xl shadow-2xl border border-slate-200' : darkMode ? 'surface-industrial border-accent-blue/20' : 'bg-white rounded-2xl'} max-w-md w-full p-6 relative`}>
      {!recommendedMode && darkMode && <div className="scanline" />}
      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-xl font-bold ${recommendedMode ? 'text-slate-900 font-heading' : darkMode ? 'text-white' : 'text-gray-900'}`}>Share Progress</h2>
        <button
          onClick={() => setShowShareModal(false)}
          className={`p-2 rounded-lg transition-colors ${recommendedMode ? 'hover:bg-slate-100' : darkMode ? 'hover:bg-white/5' : 'hover:bg-gray-100'}`}
        >
          <X className={recommendedMode ? 'text-slate-900' : darkMode ? 'text-white' : 'text-gray-600'} size={20} />
        </button>
      </div>
      <div className="space-y-4">
        <button
          onClick={async () => {
            const code = generateShareCode();
            const success = await copyToClipboard(code);
            if (success) {
              setCopiedShare(true);
              setTimeout(() => setCopiedShare(false), 2000);
            } else {
              alert('Failed to copy. Please manually copy the code below.');
            }
          }}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
            copiedShare
              ? 'bg-green-500 text-black'
              : (recommendedMode ? 'btn-recommended-primary shadow-sm' : darkMode ? 'btn-glass-dark' : 'bg-gray-100 hover:bg-gray-200 text-gray-700')
          }`}
        >
          {copiedShare ? <Check size={20} /> : <Copy size={20} />}
          {copiedShare ? 'Copied!' : 'Copy Share Code'}
        </button>
        <div className={`p-3 rounded-lg ${recommendedMode ? 'bg-slate-50 border border-slate-100' : darkMode ? 'bg-white/5 border border-white/10' : 'bg-gray-100'}`}>
          <p className={`text-xs font-mono break-all ${recommendedMode ? 'text-slate-600' : darkMode ? 'text-slate-300' : 'text-gray-700'}`}>
            {generateShareCode()}
          </p>
        </div>
        <p className={`text-xs text-center ${recommendedMode ? 'text-slate-500' : darkMode ? 'text-white' : 'text-gray-500'}`}>
          Share this code with others to show your progress
        </p>
      </div>
    </div>
  </div>
  );
};

const ViewModal = ({ theme, setShowViewModal, shareInput, setShareInput, loadFromShareCode }) => {
  const darkMode = theme === 'dark';
  const recommendedMode = theme === 'recommended';

  return (
  <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
    <div className={`${recommendedMode ? 'bg-white rounded-xl shadow-2xl border border-slate-200' : darkMode ? 'surface-industrial border-accent-blue/20' : 'bg-white rounded-2xl'} max-w-md w-full p-6 relative`}>
      {!recommendedMode && darkMode && <div className="scanline" />}
      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-xl font-bold ${recommendedMode ? 'text-slate-900 font-heading' : darkMode ? 'text-white' : 'text-gray-900'}`}>View Shared Progress</h2>
        <button
          onClick={() => setShowViewModal(false)}
          className={`p-2 rounded-lg transition-colors ${recommendedMode ? 'hover:bg-slate-100' : darkMode ? 'hover:bg-white/5' : 'hover:bg-gray-100'}`}
        >
          <X className={recommendedMode ? 'text-slate-900' : darkMode ? 'text-white' : 'text-gray-600'} size={20} />
        </button>
      </div>
      <div className="space-y-4">
        <div>
          <label className={`block text-sm font-medium mb-2 ${recommendedMode ? 'text-slate-900 font-heading' : darkMode ? 'text-white' : 'text-gray-700'}`}>
            Paste Share Code
          </label>
          <input
            type="text"
            placeholder="Enter code..."
            value={shareInput}
            onChange={(e) => setShareInput(e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg transition-all ${
              recommendedMode ? 'bg-slate-50 border-slate-200 text-slate-900 focus:ring-indigo-600' : darkMode ? 'input-glass-dark' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-blue-500'
            } focus:outline-none focus:ring-2`}
          />
        </div>
        <button
          onClick={() => {
            if (shareInput.trim()) {
              loadFromShareCode(shareInput.trim());
            }
          }}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
            recommendedMode ? 'btn-recommended-primary shadow-sm' : darkMode ? 'btn-primary-dark' : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          Load Progress
        </button>
      </div>
    </div>
  </div>
  );
};

const PolicyModal = ({ theme, setShowPolicyModal }) => {
  const darkMode = theme === 'dark';
  const recommendedMode = theme === 'recommended';

  return (
  <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
    <div className={`${recommendedMode ? 'bg-white rounded-xl shadow-2xl border border-slate-200' : darkMode ? 'surface-industrial border-accent-blue/20' : 'bg-white rounded-2xl'} max-w-2xl w-full p-6 md:p-8 max-h-[90vh] overflow-y-auto relative`}>
      {!recommendedMode && darkMode && <div className="scanline" />}
      <div className="mb-6">
        <h2 className={`text-2xl font-bold mb-2 ${recommendedMode ? 'text-slate-900 font-heading' : darkMode ? 'text-white' : 'text-gray-900'}`}>
          Welcome to Web3 Skills RiWoT
        </h2>
        <p className={`text-sm ${recommendedMode ? 'text-slate-500' : darkMode ? 'text-white' : 'text-gray-600'}`}>
          Please read and accept our terms before using the platform
        </p>
      </div>

      <div className={`space-y-4 text-sm ${recommendedMode ? 'text-slate-700' : darkMode ? 'text-white' : 'text-gray-700'}`}>
        <div className={`p-4 ${recommendedMode ? 'bg-orange-50/50 border-orange-100 rounded-xl' : darkMode ? 'rounded-[4px] bg-yellow-900/20 border border-yellow-800' : 'rounded-lg bg-yellow-50 border border-yellow-200'}`}>
          <h3 className={`font-bold mb-2 flex items-center gap-2 ${recommendedMode ? 'text-orange-700 font-heading' : darkMode ? 'text-white' : 'text-yellow-800'}`}>
            <Star size={18} />
            Important Disclaimer
          </h3>
          <p className={recommendedMode ? 'text-orange-900/80 leading-relaxed' : darkMode ? 'text-white' : 'text-yellow-900'}>
            This platform provides educational resources and career guidance for Web3 development. While we mention salary ranges and career outcomes, <strong>we do not guarantee employment or specific compensation</strong>. These are industry estimates based on market research as of 2025.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className={`font-bold mb-2 ${recommendedMode ? 'text-slate-900 font-heading' : darkMode ? 'text-white' : 'text-gray-900'}`}>What We Provide</h3>
            <ul className={`space-y-2 ml-4 ${recommendedMode ? 'text-slate-600' : ''}`}>
              <li>• Curated learning resources and roadmaps</li>
              <li>• Skills tracking and progress management</li>
              <li>• Career path guidance and match analysis</li>
              <li>• Links to free and paid educational content</li>
              <li>• Community access through RiWoT</li>
            </ul>
          </div>

          <div>
            <h3 className={`font-bold mb-2 ${recommendedMode ? 'text-slate-900 font-heading' : darkMode ? 'text-white' : 'text-gray-900'}`}>What We Expect</h3>
            <ul className={`space-y-2 ml-4 ${recommendedMode ? 'text-slate-600' : ''}`}>
              <li>• You take responsibility for your own learning journey</li>
              <li>• You verify all external resources before use</li>
              <li>• You understand that career outcomes vary by individual effort</li>
              <li>• You use the platform ethically and honestly</li>
            </ul>
          </div>
        </div>

        <div className={`p-4 ${recommendedMode ? 'bg-indigo-50/50 border-indigo-100 rounded-xl' : darkMode ? 'rounded-[4px] bg-white/5 border border-white/10' : 'rounded-lg bg-blue-50 border border-blue-200'}`}>
          <h3 className={`font-bold mb-2 ${recommendedMode ? 'text-indigo-700 font-heading' : darkMode ? 'text-accent-blue' : 'text-blue-800'}`}>Privacy & Data Storage</h3>
          <ul className={`space-y-2 ${recommendedMode ? 'text-indigo-900/70' : ''}`}>
            <li><strong>What we store:</strong> Your skill selections, progress data, and theme preferences</li>
            <li><strong>Where we store it:</strong> Locally in your browser's localStorage (not on our servers)</li>
            <li><strong>Who has access:</strong> Only you. Data never leaves your device unless you share it</li>
            <li><strong>How long we keep it:</strong> Until you clear your browser data or uninstall</li>
            <li><strong>Sharing:</strong> Optional. You control if/when to generate share codes</li>
            <li><strong>Third parties:</strong> None. We don't use analytics or tracking</li>
          </ul>
        </div>

        <div>
          <h3 className={`font-bold mb-2 ${recommendedMode ? 'text-slate-900 font-heading' : darkMode ? 'text-white' : 'text-gray-900'}`}>External Resources</h3>
          <p className={recommendedMode ? 'text-slate-600 leading-relaxed' : ''}>
            We link to third-party platforms (Cyfrin Updraft, Turbin3, YouTube, etc.). We are not responsible for their content, availability, or policies. Some resources may require payment or registration.
          </p>
        </div>

        <div>
          <h3 className={`font-bold mb-2 ${recommendedMode ? 'text-slate-900 font-heading' : darkMode ? 'text-white' : 'text-gray-900'}`}>Salary Information</h3>
          <p className={recommendedMode ? 'text-slate-600 leading-relaxed' : ''}>
            Salary ranges shown are estimates based on 2025 market research. Actual compensation depends on location, experience, company, market conditions, and individual negotiation. Bug bounty earnings are highly variable.
          </p>
        </div>

        <div>
          <h3 className={`font-bold mb-2 ${recommendedMode ? 'text-slate-900 font-heading' : darkMode ? 'text-white' : 'text-gray-900'}`}>Open Source</h3>
          <p className={recommendedMode ? 'text-slate-600' : ''}>
            This project is open source. You can view the code, suggest improvements, or report issues on{' '}
            <a href="https://github.com/mirmohmmadluqman/web3skills" target="_blank" rel="noopener noreferrer" className={recommendedMode ? 'text-indigo-600 font-bold hover:underline' : darkMode ? 'text-accent-blue hover:text-white' : 'text-blue-600 hover:text-blue-700'}>
              GitHub
            </a>.
          </p>
        </div>
      </div>

      <div className={`mt-6 pt-6 border-t ${recommendedMode ? 'border-slate-100' : darkMode ? 'border-white/10' : 'border-gray-200'}`}>
        <button
          onClick={() => {
            localStorage.setItem('web3skills_policy_accepted', 'true');
            setShowPolicyModal(false);
          }}
          className={`w-full py-4 px-4 font-bold transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none ${
            recommendedMode ? 'btn-recommended-primary' : darkMode ? 'btn-industrial-primary' : 'bg-blue-600 hover:bg-blue-700 text-white rounded-lg'
          }`}
        >
          I Understand and Accept
        </button>
        <p className={`text-xs text-center mt-3 ${recommendedMode ? 'text-slate-500 font-medium' : darkMode ? 'text-white' : 'text-gray-500'}`}>
          By accepting, you agree to use this platform at your own discretion
        </p>
      </div>
    </div>
  </div>
  );
};

const Footer = ({ theme }) => {
  const darkMode = theme === 'dark';
  const recommendedMode = theme === 'recommended';

  return (
  <footer className={`mt-32 pb-24 ${recommendedMode ? 'bg-slate-50/50 border-slate-200' : darkMode ? 'border-accent-blue/10 bg-black/40' : 'border-gray-200'} border-t pt-24`}>
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className={`${recommendedMode ? 'bg-indigo-600 rounded-lg' : darkMode ? 'bg-accent-blue rounded-[4px]' : 'bg-gray-100 rounded-lg'} p-1 border border-cyan-300/40 flex items-center justify-center overflow-hidden`} style={{ width: '40px', height: '40px' }}>
              <img src="https://i.postimg.cc/G25Xszzm/Web3-Skills-LOGO.png" alt="Web3 Skills Logo" className="w-full h-full object-cover rounded-[2px]" />
            </div>
            <span className={`font-bold text-lg tracking-tight ${recommendedMode ? 'text-slate-900 font-heading' : darkMode ? 'text-white' : 'text-gray-900'}`}>Web3 Skills <span className={recommendedMode ? 'text-indigo-600' : darkMode ? 'text-accent-blue' : 'text-accent-blue'}>RiWoT</span></span>
          </div>
          <p className={`text-sm leading-relaxed max-w-sm ${recommendedMode ? 'text-slate-600 font-medium' : darkMode ? 'text-slate-400 font-mono text-xs uppercase' : 'text-gray-600'}`}>
            A technical infrastructure platform for Web3 career development and skill verification.
            Built for the decentralized future.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/mirmohmmadluqman/web3skills"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none ${recommendedMode ? 'btn-recommended-icon bg-slate-50 text-slate-700' : darkMode ? 'btn-icon-dark text-accent-blue border-accent-blue/20' : 'bg-gray-100 text-gray-700 p-2 rounded-lg'}`}
            >
              <Github size={20} />
            </a>
            <a
              href="https://discord.gg/qMd7jwV7UG"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none ${recommendedMode ? 'btn-recommended-icon bg-slate-50 text-slate-700' : darkMode ? 'btn-icon-dark text-accent-blue border-accent-blue/20' : 'bg-gray-100 text-gray-700 p-2 rounded-lg'}`}
            >
              <MessageCircle size={20} />
            </a>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 md:justify-items-end">
          <div className="space-y-4">
            <h4 className={`${recommendedMode ? 'text-slate-900 font-heading font-bold text-xs uppercase tracking-widest' : darkMode ? 'label-industrial text-accent-blue/80' : 'text-[10px] font-mono uppercase tracking-[0.2em] text-gray-900 font-bold'}`}>Infrastructure</h4>
            <ul className={`space-y-2 text-sm ${recommendedMode ? 'text-slate-600 font-medium' : 'font-mono'} ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
              <li><Link to="/skills" className={`${recommendedMode ? 'hover:text-indigo-600' : darkMode ? 'hover:text-accent-blue' : 'hover:text-accent-blue'} transition-colors focus-visible:ring-1 focus-visible:ring-accent-blue focus-visible:outline-none rounded-[2px]`}>Skill Tree</Link></li>
              <li><Link to="/careers" className={`${recommendedMode ? 'hover:text-indigo-600' : darkMode ? 'hover:text-accent-blue' : 'hover:text-accent-blue'} transition-colors focus-visible:ring-1 focus-visible:ring-accent-blue focus-visible:outline-none rounded-[2px]`}>Roadmaps</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className={`${recommendedMode ? 'text-slate-900 font-heading font-bold text-xs uppercase tracking-widest' : darkMode ? 'label-industrial text-accent-blue/80' : 'text-[10px] font-mono uppercase tracking-[0.2em] text-gray-900 font-bold'}`}>Resources</h4>
            <ul className={`space-y-2 text-sm ${recommendedMode ? 'text-slate-600 font-medium' : 'font-mono'} ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
              <li><a href="https://github.com/RiWoT" target="_blank" rel="noopener noreferrer" className={`${recommendedMode ? 'hover:text-indigo-600' : darkMode ? 'hover:text-accent-blue' : 'hover:text-accent-blue'} transition-colors focus-visible:ring-1 focus-visible:ring-accent-blue focus-visible:outline-none rounded-[2px]`}>RiWoT Org</a></li>
              <li><a href="https://discord.gg/qMd7jwV7UG" target="_blank" rel="noopener noreferrer" className={`${recommendedMode ? 'hover:text-indigo-600' : darkMode ? 'hover:text-accent-blue' : 'hover:text-accent-blue'} transition-colors focus-visible:ring-1 focus-visible:ring-accent-blue focus-visible:outline-none rounded-[2px]`}>Discord</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className={`mt-16 pt-8 border-t ${recommendedMode ? 'border-slate-100' : darkMode ? 'border-accent-blue/10' : 'border-gray-100'} flex flex-col md:flex-row justify-between items-center gap-4`}>
        <p className={`${recommendedMode ? 'text-slate-500 font-medium text-[10px] uppercase tracking-widest' : darkMode ? 'label-industrial text-slate-400' : 'text-[10px] font-mono uppercase tracking-widest text-gray-500'}`}>
          © 2025 {recommendedMode ? 'RiWoT Platform' : 'SYSTEM.RIWOT.CORE'} // ALL RIGHTS RESERVED
        </p>
        <p className={`${recommendedMode ? 'text-slate-500 font-medium text-[10px] uppercase tracking-widest' : darkMode ? 'label-industrial text-slate-400' : 'text-[10px] font-mono uppercase tracking-widest text-gray-500'}`}>
          CREATED BY <a href="https://mirmohmmadluqman.github.io/portfolio/" target="_blank" rel="noopener noreferrer" className={recommendedMode ? 'text-indigo-600 hover:underline' : darkMode ? 'text-accent-blue hover:underline transition-all focus-visible:ring-1 focus-visible:ring-accent-blue focus-visible:outline-none rounded-[2px]' : 'text-accent-blue hover:underline'}>LUQMAN</a>
        </p>
      </div>
    </div>
  </footer>
  );
};

// --- Main App Component ---

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [skills, setSkills] = useState(() => {
    const savedSkills = localStorage.getItem('web3skills_riwot');
    if (savedSkills) return JSON.parse(savedSkills);

    const initialSkills = {};
    Object.values(skillCategories).forEach(categorySkills => {
      categorySkills.forEach(skill => {
        initialSkills[skill] = false;
      });
    });
    return initialSkills;
  });

  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || savedTheme === 'light' || savedTheme === 'recommended') return savedTheme;
    const legacyDarkMode = localStorage.getItem('web3skills_darkmode');
    if (legacyDarkMode !== null) return JSON.parse(legacyDarkMode) ? 'dark' : 'light';
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-dark', 'theme-light', 'theme-recommended', 'dark');
    root.classList.add(`theme-${theme}`);
    localStorage.setItem('theme', theme);

    // For backward compatibility with tailwind 'dark' variant if used
    if (theme === 'dark') {
      root.classList.add('dark');
    }
  }, [theme]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterComplete, setFilterComplete] = useState('all');

  const [expandedCategories, setExpandedCategories] = useState(() => {
    const savedExpanded = localStorage.getItem('web3skills_expanded');
    if (savedExpanded) return JSON.parse(savedExpanded);

    const initialExpanded = {};
    Object.keys(skillCategories).forEach(cat => initialExpanded[cat] = true);
    return initialExpanded;
  });

  const [showShareModal, setShowShareModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [sharedSkills, setSharedSkills] = useState(null);
  const [shareInput, setShareInput] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showPolicyModal, setShowPolicyModal] = useState(false);

  useEffect(() => {
    const policyAccepted = localStorage.getItem('web3skills_policy_accepted');
    if (!policyAccepted) {
      setShowPolicyModal(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('web3skills_riwot', JSON.stringify(skills));
  }, [skills]);

  useEffect(() => {
    localStorage.setItem('web3skills_expanded', JSON.stringify(expandedCategories));
  }, [expandedCategories]);

  const handleViewShared = useCallback((code) => {
    try {
      const checkedSkills = JSON.parse(atob(code));
      if (!Array.isArray(checkedSkills)) throw new Error('Invalid share code format');

      const newSkills = {};
      Object.values(skillCategories).flat().forEach(s => newSkills[s] = false);
      checkedSkills.forEach(skill => {
        if (newSkills.hasOwnProperty(skill)) {
          newSkills[skill] = true;
        }
      });
      setSharedSkills(newSkills);
      setViewMode(true);
      navigate("/");
    } catch (e) {
      console.error("Failed to decode shared link", e);
    }
  }, [navigate]);

  useEffect(() => {
    if (location.pathname.startsWith('/view/')) {
      const code = location.pathname.split('/view/')[1];
      if (code) {
        handleViewShared(code);
      }
    }
  }, [location.pathname, handleViewShared]);

  const toggleSkill = (skill) => {
    setSkills(prev => ({ ...prev, [skill]: !prev[skill] }));
  };

  const getCategoryProgress = useCallback((categoryName) => {
    const categorySkills = skillCategories[categoryName] || [];
    const displaySkills = viewMode ? sharedSkills || skills : skills;
    const checked = categorySkills.filter(skill => displaySkills[skill]).length;
    return {
      checked,
      total: categorySkills.length,
      percentage: categorySkills.length > 0 ? (checked / categorySkills.length) * 100 : 0
    };
  }, [viewMode, sharedSkills, skills]);

  const getCareerMatch = useCallback((careerName) => {
    const career = careerPaths[careerName];
    if (!career) return { matched: 0, total: 0, percentage: 0 };

    const currentSkills = viewMode ? (sharedSkills || skills) : skills;
    const matchedSkills = career.requiredSkills.filter(
      skill => currentSkills.hasOwnProperty(skill) && currentSkills[skill]
    );

    return {
      matched: matchedSkills.length,
      total: career.requiredSkills.length,
      percentage: career.requiredSkills.length > 0
        ? (matchedSkills.length / career.requiredSkills.length) * 100
        : 0
    };
  }, [viewMode, sharedSkills, skills]);

  const exportData = () => {
    const data = { skills, version: '2.0', timestamp: new Date().toISOString() };
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `web3skills-riwot-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target.result);
          if (imported.skills) {
            setSkills(imported.skills);
          }
        } catch (error) {
          alert('Invalid file format');
        }
      };
      reader.readAsText(file);
    }
  };

  const generateShareCode = () => {
    const checkedSkills = Object.keys(skills).filter(k => skills[k]);
    return btoa(JSON.stringify(checkedSkills));
  };

  const loadFromShareCode = (code) => {
    try {
      const checkedSkills = JSON.parse(atob(code));
      if (!Array.isArray(checkedSkills)) throw new Error('Invalid share code format');

      const newSkills = {};
      Object.values(skillCategories).flat().forEach(s => newSkills[s] = false);
      checkedSkills.forEach(skill => {
        if (newSkills.hasOwnProperty(skill)) {
          newSkills[skill] = true;
        }
      });
      setSharedSkills(newSkills);
      setViewMode(true);
      setShowViewModal(false);
      navigate("/");
    } catch (e) {
      alert('Invalid share code');
    }
  };

  const copyToClipboard = async (text) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (err) {
      console.log('Clipboard API blocked, using fallback');
    }

    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      textArea.remove();
      return successful;
    } catch (err) {
      return false;
    }
  };

  const displaySkills = viewMode ? (sharedSkills || skills) : skills;
  const totalSkills = useMemo(() => Object.values(skillCategories).flat().length, []);
  const checkedSkillsCount = useMemo(() => Object.values(displaySkills).filter(Boolean).length, [displaySkills]);
  const overallProgress = useMemo(() => totalSkills > 0 ? (checkedSkillsCount / totalSkills) * 100 : 0, [totalSkills, checkedSkillsCount]);

  const darkMode = theme === 'dark';
  const recommendedMode = theme === 'recommended';

  return (
    <div className={`min-h-screen transition-all relative overflow-hidden ${recommendedMode ? 'bg-[#F8FAFC] text-[#1E293B] font-body' : darkMode ? 'bg-dark-theme text-white' : 'bg-light-theme text-gray-900'}`}>
      <a href="#main-content" className={`sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 ${recommendedMode ? 'focus:bg-indigo-600 focus:text-white' : 'focus:bg-accent-blue focus:text-black'} focus:rounded-[4px] focus:font-bold`}>
        Skip to main content
      </a>
      {darkMode && <div className="noise-overlay" />}
      {darkMode && <div className="scanline" />}

      
      <div className={`absolute inset-0 ${recommendedMode ? '' : darkMode ? 'grid-bg-industrial' : 'grid-pattern-light'} opacity-[0.04]`}></div>
      
      <div className="relative z-10">
        <Navigation
          theme={theme}
          setTheme={setTheme}
          setShowShareModal={setShowShareModal}
          setShowViewModal={setShowViewModal}
          viewMode={viewMode}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
        <main id="main-content" className="max-w-7xl mx-auto px-4 md:px-8 py-8 pt-28 outline-none" tabIndex={-1}>
          <Routes>
            <Route path="/" element={
              <HomePage
                theme={theme}
                viewMode={viewMode}
                setViewMode={setViewMode}
                setSharedSkills={setSharedSkills}
                checkedSkills={checkedSkillsCount}
                totalSkills={totalSkills}
                overallProgress={overallProgress}
                getCareerMatch={getCareerMatch}
                getCategoryProgress={getCategoryProgress}
                exportData={exportData}
                importData={importData}
              />
            } />
            <Route path="/skills" element={
              <SkillsView
                theme={theme}
                viewMode={viewMode}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                filterComplete={filterComplete}
                setFilterComplete={setFilterComplete}
                getCategoryProgress={getCategoryProgress}
                displaySkills={displaySkills}
                toggleSkill={toggleSkill}
                expandedCategories={expandedCategories}
                setExpandedCategories={setExpandedCategories}
              />
            } />
            <Route path="/careers" element={
              <CareersView
                theme={theme}
                viewMode={viewMode}
                getCareerMatch={getCareerMatch}
              />
            } />
            <Route path="/jobs" element={
              <JobsView
                theme={theme}
                displaySkills={displaySkills}
              />
            } />
            <Route path="/news" element={
              <NewsView
                theme={theme}
              />
            } />
            <Route path="/career/:id" element={
              <CareerDetailView
                theme={theme}
                displaySkills={displaySkills}
                getCareerMatch={getCareerMatch}
              />
            } />
            <Route path="/view/:code" element={<div className={`text-center py-20 ${recommendedMode ? 'text-slate-900' : darkMode ? 'text-white' : 'text-gray-900'}`}>Loading shared profile...</div>} />

          </Routes>
          <Footer theme={theme} />
        </main>
      </div>
      
      {showShareModal && (
        <ShareModal
          theme={theme}
          setShowShareModal={setShowShareModal}
          generateShareCode={generateShareCode}
          copyToClipboard={copyToClipboard}
          copiedShare={copiedShare}
          setCopiedShare={setCopiedShare}
        />
      )}
      {showViewModal && (
        <ViewModal
          theme={theme}
          setShowViewModal={setShowViewModal}
          shareInput={shareInput}
          setShareInput={setShareInput}
          loadFromShareCode={loadFromShareCode}
        />
      )}
      {showPolicyModal && <PolicyModal theme={theme} setShowPolicyModal={setShowPolicyModal} />}
    </div>
  );
};

export default App;
