import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  BookOpen, Code, Shield, DollarSign, Layout, Server, Network, 
  GraduationCap, Palette, Target, TrendingUp, Award, CheckCircle, 
  Circle, Download, Upload, Share2, Eye, X, Copy, Check, Moon, Sun,
  ChevronDown, ChevronUp, Search, MessageCircle, Github, ArrowRight,
  Rocket, Users, Zap, Star, ExternalLink, Menu, XCircle, Filter,
  Briefcase, Newspaper, ShieldAlert, Activity, Key, Database, Terminal
} from 'lucide-react';
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  useParams
} from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

import skillCategoriesRaw from './data/skills.json';
import systemHealthRaw from './data/system_health.json';
import { feedService, JobListing, IntelItem } from './services/feedService';

// --- Types & Data ---

const skillCategories = skillCategoriesRaw as Record<string, string[]>;

const jobsData = feedService.getJobs();
const intelData = feedService.getIntel();

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

const skillSynonyms: Record<string, string[]> = {
  'Solidity': ['EVM Mechanics', 'Smart Contract Development', 'Production EVM Smart Contracts'],
  'Rust': ['Solana Program Development', 'Anchor Framework', 'Distributed Systems'],
  'EVM Mechanics': ['Solidity', 'Foundry', 'Hardhat'],
  'Solana Fundamentals': ['Rust', 'Anchor Framework', 'PDAs'],
  'TypeScript': ['JavaScript', 'React', 'Next.js'],
  'Backend & API': ['Distributed Systems', 'Node.js', 'PostgreSQL'],
  'Smart Contract Auditing': ['Security Best Practices', 'Vulnerability Assessment', 'Slither'],
};

const hasSkillOrSynonym = (skill: string, userSkills: Record<string, boolean>) => {
  if (userSkills[skill]) return true;
  const synonyms = skillSynonyms[skill] || [];
  return synonyms.some(syn => userSkills[syn]);
};

const matchRoadmapSkill = (roadmapSkill, userSkills) => {
  if (hasSkillOrSynonym(roadmapSkill, userSkills)) return true;
  if (roadmapSkill.endsWith(' Basics')) {
    const baseSkill = roadmapSkill.replace(' Basics', '');
    if (hasSkillOrSynonym(baseSkill, userSkills)) return true;
  }
  if (roadmapSkill.endsWith(' Advanced')) {
    const baseSkill = roadmapSkill.replace(' Advanced', '');
    if (hasSkillOrSynonym(baseSkill, userSkills)) return true;
  }
  return false;
};

// --- Components ---

const SecurityPulse = ({ darkMode }) => {
  const safetyIndex = useMemo(() => {
    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);
    const recentHacks = intelData.filter(item =>
      item.category === 'HACK' && new Date(item.date) >= last7Days
    );
    return Math.max(0, 100 - (recentHacks.length * 20));
  }, []);

  const getStatus = (index) => {
    if (index >= 80) return { label: 'OPTIMAL', color: 'text-green-500', bg: 'bg-green-500/10' };
    if (index >= 50) return { label: 'CAUTION', color: 'text-yellow-500', bg: 'bg-yellow-500/10' };
    return { label: 'CRITICAL', color: 'text-red-500', bg: 'bg-red-500/10' };
  };

  const status = getStatus(safetyIndex);

  return (
    <div className={`${darkMode ? 'surface-industrial border-accent-blue/20' : 'bg-white border-gray-200 rounded-xl'} p-6 border flex flex-col justify-center`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Shield size={16} className={darkMode ? 'text-accent-blue' : 'text-blue-600'} />
          <h3 className={`text-xs font-mono uppercase tracking-widest ${darkMode ? 'text-white' : 'text-gray-900'}`}>Security Pulse</h3>
        </div>
        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-[2px] border ${status.color} ${status.bg} border-current`}>
          {status.label}
        </span>
      </div>
      <div className="space-y-1">
        <p className={`text-3xl font-extrabold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{safetyIndex}/100</p>
        <p className={`text-[10px] font-mono uppercase tracking-widest ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>Ecosystem Safety Index</p>
      </div>
    </div>
  );
};

const SystemMetrics = ({ darkMode, totalJobs, totalIntel }) => (
  <div className={`${darkMode ? 'surface-industrial border-white/5' : 'bg-white border-gray-200 rounded-xl'} p-6 border flex justify-around items-center`}>
    <div className="text-center">
      <p className={`text-[10px] font-mono uppercase tracking-widest mb-1 ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>Total Jobs</p>
      <p className={`text-3xl font-extrabold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{totalJobs}</p>
    </div>
    <div className={`h-12 w-px ${darkMode ? 'bg-white/10' : 'bg-gray-200'}`} />
    <div className="text-center">
      <p className={`text-[10px] font-mono uppercase tracking-widest mb-1 ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>Intel Logs</p>
      <p className={`text-3xl font-extrabold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{totalIntel}</p>
    </div>
  </div>
);

const TrendingSkills = ({ darkMode, trendingSkills }) => (
  <div className={`${darkMode ? 'surface-industrial border-white/5' : 'bg-white border-gray-200 rounded-xl'} p-6 border`}>
    <div className="flex items-center gap-2 mb-4">
      <TrendingUp size={16} className={darkMode ? 'text-accent-blue' : 'text-blue-600'} />
      <h3 className={`text-xs font-mono uppercase tracking-widest ${darkMode ? 'text-white' : 'text-gray-900'}`}>Trending Skills</h3>
    </div>
    <div className="flex flex-wrap gap-2">
      {trendingSkills.map(([skill, count]) => (
        <div key={skill} className={`px-3 py-1 border ${darkMode ? 'bg-accent-blue/10 border-accent-blue/30 text-accent-blue rounded-[2px]' : 'bg-blue-50 border-blue-200 text-blue-700 rounded-full'} flex items-center gap-2`}>
          <span className="text-[10px] font-mono font-bold uppercase">{skill}</span>
          <span className={`text-[9px] ${darkMode ? 'text-cyan-300/60' : 'text-blue-500/60'}`}>({count})</span>
        </div>
      ))}
    </div>
  </div>
);

const SkillOfTheDay = ({ darkMode }) => {
  const [skill, setSkill] = useState<{ name: string; category: string } | null>(null);

  useEffect(() => {
    const categories = Object.keys(skillCategories);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const categorySkills = skillCategories[randomCategory];
    const randomSkill = categorySkills[Math.floor(Math.random() * categorySkills.length)];
    setSkill({ name: randomSkill, category: randomCategory });
  }, []);

  if (!skill) return null;

  return (
    <div className={`${darkMode ? 'surface-industrial border-accent-blue/20' : 'bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-200 rounded-xl'} p-6 border flex flex-col justify-center`}>
      <div className="flex items-center gap-2 mb-3">
        <Zap size={16} className={darkMode ? 'text-accent-blue' : 'text-indigo-600'} />
        <h3 className={`text-xs font-mono uppercase tracking-widest ${darkMode ? 'text-white' : 'text-gray-900'}`}>Skill Highlight</h3>
      </div>
      <div className="space-y-2">
        <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{skill.name}</p>
        <p className={`text-[10px] font-mono uppercase tracking-widest ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>Category: {skill.category}</p>
        <Link
          to="/skills"
          className={`inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest mt-2 ${darkMode ? 'text-accent-blue hover:underline' : 'text-indigo-600 hover:underline'}`}
        >
          Track in Tree <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  );
};

const BugBountySpotlight = ({ darkMode }) => {
  const bounties = [
    {
      protocol: 'Synthetix',
      reward: '$1,000,000',
      type: 'Smart Contract / Critical',
      link: 'https://immunefi.com/bounty/synthetix/'
    },
    {
      protocol: 'Aave',
      reward: '$500,000',
      type: 'Smart Contract / High',
      link: 'https://immunefi.com/bounty/aave/'
    },
    {
      protocol: 'Compound',
      reward: '$250,000',
      type: 'Blockchain / Critical',
      link: 'https://immunefi.com/bounty/compound/'
    }
  ];

  const [bounty, setBounty] = useState(bounties[0]);

  useEffect(() => {
    setBounty(bounties[Math.floor(Math.random() * bounties.length)]);
  }, []);

  return (
    <div className={`${darkMode ? 'surface-industrial border-accent-blue/20 bg-accent-blue/5' : 'bg-gradient-to-br from-red-50 to-orange-50 border-red-200 rounded-xl'} p-8 border relative overflow-hidden group`}>
      {darkMode && <div className="scanline" />}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-3">
          <ShieldAlert className={darkMode ? 'text-accent-blue' : 'text-red-600'} size={24} />
          <h3 className={`text-sm font-mono uppercase tracking-[0.2em] ${darkMode ? 'text-white' : 'text-gray-900'}`}>Bug Bounty Spotlight</h3>
        </div>
        <div className={`px-2 py-0.5 rounded-[2px] border ${darkMode ? 'bg-red-500/10 border-red-500/30 text-red-500' : 'bg-red-100 border-red-200 text-red-700'} text-[10px] font-mono font-bold animate-pulse`}>
          HIGH_YIELD_ALERT
        </div>
      </div>

      <div className="space-y-4 relative z-10">
        <div>
          <p className={`text-xs font-mono uppercase tracking-widest mb-1 ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>Target Protocol:</p>
          <p className={`text-3xl font-extrabold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{bounty.protocol}</p>
        </div>
        <div className="flex gap-4">
          <div>
            <p className={`text-[10px] font-mono uppercase tracking-widest mb-1 ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>Max Reward</p>
            <p className={`text-xl font-bold ${darkMode ? 'text-accent-blue' : 'text-green-600'}`}>{bounty.reward}</p>
          </div>
          <div>
            <p className={`text-[10px] font-mono uppercase tracking-widest mb-1 ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>Type</p>
            <p className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{bounty.type}</p>
          </div>
        </div>
        <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-400 font-mono' : 'text-gray-600'}`}>
          Apply your <span className="font-bold underline">Security Auditing</span> skills to identify critical vulnerabilities and secure the ecosystem.
        </p>
        <a
          href={bounty.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest px-4 py-2 transition-all ${
            darkMode ? 'bg-red-500 text-white font-bold hover:bg-red-600' : 'bg-red-600 text-white rounded-lg hover:bg-red-700'
          }`}
        >
          View Bounty <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
};

const DailyMission = ({ darkMode, displaySkills }) => {
  const [mission, setMission] = useState<{ name: string; category: string } | null>(null);

  useEffect(() => {
    const incompleteSkills: { name: string; category: string }[] = [];
    Object.entries(skillCategories).forEach(([category, skills]) => {
      skills.forEach(skill => {
        if (!displaySkills[skill]) {
          incompleteSkills.push({ name: skill, category });
        }
      });
    });

    if (incompleteSkills.length > 0) {
      const randomSkill = incompleteSkills[Math.floor(Math.random() * incompleteSkills.length)];
      setMission(randomSkill);
    }
  }, [displaySkills]);

  if (!mission) return null;

  return (
    <div className={`${darkMode ? 'surface-industrial border-accent-blue/20 bg-accent-blue/5' : 'bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200 rounded-xl'} p-8 border relative overflow-hidden group`}>
      {darkMode && <div className="scanline" />}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-3">
          <Target className={darkMode ? 'text-accent-blue' : 'text-orange-600'} size={24} />
          <h3 className={`text-sm font-mono uppercase tracking-[0.2em] ${darkMode ? 'text-white' : 'text-gray-900'}`}>Daily Mission</h3>
        </div>
        <div className={`px-2 py-0.5 rounded-[2px] border ${darkMode ? 'bg-accent-blue/10 border-accent-blue/30 text-accent-blue' : 'bg-orange-100 border-orange-200 text-orange-700'} text-[10px] font-mono font-bold animate-pulse`}>
          CORE_OBJECTIVE
        </div>
      </div>

      <div className="space-y-4 relative z-10">
        <div>
          <p className={`text-xs font-mono uppercase tracking-widest mb-1 ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>Target Module:</p>
          <p className={`text-3xl font-extrabold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{mission.name}</p>
        </div>
        <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-400 font-mono' : 'text-gray-600'}`}>
          Focus your analysis on <span className="font-bold underline">{mission.name}</span> within the <span className="font-bold">{mission.category}</span> domain today to expand your technical coverage.
        </p>
        <Link
          to="/skills"
          className={`inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest px-4 py-2 transition-all ${
            darkMode ? 'bg-accent-blue text-black font-bold hover:bg-cyan-300' : 'bg-orange-600 text-white rounded-lg hover:bg-orange-700'
          }`}
        >
          Initialize Module <ArrowRight size={14} />
        </Link>
      </div>

      {darkMode && <div className="absolute -bottom-6 -right-6 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity">
        <Target size={120} />
      </div>}
    </div>
  );
};

const Navigation = ({ theme, setTheme, setShowShareModal, setShowViewModal, viewMode, mobileMenuOpen, setMobileMenuOpen }) => {
  const location = useLocation();
  const darkMode = theme === 'dark';

  const toggleTheme = (e: any) => {
    const nextTheme = theme === 'dark' ? 'light' : theme === 'light' ? 'recommended' : 'dark';

    // @ts-ignore
    if (!document.startViewTransition) {
      setTheme(nextTheme);
      return;
    }

    // @ts-ignore
    document.startViewTransition(() => {
      setTheme(nextTheme);
    });
  };

  return (
    <nav className={`${theme === 'dark' ? 'navbar-industrial mx-0 md:mx-0 top-0 rounded-none border-b' : theme === 'light' ? 'navbar-light top-4 mx-4 md:mx-8 rounded-2xl' : 'bg-white border-b top-0 mx-0 md:mx-0 rounded-none'} sticky z-40 transition-all duration-300 focus-visible:outline-none`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3 group focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none rounded-[4px]">
            <div className="flex items-center space-x-3">
              <div className={`${darkMode ? 'bg-accent-blue rounded-[4px]' : 'bg-accent-blue rounded-xl'} w-12 h-12 p-1.5 border border-cyan-300/40 transition-all duration-300 flex items-center justify-center overflow-hidden`}>
                <img src="https://i.postimg.cc/G25Xszzm/Web3-Skills-LOGO.png" alt="Web3 Skills Logo" className="w-full h-full object-cover rounded-[2px]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className={`font-bold text-xl tracking-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Antigravity <span className={darkMode ? 'text-white' : 'text-accent-blue'}>Bughunter-CFD</span>
                  </h1>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[8px] font-mono font-bold text-green-500 tracking-tighter">LIVE</span>
                    </div>
                    <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full ${
                      (new Date().getTime() - new Date(systemHealthRaw.lastSync).getTime()) < 86400000
                        ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-500'
                        : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500'
                    } border`}>
                      <Activity size={8} className="animate-pulse" />
                      <span className="text-[8px] font-mono font-bold tracking-tighter">SYNC_HEARTBEAT</span>
                    </div>
                  </div>
                </div>
                <p className={`${darkMode ? 'label-industrial text-accent-blue/60' : 'text-[10px] font-mono uppercase tracking-[0.2em] text-gray-600'}`}>System.Core.v2</p>
              </div>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-2">
            {!viewMode && (
              <Link
                to="/"
                className={`transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none ${
                  location.pathname === '/'
                  ? (darkMode ? 'btn-industrial-primary' : 'btn-primary-light')
                    : (darkMode ? 'btn-glass-dark text-xs font-mono uppercase tracking-wider' : 'btn-glass-light text-xs font-mono uppercase tracking-wider')
                }`}
              >
                Home
              </Link>
            )}
            <Link
              to="/skills"
              className={`transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none ${
                location.pathname === '/skills'
                  ? (darkMode ? 'btn-industrial-primary' : 'btn-primary-light')
                  : (darkMode ? 'btn-glass-dark text-xs font-mono uppercase tracking-wider' : 'btn-glass-light text-xs font-mono uppercase tracking-wider')
              }`}
            >
              Skills
            </Link>
            <Link
              to="/careers"
              className={`transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none ${
                location.pathname === '/careers' || location.pathname.startsWith('/career/')
                  ? (darkMode ? 'btn-industrial-primary' : 'btn-primary-light')
                  : (darkMode ? 'btn-glass-dark text-xs font-mono uppercase tracking-wider' : 'btn-glass-light text-xs font-mono uppercase tracking-wider')
              }`}
            >
              {viewMode ? 'Match' : 'Careers'}
            </Link>
            <Link
              to="/jobs"
              className={`transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none ${
                location.pathname === '/jobs'
                  ? (darkMode ? 'btn-industrial-primary' : 'btn-primary-light')
                  : (darkMode ? 'btn-glass-dark text-xs font-mono uppercase tracking-wider' : 'btn-glass-light text-xs font-mono uppercase tracking-wider')
              }`}
            >
              Jobs
            </Link>
            <Link
              to="/news"
              className={`transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none ${
                location.pathname === '/news'
                  ? (darkMode ? 'btn-industrial-primary' : 'btn-primary-light')
                  : (darkMode ? 'btn-glass-dark text-xs font-mono uppercase tracking-wider' : 'btn-glass-light text-xs font-mono uppercase tracking-wider')
              }`}
            >
              Intel
            </Link>
            
            {!viewMode && (
              <>
                <button
                  onClick={() => setShowShareModal(true)}
                  className={`transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none ${darkMode ? 'btn-icon-dark' : 'btn-glass-light'}`}
                  title="Share Progress"
                >
                  <Share2 size={20} />
                </button>
                <button
                  onClick={() => setShowViewModal(true)}
                  className={`transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none ${darkMode ? 'btn-icon-dark' : 'btn-glass-light'}`}
                  title="View Shared"
                >
                  <Eye size={20} />
                </button>
              </>
            )}
            
            <button
              onClick={toggleTheme}
              className={`transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none ${theme === 'dark' ? 'btn-icon-dark text-yellow-300' : theme === 'light' ? 'btn-glass-light text-purple-600' : 'p-2 rounded hover:bg-gray-100 text-gray-900'}`}
            >
              {theme === 'dark' ? <Sun size={22} /> : theme === 'light' ? <img src="https://i.postimg.cc/G25Xszzm/Web3-Skills-LOGO.png" alt="Light mode" className="w-5.5 h-5.5" /> : <Moon size={22} />}
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none ${darkMode ? 'rounded-[4px]' : 'rounded-lg'}`}
          >
            {mobileMenuOpen ? (
              <XCircle className={darkMode ? 'text-white' : 'text-gray-600'} size={24} />
            ) : (
              <Menu className={darkMode ? 'text-white' : 'text-gray-600'} size={24} />
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
                    ? (darkMode ? 'bg-accent-blue text-black rounded-[4px]' : 'bg-blue-50 text-blue-600 rounded-lg')
                    : (darkMode ? 'text-slate-400 font-mono uppercase rounded-[4px]' : 'text-gray-600 rounded-lg')
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
                  ? (darkMode ? 'bg-accent-blue text-black rounded-[4px]' : 'bg-blue-50 text-blue-600 rounded-lg')
                  : (darkMode ? 'text-slate-400 font-mono uppercase rounded-[4px]' : 'text-gray-600 rounded-lg')
              }`}
            >
              Skills
            </Link>
            <Link
              to="/careers"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2 text-sm font-medium focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none ${
                location.pathname === '/careers'
                  ? (darkMode ? 'bg-accent-blue text-black rounded-[4px]' : 'bg-blue-50 text-blue-600 rounded-lg')
                  : (darkMode ? 'text-slate-400 font-mono uppercase rounded-[4px]' : 'text-gray-600 rounded-lg')
              }`}
            >
              {viewMode ? 'Career Match' : 'Careers'}
            </Link>
            <Link
              to="/jobs"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2 text-sm font-medium focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none ${
                location.pathname === '/jobs'
                  ? (darkMode ? 'bg-accent-blue text-black rounded-[4px]' : 'bg-blue-50 text-blue-600 rounded-lg')
                  : (darkMode ? 'text-slate-400 font-mono uppercase rounded-[4px]' : 'text-gray-600 rounded-lg')
              }`}
            >
              Jobs
            </Link>
            <Link
              to="/news"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2 text-sm font-medium focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none ${
                location.pathname === '/news'
                  ? (darkMode ? 'bg-accent-blue text-black rounded-[4px]' : 'bg-blue-50 text-blue-600 rounded-lg')
                  : (darkMode ? 'text-slate-400 font-mono uppercase rounded-[4px]' : 'text-gray-600 rounded-lg')
              }`}
            >
              Intel Feed
            </Link>
            <div className="flex gap-2 px-4 pt-2">
              <button
                onClick={toggleTheme}
                className={`flex-1 py-2 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}
              >
                {theme === 'dark' ? <Sun className="text-white mx-auto" size={20} /> : theme === 'light' ? <img src="https://i.postimg.cc/G25Xszzm/Web3-Skills-LOGO.png" alt="Light mode" className="w-5 h-5 mx-auto" /> : <Moon className="text-gray-900 mx-auto" size={20} />}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const HomePage = ({ darkMode, viewMode, setViewMode, setSharedSkills, checkedSkills, totalSkills, overallProgress, getCareerMatch, getCategoryProgress, exportData, importData, displaySkills }) => {
  const bestMatchName = useMemo(() => {
    return Object.keys(careerPaths).reduce((best, name) => {
      const match = getCareerMatch(name);
      const bestMatchData = getCareerMatch(best);
      return match.percentage > bestMatchData.percentage ? name : best;
    }, Object.keys(careerPaths)[0]);
  }, [getCareerMatch]);

  const trendingSkills = useMemo(() => {
    const counts: Record<string, number> = {};
    jobsData.forEach(job => {
      job.requirements.forEach(req => {
        counts[req] = (counts[req] || 0) + 1;
      });
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);
  }, []);

  return (
    <div className="space-y-12">
      {viewMode && (
        <div className={`${darkMode ? 'surface-industrial border-accent-blue/10' : 'bg-white border border-gray-200 rounded-xl'} border p-6`}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <Eye className={darkMode ? 'text-accent-blue' : 'text-blue-600'} size={24} />
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Viewing Shared Skills Profile
                </h3>
              </div>
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className={`text-sm ${darkMode ? 'text-white' : 'text-gray-600'}`}>Total Skills</p>
                  <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {checkedSkills}<span className={`text-base ${darkMode ? 'text-white' : 'text-gray-500'}`}>/{totalSkills}</span>
                  </p>
                </div>
                <div>
                  <p className={`text-sm ${darkMode ? 'text-white' : 'text-gray-600'}`}>Progress</p>
                  <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {overallProgress.toFixed(1)}%
                  </p>
                </div>
                <div>
                  <p className={`text-sm ${darkMode ? 'text-white' : 'text-gray-600'}`}>Best Match</p>
                  <p className={`text-base font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {bestMatchName}
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-white' : 'text-gray-600'}`}>
                    {getCareerMatch(bestMatchName).percentage.toFixed(0)}% match
                  </p>
                </div>
              </div>
              <p className={`text-sm ${darkMode ? 'text-white' : 'text-gray-600'}`}>
                This user has mastered skills in: {Object.entries(skillCategories).filter(([cat]) => getCategoryProgress(cat).percentage > 0).map(([cat]) => cat).slice(0, 3).join(', ')}
                {Object.entries(skillCategories).filter(([cat]) => getCategoryProgress(cat).percentage > 0).length > 3 && ` +${Object.entries(skillCategories).filter(([cat]) => getCategoryProgress(cat).percentage > 0).length - 3} more`}
              </p>
            </div>
            <button
              onClick={() => {
                setViewMode(false);
                setSharedSkills(null);
              }}
              className={`px-4 py-2 font-medium text-sm transition-colors ${
                darkMode ? 'btn-glass-dark' : 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-200'
              }`}
            >
              Exit View Mode
            </button>
          </div>
        </div>
      )}

      <div className={`text-center pt-16 pb-12 relative overflow-hidden ${darkMode ? 'bg-[#070B12]' : 'mesh-gradient'}`}>
        {darkMode && <div className="absolute inset-0 grid-bg-industrial opacity-[0.05]"></div>}
        <div className="relative z-10">
          <div className="flex justify-center mb-6">
            <div className={`${darkMode ? 'bg-accent-blue rounded-2xl' : 'bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl'} p-3 border ${darkMode ? 'border-cyan-300/50' : 'border-transparent'} flex items-center justify-center shadow-lg`}>
              <img src="https://i.postimg.cc/G25Xszzm/Web3-Skills-LOGO.png" alt="Web3 Skills Logo" className="w-12 h-12 md:w-14 md:h-14 object-cover rounded-xl" />
            </div>
          </div>
          <h1 className={`text-5xl md:text-7xl font-extrabold mb-6 ${darkMode ? 'text-white' : 'gradient-text-purple'} leading-tight`}>
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

      {!viewMode && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <SecurityPulse darkMode={darkMode} />
          <SystemMetrics darkMode={darkMode} totalJobs={jobsData.length} totalIntel={intelData.length} />
          <TrendingSkills darkMode={darkMode} trendingSkills={trendingSkills} />
          <SkillOfTheDay darkMode={darkMode} />
        </div>
      )}

      {!viewMode && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DailyMission darkMode={darkMode} displaySkills={displaySkills} />
          <BugBountySpotlight darkMode={darkMode} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {!viewMode && (
          <div className={`${darkMode ? 'surface-industrial corner-animate text-white' : 'card-white-light text-gray-900 rounded-2xl'} p-8 group transition-all duration-300 stagger-item overflow-hidden relative`}>
            {darkMode && <div className="corner-bottom" />}
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 ${darkMode ? 'rounded-[4px]' : 'rounded-xl'} flex items-center justify-center ${darkMode ? 'bg-accent-blue' : 'bg-black'}`}>
                  <TrendingUp className={darkMode ? 'text-black' : 'text-white'} size={24} />
                </div>
                <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Your Progress</h3>
              </div>
              <div className="mb-4">
                <div className={`text-5xl font-extrabold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {checkedSkills}<span className={`text-2xl font-mono ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>/{totalSkills}</span>
                </div>
              </div>
              <div className={`${darkMode ? 'progress-bar-dark' : 'progress-bar-light'} mb-3`}>
                <div className="progress-fill" style={{ width: `${overallProgress}%` }} />
              </div>
              <p className={`${darkMode ? 'label-industrial text-accent-blue/60' : 'text-xs font-mono uppercase tracking-wider text-gray-600'}`}>{overallProgress.toFixed(1)}% System Status</p>
            </div>
          </div>
        )}

        <div className={`${darkMode ? 'surface-industrial corner-animate text-white' : 'gradient-card-purple p-8 rounded-2xl text-white card-lift'} p-8 group transition-all duration-300 stagger-item overflow-hidden relative`}>
          {darkMode && <div className="corner-bottom" />}
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 ${darkMode ? 'rounded-[4px]' : 'rounded-xl'} flex items-center justify-center ${darkMode ? 'bg-accent-blue' : 'bg-white/20 backdrop-blur-sm'}`}>
                <Award className={darkMode ? 'text-black' : 'text-white'} size={24} />
              </div>
              <h3 className="text-lg font-bold">Categories Mastered</h3>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex flex-wrap gap-2">
                <span className={`badge ${darkMode ? 'badge-blue rounded' : 'badge-blue'}`}>Essentials</span>
                <span className={`badge ${darkMode ? 'badge-blue rounded' : 'badge-blue'}`}>Blockchain</span>
                <span className={`badge ${darkMode ? 'badge-blue rounded' : 'badge-blue'}`}>Rust</span>
              </div>
            </div>
            <p className={`${darkMode ? 'label-industrial text-accent-blue/60' : 'text-xs font-mono uppercase tracking-wider opacity-80'}`}>Sixteen available paths</p>
          </div>
        </div>

        {!viewMode && (
          <div className={`${darkMode ? 'surface-industrial corner-animate' : 'glass-card-light rounded-2xl'} p-8 group transition-all duration-300 stagger-item overflow-hidden relative`}>
            {darkMode && <div className="corner-bottom" />}
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className={`${darkMode ? 'w-12 h-12 rounded-[4px] bg-accent-blue' : 'w-12 h-12 rounded-xl icon-gradient-blue'} flex items-center justify-center`}>
                  <Target className="text-black" size={24} />
                </div>
                <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Career Paths</h3>
              </div>
              <div className={`text-5xl font-extrabold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{Object.keys(careerPaths).length}</div>
              <p className={`${darkMode ? 'label-industrial text-accent-blue/60' : 'text-xs font-mono uppercase tracking-wider text-gray-600'}`}>Infrastructure Roles</p>
            </div>
          </div>
        )}
      </div>

      {!viewMode && (
        <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link
            to="/skills"
          className={`${darkMode ? 'surface-industrial corner-animate border-accent-blue/10 rounded-[6px]' : 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:from-blue-100 hover:to-blue-200 rounded-2xl'} p-6 border transition-colors text-left group focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none`}
          >
            {darkMode && <div className="corner-bottom" />}
          <BookOpen className={`${darkMode ? 'text-accent-blue' : 'text-blue-600'} mb-4`} size={32} />
          <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Track Skills</h3>
          <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'} mb-4 line-clamp-2`}>
              Browse and track 300+ Web3 skills across 15 categories
            </p>
          <span className={`text-xs font-medium ${darkMode ? 'text-accent-blue font-mono' : 'text-blue-600'} flex items-center gap-2`}>
            {darkMode ? 'ACCESS_TREE' : 'Start Tracking'} <ArrowRight size={14} />
            </span>
          </Link>

          <Link
            to="/careers"
          className={`${darkMode ? 'surface-industrial corner-animate border-accent-blue/10 rounded-[6px]' : 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:from-purple-100 hover:to-purple-200 rounded-2xl'} p-6 border transition-colors text-left group focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none`}
          >
            {darkMode && <div className="corner-bottom" />}
          <Target className={`${darkMode ? 'text-accent-blue' : 'text-purple-600'} mb-4`} size={32} />
          <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Career Paths</h3>
          <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'} mb-4 line-clamp-2`}>
            Discover roadmaps and check your professional alignment
            </p>
          <span className={`text-xs font-medium ${darkMode ? 'text-accent-blue font-mono' : 'text-purple-600'} flex items-center gap-2`}>
            {darkMode ? 'VIEW_ROADMAPS' : 'View Careers'} <ArrowRight size={14} />
            </span>
          </Link>

        <Link
          to="/jobs"
          className={`${darkMode ? 'surface-industrial corner-animate border-accent-blue/10 rounded-[6px]' : 'bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:from-green-100 hover:to-green-200 rounded-2xl'} p-6 border transition-colors text-left group focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none`}
        >
          {darkMode && <div className="corner-bottom" />}
          <Briefcase className={`${darkMode ? 'text-accent-blue' : 'text-green-600'} mb-4`} size={32} />
          <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Job Board</h3>
          <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'} mb-4 line-clamp-2`}>
            Find active opportunities matching your current skill set
          </p>
          <span className={`text-xs font-medium ${darkMode ? 'text-accent-blue font-mono' : 'text-green-600'} flex items-center gap-2`}>
            {darkMode ? 'FIND_WORK' : 'Explore Jobs'} <ArrowRight size={14} />
          </span>
        </Link>

        <Link
          to="/news"
          className={`${darkMode ? 'surface-industrial corner-animate border-accent-blue/10 rounded-[6px]' : 'bg-gradient-to-br from-cyan-50 to-cyan-100 border-cyan-200 hover:from-cyan-100 hover:to-cyan-200 rounded-2xl'} p-6 border transition-colors text-left group focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none`}
        >
          {darkMode && <div className="corner-bottom" />}
          <Newspaper className={`${darkMode ? 'text-accent-blue' : 'text-cyan-600'} mb-4`} size={32} />
          <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Intel Feed</h3>
          <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'} mb-4 line-clamp-2`}>
            Stay updated with exploits, infra, and bounty news
          </p>
          <span className={`text-xs font-medium ${darkMode ? 'text-accent-blue font-mono' : 'text-cyan-600'} flex items-center gap-2`}>
            {darkMode ? 'GET_INTEL' : 'View Feed'} <ArrowRight size={14} />
          </span>
        </Link>
      </div>

      {/* Latest Intel Preview Section */}
      <div className={`${darkMode ? 'surface-industrial border-white/5' : 'bg-white border-gray-200 rounded-2xl'} p-8 border`}>
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <ShieldAlert className={darkMode ? 'text-accent-blue' : 'text-red-600'} size={24} />
            <div className="flex items-center gap-3">
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white font-mono uppercase text-sm tracking-widest' : 'text-gray-900'}`}>Latest System Intel</h2>
              <div className="flex items-center gap-2 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[8px] font-mono font-bold text-green-500 tracking-tighter">SYNC_OK // {intelData[0]?.date || 'RECENT'}</span>
              </div>
            </div>
          </div>
          <Link to="/news" className={`text-xs font-mono uppercase tracking-widest ${darkMode ? 'text-accent-blue hover:underline' : 'text-blue-600 hover:underline'}`}>View All Logs</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {intelData.slice(0, 3).map((item, i) => (
            <div key={i} className={`p-4 ${darkMode ? 'bg-white/[0.02] border border-white/5 rounded-[4px]' : 'bg-gray-50 border border-gray-100 rounded-xl'}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-[10px] font-mono px-2 py-0.5 border rounded-[2px] ${
                  item.category === 'HACK' ? (darkMode ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-red-50 text-red-600 border-red-200') :
                  item.category === 'INFRA' ? (darkMode ? 'bg-accent-blue/10 text-accent-blue border-accent-blue/20' : 'bg-blue-50 text-blue-600 border-blue-200') :
                  (darkMode ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-green-50 text-green-600 border-green-200')
                }`}>
                  {item.category}
                </span>
                <span className={`text-[10px] font-mono ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>{item.date}</span>
              </div>
              <h4 className={`font-bold text-sm mb-2 line-clamp-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{item.title}</h4>
              <p className={`text-xs leading-relaxed line-clamp-2 ${darkMode ? 'text-slate-400 font-mono text-[10px]' : 'text-gray-600'}`}>{item.summary}</p>
            </div>
          ))}
        </div>
      </div>
        </>
      )}

      {/* RiWoT Community Section */}
      <div className={`${darkMode ? 'surface-industrial border-accent-blue/10' : 'bg-gradient-to-br from-green-50 to-blue-50 border-green-200 rounded-2xl'} p-8 md:p-12 border relative overflow-hidden`}>
        {darkMode && <div className="absolute inset-0 grid-bg-industrial opacity-[0.03]"></div>}
        <div className="text-center mb-8 relative z-10">
          <div className="flex justify-center mb-4">
            <Users className={darkMode ? 'text-accent-blue' : 'text-green-600'} size={48} />
          </div>
          <h2 className={`text-3xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {darkMode ? 'RIWOT_COMMUNITY.CONNECT' : 'Join RiWoT Community'}
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-slate-400 font-mono text-sm' : 'text-gray-600'}`}>
            Connect with Web3 developers, get mentorship, and accelerate your learning journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8 relative z-10">
          <div className={`${darkMode ? 'bg-white/[0.02] p-6 rounded border border-white/5' : ''}`}>
            <h3 className={`font-bold text-lg mb-4 ${darkMode ? 'text-white font-mono uppercase text-sm' : 'text-gray-900'}`}>Target Knowledge:</h3>
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
                  <Code className={darkMode ? 'text-accent-blue flex-shrink-0' : 'text-blue-600 flex-shrink-0'} size={18} />
                  <span className={darkMode ? 'text-slate-300 text-sm' : 'text-gray-700'}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={`${darkMode ? 'bg-white/[0.02] p-6 rounded border border-white/5' : ''}`}>
            <h3 className={`font-bold text-lg mb-4 ${darkMode ? 'text-white font-mono uppercase text-sm' : 'text-gray-900'}`}>Access Benefits:</h3>
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
                  <Star className={darkMode ? 'text-accent-blue flex-shrink-0' : 'text-blue-600 flex-shrink-0'} size={18} />
                  <span className={darkMode ? 'text-slate-300 text-sm' : 'text-gray-700'}>{item}</span>
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
            className={`inline-flex items-center gap-2 whitespace-nowrap transition-colors ${
              darkMode ? 'btn-industrial-primary px-8 py-3' : 'bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium'
            }`}
          >
            <MessageCircle size={20} />
            {darkMode ? 'CONNECT_DISCORD' : 'Join Discord'}
            <ArrowRight size={18} />
          </a>
          <a
            href="https://github.com/orgs/RiWoTWeb3/repositories"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 whitespace-nowrap transition-colors ${
              darkMode ? 'btn-glass-dark px-8 py-3 border-white/10 text-xs font-mono uppercase tracking-widest' : 'bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg font-medium'
            }`}
          >
            <Github size={20} />
            {darkMode ? 'VIEW_REPOS' : 'View GitHub'}
            <ArrowRight size={18} />
          </a>
        </div>
      </div>

      {/* Data Management Section */}
      {!viewMode && (
        <div className={`${darkMode ? 'surface-industrial border-accent-blue/10' : 'bg-white border-gray-200 rounded-xl'} p-6 border`}>
          <div className="flex flex-wrap justify-between items-center gap-4">
            <h3 className={`font-semibold ${darkMode ? 'text-white font-mono uppercase text-sm' : 'text-gray-900'}`}>Manage Progress</h3>
            <div className="flex gap-3">
              <button
                onClick={exportData}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  darkMode ? 'btn-glass-dark text-xs font-mono uppercase' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Download size={16} />
                Export
              </button>
              <label className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                darkMode ? 'btn-glass-dark text-xs font-mono uppercase' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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

const SkillsView = ({ darkMode, viewMode, searchQuery, setSearchQuery, filterComplete, setFilterComplete, getCategoryProgress, displaySkills, toggleSkill, expandedCategories, setExpandedCategories }) => {
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
      <div className="mb-8">
        <h1 className={`text-5xl font-extrabold mb-4 ${darkMode ? 'text-white' : 'text-gray-900 text-shadow'}`}>
          {darkMode ? 'MODULE_DATABASE' : 'All Skills'}
        </h1>
        <p className={`text-xl ${darkMode ? 'text-slate-400 font-mono text-sm uppercase' : 'text-gray-700'}`}>
          Track your progress across Web3 skills
        </p>
      </div>

      {!viewMode && (
        <div className={`${darkMode ? 'surface-industrial' : 'glass-card-light rounded-2xl'} p-6`}>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1">
              <div className="relative">
                <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-accent-blue' : 'text-gray-500'}`} size={20} />
                <input
                  type="text"
                  placeholder={darkMode ? 'SEARCH_SYSTEM_REGISTRY...' : 'Search skills...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`${darkMode ? 'input-glass-dark font-mono rounded-[4px]' : 'input-glass-light rounded-xl'} w-full pl-12 pr-4 py-3 focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none`}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFilterComplete('all')}
                className={`px-5 py-3 text-sm font-semibold transition-all focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none ${
                  filterComplete === 'all'
                    ? (darkMode ? 'btn-industrial-primary' : 'btn-primary-light rounded-xl')
                    : (darkMode ? 'btn-glass-dark text-xs font-mono uppercase rounded-[4px]' : 'btn-glass-light rounded-xl')
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterComplete('complete')}
                className={`px-5 py-3 text-sm font-semibold transition-all focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none ${
                  filterComplete === 'complete'
                    ? (darkMode ? 'bg-green-500 text-black font-mono uppercase rounded-[4px]' : 'bg-green-500 text-black rounded-xl')
                    : (darkMode ? 'btn-glass-dark text-xs font-mono uppercase rounded-[4px]' : 'btn-glass-light rounded-xl')
                }`}
              >
                Complete
              </button>
              <button
                onClick={() => setFilterComplete('incomplete')}
                className={`px-5 py-3 text-sm font-semibold transition-all focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none ${
                  filterComplete === 'incomplete'
                    ? (darkMode ? 'bg-red-500 text-white font-mono uppercase rounded-[4px]' : 'bg-red-500 text-white rounded-xl')
                    : (darkMode ? 'btn-glass-dark text-xs font-mono uppercase rounded-[4px]' : 'btn-glass-light rounded-xl')
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
          <div key={categoryName} className={`${darkMode ? 'surface-industrial corner-animate border-white/5 rounded-[6px]' : 'glass-card-light rounded-2xl'} p-6 overflow-hidden`}>
            {darkMode && <div className="corner-bottom" />}
            <div
              className="flex flex-wrap justify-between items-center mb-4 gap-3 cursor-pointer group"
              onClick={() => setExpandedCategories(prev => ({ ...prev, [categoryName]: !prev[categoryName] }))}
            >
              <div className="flex items-center gap-3">
                <h2 className={`text-2xl font-bold transition-colors ${darkMode ? 'text-white group-hover:text-accent-blue' : 'text-gray-900 group-hover:text-purple-600'}`}>
                  {categoryName}
                </h2>
                {expandedCategories[categoryName] ? (
                  <ChevronUp className={darkMode ? 'text-accent-blue' : 'text-gray-600'} size={24} />
                ) : (
                  <ChevronDown className={darkMode ? 'text-accent-blue' : 'text-gray-600'} size={24} />
                )}
              </div>
              <div className="flex items-center gap-4">
                <span className={`text-sm font-mono ${darkMode ? 'text-slate-400' : 'text-gray-700'}`}>
                  {progress.checked}/{progress.total}
                </span>
                <div className={`w-32 ${darkMode ? 'progress-bar-dark' : 'progress-bar-light'}`}>
                  <div
                    className="progress-fill"
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
                        ? (darkMode ? 'bg-accent-blue/10 border border-accent-blue/30 rounded-[4px]' : 'bg-green-50 rounded-xl')
                        : (darkMode ? 'hover:bg-white/5 border border-transparent rounded-[4px]' : 'hover:bg-purple-100/50 rounded-xl')
                    }`}
                  >
                    {!viewMode && (
                      <div className="relative flex items-center justify-center">
                        <input
                          type="checkbox"
                          checked={displaySkills[skill] || false}
                          onChange={() => toggleSkill(skill)}
                          className={`peer appearance-none w-5 h-5 transition-all cursor-pointer ${darkMode ? 'border border-accent-blue/30 rounded-sm checked:bg-accent-blue' : 'border-2 border-white/20 rounded-md checked:bg-accent-blue'}`}
                        />
                        {displaySkills[skill] && (
                          <Check className="absolute w-3.5 h-3.5 text-black transition-opacity pointer-events-none" strokeWidth={4} />
                        )}
                      </div>
                    )}
                    {viewMode && (
                      displaySkills[skill] ? (
                        <CheckCircle className="text-accent-blue flex-shrink-0" size={20} />
                      ) : (
                        <Circle className={darkMode ? 'text-white/10' : 'text-gray-400'} size={20} />
                      )
                    )}
                    <span
                      className={`transition-all duration-300 font-medium ${
                        displaySkills[skill]
                          ? (darkMode ? 'text-white' : 'text-gray-400 line-through')
                          : (darkMode ? 'text-slate-400 group-hover:text-white' : 'text-gray-700 group-hover:text-gray-900')
                      } ${darkMode ? 'text-sm font-mono uppercase tracking-tight' : ''}`}
                    >
                      {skill}
                    </span>
                    {displaySkills[skill] && darkMode && (
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

const JobsView = ({ darkMode, displaySkills }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [salaryFilter, setSalaryFilter] = useState(0);

  const getJobAlignment = (requirements: string[]) => {
    const matched = requirements.filter(req => hasSkillOrSynonym(req, displaySkills));
    return (matched.length / requirements.length) * 100;
  };

  const getMissingSkills = (requirements: string[]) => {
    return requirements.filter(req => !displaySkills[req]);
  };

  const getBestCareerFit = (requirements: string[]) => {
    let bestMatch = { name: 'General Web3', count: 0 };
    Object.entries(careerPaths).forEach(([name, path]) => {
      const matchCount = requirements.filter(req => path.requiredSkills.includes(req)).length;
      if (matchCount > bestMatch.count) {
        bestMatch = { name, count: matchCount };
      }
    });
    return bestMatch.name;
  };

  const filteredJobs = jobsData.filter(job => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.requirements.some(req => req.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = categoryFilter === 'All' || job.type === categoryFilter;

    const salaryMatch = job.salaryRange.match(/\$(\d{1,3}(?:,\d{3})*)/);
    const minSalary = salaryMatch ? parseInt(salaryMatch[1].replace(/,/g, '')) : 0;
    const matchesSalary = minSalary >= salaryFilter;

    return matchesSearch && matchesCategory && matchesSalary;
  });

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className={`text-5xl font-extrabold mb-4 ${darkMode ? 'text-white' : 'text-gray-900 text-shadow'}`}>
          {darkMode ? 'JOB_BOARD.INFRA' : 'Active Web3 Jobs'}
        </h1>
        <p className={`text-xl ${darkMode ? 'text-slate-400 font-mono text-sm uppercase' : 'text-gray-700'}`}>
          Identify opportunities and check your alignment
        </p>
      </div>

      <div className={`${darkMode ? 'surface-industrial' : 'bg-blue-50 border-blue-200 rounded-2xl'} p-6 border`}>
        <div className="flex items-start gap-4">
          <ShieldAlert className={darkMode ? 'text-accent-blue' : 'text-blue-600'} size={24} />
          <div>
            <h3 className={`font-bold mb-2 ${darkMode ? 'text-white font-mono uppercase text-sm' : 'text-gray-900'}`}>Educational Policy Notice</h3>
            <p className={`text-sm ${darkMode ? 'text-slate-400 font-mono text-xs' : 'text-gray-700'}`}>
              These listings are displayed for educational and skill alignment purposes only. Salary ranges are estimates and roles represent current market requirements. We do not provide direct job placement or guarantees.
            </p>
          </div>
        </div>
      </div>

      <div className={`${darkMode ? 'surface-industrial' : 'glass-card-light rounded-2xl'} p-6`}>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <div className="relative">
              <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-accent-blue' : 'text-gray-500'}`} size={20} />
              <input
                type="text"
                placeholder={darkMode ? 'SEARCH_JOBS_REGISTRY...' : 'Search jobs, companies, or skills...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`${darkMode ? 'input-glass-dark font-mono rounded-[4px]' : 'input-glass-light rounded-xl'} w-full pl-12 pr-4 py-3 focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none`}
              />
            </div>
          </div>
          <div className="flex gap-2">
            {['All', 'EVM', 'SVM', 'Backend'].map(cat => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-5 py-3 text-sm font-semibold transition-all focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none ${
                  categoryFilter === cat
                    ? (darkMode ? 'btn-industrial-primary' : 'btn-primary-light rounded-xl')
                    : (darkMode ? 'btn-glass-dark text-xs font-mono uppercase rounded-[4px]' : 'btn-glass-light rounded-xl')
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center gap-4">
          <label className={`text-xs font-mono uppercase tracking-widest ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>Min Salary:</label>
          <select
            value={salaryFilter}
            onChange={(e) => setSalaryFilter(parseInt(e.target.value))}
            className={`${darkMode ? 'bg-[#0f172a] border-white/10 text-white rounded-[4px]' : 'bg-white border-gray-300 text-gray-900 rounded-lg'} text-xs font-mono px-3 py-2 focus:ring-2 focus:ring-accent-blue outline-none`}
          >
            <option value={0}>Any Range</option>
            <option value={100000}>$100,000+</option>
            <option value={150000}>$150,000+</option>
            <option value={200000}>$200,000+</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {filteredJobs.length > 0 ? filteredJobs.map(job => {
          const alignment = getJobAlignment(job.requirements);
          const missingSkills = getMissingSkills(job.requirements);
          const bestFit = getBestCareerFit(job.requirements);

          return (
            <div
              key={job.id}
              className={`${darkMode ? 'surface-industrial corner-animate border-white/5 rounded-[6px]' : 'glass-card-light rounded-2xl'} p-8 transition-all duration-300 relative overflow-hidden`}
            >
              {darkMode && <div className="corner-bottom" />}
              <div className="space-y-6 relative z-10">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-6">
                  <div className="space-y-3">
                    <h3 className={`text-3xl font-extrabold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{job.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className={`inline-flex px-3 py-1 text-[10px] font-mono border ${
                        darkMode ? 'bg-accent-blue/10 text-accent-blue border-accent-blue/30 rounded-[2px]' : 'bg-blue-100 text-blue-700 border-blue-200 rounded-full'
                      }`}>
                        {job.isSystemExample ? 'SYSTEM EXAMPLE' : 'AVAILABLE ROLE'}
                      </span>
                      {bestFit !== 'General Web3' && (
                        <Link
                          to={`/career/${encodeURIComponent(bestFit)}`}
                          className={`inline-flex px-3 py-1 text-[10px] font-mono border ${
                            darkMode ? 'bg-purple-500/10 text-purple-400 border-purple-500/30 rounded-[2px] hover:bg-purple-500/20' : 'bg-purple-50 text-purple-700 border-purple-200 rounded-full hover:bg-purple-100'
                          } transition-colors`}
                        >
                          BEST FIT: {bestFit.toUpperCase()}
                        </Link>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 md:justify-end md:text-right">
                    <div>
                      <p className={`text-[10px] font-mono uppercase tracking-widest mb-1 ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>Alignment</p>
                      <p className={`text-4xl leading-none font-extrabold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{alignment.toFixed(0)}%</p>
                    </div>
                    <a
                      href={job.applyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center justify-center gap-2 text-[10px] font-mono uppercase tracking-widest px-3 py-2 border transition-all whitespace-nowrap self-end md:self-auto ${
                        darkMode ? 'bg-accent-blue/10 border-accent-blue/30 text-accent-blue hover:bg-accent-blue/20 rounded-[2px]' : 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 rounded'
                      }`}
                    >
                      Protocol Link <ExternalLink size={12} />
                    </a>
                  </div>
                </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div>
                      <p className={`text-[10px] font-mono uppercase tracking-widest mb-1 ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>Company</p>
                      <p className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{job.company}</p>
                    </div>
                    <div>
                      <p className={`text-[10px] font-mono uppercase tracking-widest mb-1 ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>Stack</p>
                      <p className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{job.type}</p>
                    </div>
                    <div>
                      <p className={`text-[10px] font-mono uppercase tracking-widest mb-1 ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>Salary</p>
                      <p className={`font-bold ${darkMode ? 'text-accent-blue' : 'text-green-600'}`}>{job.salaryRange}</p>
                    </div>
                  </div>

                  <div>
                    <p className={`text-[10px] font-mono uppercase tracking-widest mb-3 ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>Required Stack</p>
                    <div className="flex flex-wrap gap-2">
                      {job.requirements.map(req => (
                        <div
                          key={req}
                          className={`flex items-center gap-2 px-3 py-1.5 border ${
                            hasSkillOrSynonym(req, displaySkills)
                              ? (darkMode ? 'bg-accent-blue/10 text-accent-blue border-accent-blue/30 rounded-[2px]' : 'bg-green-50 text-green-700 border-green-200 rounded')
                              : (darkMode ? 'bg-white/[0.02] text-slate-500 border-white/10 rounded-[2px]' : 'bg-gray-100 text-gray-500 border-gray-200 rounded')
                          }`}
                        >
                          {hasSkillOrSynonym(req, displaySkills) ? <CheckCircle size={12} className="text-accent-blue" /> : <Circle size={12} className="opacity-30" />}
                          <span className="text-[11px] font-mono">{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                {missingSkills.length > 0 && (
                    <div className={`p-4 ${darkMode ? 'bg-white/[0.02] border border-white/5 rounded-[4px]' : 'bg-orange-50 border border-orange-100 rounded-xl'}`}>
                      <p className={`text-[10px] font-mono uppercase tracking-widest mb-2 ${darkMode ? 'text-accent-blue' : 'text-orange-700'}`}>Recommended Learning</p>
                      <p className={`text-xs ${darkMode ? 'text-slate-400 font-mono' : 'text-gray-600'}`}>
                        To align with this role, consider learning: <span className="font-bold">{missingSkills.join(', ')}</span>
                      </p>
                    </div>
                  )}
                  </div>
              
            </div>
          );
        }) : (
          <div className={`text-center py-20 ${darkMode ? 'surface-industrial border-white/5 rounded-[6px]' : 'bg-gray-50 border-gray-200 rounded-2xl'}`}>
            <XCircle className={`mx-auto mb-4 ${darkMode ? 'text-slate-600' : 'text-gray-400'}`} size={48} />
            <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>No matching opportunities found</h3>
            <p className={`mt-2 ${darkMode ? 'text-slate-400 font-mono text-sm' : 'text-gray-600'}`}>Adjust your search or filter criteria to see more roles.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const DataRefreshStatus = ({ darkMode }) => {
  const health = systemHealthRaw;
  const chartData = [...health.syncHistory].reverse();

  return (
    <div className={`${darkMode ? 'surface-industrial border-accent-blue/20' : 'bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200 rounded-xl'} p-6 border mb-8`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Activity className={darkMode ? 'text-accent-blue' : 'text-cyan-600'} size={20} />
          <h3 className={`font-bold ${darkMode ? 'text-white font-mono uppercase text-sm' : 'text-gray-900'}`}>Data Sync Intelligence</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-[2px] ${health.status === 'HEALTHY' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
            {health.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <p className={`text-[10px] font-mono uppercase tracking-widest ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>Last Synchronization</p>
              <p className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{new Date(health.lastSync).toLocaleString()}</p>
            </div>
            <div className="space-y-1">
              <p className={`text-[10px] font-mono uppercase tracking-widest ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>Sync Protocol</p>
              <p className={`text-sm font-bold ${darkMode ? 'text-accent-blue' : 'text-blue-600'}`}>RIWOT_DATA_AGGREGATOR_V2</p>
            </div>
            <div className="space-y-1">
              <p className={`text-[10px] font-mono uppercase tracking-widest ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>Network Latency</p>
              <p className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>42ms</p>
            </div>
            <div className="space-y-1">
              <p className={`text-[10px] font-mono uppercase tracking-widest ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>Health Status</p>
              <p className={`text-sm font-bold ${darkMode ? 'text-green-500' : 'text-green-600'}`}>OPTIMIZED</p>
            </div>
          </div>

          <div className="mt-6">
            <p className={`text-[10px] font-mono uppercase tracking-widest mb-3 ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>Sync History</p>
            <div className="flex flex-wrap gap-2">
              {health.syncHistory.map((h, i) => (
                <div key={i} className={`px-3 py-1.5 border rounded-[2px] flex items-center gap-2 ${darkMode ? 'bg-white/[0.02] border-white/10' : 'bg-white border-gray-100'}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${h.status === 'SUCCESS' ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className={`text-[9px] font-mono ${darkMode ? 'text-slate-300' : 'text-gray-600'}`}>{h.date} // +{h.itemsAdded}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={`h-48 w-full ${darkMode ? 'bg-black/20' : 'bg-white/50'} rounded-lg p-4 border ${darkMode ? 'border-white/5' : 'border-gray-100'}`}>
          <p className={`text-[10px] font-mono uppercase tracking-widest mb-4 ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>Sync Volume Trend</p>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="date" hide />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  backgroundColor: darkMode ? '#0f172a' : '#fff',
                  border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #e2e8f0',
                  fontSize: '10px',
                  fontFamily: 'monospace'
                }}
              />
              <Bar dataKey="itemsAdded">
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={darkMode ? '#00f2ff' : '#2563eb'} fillOpacity={0.6 + (index / chartData.length) * 0.4} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const KeyHealthHeatmap = ({ darkMode, keys }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-500';
      case 'Exhausted': return 'bg-red-500';
      case 'RateLimited': return 'bg-yellow-500';
      default: return 'bg-slate-700';
    }
  };

  return (
    <div className={`${darkMode ? 'surface-industrial border-white/5' : 'bg-white border-gray-200 rounded-xl'} p-6 border mb-8`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Layout className={darkMode ? 'text-accent-blue' : 'text-blue-600'} size={20} />
          <h3 className={`font-bold ${darkMode ? 'text-white font-mono uppercase text-sm' : 'text-gray-900'}`}>Key Health Heatmap</h3>
        </div>
        <div className="flex gap-4">
          {['Healthy', 'Exhausted', 'RateLimited'].map(status => (
            <div key={status} className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${getStatusColor(status === 'Healthy' ? 'Active' : status)}`} />
              <span className={`text-[10px] font-mono ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>{status}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-2">
        {keys.map((k) => (
          <div
            key={k.id}
            className="group relative"
          >
            <div className={`aspect-square rounded-[2px] ${getStatusColor(k.status)} opacity-80 hover:opacity-100 transition-all cursor-crosshair shadow-[inset_0_0_10px_rgba(0,0,0,0.2)]`} />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-32 p-2 bg-black text-white text-[9px] font-mono rounded border border-white/10 opacity-0 group-hover:opacity-100 pointer-events-none z-20 shadow-xl">
              <p className="border-b border-white/10 pb-1 mb-1">{k.id}</p>
              <p>MODEL: {k.model}</p>
              <p>USAGE: {k.usage}/{k.limit}</p>
              <p>STATUS: {k.status.toUpperCase()}</p>
            </div>
          </div>
        ))}
        {Array.from({ length: Math.max(0, 48 - keys.length) }).map((_, i) => (
          <div key={`empty-${i}`} className={`aspect-square rounded-[2px] ${darkMode ? 'bg-white/5' : 'bg-gray-100'} border border-dashed ${darkMode ? 'border-white/5' : 'border-gray-200'}`} />
        ))}
      </div>
    </div>
  );
};

const SystemIntelligenceTerminal = ({ darkMode, logs }) => {
  return (
    <div className={`${darkMode ? 'surface-industrial border-white/5' : 'bg-white border-gray-200 rounded-xl'} border flex flex-col h-[400px]`}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <Terminal size={14} className={darkMode ? 'text-accent-blue' : 'text-blue-600'} />
          <h3 className={`text-[10px] font-mono uppercase tracking-widest ${darkMode ? 'text-white' : 'text-gray-900'}`}>System Intelligence Terminal</h3>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500/50" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
          <div className="w-2 h-2 rounded-full bg-green-500/50" />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 font-mono text-[10px] space-y-1.5 scrollbar-thin">
        {logs.map((log, i) => (
          <div key={i} className="flex gap-3 group">
            <span className={darkMode ? 'text-slate-600' : 'text-gray-400'}>[{log.time}]</span>
            <span className={darkMode ? 'text-slate-500' : 'text-gray-500'}>riwot@system:~$</span>
            <span className={`${
              log.type === 'success' ? 'text-green-500' :
              log.type === 'warning' ? 'text-yellow-500' :
              log.type === 'error' ? 'text-red-500' :
              darkMode ? 'text-accent-blue' : 'text-blue-600'
            }`}>
              {log.msg}
            </span>
            {log.type === 'success' && <Check size={10} className="text-green-500 opacity-0 group-hover:opacity-100" />}
          </div>
        ))}
        <div className="flex gap-3 animate-pulse">
          <span className={darkMode ? 'text-slate-600' : 'text-gray-400'}>[{new Date().toLocaleTimeString()}]</span>
          <span className={darkMode ? 'text-slate-500' : 'text-gray-500'}>riwot@system:~$</span>
          <span className={darkMode ? 'text-accent-blue' : 'text-blue-600'}>awaiting_next_aggregation_cycle...</span>
          <span className="w-1.5 h-3 bg-accent-blue inline-block" />
        </div>
      </div>
    </div>
  );
};

const AdminPanelView = ({ darkMode }) => {
  const [stats, setStats] = useState({
    activeKeys: 0,
    totalAudits: 0,
    bugsFound: 0,
    systemStatus: 'ONLINE',
    uptime: '14d 6h 22m'
  });

  const [keys, setKeys] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [findings, setFindings] = useState([]);
  const [logs, setLogs] = useState([]);

  const coverage = useMemo(() => {
    const allSkills = Object.values(skillCategories).flat();
    const coveredSkills = new Set();

    jobsData.forEach(job => {
      job.requirements.forEach(req => coveredSkills.add(req));
    });

    intelData.forEach(item => {
      allSkills.forEach(skill => {
        if (item.title.includes(skill) || item.summary.includes(skill)) {
          coveredSkills.add(skill);
        }
      });
    });

    return {
      percentage: (coveredSkills.size / allSkills.length) * 100,
      count: coveredSkills.size,
      total: allSkills.length
    };
  }, []);

  const marketData = useMemo(() => {
    const counts = { EVM: 0, SVM: 0, Backend: 0 };
    jobsData.forEach(job => {
      if (counts.hasOwnProperty(job.type)) {
        counts[job.type as keyof typeof counts]++;
      }
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, []);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const [statsRes, keysRes, auditsRes, findingsRes, logsRes] = await Promise.all([
          fetch('/api/stats'),
          fetch('/api/keys'),
          fetch('/api/audits'),
          fetch('/api/findings'),
          fetch('/api/logs')
        ]);

        if (statsRes.ok) setStats(await statsRes.json());
        if (keysRes.ok) setKeys(await keysRes.json());
        if (auditsRes.ok) setAuditLogs(await auditsRes.json());
        if (findingsRes.ok) setFindings(await findingsRes.json());
        if (logsRes.ok) setLogs(await logsRes.json());
      } catch (error) {
        console.error('Failed to fetch admin data:', error);
      }
    };

    fetchAdminData();
    const interval = setInterval(fetchAdminData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8 animate-slideUp">
      <div className="mb-8">
        <h1 className={`text-5xl font-extrabold mb-4 ${darkMode ? 'text-white' : 'text-gray-900 text-shadow'}`}>
          {darkMode ? 'SYSTEM_MONITOR.CORE' : 'System Control Center'}
        </h1>
        <p className={`text-xl ${darkMode ? 'text-slate-400 font-mono text-sm uppercase' : 'text-gray-700'}`}>
          Autonomous Audit Engine & API Quota Intelligence
        </p>
      </div>

      <div className={`${darkMode ? 'bg-accent-blue/10 border-accent-blue/30' : 'bg-blue-50 border-blue-200'} border p-4 mb-8 rounded-[4px]`}>
        <p className={`text-xs font-mono ${darkMode ? 'text-accent-blue' : 'text-blue-700'} flex items-center gap-2`}>
          <ShieldAlert size={14} />
          SYSTEM NOTICE: Displaying real-time simulated metrics from local SQLite environment.
          Audit logs synchronized with project-relative path: prisma/dev.db
        </p>
      </div>

      <DataRefreshStatus darkMode={darkMode} />

      <KeyHealthHeatmap darkMode={darkMode} keys={keys} />

      {/* Market Distribution Chart */}
      <div className={`${darkMode ? 'surface-industrial border-white/5' : 'bg-white border-gray-200 rounded-xl'} p-6 border mb-8`}>
        <div className="flex items-center gap-3 mb-6">
          <Briefcase className={darkMode ? 'text-accent-blue' : 'text-blue-600'} size={20} />
          <h3 className={`font-bold ${darkMode ? 'text-white font-mono uppercase text-sm' : 'text-gray-900'}`}>Market Opportunity Distribution</h3>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={marketData} layout="vertical">
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" stroke={darkMode ? '#94a3b8' : '#64748b'} fontSize={12} width={80} />
              <Tooltip
                cursor={{ fill: 'transparent' }}
                contentStyle={{
                  backgroundColor: darkMode ? '#0f172a' : '#fff',
                  border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #e2e8f0',
                  fontSize: '10px',
                  fontFamily: 'monospace'
                }}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {marketData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.name === 'EVM' ? '#2563eb' : entry.name === 'SVM' ? '#9333ea' : '#10b981'}
                    fillOpacity={0.8}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'System Status', value: stats.systemStatus, icon: Activity, color: 'text-green-500' },
          { label: 'Active API Keys', value: stats.activeKeys || 12, icon: Key, color: 'text-accent-blue' },
          { label: 'Autonomous Audits', value: stats.totalAudits || 154, icon: Database, color: 'text-purple-500' },
          { label: 'KB Coverage', value: `${coverage.percentage.toFixed(1)}%`, icon: BookOpen, color: 'text-orange-500' },
        ].map((stat, i) => (
          <div key={i} className={`${darkMode ? 'surface-industrial border-white/5' : 'bg-white border-gray-200 rounded-xl'} p-6 border`}>
            <div className="flex items-center justify-between mb-4">
              <p className={`text-[10px] font-mono uppercase tracking-widest ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>{stat.label}</p>
              <stat.icon size={16} className={stat.color} />
            </div>
            <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {findings.length > 0 && (
        <div className={`${darkMode ? 'surface-industrial border-accent-blue/20 bg-accent-blue/5' : 'bg-red-50 border-red-200'} p-6 border mb-8 rounded-[4px]`}>
          <div className="flex items-center gap-3 mb-6">
            <ShieldAlert className={darkMode ? 'text-accent-blue' : 'text-red-600'} size={20} />
            <h3 className={`font-bold ${darkMode ? 'text-white font-mono uppercase text-sm' : 'text-gray-900'}`}>Recent Critical Findings</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {findings.map((finding: any) => (
              <div key={finding.id} className={`${darkMode ? 'bg-black/40 border-white/5' : 'bg-white border-gray-100'} p-4 border rounded-[2px]`}>
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-[2px] ${
                    finding.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-400' : 'bg-orange-500/20 text-orange-400'
                  }`}>
                    {finding.severity}
                  </span>
                  <span className={`text-[9px] font-mono ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>{finding.vulnerability_type}</span>
                </div>
                <p className={`text-xs font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{finding.file_path}</p>
                <p className={`text-[10px] ${darkMode ? 'text-slate-400' : 'text-gray-600'} line-clamp-2`}>{finding.ai_reasoning}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* API Key Health Map */}
        <div className={`${darkMode ? 'surface-industrial border-white/5' : 'bg-white border-gray-200 rounded-xl'} p-6 border`}>
          <div className="flex items-center gap-3 mb-6">
            <Key className={darkMode ? 'text-accent-blue' : 'text-blue-600'} size={20} />
            <h3 className={`font-bold ${darkMode ? 'text-white font-mono uppercase text-sm' : 'text-gray-900'}`}>API Key Health Map</h3>
          </div>
          <div className="space-y-4">
            {keys.map((k) => (
              <div key={k.id} className={`p-4 ${darkMode ? 'bg-white/[0.02] border-white/5' : 'bg-gray-50 border-gray-100'} border rounded-[4px]`}>
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-xs font-mono ${darkMode ? 'text-white' : 'text-gray-900'}`}>{k.id} // {k.model}</span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 border rounded-[2px] ${
                    k.status === 'Active' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'
                  }`}>
                    {k.status}
                  </span>
                </div>
                <div className={`w-full h-1.5 ${darkMode ? 'bg-white/5' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                  <div
                    className={`h-full transition-all duration-1000 ${k.status === 'Active' ? 'bg-accent-blue' : 'bg-red-500'}`}
                    style={{ width: `${(k.usage / k.limit) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <span className={`text-[9px] font-mono ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>USAGE: {k.usage}/{k.limit}</span>
                  <span className={`text-[9px] font-mono ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>{((k.usage / k.limit) * 100).toFixed(1)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Audit Stream */}
        <div className="space-y-8">
          <div className={`${darkMode ? 'surface-industrial border-white/5' : 'bg-white border-gray-200 rounded-xl'} p-6 border`}>
            <div className="flex items-center gap-3 mb-6">
              <Terminal className={darkMode ? 'text-accent-blue' : 'text-blue-600'} size={20} />
              <h3 className={`font-bold ${darkMode ? 'text-white font-mono uppercase text-sm' : 'text-gray-900'}`}>Live Audit Stream</h3>
            </div>
            <div className="space-y-3">
              {auditLogs.map((log) => (
                <div key={log.id} className={`p-3 ${darkMode ? 'bg-white/[0.02] border-white/5' : 'bg-gray-50 border-gray-100'} border rounded-[4px]`}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{log.project}</p>
                      <p className={`text-[10px] font-mono ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>ID: {log.id} // PHASE: {log.phase}/6</p>
                    </div>
                    <span className={`text-[9px] font-mono px-2 py-0.5 border rounded-[2px] ${
                      log.status === 'COMPLETED' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-blue-500/10 text-accent-blue border-blue-500/20'
                    }`}>
                      {log.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-accent-blue" style={{ width: `${(log.phase / 6) * 100}%` }} />
                    </div>
                    <span className={`text-[10px] font-mono ${darkMode ? 'text-accent-blue' : 'text-blue-600'}`}>{log.findings} FINDINGS</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <SystemIntelligenceTerminal darkMode={darkMode} logs={logs} />
        </div>
      </div>
    </div>
  );
};

const NewsView = ({ darkMode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const stats = useMemo(() => {
    const counts = { HACK: 0, INFRA: 0, BOUNTY: 0, OTHER: 0 };
    intelData.forEach(item => {
      if (counts.hasOwnProperty(item.category)) {
        counts[item.category as keyof typeof counts]++;
      } else {
        counts.OTHER++;
      }
    });
    return counts;
  }, [intelData]);

  const filteredIntel = intelData.filter(item => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'HACK': return darkMode ? 'text-red-500' : 'text-red-600';
      case 'INFRA': return darkMode ? 'text-accent-blue' : 'text-blue-600';
      case 'BOUNTY': return darkMode ? 'text-green-500' : 'text-green-600';
      default: return darkMode ? 'text-white' : 'text-gray-900';
    }
  };

  const getCategoryBg = (category: string) => {
    switch (category) {
      case 'HACK': return darkMode ? 'bg-red-500/10 border-red-500/30' : 'bg-red-50 border-red-200';
      case 'INFRA': return darkMode ? 'bg-accent-blue/10 border-accent-blue/30' : 'bg-blue-50 border-blue-200';
      case 'BOUNTY': return darkMode ? 'bg-green-500/10 border-green-500/30' : 'bg-green-50 border-green-200';
      default: return darkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'HACK': return <ShieldAlert className="flex-shrink-0" size={18} />;
      case 'INFRA': return <Newspaper className="flex-shrink-0" size={18} />;
      case 'BOUNTY': return <Award className="flex-shrink-0" size={18} />;
      default: return <Server className="flex-shrink-0" size={18} />;
    }
  };

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className={`text-5xl font-extrabold mb-4 ${darkMode ? 'text-white' : 'text-gray-900 text-shadow'}`}>
          {darkMode ? 'SYSTEM_LOG.INTEL' : 'Web3 Intel Feed'}
        </h1>
        <p className={`text-xl ${darkMode ? 'text-slate-400 font-mono text-sm uppercase' : 'text-gray-700'}`}>
          Latest updates from the blockchain ecosystem
        </p>
      </div>

      {/* Intel Stats Feature */}
      <div className={`${darkMode ? 'surface-industrial border-accent-blue/20' : 'bg-gradient-to-br from-slate-50 to-blue-50 border-slate-200 rounded-2xl'} p-6 border mb-8 grid grid-cols-2 md:grid-cols-4 gap-4`}>
        {[
          { label: 'Total Logs', value: intelData.length, icon: Database, color: 'text-accent-blue' },
          { label: 'Security Hacks', value: stats.HACK, icon: ShieldAlert, color: 'text-red-500' },
          { label: 'Infra Updates', value: stats.INFRA, icon: Newspaper, color: 'text-blue-500' },
          { label: 'Bug Bounties', value: stats.BOUNTY, icon: Award, color: 'text-green-500' },
        ].map((s, i) => (
          <div key={i} className="space-y-1">
            <div className="flex items-center gap-2">
              <s.icon size={14} className={s.color} />
              <p className={`text-[10px] font-mono uppercase tracking-widest ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>{s.label}</p>
            </div>
            <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className={`${darkMode ? 'surface-industrial' : 'glass-card-light rounded-2xl'} p-6 mb-8`}>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <div className="relative">
              <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-accent-blue' : 'text-gray-500'}`} size={20} />
              <input
                type="text"
                placeholder={darkMode ? 'SEARCH_INTEL_REGISTRY...' : 'Search news, hacks, or bounties...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`${darkMode ? 'input-glass-dark font-mono rounded-[4px]' : 'input-glass-light rounded-xl'} w-full pl-12 pr-4 py-3 focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none`}
              />
            </div>
          </div>
          <div className="flex gap-2">
            {['All', 'HACK', 'INFRA', 'BOUNTY'].map(cat => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-5 py-3 text-sm font-semibold transition-all focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none ${
                  categoryFilter === cat
                    ? (darkMode ? 'btn-industrial-primary' : 'btn-primary-light rounded-xl')
                    : (darkMode ? 'btn-glass-dark text-xs font-mono uppercase rounded-[4px]' : 'btn-glass-light rounded-xl')
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredIntel.length > 0 ? filteredIntel.map((item, idx) => (
          <div
            key={idx}
            className={`${darkMode ? 'surface-industrial border-white/5' : 'bg-white border-gray-200 rounded-2xl'} p-6 border group hover:border-accent-blue/30 transition-all overflow-hidden relative`}
          >
            {darkMode && <div className="absolute top-0 right-0 p-4 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity">
              {getCategoryIcon(item.category)}
            </div>}

            <div className="flex items-start gap-6 relative z-10">
              <div className={`mt-1 p-2 rounded ${getCategoryBg(item.category)} ${getCategoryColor(item.category)}`}>
                {getCategoryIcon(item.category)}
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-mono px-2 py-0.5 border rounded-[2px] ${getCategoryBg(item.category)} ${getCategoryColor(item.category)}`}>
                      {item.category}
                    </span>
                    <span className={`text-[10px] font-mono ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>{item.date}</span>
                  </div>
                </div>

                <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white group-hover:text-accent-blue' : 'text-gray-900'}`}>
                  {item.title}
                </h3>

                <p className={`text-sm leading-relaxed mb-6 ${darkMode ? 'text-slate-400 font-mono text-xs' : 'text-gray-600'}`}>
                  {item.summary}
                </p>

                <div className="flex items-center justify-between">
                  <a
                    href={item.sourceLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 whitespace-nowrap text-[10px] font-mono uppercase tracking-widest border border-transparent hover:border-current px-0 py-1 transition-all ${darkMode ? 'text-accent-blue' : 'text-blue-600'}`}
                  >
                    <span>Establish Secure Link</span>
                    <ExternalLink size={12} className="shrink-0" />
                  </a>
                  {darkMode && <div className="text-[8px] font-mono text-slate-700 uppercase tracking-tighter">Verified_Source_Protocol // 0x...{item.title.length.toString(16)}</div>}
                </div>
              </div>
            </div>
          </div>
        )) : (
          <div className={`text-center py-20 ${darkMode ? 'surface-industrial border-white/5 rounded-[6px]' : 'bg-gray-50 border-gray-200 rounded-2xl'}`}>
            <XCircle className={`mx-auto mb-4 ${darkMode ? 'text-slate-600' : 'text-gray-400'}`} size={48} />
            <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>No intel logs found</h3>
            <p className={`mt-2 ${darkMode ? 'text-slate-400 font-mono text-sm' : 'text-gray-600'}`}>Adjust your search or filter criteria to see more intel.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const CareersView = ({ darkMode, viewMode, getCareerMatch }) => {
  const evmCareers = Object.entries(careerPaths).filter(([_, career]) => career.ecosystem === 'EVM');
  const solanaCareers = Object.entries(careerPaths).filter(([_, career]) => career.ecosystem === 'Solana');

  const CareerCard = ({ careerName, career }) => {
    const match = getCareerMatch(careerName);
    const Icon = career.icon;
    return (
      <div
        key={careerName}
        className={`${darkMode ? 'surface-industrial corner-animate border-white/5 rounded-[6px]' : 'glass-card-light rounded-2xl'} p-6 transition-all duration-300 group relative overflow-hidden`}
      >
        {darkMode && <div className="corner-bottom" />}
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className={`text-xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{careerName}</h3>
              <p className={`${darkMode ? 'label-industrial text-accent-blue/60' : 'text-xs font-mono uppercase tracking-wider text-gray-600'}`}>{career.ecosystem}</p>
            </div>
            <div className={`${darkMode ? 'bg-accent-blue rounded' : 'icon-gradient-blue rounded-xl'} p-3`}>
              <Icon className="text-black" size={24} />
            </div>
          </div>

          <p className={`text-sm mb-4 line-clamp-2 ${darkMode ? 'text-slate-400 font-mono text-xs' : 'text-gray-600'}`}>{career.description}</p>

          <div className="mb-4">
            <div className={`${darkMode ? 'progress-bar-dark' : 'progress-bar-light'} mb-2`}>
              <div className="progress-fill" style={{ width: `${match.percentage}%` }} />
            </div>
            <p className={`text-xs font-mono ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
              {match.percentage.toFixed(0)}% alignment • {match.matched}/{match.total} units
            </p>
          </div>

          {!viewMode && (
            <Link
              to={`/career/${encodeURIComponent(careerName)}`}
              className={`${darkMode ? 'btn-industrial-primary' : 'btn-primary-light rounded-xl'} w-full py-3 px-6 font-bold transition-all duration-300 flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none`}
            >
              {darkMode ? 'ACCESS_ROADMAP' : 'View Roadmap'}
              <ArrowRight size={16} />
            </Link>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="mb-8 animate-slideUp">
        <h1 className={`text-5xl font-extrabold mb-4 ${darkMode ? 'text-white' : 'text-gray-900 text-shadow'}`}>
          {darkMode ? 'CAREER_MATRICES' : 'Career Paths'}
        </h1>
        <p className={`text-xl ${darkMode ? 'text-slate-400 font-mono text-sm uppercase' : 'text-gray-700'}`}>
          Explore Web3 career paths with detailed roadmaps
        </p>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className={`h-8 w-1 bg-accent-blue ${darkMode ? '' : 'rounded-full'}`} />
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white font-mono uppercase text-lg' : 'text-gray-900'}`}>EVM Ecosystem</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {evmCareers.map(([name, career]) => (
            <CareerCard key={name} careerName={name} career={career} />
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className={`h-8 w-1 bg-accent-blue ${darkMode ? '' : 'rounded-full'}`} />
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white font-mono uppercase text-lg' : 'text-gray-900'}`}>Solana Ecosystem</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solanaCareers.map(([name, career]) => (
            <CareerCard key={name} careerName={name} career={career} />
          ))}
        </div>
      </div>
    </div>
  );
};

const CareerDetailView = ({ darkMode, displaySkills, getCareerMatch }) => {
  const { id } = useParams();
  const careerName = decodeURIComponent(id || "");
  const career = careerPaths[careerName];

  if (!career) return (
      <div className="text-center py-20">
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Career path not found</h2>
          <Link to="/careers" className={`${darkMode ? 'text-white' : 'text-accent-blue'} mt-4 inline-block`}>Back to Careers</Link>
      </div>
  );

  const match = getCareerMatch(careerName);
  const Icon = career.icon;

  return (
    <div className="space-y-8">
      <Link
        to="/careers"
        className={`flex items-center gap-2 text-sm font-mono uppercase tracking-wider transition-colors ${
          darkMode ? 'text-slate-500 hover:text-white' : 'text-blue-600 hover:text-blue-700'
        }`}
      >
        <ArrowRight size={16} className="rotate-180" />
        Back to Careers
      </Link>

      <div>
        <div className="flex items-start gap-4 mb-8">
          <div className={`${darkMode ? 'p-4 bg-accent-blue rounded' : 'p-4 rounded-xl bg-gray-100 border'}`}>
            <Icon className={darkMode ? 'text-black' : 'text-blue-600'} size={32} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className={`text-4xl font-extrabold ${darkMode ? 'text-white' : 'text-gray-900 text-shadow'}`}>{careerName}</h1>
              <span className={`px-3 py-1 ${darkMode ? 'rounded-[2px]' : 'rounded-full'} text-xs font-mono uppercase tracking-wider ${
                darkMode
                  ? 'bg-accent-blue/10 text-accent-blue border border-accent-blue/30'
                  : (career.ecosystem === 'EVM'
                    ? 'bg-blue-500/10 text-blue-600 border border-blue-500/20'
                    : career.ecosystem === 'Solana'
                      ? 'bg-purple-500/10 text-purple-600 border border-purple-500/20'
                      : 'bg-green-500/10 text-green-600 border border-green-500/20')
              }`}>
                {career.ecosystem}
              </span>
            </div>
            <p className={`text-lg leading-relaxed ${darkMode ? 'text-slate-400 font-mono text-sm uppercase' : 'text-gray-600'}`}>{career.description}</p>
          </div>
        </div>

        <div className={`${darkMode ? 'surface-industrial border-white/5' : 'bg-blue-50 border-blue-200 rounded-2xl'} p-8`}>
          <div className="flex justify-between items-center mb-4">
            <span className={`text-sm font-mono uppercase tracking-[0.2em] ${darkMode ? 'text-accent-blue' : 'text-gray-900'}`}>{darkMode ? 'COMPATIBILITY_ALIGNMENT' : 'System Compatibility'}</span>
            <span className={`text-sm font-mono ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
              {match.matched}/{match.total} Units
            </span>
          </div>
    <div className={`w-full ${darkMode ? 'bg-white/5' : 'bg-white'} ${darkMode ? 'rounded-none' : 'rounded-full'} h-3 overflow-hidden border ${darkMode ? 'border-white/5' : 'border-gray-100'}`}>
            <div
              className={`bg-accent-blue h-full ${darkMode ? 'rounded-none' : 'rounded-full'} transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(0,255,255,0.5)]`}
              style={{ width: `${match.percentage}%` }}
            />
          </div>
          <p className={`text-xs font-mono uppercase tracking-widest ${darkMode ? 'text-slate-400' : 'text-gray-500'} mt-3`}>
            {match.percentage.toFixed(1)}% Alignment
          </p>
        </div>
      </div>

      <div className={`${darkMode ? 'surface-industrial border-white/5 rounded-[6px]' : 'bg-white border-gray-200 rounded-2xl'} p-8`}>
        <h2 className={`${darkMode ? 'label-industrial text-accent-blue/80' : 'text-sm font-mono uppercase tracking-[0.2em] text-gray-900'} mb-8`}>{darkMode ? 'CORE_PREREQUISITES' : 'Core Prerequisites'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {career.requiredSkills.map(skill => (
            <div
              key={skill}
              className={`flex items-center gap-3 p-4 transition-all duration-300 ${
                darkMode ? 'bg-white/[0.03] border border-white/5 hover:border-accent-blue/30 rounded-[4px]' : 'bg-gray-50 rounded'
              }`}
            >
              {hasSkillOrSynonym(skill, displaySkills) ? (
                <CheckCircle className="text-accent-blue flex-shrink-0" size={20} />
              ) : (
                <Circle className={darkMode ? 'text-white/10' : 'text-gray-300'} size={20} />
              )}
              <span
                className={`text-sm font-medium ${
                  hasSkillOrSynonym(skill, displaySkills)
                    ? (darkMode ? 'text-white' : 'text-gray-900')
                    : (darkMode ? 'text-slate-400' : 'text-gray-600')
                } ${darkMode ? 'font-mono uppercase text-xs tracking-tight' : ''}`}
              >
                {skill}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className={`${darkMode ? 'surface-industrial border-white/5 rounded-[6px]' : 'bg-white border-gray-200 rounded-2xl'} p-8`}>
        <h2 className={`${darkMode ? 'label-industrial text-accent-blue/80' : 'text-sm font-mono uppercase tracking-[0.2em] text-gray-900'} mb-12`}>
          {darkMode ? 'PHASE_SEQUENCING' : 'System Roadmap Phases'}
        </h2>
        <div className="space-y-12">
          {career.roadmap.map((phase, index) => (
            <div key={index} className="relative">
              <div className="flex items-start gap-4 pb-12">
                <div className="flex flex-col items-center self-stretch">
                  <div className={`${darkMode ? 'bg-[#070B12] border-accent-blue text-accent-blue shadow-[0_0_10px_rgba(0,255,255,0.3)] rounded-[4px]' : 'bg-white border-blue-600 text-blue-600 rounded-full'} border-2 font-mono w-8 h-8 flex items-center justify-center text-xs shrink-0`}>
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  {index < career.roadmap.length - 1 && (
                    <div className={`w-px flex-1 mt-3 ${darkMode ? 'bg-accent-blue/10' : 'bg-gray-200'}`} />
                  )}
                </div>
                <div className="flex-1 pt-1">
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <h3 className={`text-xl font-bold ${darkMode ? 'text-white font-mono uppercase tracking-tight' : 'text-gray-900'}`}>
                      {phase.phase}
                    </h3>
                    <span className={`px-3 py-1 text-xs font-mono uppercase tracking-wider ${
                      darkMode ? 'bg-accent-blue/10 text-accent-blue border border-accent-blue/20 rounded-[2px]' : 'bg-gray-100 text-gray-600 rounded'
                    }`}>
                      {phase.duration}
                    </span>
                  </div>

                  <div className="mb-8">
                    <h4 className={`${darkMode ? 'label-industrial text-slate-400' : 'text-xs font-mono uppercase tracking-widest text-gray-600'} mb-4`}>
                      {darkMode ? 'TARGET_UNIT_DATABASE' : 'Target Modules'}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {phase.skills.map(skill => {
                        const isCompleted = matchRoadmapSkill(skill, displaySkills);
                        return (
                          <span
                            key={skill}
                            className={`px-3 py-1.5 text-xs font-mono transition-all ${
                              isCompleted
                                ? (darkMode ? 'bg-accent-blue/20 text-accent-blue border border-accent-blue/40 shadow-[0_0_8px_rgba(0,255,255,0.2)] rounded-[2px]' : 'bg-green-100 text-green-700 rounded')
                                : (darkMode ? 'bg-white/[0.02] text-slate-400 border border-white/5 rounded-[2px]' : 'bg-gray-100 text-gray-600 rounded')
                            }`}
                          >
                            {skill}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <h4 className={`${darkMode ? 'label-industrial text-slate-400' : 'text-xs font-mono uppercase tracking-widest text-gray-600'} mb-4`}>
                      {darkMode ? 'ACCESS_PROTOCOLS' : 'Access Protocols'}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {phase.resources.map((resource, idx) => (
                        <a
                          key={idx}
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-start gap-4 p-4 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none ${
                            darkMode ? 'bg-white/[0.03] border border-white/5 hover:border-accent-blue/30 hover:bg-white/[0.06] rounded-[4px]' : 'bg-gray-50 hover:bg-gray-100 border rounded'
                          }`}
                        >
                          <BookOpen className={darkMode ? 'text-accent-blue flex-shrink-0' : 'text-blue-600 flex-shrink-0'} size={20} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-sm font-bold truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                {resource.name}
                              </span>
                              <ExternalLink className={darkMode ? 'text-slate-400' : 'text-gray-400'} size={14} />
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`text-[10px] font-mono px-2 py-0.5 border ${
                                resource.type.includes('FREE')
                                  ? (darkMode ? 'bg-green-500/10 text-green-400 border-green-500/20 rounded-[2px]' : 'bg-green-100 text-green-700 rounded')
                                  : (darkMode ? 'bg-accent-blue/10 text-accent-blue border-accent-blue/20 rounded-[2px]' : 'bg-blue-100 text-blue-700 rounded')
                              }`}>
                                {resource.type}
                              </span>
                              {resource.duration && (
                                <span className={`text-[10px] font-mono ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
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
        <div className={`${darkMode ? 'surface-industrial border-accent-blue/10 rounded-[6px]' : 'bg-gradient-to-br from-green-50 to-blue-50 border-green-200 rounded-2xl'} p-8`}>
          <h2 className={`${darkMode ? 'label-industrial text-accent-blue/80' : 'text-sm font-mono uppercase tracking-[0.2em] text-gray-900'} mb-8`}>
            {darkMode ? 'ESTIMATED_ECOSYSTEM_YIELD' : 'Estimated Ecosystem Yield'}
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {career.outcomes.junior && (
              <div className="space-y-1">
                <p className={`text-[10px] font-mono uppercase tracking-widest ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>Entry Level</p>
                <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-green-600'}`}>{career.outcomes.junior}</p>
              </div>
            )}
            {career.outcomes.mid && (
              <div className="space-y-1">
                <p className={`text-[10px] font-mono uppercase tracking-widest ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>Intermediate</p>
                <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-green-600'}`}>{career.outcomes.mid}</p>
              </div>
            )}
            {career.outcomes.senior && (
              <div className="space-y-1">
                <p className={`text-[10px] font-mono uppercase tracking-widest ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>Advanced</p>
                <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-green-600'}`}>{career.outcomes.senior}</p>
              </div>
            )}
            {career.outcomes.lead && (
              <div className="space-y-1">
                <p className={`text-[10px] font-mono uppercase tracking-widest ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>Principal</p>
                <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-green-600'}`}>{career.outcomes.lead}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const ShareModal = ({ darkMode, setShowShareModal, generateShareCode, copyToClipboard, copiedShare, setCopiedShare }) => (
  <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
    <div className={`${darkMode ? 'surface-industrial border-accent-blue/20' : 'bg-white rounded-2xl'} max-w-md w-full p-6 relative`}>
      {darkMode && <div className="scanline" />}
      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Share Progress</h2>
        <button
          onClick={() => setShowShareModal(false)}
          className={`p-2 rounded-lg ${darkMode ? 'hover:bg-white/5' : 'hover:bg-gray-100'}`}
        >
          <X className={darkMode ? 'text-white' : 'text-gray-600'} size={20} />
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
              : (darkMode ? 'btn-glass-dark' : 'bg-gray-100 hover:bg-gray-200 text-gray-700')
          }`}
        >
          {copiedShare ? <Check size={20} /> : <Copy size={20} />}
          {copiedShare ? 'Copied!' : 'Copy Share Code'}
        </button>
        <div className={`p-3 rounded-lg ${darkMode ? 'bg-white/5 border border-white/10' : 'bg-gray-100'}`}>
          <p className={`text-xs font-mono break-all ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>
            {generateShareCode()}
          </p>
        </div>
        <p className={`text-xs text-center ${darkMode ? 'text-white' : 'text-gray-500'}`}>
          Share this code with others to show your progress
        </p>
      </div>
    </div>
  </div>
);

const ViewModal = ({ darkMode, setShowViewModal, shareInput, setShareInput, loadFromShareCode }) => (
  <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
    <div className={`${darkMode ? 'surface-industrial border-accent-blue/20' : 'bg-white rounded-2xl'} max-w-md w-full p-6 relative`}>
      {darkMode && <div className="scanline" />}
      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>View Shared Progress</h2>
        <button
          onClick={() => setShowViewModal(false)}
          className={`p-2 rounded-lg ${darkMode ? 'hover:bg-white/5' : 'hover:bg-gray-100'}`}
        >
          <X className={darkMode ? 'text-white' : 'text-gray-600'} size={20} />
        </button>
      </div>
      <div className="space-y-4">
        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-700'}`}>
            Paste Share Code
          </label>
          <input
            type="text"
            placeholder="Enter code..."
            value={shareInput}
            onChange={(e) => setShareInput(e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg ${
              darkMode ? 'input-glass-dark' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>
        <button
          onClick={() => {
            if (shareInput.trim()) {
              loadFromShareCode(shareInput.trim());
            }
          }}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
            darkMode ? 'btn-primary-dark' : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          Load Progress
        </button>
      </div>
    </div>
  </div>
);

const PolicyModal = ({ darkMode, setShowPolicyModal }) => (
  <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
    <div className={`${darkMode ? 'surface-industrial border-accent-blue/20' : 'bg-white rounded-2xl'} max-w-2xl w-full p-6 md:p-8 max-h-[90vh] overflow-y-auto relative`}>
      {darkMode && <div className="scanline" />}
      <div className="mb-6">
        <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Welcome to Web3 Skills RiWoT
        </h2>
        <p className={`text-sm ${darkMode ? 'text-white' : 'text-gray-600'}`}>
          Please read and accept our terms before using the platform
        </p>
      </div>

      <div className={`space-y-4 text-sm ${darkMode ? 'text-white' : 'text-gray-700'}`}>
        <div className={`p-4 ${darkMode ? 'rounded-[4px]' : 'rounded-lg'} ${darkMode ? 'bg-yellow-900/20 border border-yellow-800' : 'bg-yellow-50 border border-yellow-200'}`}>
          <h3 className={`font-bold mb-2 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-yellow-800'}`}>
            <Star size={18} />
            Important Disclaimer
          </h3>
          <p className={darkMode ? 'text-white' : 'text-yellow-900'}>
            This platform provides educational resources and career guidance for Web3 development. While we mention salary ranges and career outcomes, <strong>we do not guarantee employment or specific compensation</strong>. These are industry estimates based on market research as of 2025.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className={`font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>What We Provide</h3>
            <ul className="space-y-2 ml-4">
              <li>• Curated learning resources and roadmaps</li>
              <li>• Skills tracking and progress management</li>
              <li>• Career path guidance and match analysis</li>
              <li>• Links to free and paid educational content</li>
              <li>• Community access through RiWoT</li>
            </ul>
          </div>

          <div>
            <h3 className={`font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>What We Expect</h3>
            <ul className="space-y-2 ml-4">
              <li>• You take responsibility for your own learning journey</li>
              <li>• You verify all external resources before use</li>
              <li>• You understand that career outcomes vary by individual effort</li>
              <li>• You use the platform ethically and honestly</li>
            </ul>
          </div>
        </div>

        <div className={`p-4 ${darkMode ? 'rounded-[4px]' : 'rounded-lg'} ${darkMode ? 'bg-white/5 border border-white/10' : 'bg-blue-50 border border-blue-200'}`}>
          <h3 className={`font-bold mb-2 ${darkMode ? 'text-accent-blue' : 'text-blue-800'}`}>Privacy & Data Storage</h3>
          <ul className="space-y-2">
            <li><strong>What we store:</strong> Your skill selections, progress data, and theme preferences</li>
            <li><strong>Where we store it:</strong> Locally in your browser's localStorage (not on our servers)</li>
            <li><strong>Who has access:</strong> Only you. Data never leaves your device unless you share it</li>
            <li><strong>How long we keep it:</strong> Until you clear your browser data or uninstall</li>
            <li><strong>Sharing:</strong> Optional. You control if/when to generate share codes</li>
            <li><strong>Third parties:</strong> None. We don't use analytics or tracking</li>
          </ul>
        </div>

        <div>
          <h3 className={`font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>External Resources</h3>
          <p>
            We link to third-party platforms (Cyfrin Updraft, Turbin3, YouTube, etc.). We are not responsible for their content, availability, or policies. Some resources may require payment or registration.
          </p>
        </div>

        <div>
          <h3 className={`font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Salary Information</h3>
          <p>
            Salary ranges shown are estimates based on 2025 market research. Actual compensation depends on location, experience, company, market conditions, and individual negotiation. Bug bounty earnings are highly variable.
          </p>
        </div>

        <div>
          <h3 className={`font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Open Source</h3>
          <p>
            This project is open source. You can view the code, suggest improvements, or report issues on{' '}
            <a href="https://github.com/mirmohmmadluqman/web3skills" target="_blank" rel="noopener noreferrer" className={darkMode ? 'text-accent-blue hover:text-white' : 'text-blue-600 hover:text-blue-700'}>
              GitHub
            </a>.
          </p>
        </div>
      </div>

      <div className={`mt-6 pt-6 border-t ${darkMode ? 'border-white/10' : 'border-gray-200'}`}>
        <button
          onClick={() => {
            localStorage.setItem('web3skills_policy_accepted', 'true');
            setShowPolicyModal(false);
          }}
          className={`w-full py-3 px-4 font-bold transition-all focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none ${
            darkMode ? 'btn-industrial-primary' : 'bg-blue-600 hover:bg-blue-700 text-white rounded-lg'
          }`}
        >
          I Understand and Accept
        </button>
        <p className={`text-xs text-center mt-3 ${darkMode ? 'text-white' : 'text-gray-500'}`}>
          By accepting, you agree to use this platform at your own discretion
        </p>
      </div>
    </div>
  </div>
);

const Footer = ({ darkMode }) => (
  <footer className={`mt-32 pb-16 ${darkMode ? 'border-accent-blue/10 bg-black/40' : 'border-gray-200'} border-t pt-16`}>
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className={`${darkMode ? 'bg-accent-blue rounded-[4px]' : 'bg-gray-100 rounded-lg'} p-1 border border-cyan-300/40 flex items-center justify-center overflow-hidden`} style={{ width: '40px', height: '40px' }}>
              <img src="https://i.postimg.cc/G25Xszzm/Web3-Skills-LOGO.png" alt="Web3 Skills Logo" className="w-full h-full object-cover rounded-[2px]" />
            </div>
            <span className={`font-bold text-lg tracking-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>Web3 Skills <span className={darkMode ? 'text-accent-blue' : 'text-accent-blue'}>RiWoT</span></span>
          </div>
          <p className={`text-sm leading-relaxed max-w-sm ${darkMode ? 'text-slate-400 font-mono text-xs uppercase' : 'text-gray-600'}`}>
            A technical infrastructure platform for Web3 career development and skill verification.
            Built for the decentralized future.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/RiWoTWeb3"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none ${darkMode ? 'btn-icon-dark text-accent-blue border-accent-blue/20' : 'bg-gray-100 text-gray-700 p-2 rounded-lg'}`}
            >
              <Github size={20} />
            </a>
            <a
              href="https://discord.gg/qMd7jwV7UG"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none ${darkMode ? 'btn-icon-dark text-accent-blue border-accent-blue/20' : 'bg-gray-100 text-gray-700 p-2 rounded-lg'}`}
            >
              <MessageCircle size={20} />
            </a>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 md:justify-items-end">
          <div className="space-y-4">
            <h4 className={`${darkMode ? 'label-industrial text-accent-blue/80' : 'text-[10px] font-mono uppercase tracking-[0.2em] text-gray-900 font-bold'}`}>Infrastructure</h4>
            <ul className={`space-y-2 text-sm font-mono ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
              <li><Link to="/skills" className={`${darkMode ? 'hover:text-accent-blue' : 'hover:text-accent-blue'} transition-colors focus-visible:ring-1 focus-visible:ring-accent-blue focus-visible:outline-none rounded-[2px]`}>Skill Tree</Link></li>
              <li><Link to="/careers" className={`${darkMode ? 'hover:text-accent-blue' : 'hover:text-accent-blue'} transition-colors focus-visible:ring-1 focus-visible:ring-accent-blue focus-visible:outline-none rounded-[2px]`}>Roadmaps</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className={`${darkMode ? 'label-industrial text-accent-blue/80' : 'text-[10px] font-mono uppercase tracking-[0.2em] text-gray-900 font-bold'}`}>Resources</h4>
            <ul className={`space-y-2 text-sm font-mono ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
              <li><a href="https://github.com/RiWoTWeb3" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'hover:text-accent-blue' : 'hover:text-accent-blue'} transition-colors focus-visible:ring-1 focus-visible:ring-accent-blue focus-visible:outline-none rounded-[2px]`}>RiWoT Org</a></li>
              <li><a href="https://discord.gg/qMd7jwV7UG" target="_blank" rel="noopener noreferrer" className={`${darkMode ? 'hover:text-accent-blue' : 'hover:text-accent-blue'} transition-colors focus-visible:ring-1 focus-visible:ring-accent-blue focus-visible:outline-none rounded-[2px]`}>Discord</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className={`mt-16 pt-8 border-t ${darkMode ? 'border-accent-blue/10' : 'border-gray-100'} flex flex-col md:flex-row justify-between items-center gap-4`}>
        <p className={`${darkMode ? 'label-industrial text-slate-400' : 'text-[10px] font-mono uppercase tracking-widest text-gray-500'}`}>
          © 2025 SYSTEM.RIWOT.CORE // ALL RIGHTS RESERVED
        </p>
        <p className={`${darkMode ? 'label-industrial text-slate-400' : 'text-[10px] font-mono uppercase tracking-widest text-gray-500'}`}>
          CREATED BY <a href="https://mirmohmmadluqman.github.io/portfolio/" target="_blank" rel="noopener noreferrer" className={darkMode ? 'text-accent-blue hover:underline transition-all focus-visible:ring-1 focus-visible:ring-accent-blue focus-visible:outline-none rounded-[2px]' : 'text-accent-blue hover:underline'}>LUQMAN</a>
        </p>
      </div>
    </div>
  </footer>
);

// --- Main App Component ---

const SystemStatusBanner = ({ darkMode }) => {
  const [block, setBlock] = useState(19456782);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlock(prev => prev + Math.floor(Math.random() * 2));
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`w-full py-1.5 px-4 flex items-center justify-between border-b ${
      darkMode
        ? 'bg-accent-blue/5 border-accent-blue/20 text-accent-blue'
        : 'bg-blue-600 text-white border-blue-700'
    }`}>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Activity size={12} className="animate-pulse" />
          <span className="text-[10px] font-mono font-bold tracking-[0.2em]">AUTONOMOUS_AUDITOR: ACTIVE_SCANNING</span>
        </div>
        <div className={`hidden md:block h-3 w-px ${darkMode ? 'bg-accent-blue/20' : 'bg-white/20'}`} />
        <div className="hidden md:flex items-center gap-2">
          <Terminal size={12} />
          <span className="text-[10px] font-mono opacity-80 uppercase">Primary_Node: 0x8a7...f2e</span>
        </div>
      </div>
      <div className="flex items-center gap-4 text-[10px] font-mono">
        <span className="opacity-80">BLOCK: {block}</span>
        <span className="hidden sm:inline opacity-80">TIME: {new Date().toLocaleTimeString()}</span>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
          <span className="font-bold">STATUS_OK</span>
        </div>
      </div>
    </div>
  );
};

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

  const [theme, setTheme] = useState<'dark' | 'light' | 'recommended'>(() => {
    const savedTheme = localStorage.getItem('web3skills_theme');
    if (savedTheme) return savedTheme as 'dark' | 'light' | 'recommended';

    // Fallback for legacy darkmode key
    const savedDarkMode = localStorage.getItem('web3skills_darkmode');
    if (savedDarkMode !== null) {
      return JSON.parse(savedDarkMode) ? 'dark' : 'light';
    }

    return 'dark';
  });

  const darkMode = theme === 'dark';

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
    localStorage.setItem('web3skills_theme', theme);
    document.documentElement.classList.remove('dark', 'light', 'theme-recommended');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else if (theme === 'recommended') {
      document.documentElement.classList.add('theme-recommended');
    }
  }, [theme]);

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
      skill => hasSkillOrSynonym(skill, currentSkills)
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

  return (
    <div className={`min-h-screen transition-all relative overflow-hidden ${darkMode ? 'bg-dark-theme text-white' : 'bg-light-theme text-gray-900'}`}>
      {darkMode && <div className="noise-overlay" />}
      {darkMode && <div className="scanline" />}

      
      <div className={`absolute inset-0 ${darkMode ? 'grid-bg-industrial' : 'grid-pattern-light'} opacity-[0.04]`}></div>
      
      <div className="relative z-10">
        <SystemStatusBanner darkMode={darkMode} />
        <Navigation
          theme={theme}
          setTheme={setTheme}
          setShowShareModal={setShowShareModal}
          setShowViewModal={setShowViewModal}
          viewMode={viewMode}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 pt-28">
          <Routes>
            <Route path="/" element={
              <HomePage
                darkMode={darkMode}
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
                displaySkills={displaySkills}
              />
            } />
            <Route path="/skills" element={
              <SkillsView
                darkMode={darkMode}
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
                darkMode={darkMode}
                viewMode={viewMode}
                getCareerMatch={getCareerMatch}
              />
            } />
            <Route path="/jobs" element={
              <JobsView
                darkMode={darkMode}
                displaySkills={displaySkills}
              />
            } />
            <Route path="/news" element={
              <NewsView
                darkMode={darkMode}
              />
            } />
            <Route path="/notadmin" element={
              <AdminPanelView
                darkMode={darkMode}
              />
            } />
            <Route path="/career/:id" element={
              <CareerDetailView
                darkMode={darkMode}
                displaySkills={displaySkills}
                getCareerMatch={getCareerMatch}
              />
            } />
            <Route path="/view/:code" element={<div className="text-center py-20 text-white">Loading shared profile...</div>} />

          </Routes>
          <Footer darkMode={darkMode} />
        </div>
      </div>
      
      {showShareModal && (
        <ShareModal
          darkMode={darkMode}
          setShowShareModal={setShowShareModal}
          generateShareCode={generateShareCode}
          copyToClipboard={copyToClipboard}
          copiedShare={copiedShare}
          setCopiedShare={setCopiedShare}
        />
      )}
      {showViewModal && (
        <ViewModal
          darkMode={darkMode}
          setShowViewModal={setShowViewModal}
          shareInput={shareInput}
          setShareInput={setShareInput}
          loadFromShareCode={loadFromShareCode}
        />
      )}
      {showPolicyModal && <PolicyModal darkMode={darkMode} setShowPolicyModal={setShowPolicyModal} />}
    </div>
  );
};

export default App;
