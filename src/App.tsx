import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { 
  BookOpen, Code, Shield, DollarSign, Layout, Server, Network, 
  GraduationCap, Palette, Target, TrendingUp, Award, CheckCircle, 
  Circle, Download, Upload, Share2, Eye, X, Copy, Check, Moon, Sun,
  ChevronDown, ChevronUp, Search, MessageCircle, Github, ArrowRight,
  Rocket, Users, Zap, Star, ExternalLink, Menu, XCircle, Filter
} from 'lucide-react';
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  useParams
} from 'react-router-dom';

// --- Types & Data ---

const skillCategories = {
  'Programming Languages': [
    'Python', 'Rust', 'Go', 'TypeScript', 'JavaScript', 'Solidity', 'Vyper',
    'Huff', 'Yul', 'Cairo', 'C++', 'Move', 'Anchor', 'Seahorse', 'Assembly'
  ],
  'Frontend Technologies': [
    'React', 'Next.js', 'Vue.js', 'Svelte', 'Angular', 'TailwindCSS',
    'Styled Components', 'Redux', 'React Query', 'Zustand', 'Wagmi', 'RainbowKit'
  ],
  'Backend & API': [
    'REST API', 'GraphQL', 'WebSockets', 'gRPC', 'Node.js', 'Express.js',
    'NestJS', 'Fastify', 'tRPC', 'Bun'
  ],
  'Development Tools': [
    'Foundry', 'Hardhat', 'Truffle', 'Remix', 'Ganache', 'Anchor CLI',
    'Solana CLI', 'Design Tools', 'Adobe Creative Suite', 'AI Design Tools',
    'Postman', 'VS Code Extensions', 'Docker', 'Git Advanced', 'GitHub Actions',
    'Vercel', 'Railway', 'Render'
  ],
  'Security Tools': [
    'Slither', 'Echidna', 'Certora', 'Mythril', 'Manticore', 'Trail of Bits Tools',
    'OpenZeppelin Defender', 'Tenderly', 'Aderyn', 'MythX', 'Securify', 'Octopus'
  ],
  'Cloud & DevOps': [
    'AWS', 'GCP', 'Azure', 'CI/CD', 'DevOps Principles', 'Cloud Architecture',
    'Kubernetes', 'Terraform', 'Jenkins', 'Docker Compose', 'Ansible',
    'CloudFormation', 'Heroku', 'DigitalOcean'
  ],
  'Database & Systems': [
    'PostgreSQL', 'MongoDB', 'Redis', 'Supabase', 'Firebase', 'Database Design',
    'Database Optimization', 'Distributed Systems', 'Time-Series Observability',
    'Elasticsearch', 'Prisma', 'TypeORM'
  ],
  'EVM Blockchain & Web3': [
    'Blockchain Fundamentals', 'EVM Mechanics', 'Smart Contract Development',
    'Production EVM Smart Contracts', 'High-TVL Contracts', 'AMMs', 'Oracles',
    'DeFi Understanding', 'DeFi Products', 'dApps', 'Developer Infrastructure',
    'L2s', 'Bridges', 'ERC-4337', 'ZK Proofs', 'ZK Rollups', 'ZK-SNARKs',
    'ZK-STARKs', 'EIPs Contributions', 'MEV', 'Consensus Mechanisms', 'Tokenomics',
    'NFT Standards', 'Cross-chain Protocols', 'Web3 Wallets', 'IPFS', 'The Graph',
    'Chainlink Oracles', 'Uniswap V2/V3/V4', 'Curve Finance', 'Aave Protocol',
    'Compound Protocol', 'MakerDAO', 'Ethers.js', 'Viem'
  ],
  'Solana/SVM Blockchain': [
    'Solana Fundamentals', 'Solana Program Development', 'Anchor Framework',
    'Seahorse Framework', 'Solana Web3.js', 'Solana CLI', 'SPL Tokens',
    'Solana NFTs (Metaplex)', 'Solana DeFi', 'Solana Account Model', 'PDAs',
    'CPI', 'Solana Runtime', 'Borsh Serialization', 'Solana Security Best Practices',
    'Solana Testing (Bankrun)', 'Jupiter Aggregator', 'Raydium', 'Orca',
    'Marinade Finance', 'Jito MEV', 'Pyth Network', 'Switchboard Oracles',
    'Wormhole', 'Solana Mobile Stack'
  ],
  'Architecture & Design': [
    'System Design', 'System Architecture', 'API Building & Scaling',
    'High-Throughput Systems', 'Low-Latency Systems', 'Production Systems',
    'Large-Scale Cloud Systems', 'Microservices', 'Event-Driven Architecture',
    'Domain-Driven Design', 'Serverless Architecture', 'Message Queues',
    'Load Balancing', 'Caching Strategies', 'Rate Limiting'
  ],
  'Security & Auditing': [
    'Smart Contract Auditing', 'Vulnerability Assessment', 'Formal Verification',
    'Gas Optimization', 'Access Control Patterns', 'Upgrade Patterns',
    'Reentrancy Prevention', 'Security Best Practices', 'Cryptography',
    'Key Management', 'TEEs', 'Zero-Knowledge Systems', 'Audit Report Writing',
    'Exploit Development', 'Bug Bounty Hunting', 'Threat Modeling',
    'Secure SDLC', 'Penetration Testing'
  ],
  'Testing & QA': [
    'Unit Testing', 'Integration Testing', 'End-to-End Testing', 'Fuzz Testing',
    'Invariant Testing', 'Test-Driven Development', 'Performance Testing',
    'Load Testing', 'Security Testing', 'Mutation Testing'
  ],
  'Soft Skills': [
    'Communication', 'Collaboration', 'Mentoring', 'Leadership',
    'Guiding Technical Teams', 'Autonomy', 'Adapt to Feedback',
    'Align with Business Goals', 'Problem Solving', 'Critical Thinking',
    'Technical Writing', 'Public Speaking'
  ],
  'Specialized Experience': [
    'Billing/Monetization Systems', 'Security Tools Experience', 'Startup Experience',
    'Web3 Experience', 'Passion for Web3', 'Crypto Experience',
    'Open-source Contributions', 'Technical Writing', 'Community Building',
    'Public Speaking', 'Fintech', 'Algorithmic Trading', 'UI/UX Design',
    'Wireframing', 'Prototyping', 'Sketch', 'InVision', 'Visio', 'SCSS',
    'iOS Design', 'Android Design', 'Responsive Design', 'Animation (Framer Motion)',
    'Web Performance Optimization', 'SEO Optimization'
  ],
  'Full-Stack Development': [
    'Frontend-Backend Integration', 'Wallet Connection', 'Transaction Signing',
    'Smart Contract Interaction', 'Web3 Authentication', 'Decentralized Storage',
    'Event Listening', 'Multi-chain Support', 'Gas Estimation', 'Error Handling'
  ]
};

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

const Navigation = ({ darkMode, setDarkMode, setShowShareModal, setShowViewModal, viewMode, mobileMenuOpen, setMobileMenuOpen }) => {
  const location = useLocation();

  return (
    <nav className={`${darkMode ? 'navbar-industrial-dark' : 'navbar-industrial-light'} sticky top-0 z-40 transition-all duration-200`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-[4px] border ${darkMode ? 'bg-white/5 border-white/10' : 'bg-gray-100 border-gray-200'}`}>
                <Rocket className="text-cyan" size={20} />
              </div>
              <div>
                <h1 className={`font-bold text-lg tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  SKILLS <span className="text-cyan">RIWOT</span>
                </h1>
                <p className={`label-mono text-[10px] ${darkMode ? 'text-dark-tertiary' : 'text-slate-500'}`}>SYSTEM.CORE.v2</p>
              </div>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-1">
            {!viewMode && (
              <Link
                to="/"
                className={`px-4 h-16 flex items-center label-mono text-[10px] transition-all border-b-2 ${
                  location.pathname === '/'
                  ? (darkMode ? 'text-cyan border-cyan bg-white/5' : 'text-slate-900 border-slate-900 bg-slate-50')
                    : 'border-transparent text-dark-tertiary hover:text-white'
                }`}
              >
                HOME
              </Link>
            )}
            <Link
              to="/skills"
              className={`px-4 h-16 flex items-center label-mono text-[10px] transition-all border-b-2 ${
                location.pathname === '/skills'
                  ? (darkMode ? 'text-cyan border-cyan bg-white/5' : 'text-slate-900 border-slate-900 bg-slate-50')
                  : 'border-transparent text-dark-tertiary hover:text-white'
              }`}
            >
              SKILLS
            </Link>
            <Link
              to="/careers"
              className={`px-4 h-16 flex items-center label-mono text-[10px] transition-all border-b-2 ${
                location.pathname === '/careers' || location.pathname.startsWith('/career/')
                  ? (darkMode ? 'text-cyan border-cyan bg-white/5' : 'text-slate-900 border-slate-900 bg-slate-50')
                  : 'border-transparent text-dark-tertiary hover:text-white'
              }`}
            >
              {viewMode ? 'MATCH' : 'CAREERS'}
            </Link>
            
            {!viewMode && (
              <div className="flex items-center ml-4 space-x-2">
                <button
                  onClick={() => setShowShareModal(true)}
                  className={`p-2 rounded-[4px] transition-all ${darkMode ? 'text-dark-tertiary hover:text-white hover:bg-white/5' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`}
                  title="Share Progress"
                >
                  <Share2 size={18} />
                </button>
                <button
                  onClick={() => setShowViewModal(true)}
                  className={`p-2 rounded-[4px] transition-all ${darkMode ? 'text-dark-tertiary hover:text-white hover:bg-white/5' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`}
                  title="View Shared"
                >
                  <Eye size={18} />
                </button>
              </div>
            )}
            
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`ml-4 p-2 rounded-[4px] transition-all ${darkMode ? 'text-yellow-400 hover:bg-white/5' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg"
          >
            {mobileMenuOpen ? (
              <XCircle className={darkMode ? 'text-gray-300' : 'text-gray-600'} size={24} />
            ) : (
              <Menu className={darkMode ? 'text-gray-300' : 'text-gray-600'} size={24} />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            {!viewMode && (
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2 rounded-lg text-sm font-medium ${
                  location.pathname === '/'
                    ? (darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-50 text-blue-600')
                    : (darkMode ? 'text-gray-300' : 'text-gray-600')
                }`}
              >
                Home
              </Link>
            )}
            <Link
              to="/skills"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2 rounded-lg text-sm font-medium ${
                location.pathname === '/skills'
                  ? (darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-50 text-blue-600')
                  : (darkMode ? 'text-gray-300' : 'text-gray-600')
              }`}
            >
              Skills
            </Link>
            <Link
              to="/careers"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2 rounded-lg text-sm font-medium ${
                location.pathname === '/careers'
                  ? (darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-50 text-blue-600')
                  : (darkMode ? 'text-gray-300' : 'text-gray-600')
              }`}
            >
              {viewMode ? 'Career Match' : 'Careers'}
            </Link>
            <div className="flex gap-2 px-4 pt-2">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`flex-1 py-2 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
              >
                {darkMode ? <Sun className="text-yellow-400 mx-auto" size={20} /> : <Moon className="text-gray-600 mx-auto" size={20} />}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const HomePage = ({ darkMode, viewMode, setViewMode, setSharedSkills, checkedSkills, totalSkills, overallProgress, getCareerMatch, getCategoryProgress, exportData, importData }) => {
  const bestMatchName = useMemo(() => {
    return Object.keys(careerPaths).reduce((best, name) => {
      const match = getCareerMatch(name);
      const bestMatchData = getCareerMatch(best);
      return match.percentage > bestMatchData.percentage ? name : best;
    }, Object.keys(careerPaths)[0]);
  }, [getCareerMatch]);

  return (
    <div className="space-y-12">
      {viewMode && (
        <div className={`${darkMode ? 'surface-recessed-dark border-cyan/20' : 'surface-recessed-light border-blue-200'} p-6`}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <Eye className="text-cyan" size={20} />
                <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  VIEWING SHARED SKILLS PROFILE
                </h3>
              </div>
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className={`label-mono mb-1 ${darkMode ? 'text-dark-tertiary' : 'text-slate-500'}`}>TOTAL SKILLS</p>
                  <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {checkedSkills}<span className="text-sm opacity-50">/{totalSkills}</span>
                  </p>
                </div>
                <div>
                  <p className={`label-mono mb-1 ${darkMode ? 'text-dark-tertiary' : 'text-slate-500'}`}>PROGRESS</p>
                  <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {overallProgress.toFixed(1)}%
                  </p>
                </div>
                <div>
                  <p className={`label-mono mb-1 ${darkMode ? 'text-dark-tertiary' : 'text-slate-500'}`}>BEST MATCH</p>
                  <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {bestMatchName}
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                setViewMode(false);
                setSharedSkills(null);
              }}
              className="btn-control-secondary"
            >
              EXIT VIEW
            </button>
          </div>
        </div>
      )}

      <div className="text-center pt-8 pb-12 relative">
        <div className="relative z-10">
          <div className="flex justify-center mb-6">
            <div className={`p-4 rounded-[4px] border ${darkMode ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
              <GraduationCap className="text-cyan" size={48} />
            </div>
          </div>
          <h1 className={`text-4xl md:text-6xl font-extrabold mb-6 ${darkMode ? 'text-white' : 'text-slate-900'} tracking-tight`}>
            WEB3 SKILLS <br className="md:hidden" /> SYSTEM
          </h1>
          <p className={`text-lg md:text-xl max-w-2xl mx-auto mb-10 ${darkMode ? 'text-dark-secondary' : 'text-slate-600'}`}>
            Master technical infrastructure with curated modules and career verification protocols.
          </p>
          {!viewMode && (
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/skills" className="btn-control-primary px-10 h-14 text-lg">
                <Rocket size={20} />
                INITIALIZE
              </Link>
              <Link to="/careers" className="btn-control-secondary px-10 h-14 text-lg">
                <Target size={20} />
                CAREERS
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {!viewMode && (
          <div className={`${darkMode ? 'surface-recessed-dark' : 'surface-recessed-light'} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`label-mono ${darkMode ? 'text-dark-tertiary' : 'text-slate-500'}`}>SYSTEM.PROGRESS</h3>
              <TrendingUp className="text-cyan" size={18} />
            </div>
            <div className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              {checkedSkills}<span className="text-xl opacity-30">/{totalSkills}</span>
            </div>
            <div className="progress-track mb-2">
              <div className="progress-fill-cyan" style={{ width: `${overallProgress}%` }} />
            </div>
            <p className="label-mono text-[10px] text-cyan">{overallProgress.toFixed(1)}% ALIGNMENT</p>
          </div>
        )}

        <div className={`${darkMode ? 'surface-recessed-dark' : 'surface-recessed-light'} p-6`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`label-mono ${darkMode ? 'text-dark-tertiary' : 'text-slate-500'}`}>MODULES.MASTERED</h3>
            <Award className="text-cyan" size={18} />
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="badge-industrial bg-cyan/10 text-cyan border border-cyan/20">BLOCKCHAIN</span>
            <span className="badge-industrial bg-white/5 text-dark-tertiary border border-white/10">SOLANA</span>
          </div>
          <p className="label-mono text-[10px] opacity-40">16 PATHS DETECTED</p>
        </div>

        {!viewMode && (
          <div className={`${darkMode ? 'surface-recessed-dark' : 'surface-recessed-light'} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`label-mono ${darkMode ? 'text-dark-tertiary' : 'text-slate-500'}`}>CAREER.INDEX</h3>
              <Target className="text-cyan" size={18} />
            </div>
            <div className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{Object.keys(careerPaths).length}</div>
            <p className="label-mono text-[10px] opacity-40">VERIFIED PROFILES</p>
          </div>
        )}
      </div>

      {!viewMode && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/skills"
            className={`${darkMode ? 'surface-recessed-dark border-white/5' : 'surface-recessed-light'} p-8 group transition-all`}
          >
            <BookOpen className="text-cyan mb-4 group-hover:scale-110 transition-transform" size={32} />
            <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>SKILL TREE</h3>
            <p className={`text-sm mb-6 ${darkMode ? 'text-dark-secondary' : 'text-slate-600'}`}>
              Access 300+ technical modules across the core decentralized stack.
            </p>
            <span className="label-mono text-cyan flex items-center gap-2">
              INITIATE <ArrowRight size={14} />
            </span>
          </Link>

          <Link
            to="/careers"
            className={`${darkMode ? 'surface-recessed-dark border-white/5' : 'surface-recessed-light'} p-8 group transition-all`}
          >
            <Target className="text-cyan mb-4 group-hover:scale-110 transition-transform" size={32} />
            <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>CAREER PATHS</h3>
            <p className={`text-sm mb-6 ${darkMode ? 'text-dark-secondary' : 'text-slate-600'}`}>
              View industrial roadmaps for verified infrastructure roles.
            </p>
            <span className="label-mono text-cyan flex items-center gap-2">
              ACCESS <ArrowRight size={14} />
            </span>
          </Link>
        </div>
      )}

      {/* RiWoT Community Section */}
      <div className={`${darkMode ? 'surface-recessed-dark' : 'surface-recessed-light'} p-8 md:p-12`}>
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <Users className="text-cyan" size={40} />
          </div>
          <h2 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            COMMUNITY.ACCESS
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-dark-secondary' : 'text-slate-600'}`}>
            Connect with technical personnel and accelerate module acquisition.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div className="space-y-6">
            <h3 className={`label-mono ${darkMode ? 'text-dark-tertiary' : 'text-slate-900'}`}>MODULES.AVAILABLE</h3>
            <ul className="space-y-4">
              {[
                'Smart contract security auditing',
                'DeFi protocol architecture',
                'Frontend infrastructure',
                'Backend system design'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="text-cyan flex-shrink-0" size={16} />
                  <span className={`text-sm ${darkMode ? 'text-dark-secondary' : 'text-slate-700'}`}>{item.toUpperCase()}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className={`label-mono ${darkMode ? 'text-dark-tertiary' : 'text-slate-900'}`}>PROTOCOL.BENEFITS</h3>
            <ul className="space-y-4">
              {[
                'Active developer verification',
                'Weekly sync sessions',
                'Code review protocols',
                'Resource distribution'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Star className="text-cyan flex-shrink-0" size={16} />
                  <span className={`text-sm ${darkMode ? 'text-dark-secondary' : 'text-slate-700'}`}>{item.toUpperCase()}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="https://discord.gg/qMd7jwV7UG"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-control-primary"
          >
            <MessageCircle size={18} />
            JOIN DISCORD
          </a>
          <a
            href="https://github.com/RiWoT"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-control-secondary"
          >
            <Github size={18} />
            GITHUB ACCESS
          </a>
        </div>
      </div>

      {/* Data Management Section */}
      {!viewMode && (
        <div className={`${darkMode ? 'surface-recessed-dark' : 'surface-recessed-light'} p-6`}>
          <div className="flex flex-wrap justify-between items-center gap-4">
            <h3 className={`label-mono ${darkMode ? 'text-dark-tertiary' : 'text-slate-900'}`}>DATA.PERSISTENCE</h3>
            <div className="flex gap-3">
              <button
                onClick={exportData}
                className="btn-control-secondary text-xs py-2 px-4"
              >
                <Download size={14} />
                EXPORT
              </button>
              <label className="btn-control-secondary text-xs py-2 px-4 cursor-pointer">
                <Upload size={14} />
                IMPORT
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
        <h1 className={`text-4xl font-extrabold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>MODULES.ALL</h1>
        <p className={`text-lg ${darkMode ? 'text-dark-secondary' : 'text-slate-600'}`}>
          Initialize and track core technical modules.
        </p>
      </div>

      {!viewMode && (
        <div className={`${darkMode ? 'surface-recessed-dark' : 'surface-recessed-light'} p-4`}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-dark-tertiary' : 'text-slate-400'}`} size={18} />
              <input
                type="text"
                placeholder="SEARCH SYSTEM..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-[4px] label-mono ${
                  darkMode ? 'bg-white/5 border border-white/10 text-white' : 'bg-slate-50 border border-slate-200 text-slate-900'
                } focus:outline-none focus:border-cyan`}
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFilterComplete('all')}
                className={`px-4 label-mono text-xs rounded-[4px] h-10 transition-all ${
                  filterComplete === 'all'
                    ? 'bg-cyan text-black'
                    : (darkMode ? 'bg-white/5 text-dark-tertiary hover:text-white' : 'bg-slate-50 text-slate-500')
                }`}
              >
                ALL
              </button>
              <button
                onClick={() => setFilterComplete('complete')}
                className={`px-4 label-mono text-xs rounded-[4px] h-10 transition-all ${
                  filterComplete === 'complete'
                    ? 'bg-green-600 text-white'
                    : (darkMode ? 'bg-white/5 text-dark-tertiary hover:text-white' : 'bg-slate-50 text-slate-500')
                }`}
              >
                COMPLETE
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
          <div key={categoryName} className={`${darkMode ? 'surface-recessed-dark' : 'surface-recessed-light'} p-6`}>
            <div
              className="flex flex-wrap justify-between items-center mb-6 gap-3 cursor-pointer group"
              onClick={() => setExpandedCategories(prev => ({ ...prev, [categoryName]: !prev[categoryName] }))}
            >
              <div className="flex items-center gap-3">
                <h2 className={`text-xl font-bold transition-colors ${darkMode ? 'text-white group-hover:text-cyan' : 'text-slate-900'}`}>
                  {categoryName.toUpperCase()}
                </h2>
                {expandedCategories[categoryName] ? (
                  <ChevronUp className="text-dark-tertiary" size={18} />
                ) : (
                  <ChevronDown className="text-dark-tertiary" size={18} />
                )}
              </div>
              <div className="flex items-center gap-4">
                <span className="label-mono text-[10px] opacity-60">
                  {progress.checked}/{progress.total} UNIT
                </span>
                <div className="w-24 progress-track">
                  <div className="progress-fill-cyan" style={{ width: `${progress.percentage}%` }} />
                </div>
              </div>
            </div>

            {expandedCategories[categoryName] && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {filtered.map(skill => (
                  <label
                    key={skill}
                    className={`flex items-center gap-3 p-3 rounded-[4px] border ${
                      viewMode ? '' : 'cursor-pointer'
                    } transition-all ${
                      displaySkills[skill]
                        ? (darkMode ? 'bg-cyan/5 border-cyan/20' : 'bg-slate-50 border-slate-200')
                        : (darkMode ? 'bg-transparent border-white/5 hover:border-white/10' : 'bg-transparent border-slate-100')
                    }`}
                  >
                    {!viewMode && (
                      <div className="relative flex items-center justify-center">
                        <input
                          type="checkbox"
                          checked={displaySkills[skill] || false}
                          onChange={() => toggleSkill(skill)}
                          className="peer appearance-none w-4 h-4 rounded-[2px] border border-white/20 checked:bg-cyan checked:border-cyan transition-all cursor-pointer"
                        />
                        <Check className="absolute w-3 h-3 text-black opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" strokeWidth={4} />
                      </div>
                    )}
                    <span className={`text-sm font-medium ${
                      displaySkills[skill]
                        ? (darkMode ? 'text-cyan' : 'text-slate-400 line-through')
                        : (darkMode ? 'text-dark-secondary' : 'text-slate-700')
                    }`}>
                      {skill}
                    </span>
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

const CareersView = ({ darkMode, viewMode, getCareerMatch }) => {
  const evmCareers = Object.entries(careerPaths).filter(([_, career]) => career.ecosystem === 'EVM');
  const solanaCareers = Object.entries(careerPaths).filter(([_, career]) => career.ecosystem === 'Solana');

  const CareerCard = ({ careerName, career }) => {
    const match = getCareerMatch(careerName);
    const Icon = career.icon;

    return (
      <div
        key={careerName}
        className={`${darkMode ? 'surface-recessed-dark' : 'surface-recessed-light'} p-6 transition-all group relative`}
      >
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className={`text-lg font-bold mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{careerName.toUpperCase()}</h3>
              <p className={`label-mono ${darkMode ? 'text-dark-tertiary' : 'text-slate-500'}`}>{career.ecosystem}</p>
            </div>
            <div className={`p-2 rounded-[4px] border ${darkMode ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
              <Icon className="text-cyan" size={20} />
            </div>
          </div>

          <p className={`text-sm mb-6 line-clamp-2 h-10 ${darkMode ? 'text-dark-secondary' : 'text-slate-600'}`}>{career.description}</p>

          <div className="mb-6">
            <div className="progress-track mb-2">
              <div className="progress-fill-cyan" style={{ width: `${match.percentage}%` }} />
            </div>
            <p className="label-mono text-[10px] opacity-60">
              {match.percentage.toFixed(0)}% MATCH // {match.matched}/{match.total} UNIT
            </p>
          </div>

          {!viewMode && (
            <Link
              to={`/career/${encodeURIComponent(careerName)}`}
              className="btn-control-primary w-full"
            >
              VIEW ROADMAP
              <ArrowRight size={14} />
            </Link>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className={`text-4xl font-extrabold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>CAREER.PATHS</h1>
        <p className={`text-lg ${darkMode ? 'text-dark-secondary' : 'text-slate-600'}`}>
          Explore technical career paths with industrial roadmaps.
        </p>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="h-8 w-1 bg-blue-600 rounded-full" />
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>EVM Ecosystem</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {evmCareers.map(([name, career]) => (
            <CareerCard key={name} careerName={name} career={career} />
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="h-8 w-1 bg-purple-600 rounded-full" />
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Solana Ecosystem</h2>
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
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>PATH NOT FOUND</h2>
          <Link to="/careers" className="text-cyan mt-4 inline-block label-mono">BACK TO INDEX</Link>
      </div>
  );

  const match = getCareerMatch(careerName);
  const Icon = career.icon;

  return (
    <div className="space-y-8">
      <Link
        to="/careers"
        className={`flex items-center gap-2 label-mono transition-colors ${
          darkMode ? 'text-dark-tertiary hover:text-white' : 'text-slate-500 hover:text-slate-900'
        }`}
      >
        <ArrowRight size={14} className="rotate-180" />
        BACK TO INDEX
      </Link>

      <div className="flex items-start gap-4">
        <div className={`p-4 rounded-[4px] border ${darkMode ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
          <Icon className="text-cyan" size={32} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className={`text-3xl font-extrabold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{careerName.toUpperCase()}</h1>
            <span className="badge-industrial bg-cyan/10 text-cyan border border-cyan/20">
              {career.ecosystem}
            </span>
          </div>
          <p className={`text-lg ${darkMode ? 'text-dark-secondary' : 'text-slate-600'}`}>{career.description}</p>
        </div>
      </div>

      <div className={`${darkMode ? 'surface-recessed-dark' : 'surface-recessed-light'} p-6`}>
        <div className="flex justify-between items-center mb-4">
          <span className={`label-mono ${darkMode ? 'text-dark-tertiary' : 'text-slate-900'}`}>COMPATIBILITY.CORE</span>
          <span className="label-mono opacity-60">
            {match.matched}/{match.total} UNIT
          </span>
        </div>
        <div className="progress-track h-2">
          <div
            className="progress-fill-cyan"
            style={{ width: `${match.percentage}%` }}
          />
        </div>
      </div>

      <div className={`${darkMode ? 'surface-recessed-dark' : 'surface-recessed-light'} p-6`}>
        <h2 className={`label-mono mb-8 ${darkMode ? 'text-dark-tertiary' : 'text-slate-900'}`}>CORE.PREREQUISITES</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {career.requiredSkills.map(skill => (
            <div
              key={skill}
              className={`flex items-center gap-3 p-4 rounded-[4px] border ${
                darkMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'
              }`}
            >
              {displaySkills.hasOwnProperty(skill) && displaySkills[skill] ? (
                <CheckCircle className="text-cyan" size={18} />
              ) : (
                <Circle className="text-dark-tertiary opacity-20" size={18} />
              )}
              <span className={`text-sm font-medium ${displaySkills[skill] ? (darkMode ? 'text-white' : 'text-slate-900') : 'text-dark-secondary'}`}>
                {skill}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className={`${darkMode ? 'surface-recessed-dark' : 'surface-recessed-light'} p-6`}>
        <h2 className={`label-mono mb-12 ${darkMode ? 'text-dark-tertiary' : 'text-slate-900'}`}>
          DEPLOYMENT.ROADMAP
        </h2>
        <div className="space-y-12">
          {career.roadmap.map((phase, index) => (
            <div key={index} className="relative">
              <div className={`flex items-start gap-6 ${darkMode ? 'border-white/5' : 'border-slate-200'} border-l-2 pl-8 pb-12 last:pb-0`}>
                <div className={`absolute -left-[17px] top-0 w-8 h-8 flex items-center justify-center label-mono text-[10px] border rounded-full ${
                  darkMode ? 'bg-bg-dark border-white/20 text-cyan' : 'bg-white border-slate-200 text-slate-900'
                }`}>
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                      {phase.phase.toUpperCase()}
                    </h3>
                    <span className="label-mono text-[10px] opacity-40">
                      ETA: {phase.duration}
                    </span>
                  </div>

                  <div className="mb-8">
                    <h4 className="label-mono text-[10px] opacity-30 mb-4">MODULES</h4>
                    <div className="flex flex-wrap gap-2">
                      {phase.skills.map(skill => {
                        const isCompleted = matchRoadmapSkill(skill, displaySkills);
                        return (
                          <span
                            key={skill}
                            className={`badge-industrial border ${
                              isCompleted
                                ? 'bg-cyan text-black border-cyan'
                                : (darkMode ? 'bg-white/5 text-dark-tertiary border-white/5' : 'bg-slate-50 text-slate-500 border-slate-100')
                            }`}
                          >
                            {skill}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <h4 className="label-mono text-[10px] opacity-30 mb-4">PROTOCOLS</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {phase.resources.map((resource, idx) => (
                        <a
                          key={idx}
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-4 p-4 rounded-[4px] border transition-all ${
                            darkMode ? 'bg-white/5 border-white/5 hover:border-white/10' : 'bg-slate-50 border-slate-100 hover:bg-slate-100'
                          }`}
                        >
                          <BookOpen className="text-cyan flex-shrink-0" size={16} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-sm font-bold truncate ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                                {resource.name.toUpperCase()}
                              </span>
                              <ExternalLink className="opacity-30" size={12} />
                            </div>
                            <span className="label-mono text-[10px] opacity-50">{resource.type}</span>
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
        <div className={`${darkMode ? 'surface-recessed-dark border-cyan/20' : 'surface-recessed-light'} p-8`}>
          <h2 className={`label-mono mb-8 ${darkMode ? 'text-dark-tertiary' : 'text-slate-900'}`}>
            ESTIMATED.YIELD.INDEX
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {career.outcomes.junior && (
              <div className="space-y-2">
                <p className="label-mono text-[10px] opacity-40">ENTRY_LEVEL</p>
                <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{career.outcomes.junior}</p>
              </div>
            )}
            {career.outcomes.mid && (
              <div className="space-y-2">
                <p className="label-mono text-[10px] opacity-40">INTERMEDIATE</p>
                <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{career.outcomes.mid}</p>
              </div>
            )}
            {career.outcomes.senior && (
              <div className="space-y-2">
                <p className="label-mono text-[10px] opacity-40">ADVANCED</p>
                <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{career.outcomes.senior}</p>
              </div>
            )}
            {career.outcomes.lead && (
              <div className="space-y-2">
                <p className="label-mono text-[10px] opacity-40">PRINCIPAL</p>
                <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{career.outcomes.lead}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const ShareModal = ({ darkMode, setShowShareModal, generateShareCode, copyToClipboard, copiedShare, setCopiedShare }) => (
  <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
    <div className={`${darkMode ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'} border rounded-[6px] max-w-md w-full p-6`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className={`label-mono ${darkMode ? 'text-white' : 'text-slate-900'}`}>SHARE.PROGRESS</h2>
        <button
          onClick={() => setShowShareModal(false)}
          className={`p-1 rounded-[4px] ${darkMode ? 'hover:bg-white/5' : 'hover:bg-slate-100'}`}
        >
          <X size={18} />
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
            }
          }}
          className="btn-control-primary w-full"
        >
          {copiedShare ? <Check size={18} /> : <Copy size={18} />}
          {copiedShare ? 'COPIED' : 'COPY SHARE CODE'}
        </button>
        <div className={`p-4 rounded-[4px] border ${darkMode ? 'bg-black border-white/5' : 'bg-slate-50 border-slate-200'}`}>
          <p className="text-[10px] font-mono break-all opacity-60">
            {generateShareCode()}
          </p>
        </div>
      </div>
    </div>
  </div>
);

const ViewModal = ({ darkMode, setShowViewModal, shareInput, setShareInput, loadFromShareCode }) => (
  <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
    <div className={`${darkMode ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'} border rounded-[6px] max-w-md w-full p-6`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className={`label-mono ${darkMode ? 'text-white' : 'text-slate-900'}`}>VIEW.SHARED</h2>
        <button
          onClick={() => setShowViewModal(false)}
          className={`p-1 rounded-[4px] ${darkMode ? 'hover:bg-white/5' : 'hover:bg-slate-100'}`}
        >
          <X size={18} />
        </button>
      </div>
      <div className="space-y-4">
        <div>
          <label className={`label-mono text-[10px] mb-2 block ${darkMode ? 'text-dark-tertiary' : 'text-slate-500'}`}>
            PASTE SHARE CODE
          </label>
          <input
            type="text"
            placeholder="ENTER CODE..."
            value={shareInput}
            onChange={(e) => setShareInput(e.target.value)}
            className={`w-full px-3 py-2 border rounded-[4px] font-mono text-xs ${
              darkMode ? 'bg-black border-white/10 text-white' : 'bg-white border-slate-300 text-slate-900'
            } focus:outline-none focus:border-cyan`}
          />
        </div>
        <button
          onClick={() => {
            if (shareInput.trim()) {
              loadFromShareCode(shareInput.trim());
            }
          }}
          className="btn-control-primary w-full"
        >
          LOAD PROGRESS
        </button>
      </div>
    </div>
  </div>
);

const PolicyModal = ({ darkMode, setShowPolicyModal }) => (
  <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
    <div className={`${darkMode ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'} border rounded-[6px] max-w-2xl w-full p-6 md:p-8 max-h-[90vh] overflow-y-auto`}>
      <div className="mb-8">
        <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
          SYSTEM.INITIALIZATION
        </h2>
        <p className={`label-mono text-[10px] ${darkMode ? 'text-dark-tertiary' : 'text-slate-500'}`}>
          PLEASE REVIEW PROTOCOLS BEFORE ACCESSING MODULES
        </p>
      </div>

      <div className={`space-y-6 text-sm ${darkMode ? 'text-dark-secondary' : 'text-slate-700'}`}>
        <div className={`p-4 rounded-[4px] border ${darkMode ? 'bg-cyan/5 border-cyan/20' : 'bg-slate-50 border-slate-200'}`}>
          <h3 className={`label-mono mb-2 flex items-center gap-2 ${darkMode ? 'text-cyan' : 'text-slate-900'}`}>
            <Star size={16} />
            DISCLAIMER.LEGAL
          </h3>
          <p className="text-xs">
            THIS PLATFORM PROVIDES EDUCATIONAL RESOURCES. WE DO NOT GUARANTEE EMPLOYMENT. SALARY ESTIMATES ARE MARKET INDICATORS AS OF 2025.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className={`label-mono ${darkMode ? 'text-white' : 'text-slate-900'}`}>DATA.PRIVACY</h3>
          <p className="text-xs leading-relaxed">
            ALL PROGRESS DATA IS STORED LOCALLY IN YOUR BROWSER'S LOCALSTORAGE. NO DATA IS TRANSMITTED TO EXTERNAL SERVERS UNLESS YOU EXPLICITLY GENERATE A SHARE CODE.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className={`label-mono ${darkMode ? 'text-white' : 'text-slate-900'}`}>EXTERNAL.PROTOCOLS</h3>
          <p className="text-xs leading-relaxed">
            WE LINK TO THIRD-PARTY EDUCATIONAL PLATFORMS. WE ARE NOT RESPONSIBLE FOR THEIR CONTENT OR ACCESSIBILITY.
          </p>
        </div>
      </div>

      <div className={`mt-10 pt-6 border-t ${darkMode ? 'border-white/5' : 'border-slate-200'}`}>
        <button
          onClick={() => {
            localStorage.setItem('web3skills_policy_accepted', 'true');
            setShowPolicyModal(false);
          }}
          className="btn-control-primary w-full"
        >
          I UNDERSTAND AND ACCEPT
        </button>
      </div>
    </div>
  </div>
);

const Footer = ({ darkMode }) => (
  <footer className={`mt-32 pb-16 ${darkMode ? 'border-white/5' : 'border-slate-200'} border-t pt-16`}>
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-[4px] border ${darkMode ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
              <Rocket className="text-cyan" size={20} />
            </div>
            <span className={`font-bold text-lg tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>SKILLS <span className="text-cyan">RIWOT</span></span>
          </div>
          <p className={`text-sm leading-relaxed max-w-sm ${darkMode ? 'text-dark-tertiary' : 'text-slate-500'}`}>
            Industrial infrastructure for Web3 career verification.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 md:justify-items-end">
          <div className="space-y-4">
            <h4 className="label-mono text-[10px] opacity-40">INFRA</h4>
            <ul className={`space-y-2 text-sm label-mono ${darkMode ? 'text-dark-secondary' : 'text-slate-600'}`}>
              <li><Link to="/skills" className="hover:text-cyan transition-colors">SKILL TREE</Link></li>
              <li><Link to="/careers" className="hover:text-cyan transition-colors">ROADMAPS</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="label-mono text-[10px] opacity-40">SYSTEM</h4>
            <ul className={`space-y-2 text-sm label-mono ${darkMode ? 'text-dark-secondary' : 'text-slate-600'}`}>
              <li><a href="https://github.com/RiWoT" target="_blank" rel="noopener noreferrer" className="hover:text-cyan transition-colors">GITHUB</a></li>
              <li><a href="https://discord.gg/qMd7jwV7UG" target="_blank" rel="noopener noreferrer" className="hover:text-cyan transition-colors">DISCORD</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className={`mt-16 pt-8 border-t ${darkMode ? 'border-white/5' : 'border-slate-100'} flex flex-col md:flex-row justify-between items-center gap-4`}>
        <p className="label-mono text-[10px] opacity-20">
          © 2025 SYSTEM.RIWOT.CORE // ALL RIGHTS RESERVED
        </p>
      </div>
    </div>
  </footer>
);

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

  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem('web3skills_darkmode');
    return savedDarkMode !== null ? JSON.parse(savedDarkMode) : true;
  });

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
    localStorage.setItem('web3skills_darkmode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

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

  return (
    <div className={`min-h-screen transition-all relative ${darkMode ? 'bg-dark-theme' : 'bg-light-theme'}`}>
      {darkMode && <div className="noise-overlay" />}
      {darkMode && <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />}
      
      <div className="relative z-10">
        <Navigation
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          setShowShareModal={setShowShareModal}
          setShowViewModal={setShowViewModal}
          viewMode={viewMode}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
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
