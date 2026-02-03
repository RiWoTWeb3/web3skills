import React, { useState, useEffect, useCallback, useMemo } from 'react';
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
    <nav className={`${darkMode ? 'navbar-dark' : 'navbar-light'} sticky top-4 z-40 mx-4 md:mx-8 rounded-2xl transition-all duration-300`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="flex items-center space-x-3">
              <div className="bg-accent-blue p-3 rounded-xl border border-cyan-300/40 transition-all duration-300">
                <Rocket className="text-black" size={24} />
              </div>
              <div>
                <h1 className={`font-bold text-xl tracking-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Web3 Skills <span className={darkMode ? 'text-white' : 'text-accent-blue'}>RiWoT</span>
                </h1>
                <p className={`text-[10px] font-mono uppercase tracking-[0.2em] ${darkMode ? 'text-dark-tertiary' : 'text-gray-600'}`}>System.Core.v2</p>
              </div>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-2">
            {!viewMode && (
              <Link
                to="/"
                className={`text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                  location.pathname === '/'
                  ? (darkMode ? 'btn-primary-dark' : 'btn-primary-light')
                    : (darkMode ? 'btn-glass-dark' : 'btn-glass-light')
                }`}
              >
                Home
              </Link>
            )}
            <Link
              to="/skills"
              className={`text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                location.pathname === '/skills'
                  ? (darkMode ? 'btn-primary-dark' : 'btn-primary-light')
                  : (darkMode ? 'btn-glass-dark' : 'btn-glass-light')
              }`}
            >
              Skills
            </Link>
            <Link
              to="/careers"
              className={`text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                location.pathname === '/careers' || location.pathname.startsWith('/career/')
                  ? (darkMode ? 'btn-primary-dark' : 'btn-primary-light')
                  : (darkMode ? 'btn-glass-dark' : 'btn-glass-light')
              }`}
            >
              {viewMode ? 'Match' : 'Careers'}
            </Link>
            
            {!viewMode && (
              <>
                <button
                  onClick={() => setShowShareModal(true)}
                  className={`transition-all duration-300 ${darkMode ? 'btn-icon-dark' : 'btn-glass-light'}`}
                  title="Share Progress"
                >
                  <Share2 size={20} />
                </button>
                <button
                  onClick={() => setShowViewModal(true)}
                  className={`transition-all duration-300 ${darkMode ? 'btn-icon-dark' : 'btn-glass-light'}`}
                  title="View Shared"
                >
                  <Eye size={20} />
                </button>
              </>
            )}
            
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`transition-all duration-300 ${darkMode ? 'btn-icon-dark text-white' : 'btn-glass-light'}`}
            >
              {darkMode ? <Sun size={22} /> : <Moon className="text-purple-600" size={22} />}
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg"
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
                className={`block px-4 py-2 rounded-lg text-sm font-medium ${
                  location.pathname === '/'
                    ? (darkMode ? 'bg-accent-blue text-black' : 'bg-blue-50 text-blue-600')
                    : (darkMode ? 'text-white' : 'text-gray-600')
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
                  ? (darkMode ? 'bg-accent-blue text-black' : 'bg-blue-50 text-blue-600')
                  : (darkMode ? 'text-white' : 'text-gray-600')
              }`}
            >
              Skills
            </Link>
            <Link
              to="/careers"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2 rounded-lg text-sm font-medium ${
                location.pathname === '/careers'
                  ? (darkMode ? 'bg-accent-blue text-black' : 'bg-blue-50 text-blue-600')
                  : (darkMode ? 'text-white' : 'text-gray-600')
              }`}
            >
              {viewMode ? 'Career Match' : 'Careers'}
            </Link>
            <div className="flex gap-2 px-4 pt-2">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`flex-1 py-2 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
              >
                {darkMode ? <Sun className="text-white mx-auto" size={20} /> : <Moon className="text-gray-600 mx-auto" size={20} />}
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
        <div className={`${darkMode ? 'glass-card-dark border border-white/10' : 'bg-white border border-gray-200'} border rounded-xl p-6`}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <Eye className={darkMode ? 'text-white' : 'text-blue-600'} size={24} />
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

      <div className={`text-center pt-16 pb-12 relative overflow-hidden ${darkMode ? 'mesh-gradient-dark' : 'mesh-gradient'}`}>
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.06]"></div>
        <div className="relative z-10">
          <div className="flex justify-center mb-6">
            <div className={`${darkMode ? 'bg-accent-blue' : 'bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500'} p-6 rounded-3xl border ${darkMode ? 'border-cyan-300/50' : 'border-transparent'}`}>
              <GraduationCap className={darkMode ? 'text-black' : 'text-white'} size={64} />
            </div>
          </div>
          <h1 className={`text-5xl md:text-7xl font-extrabold mb-6 ${darkMode ? 'text-white' : 'gradient-text-purple'} leading-tight`}>
            Web3 Skills <br className="md:hidden" />Learning Platform
          </h1>
          <p className={`text-xl md:text-2xl max-w-3xl mx-auto mb-8 ${darkMode ? 'text-white' : 'text-gray-700'}`}>
            Master Web3 development with curated resources, track your progress, and join the RiWoT community
          </p>
          {!viewMode && (
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/skills"
                className={`px-8 py-4 font-bold text-lg flex items-center gap-2 transition-all duration-300 ${
                  darkMode
                    ? 'btn-primary-dark'
                    : 'bg-purple-600 hover:bg-purple-700 text-white shadow-xl rounded-xl'
                }`}
              >
                <Rocket size={24} />
                Initialize Learning
              </Link>
              <Link
                to="/careers"
                className={`px-8 py-4 font-bold text-lg flex items-center gap-2 transition-all duration-300 ${
                  darkMode
                    ? 'btn-glass-dark'
                    : 'bg-white hover:bg-gray-50 border-2 border-purple-300 text-gray-900 shadow-xl rounded-xl'
                }`}
              >
                <Target size={24} />
                Explore Careers
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {!viewMode && (
          <div className={`${darkMode ? 'glass-card-dark text-white' : 'card-white-light text-gray-900'} p-8 rounded-2xl group transition-all duration-300 stagger-item overflow-hidden relative`}>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${darkMode ? 'bg-accent-blue' : 'bg-black'}`}>
                  <TrendingUp className={darkMode ? 'text-black' : 'text-white'} size={24} />
                </div>
                <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Your Progress</h3>
              </div>
              <div className="mb-4">
                <div className={`text-5xl font-extrabold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {checkedSkills}<span className={`text-2xl font-mono ${darkMode ? 'text-dark-tertiary' : 'text-gray-500'}`}>/{totalSkills}</span>
                </div>
              </div>
              <div className={`${darkMode ? 'progress-bar-dark' : 'progress-bar-light'} mb-3`}>
                <div className="progress-fill" style={{ width: `${overallProgress}%` }} />
              </div>
              <p className={`text-xs font-mono uppercase tracking-wider ${darkMode ? 'text-dark-tertiary' : 'text-gray-600'}`}>{overallProgress.toFixed(1)}% System Status</p>
            </div>
          </div>
        )}

        <div className={`${darkMode ? 'glass-card-dark text-white' : 'gradient-card-purple p-8 rounded-2xl text-white card-lift'} p-8 rounded-2xl group transition-all duration-300 stagger-item overflow-hidden relative`}>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${darkMode ? 'bg-accent-blue' : 'bg-white/20 backdrop-blur-sm'}`}>
                <Award className={darkMode ? 'text-black' : 'text-white'} size={24} />
              </div>
              <h3 className="text-lg font-bold">Categories Mastered</h3>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex flex-wrap gap-2">
                <span className="badge badge-blue">Essentials</span>
                <span className="badge badge-blue">Blockchain</span>
                <span className="badge badge-blue">Rust</span>
              </div>
            </div>
            <p className={`text-xs font-mono uppercase tracking-wider ${darkMode ? 'text-dark-tertiary' : 'opacity-80'}`}>Sixteen available paths</p>
          </div>
        </div>

        {!viewMode && (
          <div className={`${darkMode ? 'glass-card-dark' : 'glass-card-light'} p-8 rounded-2xl group transition-all duration-300 stagger-item overflow-hidden relative`}>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl icon-gradient-blue flex items-center justify-center">
                  <Target className="text-black" size={24} />
                </div>
                <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Career Paths</h3>
              </div>
              <div className={`text-5xl font-extrabold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{Object.keys(careerPaths).length}</div>
              <p className={`text-xs font-mono uppercase tracking-wider ${darkMode ? 'text-dark-tertiary' : 'text-gray-600'}`}>Infrastructure Roles</p>
            </div>
          </div>
        )}
      </div>

      {!viewMode && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/skills"
            className={`${darkMode ? 'glass-card-dark border border-white/10' : 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:from-blue-100 hover:to-blue-200'} p-8 rounded-2xl border transition-colors text-left group`}
          >
            <BookOpen className={`${darkMode ? 'text-white' : 'text-blue-600'} mb-4`} size={36} />
            <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Track Skills</h3>
            <p className={`${darkMode ? 'text-white' : 'text-gray-600'} mb-4`}>
              Browse and track 300+ Web3 skills across 15 categories
            </p>
            <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-blue-600'} flex items-center gap-2`}>
              Start Tracking <ArrowRight size={16} />
            </span>
          </Link>

          <Link
            to="/careers"
            className={`${darkMode ? 'glass-card-dark border border-white/10' : 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:from-purple-100 hover:to-purple-200'} p-8 rounded-2xl border transition-colors text-left group`}
          >
            <Target className={`${darkMode ? 'text-white' : 'text-purple-600'} mb-4`} size={36} />
            <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Explore Careers</h3>
            <p className={`${darkMode ? 'text-white' : 'text-gray-600'} mb-4`}>
              Discover {Object.keys(careerPaths).length} career paths with detailed roadmaps and resources
            </p>
            <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-purple-600'} flex items-center gap-2`}>
              View Careers <ArrowRight size={16} />
            </span>
          </Link>
        </div>
      )}

      {/* RiWoT Community Section */}
      <div className={`${darkMode ? 'glass-card-dark border border-white/10' : 'bg-gradient-to-br from-green-50 to-blue-50 border-green-200'} rounded-2xl p-8 md:p-12 border`}>
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Users className={darkMode ? 'text-white' : 'text-green-600'} size={48} />
          </div>
          <h2 className={`text-3xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Join RiWoT Community
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-white' : 'text-gray-600'}`}>
            Connect with Web3 developers, get mentorship, and accelerate your learning journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className={`font-bold text-lg mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>What You'll Learn:</h3>
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
                  <CheckCircle className={darkMode ? 'text-white flex-shrink-0' : 'text-green-600 flex-shrink-0'} size={20} />
                  <span className={darkMode ? 'text-white' : 'text-gray-700'}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={`font-bold text-lg mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Community Benefits:</h3>
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
                  <Star className={darkMode ? 'text-white flex-shrink-0' : 'text-blue-600 flex-shrink-0'} size={20} />
                  <span className={darkMode ? 'text-white' : 'text-gray-700'}>{item}</span>
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
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              darkMode ? 'btn-primary-dark' : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            <MessageCircle size={20} />
            Join Discord
            <ArrowRight size={18} />
          </a>
          <a
            href="https://github.com/RiWoT"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              darkMode ? 'btn-glass-dark' : 'bg-gray-800 hover:bg-gray-900 text-white'
            }`}
          >
            <Github size={20} />
            View GitHub
            <ArrowRight size={18} />
          </a>
        </div>
      </div>

      {/* Data Management Section */}
      {!viewMode && (
        <div className={`${darkMode ? 'glass-card-dark border border-white/10' : 'bg-white border-gray-200'} p-6 rounded-xl border`}>
          <div className="flex flex-wrap justify-between items-center gap-4">
            <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Manage Progress</h3>
            <div className="flex gap-3">
              <button
                onClick={exportData}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  darkMode ? 'btn-glass-dark' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Download size={16} />
                Export
              </button>
              <label className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                darkMode ? 'btn-glass-dark' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
        <h1 className={`text-5xl font-extrabold mb-4 ${darkMode ? 'text-white text-shadow-dark' : 'text-gray-900 text-shadow'}`}>All Skills</h1>
        <p className={`text-xl ${darkMode ? 'text-white' : 'text-gray-700'}`}>
          Track your progress across Web3 skills
        </p>
      </div>

      {!viewMode && (
        <div className={`${darkMode ? 'glass-card-dark' : 'glass-card-light'} p-6 rounded-2xl`}>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1">
              <div className="relative">
                <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-white' : 'text-gray-500'}`} size={20} />
                <input
                  type="text"
                  placeholder="Search skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`${darkMode ? 'input-glass-dark' : 'input-glass-light'} w-full pl-12 pr-4 py-3`}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFilterComplete('all')}
                className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all ${
                  filterComplete === 'all'
                    ? (darkMode ? 'btn-primary-dark' : 'btn-primary-light')
                    : (darkMode ? 'btn-glass-dark' : 'btn-glass-light')
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterComplete('complete')}
                className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all ${
                  filterComplete === 'complete'
                    ? 'bg-green-500 text-black'
                    : (darkMode ? 'btn-glass-dark' : 'btn-glass-light')
                }`}
              >
                Complete
              </button>
              <button
                onClick={() => setFilterComplete('incomplete')}
                className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all ${
                  filterComplete === 'incomplete'
                    ? 'bg-red-500 text-white'
                    : (darkMode ? 'btn-glass-dark' : 'btn-glass-light')
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
          <div key={categoryName} className={`${darkMode ? 'glass-card-dark' : 'glass-card-light'} p-6 rounded-2xl overflow-hidden`}>
            <div
              className="flex flex-wrap justify-between items-center mb-4 gap-3 cursor-pointer group"
              onClick={() => setExpandedCategories(prev => ({ ...prev, [categoryName]: !prev[categoryName] }))}
            >
              <div className="flex items-center gap-3">
                <h2 className={`text-2xl font-bold transition-colors ${darkMode ? 'text-white group-hover:text-white' : 'text-gray-900 group-hover:text-purple-600'}`}>
                  {categoryName}
                </h2>
                {expandedCategories[categoryName] ? (
                  <ChevronUp className={darkMode ? 'text-dark-tertiary' : 'text-gray-600'} size={24} />
                ) : (
                  <ChevronDown className={darkMode ? 'text-dark-tertiary' : 'text-gray-600'} size={24} />
                )}
              </div>
              <div className="flex items-center gap-4">
                <span className={`text-sm font-mono ${darkMode ? 'text-dark-secondary' : 'text-gray-700'}`}>
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
                    className={`flex items-center gap-3 p-3 rounded-xl ${
                      viewMode ? '' : 'cursor-pointer'
                    } transition-all duration-300 group ${
                      displaySkills[skill]
                        ? (darkMode ? 'bg-white/5 border border-white/10' : 'bg-green-50')
                        : (darkMode ? 'hover:bg-white/5' : 'hover:bg-purple-100/50')
                    }`}
                  >
                    {!viewMode && (
                      <div className="relative flex items-center justify-center">
                        <input
                          type="checkbox"
                          checked={displaySkills[skill] || false}
                          onChange={() => toggleSkill(skill)}
                          className={`peer appearance-none w-5 h-5 rounded-md border-2 transition-all cursor-pointer ${
                            darkMode
                              ? 'border-white/20 checked:bg-accent-blue checked:border-accent-blue'
                              : 'border-gray-300 bg-white checked:bg-purple-600 checked:border-purple-600'
                          }`}
                        />
                        <Check
                          className={`absolute w-3.5 h-3.5 ${
                            darkMode ? 'text-black' : 'text-white'
                          } opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none`}
                          strokeWidth={4}
                        />
                      </div>
                    )}
                    {viewMode && (
                      displaySkills[skill] ? (
                        <CheckCircle className={darkMode ? 'text-white flex-shrink-0' : 'text-accent-blue flex-shrink-0'} size={20} />
                      ) : (
                        <Circle className={darkMode ? 'text-white/10' : 'text-gray-400'} size={20} />
                      )
                    )}
                    <span
                      className={`transition-all duration-300 font-medium ${
                        displaySkills[skill]
                          ? (darkMode ? 'text-white' : 'text-gray-400 line-through')
                          : (darkMode ? 'text-dark-primary group-hover:text-white' : 'text-gray-700 group-hover:text-gray-900')
                      }`}
                    >
                      {skill}
                    </span>
                    {displaySkills[skill] && darkMode && (
                      <div className="ml-auto w-1 h-1 rounded-full bg-accent-blue" />
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

const CareersView = ({ darkMode, viewMode, getCareerMatch }) => {
  const evmCareers = Object.entries(careerPaths).filter(([_, career]) => career.ecosystem === 'EVM');
  const solanaCareers = Object.entries(careerPaths).filter(([_, career]) => career.ecosystem === 'Solana');

  const CareerCard = ({ careerName, career }) => {
    const match = getCareerMatch(careerName);
    const Icon = career.icon;
    return (
      <div
        key={careerName}
        className={`${darkMode ? 'glass-card-dark' : 'glass-card-light'} p-6 rounded-2xl transition-all duration-300 group relative overflow-hidden`}
      >
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className={`text-xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{careerName}</h3>
              <p className={`text-xs font-mono uppercase tracking-wider ${darkMode ? 'text-dark-tertiary' : 'text-gray-600'}`}>{career.ecosystem}</p>
            </div>
            <div className="icon-gradient-blue p-3 rounded-xl">
              <Icon className="text-black" size={24} />
            </div>
          </div>

          <p className={`text-sm mb-4 line-clamp-2 ${darkMode ? 'text-dark-secondary' : 'text-gray-600'}`}>{career.description}</p>

          <div className="mb-4">
            <div className={`${darkMode ? 'progress-bar-dark' : 'progress-bar-light'} mb-2`}>
              <div className="progress-fill" style={{ width: `${match.percentage}%` }} />
            </div>
            <p className={`text-xs font-mono ${darkMode ? 'text-dark-tertiary' : 'text-gray-600'}`}>
              {match.percentage.toFixed(0)}% match • {match.matched}/{match.total} skills
            </p>
          </div>

          {!viewMode && (
            <Link
              to={`/career/${encodeURIComponent(careerName)}`}
              className={`${darkMode ? 'btn-primary-dark' : 'btn-primary-light'} w-full py-3 px-6 font-bold transition-all duration-300 flex items-center justify-center gap-2`}
            >
              View Roadmap
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
        <h1 className={`text-5xl font-extrabold mb-4 ${darkMode ? 'text-white text-shadow-dark' : 'text-gray-900 text-shadow'}`}>Career Paths</h1>
        <p className={`text-xl ${darkMode ? 'text-white' : 'text-gray-700'}`}>
          Explore Web3 career paths with detailed roadmaps
        </p>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="h-8 w-1 bg-accent-blue rounded-full" />
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
          <div className="h-8 w-1 bg-accent-blue rounded-full" />
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
          darkMode ? 'text-dark-tertiary hover:text-white' : 'text-blue-600 hover:text-blue-700'
        }`}
      >
        <ArrowRight size={16} className="rotate-180" />
        Back to Careers
      </Link>

      <div>
        <div className="flex items-start gap-4 mb-8">
          <div className={`p-4 rounded-xl ${darkMode ? 'bg-accent-blue border border-cyan-300/40' : 'bg-gray-100'}`}>
            <Icon className={darkMode ? 'text-black' : 'text-blue-600'} size={32} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className={`text-4xl font-extrabold ${darkMode ? 'text-white text-shadow-dark' : 'text-gray-900 text-shadow'}`}>{careerName}</h1>
              <span className={`px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider ${
                darkMode
                  ? 'bg-white/5 text-white border border-white/10'
                  : (career.ecosystem === 'EVM'
                    ? 'bg-blue-500/10 text-blue-600 border border-blue-500/20'
                    : career.ecosystem === 'Solana'
                      ? 'bg-purple-500/10 text-purple-600 border border-purple-500/20'
                      : 'bg-green-500/10 text-green-600 border border-green-500/20')
              }`}>
                {career.ecosystem}
              </span>
            </div>
            <p className={`text-lg leading-relaxed ${darkMode ? 'text-dark-secondary' : 'text-gray-600'}`}>{career.description}</p>
          </div>
        </div>

        <div className={`${darkMode ? 'glass-card-dark' : 'bg-blue-50 border-blue-200'} p-8 rounded-2xl`}>
          <div className="flex justify-between items-center mb-4">
            <span className={`text-sm font-mono uppercase tracking-[0.2em] ${darkMode ? 'text-dark-tertiary' : 'text-gray-900'}`}>System Compatibility</span>
            <span className={`text-sm font-mono ${darkMode ? 'text-dark-secondary' : 'text-gray-600'}`}>
              {match.matched}/{match.total} Units
            </span>
          </div>
          <div className={`w-full ${darkMode ? 'bg-white/5' : 'bg-white'} rounded-full h-3 overflow-hidden border ${darkMode ? 'border-white/5' : 'border-gray-100'}`}>
            <div
              className="bg-accent-blue h-full rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${match.percentage}%` }}
            />
          </div>
          <p className={`text-xs font-mono uppercase tracking-widest ${darkMode ? 'text-dark-tertiary' : 'text-gray-500'} mt-3`}>
            {match.percentage.toFixed(1)}% Alignment
          </p>
        </div>
      </div>

      <div className={`${darkMode ? 'glass-card-dark' : 'bg-white border-gray-200'} p-8 rounded-2xl`}>
        <h2 className={`text-sm font-mono uppercase tracking-[0.2em] mb-8 ${darkMode ? 'text-dark-tertiary' : 'text-gray-900'}`}>Core Prerequisites</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {career.requiredSkills.map(skill => (
            <div
              key={skill}
              className={`flex items-center gap-3 p-4 rounded-xl transition-all duration-300 ${
                darkMode ? 'bg-white/5 border border-white/5 hover:border-white/10' : 'bg-gray-50'
              }`}
            >
              {displaySkills.hasOwnProperty(skill) && displaySkills[skill] ? (
                <CheckCircle className={darkMode ? 'text-white flex-shrink-0' : 'text-accent-blue flex-shrink-0'} size={20} />
              ) : (
                <Circle className={darkMode ? 'text-white/10' : 'text-gray-300'} size={20} />
              )}
              <span
                className={`text-sm font-medium ${
                  displaySkills[skill]
                    ? (darkMode ? 'text-white' : 'text-gray-900')
                    : (darkMode ? 'text-dark-secondary' : 'text-gray-600')
                }`}
              >
                {skill}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className={`${darkMode ? 'glass-card-dark' : 'bg-white border-gray-200'} p-8 rounded-2xl`}>
        <h2 className={`text-sm font-mono uppercase tracking-[0.2em] mb-12 ${darkMode ? 'text-dark-tertiary' : 'text-gray-900'}`}>
          System Roadmap Phases
        </h2>
        <div className="space-y-12">
          {career.roadmap.map((phase, index) => (
            <div key={index} className="relative">
              <div className={`flex items-start gap-6 ${darkMode ? 'border-white/5' : 'border-gray-200'} border-l-2 pl-8 pb-12`}>
                <div className={`absolute -left-4 top-0 bg-dark-theme border border-white/20 ${darkMode ? 'text-white' : 'text-accent-blue'} font-mono rounded-full w-8 h-8 flex items-center justify-center text-xs`}>
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {phase.phase}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider ${
                      darkMode ? 'bg-white/5 text-dark-tertiary border border-white/10' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {phase.duration}
                    </span>
                  </div>

                  <div className="mb-8">
                    <h4 className={`text-xs font-mono uppercase tracking-widest mb-4 ${darkMode ? 'text-dark-tertiary' : 'text-gray-600'}`}>
                      Target Modules
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {phase.skills.map(skill => {
                        const isCompleted = matchRoadmapSkill(skill, displaySkills);
                        return (
                          <span
                            key={skill}
                            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                              isCompleted
                                ? (darkMode ? 'bg-white/5 text-white border border-white/10' : 'bg-green-100 text-green-700')
                                : (darkMode ? 'bg-white/5 text-dark-secondary border border-white/5' : 'bg-gray-100 text-gray-600')
                            }`}
                          >
                            {skill}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <h4 className={`text-xs font-mono uppercase tracking-widest mb-4 ${darkMode ? 'text-dark-tertiary' : 'text-gray-600'}`}>
                      Access Protocols
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {phase.resources.map((resource, idx) => (
                        <a
                          key={idx}
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-start gap-4 p-4 rounded-xl transition-all duration-300 ${
                            darkMode ? 'bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/[0.07]' : 'bg-gray-50 hover:bg-gray-100'
                          }`}
                        >
                          <BookOpen className={darkMode ? 'text-white flex-shrink-0' : 'text-blue-600 flex-shrink-0'} size={20} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-sm font-bold truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                {resource.name}
                              </span>
                              <ExternalLink className={darkMode ? 'text-dark-tertiary' : 'text-gray-400'} size={14} />
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                                resource.type.includes('FREE')
                                  ? (darkMode ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-green-100 text-green-700')
                                  : (darkMode ? 'bg-white/5 text-white border-white/10' : 'bg-blue-100 text-blue-700')
                              }`}>
                                {resource.type}
                              </span>
                              {resource.duration && (
                                <span className={`text-[10px] font-mono ${darkMode ? 'text-dark-tertiary' : 'text-gray-500'}`}>
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
        <div className={`${darkMode ? 'glass-card-dark border border-white/10' : 'bg-gradient-to-br from-green-50 to-blue-50 border-green-200'} p-8 rounded-2xl`}>
          <h2 className={`text-sm font-mono uppercase tracking-[0.2em] mb-8 ${darkMode ? 'text-dark-tertiary' : 'text-gray-900'}`}>
            Estimated Ecosystem Yield
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {career.outcomes.junior && (
              <div className="space-y-1">
                <p className={`text-[10px] font-mono uppercase tracking-widest ${darkMode ? 'text-dark-tertiary' : 'text-gray-600'}`}>Entry Level</p>
                <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-green-600'}`}>{career.outcomes.junior}</p>
              </div>
            )}
            {career.outcomes.mid && (
              <div className="space-y-1">
                <p className={`text-[10px] font-mono uppercase tracking-widest ${darkMode ? 'text-dark-tertiary' : 'text-gray-600'}`}>Intermediate</p>
                <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-green-600'}`}>{career.outcomes.mid}</p>
              </div>
            )}
            {career.outcomes.senior && (
              <div className="space-y-1">
                <p className={`text-[10px] font-mono uppercase tracking-widest ${darkMode ? 'text-dark-tertiary' : 'text-gray-600'}`}>Advanced</p>
                <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-green-600'}`}>{career.outcomes.senior}</p>
              </div>
            )}
            {career.outcomes.lead && (
              <div className="space-y-1">
                <p className={`text-[10px] font-mono uppercase tracking-widest ${darkMode ? 'text-dark-tertiary' : 'text-gray-600'}`}>Principal</p>
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
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
    <div className={`${darkMode ? 'glass-card-dark border border-white/10' : 'bg-white'} rounded-2xl max-w-md w-full p-6`}>
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
          <p className={`text-xs font-mono break-all ${darkMode ? 'text-white' : 'text-gray-700'}`}>
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
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
    <div className={`${darkMode ? 'glass-card-dark border border-white/10' : 'bg-white'} rounded-2xl max-w-md w-full p-6`}>
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
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
    <div className={`${darkMode ? 'glass-card-dark border border-white/10' : 'bg-white'} rounded-2xl max-w-2xl w-full p-6 md:p-8 max-h-[90vh] overflow-y-auto`}>
      <div className="mb-6">
        <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Welcome to Web3 Skills RiWoT
        </h2>
        <p className={`text-sm ${darkMode ? 'text-white' : 'text-gray-600'}`}>
          Please read and accept our terms before using the platform
        </p>
      </div>

      <div className={`space-y-4 text-sm ${darkMode ? 'text-white' : 'text-gray-700'}`}>
        <div className={`p-4 rounded-lg ${darkMode ? 'bg-yellow-900/20 border border-yellow-800' : 'bg-yellow-50 border border-yellow-200'}`}>
          <h3 className={`font-bold mb-2 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-yellow-800'}`}>
            <Star size={18} />
            Important Disclaimer
          </h3>
          <p className={darkMode ? 'text-white' : 'text-yellow-900'}>
            This platform provides educational resources and career guidance for Web3 development. While we mention salary ranges and career outcomes, <strong>we do not guarantee employment or specific compensation</strong>. These are industry estimates based on market research as of 2025.
          </p>
        </div>

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

        <div className={`p-4 rounded-lg ${darkMode ? 'bg-white/5 border border-white/10' : 'bg-blue-50 border border-blue-200'}`}>
          <h3 className={`font-bold mb-2 ${darkMode ? 'text-white' : 'text-blue-800'}`}>Privacy & Data Storage</h3>
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
            <a href="https://github.com/mirmohmmadluqman/web3skills" target="_blank" rel="noopener noreferrer" className={darkMode ? 'text-white hover:text-white' : 'text-blue-600 hover:text-blue-700'}>
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
          className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
            darkMode ? 'btn-primary-dark' : 'bg-blue-600 hover:bg-blue-700 text-white'
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
  <footer className={`mt-32 pb-16 ${darkMode ? 'border-white/5' : 'border-gray-200'} border-t pt-16`}>
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${darkMode ? 'bg-accent-blue border border-cyan-300/40' : 'bg-gray-100'}`}>
              <Rocket className={darkMode ? 'text-black' : 'text-blue-600'} size={24} />
            </div>
            <span className={`font-bold text-lg tracking-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>Web3 Skills <span className={darkMode ? 'text-white' : 'text-accent-blue'}>RiWoT</span></span>
          </div>
          <p className={`text-sm leading-relaxed max-w-sm ${darkMode ? 'text-dark-secondary' : 'text-gray-600'}`}>
            A technical infrastructure platform for Web3 career development and skill verification.
            Built for the decentralized future.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/mirmohmmadluqman/web3skills"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-all duration-300 ${darkMode ? 'btn-icon-dark text-white' : 'bg-gray-100 text-gray-700 p-2 rounded-lg'}`}
            >
              <Github size={20} />
            </a>
            <a
              href="https://discord.gg/qMd7jwV7UG"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-all duration-300 ${darkMode ? 'btn-icon-dark text-white' : 'bg-gray-100 text-gray-700 p-2 rounded-lg'}`}
            >
              <MessageCircle size={20} />
            </a>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 md:justify-items-end">
          <div className="space-y-4">
            <h4 className={`text-[10px] font-mono uppercase tracking-[0.2em] ${darkMode ? 'text-dark-secondary' : 'text-gray-900 font-bold'}`}>Infrastructure</h4>
            <ul className={`space-y-2 text-sm font-mono ${darkMode ? 'text-dark-primary' : 'text-gray-600'}`}>
              <li><Link to="/skills" className={darkMode ? 'hover:text-white transition-colors' : 'hover:text-accent-blue transition-colors'}>Skill Tree</Link></li>
              <li><Link to="/careers" className={darkMode ? 'hover:text-white transition-colors' : 'hover:text-accent-blue transition-colors'}>Roadmaps</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className={`text-[10px] font-mono uppercase tracking-[0.2em] ${darkMode ? 'text-dark-secondary' : 'text-gray-900 font-bold'}`}>Resources</h4>
            <ul className={`space-y-2 text-sm font-mono ${darkMode ? 'text-dark-primary' : 'text-gray-600'}`}>
              <li><a href="https://github.com/RiWoT" target="_blank" rel="noopener noreferrer" className={darkMode ? 'hover:text-white transition-colors' : 'hover:text-accent-blue transition-colors'}>RiWoT Org</a></li>
              <li><a href="https://discord.gg/qMd7jwV7UG" target="_blank" rel="noopener noreferrer" className={darkMode ? 'hover:text-white transition-colors' : 'hover:text-accent-blue transition-colors'}>Discord</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className={`mt-16 pt-8 border-t ${darkMode ? 'border-white/5' : 'border-gray-100'} flex flex-col md:flex-row justify-between items-center gap-4`}>
        <p className={`text-[10px] font-mono uppercase tracking-widest ${darkMode ? 'text-dark-secondary' : 'text-gray-500'}`}>
          © 2025 SYSTEM.RIWOT.CORE // ALL RIGHTS RESERVED
        </p>
        <p className={`text-[10px] font-mono uppercase tracking-widest ${darkMode ? 'text-dark-secondary' : 'text-gray-500'}`}>
          CREATED BY <a href="https://mirmohmmadluqman.github.io/portfolio/" target="_blank" rel="noopener noreferrer" className={darkMode ? 'text-white hover:underline' : 'text-accent-blue hover:underline'}>LUQMAN</a>
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
    <div className={`min-h-screen transition-all relative overflow-hidden ${darkMode ? 'bg-dark-theme' : 'bg-light-theme'}`}>
      {darkMode && <div className="noise-overlay" />}

      
      <div className={`absolute inset-0 ${darkMode ? 'grid-pattern-dark' : 'grid-pattern-light'} opacity-[0.04]`}></div>
      
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
