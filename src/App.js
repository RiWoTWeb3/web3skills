import React, { useState, useEffect } from 'react';
import { 
  Download, Upload, CheckCircle, Circle, TrendingUp, Award, Target, BookOpen, Code, Shield, DollarSign, Layout, Server, Network, Users, 
  MessageCircle, Github, ArrowRight, Share2, Eye, X, Copy, Check, Moon, Sun, ChevronDown, ChevronUp, Search, /*Cloud,*/ /*FileCode*/ 
} from 'lucide-react';

const App = () => {
  const initialSkills = {
    'Python': false, 'Rust': false, 'Go': false, 'TypeScript': false, 'Solidity': false, 'Vyper': false, 'Huff': false, 'Yul': false, 'JavaScript': false, 'Cairo': false,
    'React': false, 'Next.js': false, 'Vue.js': false, 'Svelte': false, 'TailwindCSS': false, 'Styled Components': false, 'Redux': false, 'React Query': false,
    'REST API': false, 'GraphQL': false, 'WebSockets': false, 'gRPC': false, 'Node.js': false, 'Express.js': false,
    'Foundry': false, 'Hardhat': false, 'Truffle': false, 'Remix': false, 'Ganache': false, 'Figma': false, 'Adobe Creative Suite': false, 'AI Design Tools': false, 'Postman': false,
    'VS Code Extensions': false, 'Docker': false, 'Git Advanced': false,
    'Slither': false, 'Echidna': false, 'Certora': false, 'Mythril': false, 'Manticore': false, 'Trail of Bits Tools': false, 'OpenZeppelin Defender': false, 'Tenderly': false,
    'AWS': false, 'GCP': false, 'Azure': false, 'CI/CD': false, 'DevOps Principles': false, 'Cloud Architecture': false, 'Kubernetes': false, 'Terraform': false, 'Jenkins': false,
    'GitHub Actions': false,
    'PostgreSQL': false, 'MongoDB': false, 'Redis': false, 'Database Design': false, 'Database Optimization': false, 'Distributed Systems': false, 'Time-Series Observability': false,
    'Elasticsearch': false,
    'Blockchain Fundamentals': false, 'EVM Mechanics': false, 'Smart Contract Development': false, 'Production EVM Smart Contracts': false, 'High-TVL Contracts': false, 'AMMs': false,
    'Oracles': false, 'DeFi Understanding': false, 'DeFi Products': false, 'dApps': false, 'Solana Development': false, 'Developer Infrastructure': false, 'L2s': false, 'Bridges': false,
    'ERC-4337': false, 'ZK Proofs': false, 'EIPs Contributions': false, 'MEV': false, 'Consensus Mechanisms': false, 'Tokenomics': false, 'NFT Standards': false,
    'Cross-chain Protocols': false, 'Web3 Wallets': false, 'IPFS': false, 'The Graph': false,
    'System Design': false, 'System Architecture': false, 'API Building & Scaling': false, 'High-Throughput Systems': false, 'Low-Latency Systems': false, 'Production Systems': false,
    'Large-Scale Cloud Systems': false, 'Microservices': false, 'Event-Driven Architecture': false, 'Domain-Driven Design': false,
    'Smart Contract Auditing': false, 'Vulnerability Assessment': false, 'Formal Verification': false, 'Gas Optimization': false, 'Access Control Patterns': false, 'Upgrade Patterns': false,
    'Reentrancy Prevention': false, 'Security Best Practices': false,
    'Unit Testing': false, 'Integration Testing': false, 'End-to-End Testing': false, 'Fuzz Testing': false, 'Test-Driven Development': false, 'Performance Testing': false,
    'Communication': false, 'Collaboration': false, 'Mentoring': false, 'Leadership': false, 'Guiding Technical Teams': false, 'Autonomy': false, 'Adapt to Feedback': false,
    'Align with Business Goals': false, 'Problem Solving': false, 'Critical Thinking': false,
    'Billing/Monetization Systems': false, 'Security Tools Experience': false, 'Startup Experience': false, 'Web3 Experience': false, 'Passion for Web3': false, 'Crypto Experience': false,
    'Open-source Contributions': false, 'Technical Writing': false, 'Community Building': false, 'Public Speaking': false,
    'C++': false, 'Cryptography': false, 'Key Management': false, 'TEEs': false, 'Zero-Knowledge Systems': false, 'Fintech': false, 'Algorithmic Trading': false,
    'UI/UX Design': false, 'Wireframing': false, 'Prototyping': false, 'Sketch': false, 'InVision': false, 'Visio': false, 'SCSS': false, 'iOS Design': false, 'Android Design': false,
  };

  const [skills, setSkills] = useState(initialSkills);
  const [currentView, setCurrentView] = useState('home');
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showAgreementModal, setShowAgreementModal] = useState(false);
  const [showFullAgreement, setShowFullAgreement] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterComplete, setFilterComplete] = useState('all');
  const [expandedCategories, setExpandedCategories] = useState({});
  const [viewMode, setViewMode] = useState(false);
  const [sharedSkills, setSharedSkills] = useState(null);
  const [cloudShareUrl, setCloudShareUrl] = useState('');
  const [isSharing, setIsSharing] = useState(false);
  const [shareTab, setShareTab] = useState('offline');
  const [shareInput, setShareInput] = useState('');
  const [showResources, setShowResources] = useState(false);

  const categories = {
    'Programming Languages': ['Python', 'Rust', 'Go', 'TypeScript', 'Solidity', 'Vyper', 'Huff', 'Yul', 'JavaScript', 'Cairo', 'C++'],
    'Frontend Technologies': ['React', 'Next.js', 'Vue.js', 'Svelte', 'TailwindCSS', 'Styled Components', 'Redux', 'React Query'],
    'Backend & API': ['REST API', 'GraphQL', 'WebSockets', 'gRPC', 'Node.js', 'Express.js'],
    'Development Tools': ['Foundry', 'Hardhat', 'Truffle', 'Remix', 'Ganache', 'Figma', 'Adobe Creative Suite', 'AI Design Tools', 'Postman', 'VS Code Extensions', 'Docker', 'Git Advanced'],
    'Security Tools': ['Slither', 'Echidna', 'Certora', 'Mythril', 'Manticore', 'Trail of Bits Tools', 'OpenZeppelin Defender', 'Tenderly'],
    'Cloud & DevOps': ['AWS', 'GCP', 'Azure', 'CI/CD', 'DevOps Principles', 'Cloud Architecture', 'Kubernetes', 'Terraform', 'Jenkins', 'GitHub Actions'],
    'Database & Systems': ['PostgreSQL', 'MongoDB', 'Redis', 'Database Design', 'Database Optimization', 'Distributed Systems', 'Time-Series Observability', 'Elasticsearch'],
    'Blockchain & Web3': ['Blockchain Fundamentals', 'EVM Mechanics', 'Smart Contract Development', 'Production EVM Smart Contracts', 'High-TVL Contracts', 'AMMs', 'Oracles', 'DeFi Understanding', 'DeFi Products', 'dApps', 'Solana Development', 'Developer Infrastructure', 'L2s', 'Bridges', 'ERC-4337', 'ZK Proofs', 'EIPs Contributions', 'MEV', 'Consensus Mechanisms', 'Tokenomics', 'NFT Standards', 'Cross-chain Protocols', 'Web3 Wallets', 'IPFS', 'The Graph'],
    'Architecture & Design': ['System Design', 'System Architecture', 'API Building & Scaling', 'High-Throughput Systems', 'Low-Latency Systems', 'Production Systems', 'Large-Scale Cloud Systems', 'Microservices', 'Event-Driven Architecture', 'Domain-Driven Design'],
    'Security & Auditing': ['Smart Contract Auditing', 'Vulnerability Assessment', 'Formal Verification', 'Gas Optimization', 'Access Control Patterns', 'Upgrade Patterns', 'Reentrancy Prevention', 'Security Best Practices', 'Cryptography', 'Key Management', 'TEEs', 'Zero-Knowledge Systems'],
    'Testing & QA': ['Unit Testing', 'Integration Testing', 'End-to-End Testing', 'Fuzz Testing', 'Test-Driven Development', 'Performance Testing'],
    'Soft Skills': ['Communication', 'Collaboration', 'Mentoring', 'Leadership', 'Guiding Technical Teams', 'Autonomy', 'Adapt to Feedback', 'Align with Business Goals', 'Problem Solving', 'Critical Thinking'],
    'Specialized Experience': ['Billing/Monetization Systems', 'Security Tools Experience', 'Startup Experience', 'Web3 Experience', 'Passion for Web3', 'Crypto Experience', 'Open-source Contributions', 'Technical Writing', 'Community Building', 'Public Speaking', 'Fintech', 'Algorithmic Trading', 'UI/UX Design', 'Wireframing', 'Prototyping', 'Sketch', 'InVision', 'Visio', 'SCSS', 'iOS Design', 'Android Design'],
  };

  const careerPaths = {
    'Smart Contract Developer': {
      icon: Code,
      description: 'Build secure, efficient smart contracts for decentralized applications',
      requiredSkills: ['Solidity', 'Rust', 'Smart Contract Development', 'Production EVM Smart Contracts', 'Foundry', 'Hardhat', 'EVM Mechanics', 'Security Best Practices'],
      roadmap: [
        { phase: 'Foundation', skills: ['Blockchain Fundamentals', 'Solidity', 'JavaScript', 'Git Advanced'], duration: '2-3 months' },
        { phase: 'Core Development', skills: ['Smart Contract Development', 'Foundry', 'Hardhat', 'Unit Testing', 'EVM Mechanics'], duration: '3-4 months' },
        { phase: 'Advanced Concepts', skills: ['Gas Optimization', 'Security Best Practices', 'Upgrade Patterns', 'Production EVM Smart Contracts'], duration: '3-4 months' },
        { phase: 'Specialization', skills: ['DeFi Products', 'High-TVL Contracts', 'Smart Contract Auditing', 'Open-source Contributions'], duration: '4-6 months' }
      ],
      resources: ['CryptoZombies', 'Solidity Docs', 'OpenZeppelin', 'Ethernaut', 'Foundry Book']
    },
    'Security Auditor': {
      icon: Shield,
      description: 'Identify vulnerabilities and ensure smart contract security',
      requiredSkills: ['Solidity', 'Security Tools Experience', 'Smart Contract Auditing', 'Slither', 'Echidna', 'Certora', 'Vulnerability Assessment', 'Formal Verification'],
      roadmap: [
        { phase: 'Foundation', skills: ['Solidity', 'Smart Contract Development', 'EVM Mechanics', 'Security Best Practices'], duration: '3-4 months' },
        { phase: 'Security Fundamentals', skills: ['Vulnerability Assessment', 'Reentrancy Prevention', 'Slither', 'Access Control Patterns'], duration: '2-3 months' },
        { phase: 'Advanced Security', skills: ['Formal Verification', 'Echidna', 'Certora', 'Smart Contract Auditing'], duration: '3-4 months' },
        { phase: 'Practical Experience', skills: ['Bug Bounties', 'Audit Reports', 'DeFi Understanding', 'Real-world Audits'], duration: '4-6 months' }
      ],
      resources: ['Damn Vulnerable DeFi', 'Ethernaut', 'Code4rena', 'Immunefi', 'Secureum']
    },
    'DeFi Developer': {
      icon: DollarSign,
      description: 'Create decentralized finance protocols and applications',
      requiredSkills: ['Solidity', 'DeFi Understanding', 'DeFi Products', 'AMMs', 'Oracles', 'Smart Contract Development', 'TypeScript', 'High-TVL Contracts'],
      roadmap: [
        { phase: 'DeFi Basics', skills: ['Blockchain Fundamentals', 'DeFi Understanding', 'Smart Contract Development'], duration: '2-3 months' },
        { phase: 'Core Protocols', skills: ['AMMs', 'Lending Protocols', 'Oracles', 'Tokenomics'], duration: '3-4 months' },
        { phase: 'Advanced DeFi', skills: ['MEV', 'Cross-chain Protocols', 'L2s', 'Bridges'], duration: '3-4 months' },
        { phase: 'Production', skills: ['High-TVL Contracts', 'Security Best Practices', 'Gas Optimization', 'Frontend Integration'], duration: '4-5 months' }
      ],
      resources: ['Uniswap Docs', 'Aave Docs', 'DeFi MOOC', 'Chainlink Docs', 'Curve Finance']
    },
    'Frontend Web3 Developer': {
      icon: Layout,
      description: 'Build user interfaces for decentralized applications',
      requiredSkills: ['React', 'Next.js', 'TypeScript', 'Blockchain Fundamentals', 'dApps', 'Web3 Wallets', 'TailwindCSS'],
      roadmap: [
        { phase: 'Frontend Foundation', skills: ['JavaScript', 'React', 'TypeScript', 'TailwindCSS'], duration: '2-3 months' },
        { phase: 'Web3 Integration', skills: ['Web3 Wallets', 'dApps', 'Blockchain Fundamentals'], duration: '2-3 months' },
        { phase: 'dApp Development', skills: ['Smart Contract Development', 'IPFS', 'The Graph'], duration: '3-4 months' },
        { phase: 'Advanced UI/UX', skills: ['Next.js', 'Redux', 'React Query', 'Mobile Responsive'], duration: '2-3 months' }
      ],
      resources: ['Scaffold-ETH', 'RainbowKit', 'Wagmi', 'Web3Modal', 'Viem']
    },
    'Backend Infrastructure Engineer': {
      icon: Server,
      description: 'Build scalable backend systems for Web3 applications',
      requiredSkills: ['Go', 'Rust', 'Python', 'Distributed Systems', 'API Building & Scaling', 'Database Design', 'High-Throughput Systems', 'Kubernetes'],
      roadmap: [
        { phase: 'Backend Basics', skills: ['Python', 'REST API', 'Database Design', 'Git Advanced'], duration: '3-4 months' },
        { phase: 'Distributed Systems', skills: ['Microservices', 'Redis', 'Distributed Systems', 'Kubernetes'], duration: '3-4 months' },
        { phase: 'Blockchain Integration', skills: ['Developer Infrastructure', 'The Graph', 'Event-Driven Architecture'], duration: '3-4 months' },
        { phase: 'Scale & Performance', skills: ['High-Throughput Systems', 'Database Optimization', 'Cloud Architecture'], duration: '4-5 months' }
      ],
      resources: ['System Design Primer', 'AWS Docs', 'Alchemy Docs', 'Infura Docs', 'The Graph']
    },
    'Blockchain Architect': {
      icon: Network,
      description: 'Design and architect blockchain systems and infrastructure',
      requiredSkills: ['System Architecture', 'Blockchain Fundamentals', 'L2s', 'Bridges', 'Distributed Systems', 'High-Throughput Systems', 'EVM Mechanics', 'Consensus Mechanisms'],
      roadmap: [
        { phase: 'Deep Blockchain Knowledge', skills: ['Blockchain Fundamentals', 'Consensus Mechanisms', 'EVM Mechanics', 'System Architecture'], duration: '4-5 months' },
        { phase: 'System Design', skills: ['System Design', 'Distributed Systems', 'Large-Scale Cloud Systems', 'Security Best Practices'], duration: '3-4 months' },
        { phase: 'Layer 2 & Scaling', skills: ['L2s', 'ZK Proofs', 'Bridges', 'Cross-chain Protocols'], duration: '4-5 months' },
        { phase: 'Advanced Architecture', skills: ['High-Throughput Systems', 'Performance Testing', 'Production Systems'], duration: '5-6 months' }
      ],
      resources: ['Ethereum.org', 'Optimism Docs', 'Arbitrum Docs', 'zkSync Docs', 'Polygon Docs']
    },
    'New Grad Software Engineer': {
      icon: Code,
      description: 'Build foundational economic infrastructure for programmable global markets',
      requiredSkills: ['C++', 'Rust', 'Go', 'Solidity', 'Distributed Systems', 'Data Structures', 'Algorithms', 'Software Design'],
      roadmap: [
        { phase: 'Foundation', skills: ['Python', 'Rust', 'Go', 'Distributed Systems'], duration: '2-3 months' },
        { phase: 'Core Development', skills: ['API Building & Scaling', 'Database Design', 'High-Throughput Systems'], duration: '3-4 months' },
        { phase: 'Advanced', skills: ['Cryptography', 'Key Management', 'TEEs', 'Zero-Knowledge Systems'], duration: '3-4 months' },
        { phase: 'Specialization', skills: ['Fintech', 'Algorithmic Trading', 'React', 'TypeScript'], duration: '4-6 months' }
      ],
      resources: ['System Design Primer', 'Rust Book', 'Go Tour', 'Solidity Docs']
    },
    'UI/UX Designer': {
      icon: Layout,
      description: 'Design UI/UX for digital assets in crypto projects',
      requiredSkills: ['UI/UX Design', 'Wireframing', 'Prototyping', 'Figma', 'Adobe Creative Suite', 'AI Design Tools', 'SCSS', 'iOS Design', 'Android Design'],
      roadmap: [
        { phase: 'Foundation', skills: ['Figma', 'Adobe Creative Suite', 'UI/UX Design'], duration: '2-3 months' },
        { phase: 'Core Design', skills: ['Wireframing', 'Prototyping', 'Sketch'], duration: '2-3 months' },
        { phase: 'Advanced', skills: ['InVision', 'Visio', 'SCSS'], duration: '3-4 months' },
        { phase: 'Specialization', skills: ['iOS Design', 'Android Design', 'Blockchain Fundamentals'], duration: '3-4 months' }
      ],
      resources: ['Figma Tutorials', 'Adobe XD Guide', 'UX Design Principles']
    }
  };

  const skillsList = Object.keys(initialSkills);
  const SKILL_ID_MAP = {};
  const SKILL_NAME_MAP = {};
  skillsList.forEach((skill, index) => {
    SKILL_ID_MAP[skill] = index;
    SKILL_NAME_MAP[index] = skill;
  });

  useEffect(() => {
    const savedSkills = localStorage.getItem('web3skills');
    const agreement = localStorage.getItem('web3skills_agreement_accepted');
    const savedDarkMode = localStorage.getItem('web3skills_darkmode');
    if (savedSkills) setSkills(JSON.parse(savedSkills));
    if (savedDarkMode) setDarkMode(JSON.parse(savedDarkMode));
    if (!agreement) setShowAgreementModal(true);
    const params = new URLSearchParams(window.location.search);
    const viewCode = params.get('view');
    const gistId = params.get('gist');
    if (viewCode) loadSharedSkills(viewCode);
    else if (gistId) loadFromGist(gistId);
    const initialExpanded = {};
    Object.keys(categories).forEach(cat => initialExpanded[cat] = true);
    setExpandedCategories(initialExpanded);
  }, []);

  useEffect(() => {
    localStorage.setItem('web3skills', JSON.stringify(skills));
  }, [skills]);

  useEffect(() => {
    localStorage.setItem('web3skills_darkmode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleSkill = (skill) => {
    setSkills(prev => ({ ...prev, [skill]: !prev[skill] }));
  };

  const generateOfflineCode = (skillsData) => {
    const checkedSkills = Object.keys(skillsData).filter(k => skillsData[k]);
    const skillIds = checkedSkills.map(skill => SKILL_ID_MAP[skill]);
    const compact = skillIds.join(',');
    const encoded = btoa(compact);
    return `WEB3SKILLS:${encoded}`;
  };

  const decodeOfflineCode = (code) => {
    try {
      const encoded = code.replace('WEB3SKILLS:', '');
      const compact = atob(encoded);
      const skillIds = compact.split(',').map(id => parseInt(id)).filter(id => !isNaN(id));
      const decoded = { ...initialSkills };
      skillIds.forEach(id => {
        const skillName = SKILL_NAME_MAP[id];
        if (skillName) decoded[skillName] = true;
      });
      return decoded;
    } catch (e) {
      return null;
    }
  };

  const createCloudShare = async () => {
    setIsSharing(true);
    try {
      const checkedSkills = Object.keys(skills).filter(k => skills[k]);
      const data = { skills: checkedSkills, timestamp: new Date().toISOString(), totalSkills: checkedSkills.length };
      const response = await fetch('https://api.github.com/gists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          public: true,
          description: 'Web3 Skills Profile',
          files: { 'web3-skills.json': { content: JSON.stringify(data, null, 2) } }
        })
      });
      const result = await response.json();
      const shareUrl = `${window.location.origin}?gist=${result.id}`;
      setCloudShareUrl(shareUrl);
      setIsSharing(false);
      return shareUrl;
    } catch (error) {
      console.error('Cloud share error:', error);
      setIsSharing(false);
      alert('Cloud sharing failed. Please try offline code instead.');
      return null;
    }
  };

  const loadFromGist = async (gistId) => {
    try {
      const response = await fetch(`https://api.github.com/gists/${gistId}`);
      const data = await response.json();
      const content = JSON.parse(data.files['web3-skills.json'].content);
      const decoded = { ...initialSkills };
      content.skills.forEach(skill => { if (decoded.hasOwnProperty(skill)) decoded[skill] = true; });
      setSharedSkills(decoded);
      setViewMode(true);
      if (showViewModal) setShowViewModal(false);
      setCurrentView('home');
    } catch (e) {
      console.error('Failed to load from Gist:', e);
      alert('Failed to load shared skills');
    }
  };

  const loadSharedSkills = (code) => {
    const decoded = decodeOfflineCode(code);
    if (decoded) {
      setSharedSkills(decoded);
      setViewMode(true);
      if (showViewModal) setShowViewModal(false);
      setCurrentView('home');
    } else {
      alert('Invalid share code');
    }
  };

  const copyOfflineCode = () => {
    const code = generateOfflineCode(skills);
    navigator.clipboard.writeText(code);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  const copyCloudUrl = () => {
    if (cloudShareUrl) {
      navigator.clipboard.writeText(cloudShareUrl);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  const exportData = () => {
    const data = { skills };
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `web3skills-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target.result);
          if (imported.skills) setSkills(imported.skills);
        } catch (error) {
          alert('Invalid file format');
        }
      };
      reader.readAsText(file);
    }
  };

  const getCategoryProgress = (categoryName) => {
    const categorySkills = categories[categoryName] || [];
    const displaySkills = viewMode ? sharedSkills || initialSkills : skills;
    const checked = categorySkills.filter(skill => displaySkills[skill]).length;
    return { checked, total: categorySkills.length, percentage: categorySkills.length > 0 ? (checked / categorySkills.length) * 100 : 0 };
  };

  const getCareerMatch = (careerName) => {
    const career = careerPaths[careerName];
    if (!career) return { matched: 0, total: 0, percentage: 0 };
    const currentSkills = viewMode ? (sharedSkills || initialSkills) : skills;
    const matchedSkills = career.requiredSkills.filter(skill => currentSkills.hasOwnProperty(skill) && currentSkills[skill]);
    return { matched: matchedSkills.length, total: career.requiredSkills.length, percentage: career.requiredSkills.length > 0 ? (matchedSkills.length / career.requiredSkills.length) * 100 : 0 };
  };

  const displaySkills = viewMode ? (sharedSkills || initialSkills) : skills;
  const totalSkills = Object.keys(displaySkills).length;
  const checkedSkills = Object.values(displaySkills).filter(Boolean).length;
  const overallProgress = totalSkills > 0 ? (checkedSkills / totalSkills) * 100 : 0;

  const filteredSkills = (categorySkills) => {
    return categorySkills.filter(skill => {
      const matchesSearch = skill.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterComplete === 'all' || 
                           (filterComplete === 'complete' && displaySkills[skill]) ||
                           (filterComplete === 'incomplete' && !displaySkills[skill]);
      return matchesSearch && matchesFilter;
    });
  };

  const getKnownSkillsSummary = () => {
    const known = [];
    Object.entries(categories).forEach(([cat, catSkills]) => {
      const checked = catSkills.filter(skill => displaySkills[skill]).length;
      if (checked > 0) known.push(`${cat}: ${checked}/${catSkills.length}`);
    });
    return known.slice(0, 5).join(', ');
  };

  const Navigation = () => (
    <nav className={`${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-b transition-colors`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Target className={darkMode ? 'text-blue-400' : 'text-blue-600'} size={24} />
            <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Web3 Skills</span>
          </div>
          <div className="flex items-center space-x-1">
            <button onClick={() => setCurrentView('home')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${currentView === 'home' ? (darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-50 text-blue-600') : (darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-50')}`}>Home</button>
            <button onClick={() => setCurrentView('all-skills')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${currentView === 'all-skills' ? (darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-50 text-blue-600') : (darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-50')}`}>Skills</button>
            <button onClick={() => setCurrentView('careers')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${currentView === 'careers' || currentView === 'career-detail' ? (darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-50 text-blue-600') : (darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-50')}`}>Careers</button>
            {!viewMode && (
              <>
                <button onClick={() => setShowShareModal(true)} className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`} title="Share">
                  <Share2 className={darkMode ? 'text-gray-300' : 'text-gray-600'} size={20} />
                </button>
                <button onClick={() => setShowViewModal(true)} className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`} title="View Progress">
                  <Eye className={darkMode ? 'text-gray-300' : 'text-gray-600'} size={20} />
                </button>
              </>
            )}
            <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
              {darkMode ? <Sun className="text-yellow-400" size={20} /> : <Moon className="text-gray-600" size={20} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );

  const HomePage = () => (
    <div>
      {viewMode && (
        <div className="mt-4 max-w-7xl mx-auto px-4">
          <div className={`${darkMode ? 'bg-blue-900 border-blue-800' : 'bg-blue-50 border-blue-200'} border rounded-xl p-4 mb-8`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`font-bold ${darkMode ? 'text-blue-300' : 'text-blue-900'}`}>Viewing Shared Skills</h3>
                <p className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>{checkedSkills} skills shared</p>
                <p className={`text-xs ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>{getKnownSkillsSummary()}</p>
              </div>
              <button onClick={() => { setViewMode(false); setSharedSkills(null); window.history.pushState({}, '', window.location.pathname); }} className={`px-4 py-2 rounded-lg font-medium text-sm ${darkMode ? 'bg-blue-800 text-blue-200 hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                Exit View Mode
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="text-center mb-12 max-w-7xl mx-auto px-4">
        <h1 className={`text-4xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Track Your Web3 Journey</h1>
        <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Build skills, explore careers, and plan your path in Web3</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-7xl mx-auto px-4">
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-6 rounded-xl border`}>
          <div className="flex items-center justify-between mb-3">
            <h3 className={`text-sm font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Progress</h3>
            <TrendingUp className={darkMode ? 'text-blue-400' : 'text-blue-600'} size={20} />
          </div>
          <div className={`text-3xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {checkedSkills}<span className={`text-lg ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>/{totalSkills}</span>
          </div>
          <div className={`w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-full h-1.5`}>
            <div className="bg-blue-600 h-1.5 rounded-full transition-all" style={{ width: `${overallProgress}%` }} />
          </div>
          <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'} mt-2`}>{overallProgress.toFixed(1)}% Complete</p>
        </div>
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-6 rounded-xl border`}>
          <div className="flex items-center justify-between mb-3">
            <h3 className={`text-sm font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Categories</h3>
            <Award className={darkMode ? 'text-green-400' : 'text-green-600'} size={20} />
          </div>
          <div className={`text-3xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {Object.keys(categories).filter(cat => getCategoryProgress(cat).percentage === 100).length}<span className={`text-lg ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>/{Object.keys(categories).length}</span>
          </div>
          <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>Mastered</p>
        </div>
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-6 rounded-xl border`}>
          <div className="flex items-center justify-between mb-3">
            <h3 className={`text-sm font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Best Match</h3>
            <Target className={darkMode ? 'text-purple-400' : 'text-purple-600'} size={20} />
          </div>
          <div className={`text-base font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {Object.keys(careerPaths).reduce((best, career) => {
              const match = getCareerMatch(career);
              const bestMatch = getCareerMatch(best);
              return match.percentage > bestMatch.percentage ? career : best;
            }, Object.keys(careerPaths)[0])}
          </div>
          <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            {getCareerMatch(Object.keys(careerPaths).reduce((best, career) => {
              const match = getCareerMatch(career);
              const bestMatch = getCareerMatch(best);
              return match.percentage > bestMatch.percentage ? career : best;
            }, Object.keys(careerPaths)[0])).percentage.toFixed(0)}% match
          </p>
        </div>
      </div>
      {!viewMode && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-7xl mx-auto px-4">
          <button onClick={() => setCurrentView('all-skills')} className={`${darkMode ? 'bg-gray-800 border-gray-700 hover:border-blue-600' : 'bg-white border-gray-200 hover:border-blue-300'} p-8 rounded-xl border hover:shadow-md transition-all text-left group`}>
            <BookOpen className={`${darkMode ? 'text-blue-400' : 'text-blue-600'} mb-4 group-hover:scale-110 transition-transform`} size={32} />
            <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>View All Skills</h3>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>Browse and track all 131 Web3 skills</p>
            <span className={`text-sm font-medium ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Explore Skills →</span>
          </button>
          <button onClick={() => setCurrentView('careers')} className={`${darkMode ? 'bg-gray-800 border-gray-700 hover:border-purple-600' : 'bg-white border-gray-200 hover:border-purple-300'} p-8 rounded-xl border hover:shadow-md transition-all text-left group`}>
            <Target className={`${darkMode ? 'text-purple-400' : 'text-purple-600'} mb-4 group-hover:scale-110 transition-transform`} size={32} />
            <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Explore Careers</h3>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>Discover Web3 roles and learning roadmaps</p>
            <span className={`text-sm font-medium ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>View Careers →</span>
          </button>
        </div>
      )}
      {!viewMode && (
        <div className={`${darkMode ? 'bg-gradient-to-br from-blue-900/50 to-purple-900/50 border-blue-800' : 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-100'} rounded-2xl p-8 mb-12 border max-w-7xl mx-auto`}>
          <div className="text-center mb-6">
            <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Join RiWoT — Web3 & Blockchain Learning Community</h2>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>If you're serious about becoming a skilled Web3 and blockchain developer, join RiWoT, a focused learning community built for growth and real skills.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 mb-6">
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>RiWoT helps you learn:</h3>
              <ul className="space-y-2">
                <li className="flex items-start"><CheckCircle className={darkMode ? 'text-blue-400' : 'text-blue-600'} size={18} /><span className={`ml-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Blockchain fundamentals</span></li>
                <li className="flex items-start"><CheckCircle className={darkMode ? 'text-blue-400' : 'text-blue-600'} size={18} /><span className={`ml-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Smart contracts and on-chain logic</span></li>
                <li className="flex items-start"><CheckCircle className={darkMode ? 'text-blue-400' : 'text-blue-600'} size={18} /><span className={`ml-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Solana, Ethereum, and Web3 development</span></li>
                <li className="flex items-start"><CheckCircle className={darkMode ? 'text-blue-400' : 'text-blue-600'} size={18} /><span className={`ml-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Rust for blockchain & smart contracts</span></li>
                <li className="flex items-start"><CheckCircle className={darkMode ? 'text-blue-400' : 'text-blue-600'} size={18} /><span className={`ml-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Web3 security and auditing</span></li>
                <li className="flex items-start"><CheckCircle className={darkMode ? 'text-blue-400' : 'text-blue-600'} size={18} /><span className={`ml-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Hands-on project building and code reviews</span></li>
              </ul>
            </div>
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>You get:</h3>
              <ul className="space-y-2">
                <li className="flex items-start"><Users className={darkMode ? 'text-purple-400' : 'text-purple-600'} size={18} /><span className={`ml-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Structured learning paths (beginner to advanced)</span></li>
                <li className="flex items-start"><Users className={darkMode ? 'text-purple-400' : 'text-purple-600'} size={18} /><span className={`ml-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Developer chats and discussion channels</span></li>
                <li className="flex items-start"><Users className={darkMode ? 'text-purple-400' : 'text-purple-600'} size={18} /><span className={`ml-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Tools, guides, and curated learning resources</span></li>
                <li className="flex items-start"><Users className={darkMode ? 'text-purple-400' : 'text-purple-600'} size={18} /><span className={`ml-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Help, feedback, and support from learners and builders</span></li>
              </ul>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-4`}>RiWoT is a hub to become a real-world Web3 developer step-by-step, with community support and practical learning.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="https://discord.gg/epWxxeWC" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${darkMode ? 'bg-blue-700 hover:bg-blue-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}>
              <MessageCircle size={20} />
              Join Discord
              <ArrowRight size={18} />
            </a>
            <a href="https://github.com/RiWoT" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-800 hover:bg-gray-900 text-white'}`}>
              <Github size={20} />
              View GitHub
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      )}
      <div className={`${darkMode ? 'bg-gradient-to-br from-green-900/50 to-blue-900/50 border-green-800' : 'bg-gradient-to-br from-green-50 to-blue-50 border-green-100'} rounded-2xl p-8 mb-12 border max-w-7xl mx-auto cursor-pointer`} onClick={() => setShowResources(!showResources)}>
        <div className="text-center mb-6">
          <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Learn Web3 With These Free Resources (Updated November 2025)</h2>
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>The List of Web3 Articles and Courses. Learn How to Develop Smart Contracts for Ethereum Blockchain.</p>
        </div>
        {showResources && (
          <div className="space-y-6">
            <div>
              <h3 className={`font-bold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>0. Whitepapers</h3>
              <ul className="space-y-1 text-sm">
                <li>• <a href="https://bitcoin.org/bitcoin.pdf" target="_blank" rel="noopener noreferrer" className={darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}>Bitcoin Whitepaper</a></li>
                <li>• <a href="https://ethereum.org/en/whitepaper/" target="_blank" rel="noopener noreferrer" className={darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}>Ethereum Whitepaper</a></li>
              </ul>
            </div>
            <div>
              <h3 className={`font-bold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>1. Learn Web3 with Free Video Tutorials</h3>
              <ul className="space-y-1 text-sm">
                <li>1.1 <a href="https://www.youtube.com/watch?v=M576LWwtm8Y" target="_blank" rel="noopener noreferrer" className={darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}>Full Web3 Tutorial (Smart Contracts, Solidity, Javascript)</a> - Watch Now</li>
                <li>1.2 <a href="https://www.youtube.com/watch?v=gyMwXuJrbJQ" target="_blank" rel="noopener noreferrer" className={darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}>Solidity, Blockchain, and Smart Contract Course – Beginner to Expert Python Tutorial</a> - Watch Now</li>
                <li>1.3 <a href="https://www.youtube.com/watch?v=SSo_EIwHSd4" target="_blank" rel="noopener noreferrer" className={darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}>Learn Blockchain 3 Hours Course</a> - Watch Now</li>
                <li>1.4 <a href="https://www.youtube.com/watch?v=ipwxYa-F1uY" target="_blank" rel="noopener noreferrer" className={darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}>Intro To Blockchain Programming (Ethereum, Web3.js, Solidity, Smart Contracts)</a> - Watch Now</li>
                <li>1.5 <a href="https://www.youtube.com/playlist?list=PL-pOHwCj3n9PehwPOv_3D9j4o7v3yJ5n" target="_blank" rel="noopener noreferrer" className={darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}>More Free Web3 and Blockchain Tutorials</a> - Watch Other Videos</li>
              </ul>
            </div>
            <div>
              <h3 className={`font-bold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>2. Crypto Zombies</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Learn to Code Blockchain DApps By Building Simple Games. CryptoZombies is an interactive school that teaches you all things technical about blockchains. Learn to make smart contracts in Solidity or Libra by making your own crypto-collectibles game.</p>
              <a href="https://cryptozombies.io/" target="_blank" rel="noopener noreferrer" className={darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}>Learn More</a>
            </div>
            <div>
              <h3 className={`font-bold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>3. Ethereum Development Tutorials</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Browse and filter vetted Ethereum community tutorials by topic.</p>
              <a href="https://ethereum.org/en/developers/tutorials/" target="_blank" rel="noopener noreferrer" className={darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}>Learn More</a>
              <ul className="space-y-1 text-sm mt-2">
                <li>3.1 <a href="https://www.youtube.com/watch?v=gyMwXuJrbJQ" target="_blank" rel="noopener noreferrer" className={darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}>Solidity, Blockchain, and Smart Contract Course – Beginner to Expert Python Tutorial</a></li>
                <li>3.2 <a href="https://www.youtube.com/watch?v=ipwxYa-F1uY" target="_blank" rel="noopener noreferrer" className={darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}>How to make NFT Art with On-Chain Metadata | FULL HARDHAT / JS TUTORIAL! (w/ Polygon & Opensea)</a></li>
                <li>3.3 <a href="https://www.youtube.com/watch?v=ipwxYa-F1uY" target="_blank" rel="noopener noreferrer" className={darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}>Create your own Blockchain ERC20 Token | Python, Brownie, Solidity</a></li>
                <li>3.4 <a href="https://github.com/scaffold-eth/scaffold-eth" target="_blank" rel="noopener noreferrer" className={darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}>Scaffold-ETH - Simple NFT Example</a></li>
                <li>3.5 <a href="https://uniswap.org/whitepaper.pdf" target="_blank" rel="noopener noreferrer" className={darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}>UNISWAP-V2 CONTRACT WALK-THROUGH</a></li>
              </ul>
            </div>
            <div>
              <h3 className={`font-bold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>4. Blockchain Basics</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>A learner will be able to recognize foundational concepts of blockchain, and apply these program concepts on the blockchain.</p>
              <a href="https://www.coursera.org/learn/blockchain-basics" target="_blank" rel="noopener noreferrer" className={darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}>Learn More</a>
            </div>
            <div>
              <h3 className={`font-bold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>5. Get started Building Web3 Apps with Cloudflare</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Learn how to build Web3 applications with Cloudflare’s new open-source template</p>
              <div className="flex gap-2 mt-2">
                <a href="https://blog.cloudflare.com/building-web3-apps-with-cloudflare-workers/" target="_blank" rel="noopener noreferrer" className={darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}>Blog</a>
                <a href="https://github.com/cloudflare/templates/tree/main/web3-dapp" target="_blank" rel="noopener noreferrer" className={darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}>Github</a>
              </div>
            </div>
            <div>
              <h3 className={`font-bold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>6. The Complete Guide to Ethereum Development</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Building Full Stack dApps with React, Ethers.js, and Hardhat.</p>
              <a href="https://dev.to/dabit3/the-complete-guide-to-full-stack-ethereum-development-3j13" target="_blank" rel="noopener noreferrer" className={darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}>Learn More</a>
            </div>
            <div>
              <h3 className={`font-bold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>7. Everything you need to know about NFTs</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Discover everything you need to know about Non-Fungible Tokens, also known as NFTs, to get you started with true digital ownership.</p>
              <a href="https://ethereum.org/en/nft/" target="_blank" rel="noopener noreferrer" className={darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}>Learn More</a>
            </div>
            <div>
              <h3 className={`font-bold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>8. ETHGlobal YouTube Channel</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Videos from conferences, hackathons, masterclasses, workshops from a world-class Ethereum developers.</p>
              <a href="https://www.youtube.com/c/ETHGlobal" target="_blank" rel="noopener noreferrer" className={darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}>Learn More</a>
            </div>
            <div>
              <h3 className={`font-bold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>9. Blockchain-based Systems Engineering – Lecture Slides</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>This GitHub-repository contains all contents of the lecture Blockchain-based Systems Engineering (IN2359), held regularly in the summer term at the Technical University of Munich.</p>
              <a href="https://github.com/cit-lab/blockchain-based-systems-engineering" target="_blank" rel="noopener noreferrer" className={darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}>Learn More</a>
            </div>
            <div>
              <h3 className={`font-bold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>10. Why NFTs are hard to explain?</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>This article explaining the gist of NFT concept.</p>
              <a href="https://vitalik.ca/general/2021/10/15/nfts.html" target="_blank" rel="noopener noreferrer" className={darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}>Learn More</a>
            </div>
            <div>
              <h3 className={`font-bold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>11. Solana Developer Resources</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Developer resource that provides the essential concepts and recipes for building applications on Solana.</p>
              <a href="https://docs.solana.com/developing/programming-model" target="_blank" rel="noopener noreferrer" className={darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}>Learn More</a>
            </div>
            <div>
              <h3 className={`font-bold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>12. PL Launchpad Program</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>A 6-week onboarding program for new full-time PL Network contributors.</p>
              <a href="https://pl-launchpad.vercel.app/" target="_blank" rel="noopener noreferrer" className={darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}>Learn More</a>
            </div>
            <div>
              <h3 className={`font-bold text-lg mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Start your Web3 Career</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Once you are ready you can start applying for Web3 Jobs. You don't need to have huge experience, there are many entry level Web3 Jobs and Web3 Internships.</p>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}>
                  <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>New Grad Software Engineer</h4>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Andalusia Labs | $122k - $150k | NY, US</p>
                  <ul className="text-xs space-y-1 mt-2">
                    <li>• C++, Rust, Go, Solidity</li>
                    <li>• Distributed Systems, Algorithms</li>
                    <li>• High ownership, fast-paced</li>
                  </ul>
                  <a href="https://jobs.lever.co/andalusialabs/123" target="_blank" rel="noopener noreferrer" className={darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}>Apply</a>
                </div>
                <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}>
                  <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Crypto UI/UX Designer Intern</h4>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Token Metrics | Austin, TX | Remote</p>
                  <ul className="text-xs space-y-1 mt-2">
                    <li>• UI/UX Design, Figma, Adobe Suite</li>
                    <li>• Wireframing, Prototyping</li>
                    <li>• 2+ years experience, portfolio</li>
                  </ul>
                  <a href="https://tokenmetrics.com/careers" target="_blank" rel="noopener noreferrer" className={darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}>Apply</a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {!viewMode && (
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-6 rounded-xl border max-w-7xl mx-auto`}>
          <div className="flex flex-wrap justify-between items-center gap-4">
            <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Manage Your Progress</h3>
            <div className="flex gap-3">
              <button onClick={exportData} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm ${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                <Download size={16} />
                Export
              </button>
              <label className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors cursor-pointer text-sm ${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
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

  const AllSkillsView = () => (
    <div className="max-w-7xl mx-auto px-4">
      <div className="mb-8">
        <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>All Skills</h1>
        <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Track your progress across {totalSkills} Web3 skills</p>
      </div>
      {!viewMode && (
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-4 rounded-xl border mb-6`}>
          <div className="flex flex-wrap gap-3">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} size={18} />
                <input
                  type="text"
                  placeholder="Search skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setFilterComplete('all')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filterComplete === 'all' ? 'bg-blue-600 text-white' : (darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200')}`}>All</button>
              <button onClick={() => setFilterComplete('complete')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filterComplete === 'complete' ? 'bg-green-600 text-white' : (darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200')}`}>Complete</button>
              <button onClick={() => setFilterComplete('incomplete')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filterComplete === 'incomplete' ? 'bg-orange-600 text-white' : (darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200')}`}>Incomplete</button>
            </div>
          </div>
        </div>
      )}
      {Object.entries(categories).map(([categoryName, categorySkills]) => {
        const progress = getCategoryProgress(categoryName);
        const filtered = filteredSkills(categorySkills);
        if (filtered.length === 0) return null;
        return (
          <div key={categoryName} className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-6 rounded-xl border mb-6`}>
            <div className="flex flex-wrap justify-between items-center mb-4 gap-3 cursor-pointer" onClick={() => setExpandedCategories(prev => ({ ...prev, [categoryName]: !prev[categoryName] }))}>
              <div className="flex items-center gap-3">
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{categoryName}</h2>
                {expandedCategories[categoryName] ? <ChevronUp className={darkMode ? 'text-gray-400' : 'text-gray-500'} size={20} /> : <ChevronDown className={darkMode ? 'text-gray-400' : 'text-gray-500'} size={20} />}
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{progress.checked}/{progress.total}</span>
                <div className={`w-24 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-full h-1.5`}>
                  <div className="bg-blue-600 h-1.5 rounded-full transition-all" style={{ width: `${progress.percentage}%` }} />
                </div>
              </div>
            </div>
            {expandedCategories[categoryName] && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {filtered.map(skill => (
                  <label key={skill} className={`flex items-center gap-3 p-3 rounded-lg ${viewMode ? '' : 'cursor-pointer'} transition-colors group ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                    {!viewMode && (
                      <input
                        type="checkbox"
                        checked={displaySkills[skill] || false}
                        onChange={() => toggleSkill(skill)}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
                      />
                    )}
                    {viewMode && (
                      displaySkills[skill] ? (
                        <CheckCircle className="text-green-600 flex-shrink-0" size={18} />
                      ) : (
                        <Circle className={darkMode ? 'text-gray-600' : 'text-gray-300'} size={18} />
                      )
                    )}
                    <span className={`text-sm transition-colors ${displaySkills[skill] ? (darkMode ? 'text-gray-500 line-through' : 'text-gray-400 line-through') : (darkMode ? 'text-gray-300 group-hover:text-white' : 'text-gray-700 group-hover:text-gray-900')}`}>
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

  const CareersView = () => (
    <div className="max-w-7xl mx-auto px-4">
      <div className="mb-8">
        <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Career Paths</h1>
        <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Explore Web3 roles and see your match</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(careerPaths).map(([careerName, career]) => {
          const match = getCareerMatch(careerName);
          const Icon = career.icon;
          return (
            <div key={careerName} className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-6 rounded-xl border hover:shadow-md transition-all`}>
              <div className="flex items-start gap-4 mb-4">
                <Icon className={darkMode ? 'text-blue-400' : 'text-blue-600'} size={24} />
                <div className="flex-1">
                  <h3 className={`text-lg font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{careerName}</h3>
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{career.description}</p>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Match</span>
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{match.matched}/{match.total}</span>
                </div>
                <div className={`w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-full h-2`}>
                  <div className="bg-green-600 h-2 rounded-full transition-all" style={{ width: `${match.percentage}%` }} />
                </div>
                <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'} mt-1`}>{match.percentage.toFixed(0)}%</p>
              </div>
              <button onClick={() => { setSelectedCareer(careerName); setCurrentView('career-detail'); }} className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${darkMode ? 'bg-blue-700 hover:bg-blue-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}>
                View Roadmap
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );

  const CareerDetailView = () => {
    if (!selectedCareer) return null;
    const career = careerPaths[selectedCareer];
    const match = getCareerMatch(selectedCareer);
    const Icon = career.icon;
    return (
      <div className="max-w-7xl mx-auto px-4">
        <button onClick={() => setCurrentView('careers')} className={`mb-4 text-sm font-medium transition-colors ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}>← Back</button>
        <div className="mb-8">
          <div className="flex items-start gap-4 mb-4">
            <Icon className={darkMode ? 'text-blue-400' : 'text-blue-600'} size={28} />
            <div>
              <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedCareer}</h1>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{career.description}</p>
            </div>
          </div>
          <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-blue-50 border-blue-200'} p-4 rounded-xl border mb-8`}>
            <div className="flex justify-between items-center mb-2">
              <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Progress</span>
              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{match.matched}/{match.total}</span>
            </div>
            <div className={`w-full ${darkMode ? 'bg-gray-700' : 'bg-white'} rounded-full h-3`}>
              <div className="bg-blue-600 h-3 rounded-full transition-all" style={{ width: `${match.percentage}%` }} />
            </div>
            <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-600'} mt-2`}>{match.percentage.toFixed(1)}% Match</p>
          </div>
        </div>
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-6 rounded-xl border mb-8`}>
          <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Required Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {career.requiredSkills.map(skill => (
              <div key={skill} className={`flex items-center gap-3 p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                {displaySkills.hasOwnProperty(skill) && displaySkills[skill] ? <CheckCircle className="text-green-600" size={18} /> : <Circle className={darkMode ? 'text-gray-600' : 'text-gray-300'} size={18} />}
                <span className={`text-sm ${displaySkills[skill] ? (darkMode ? 'text-white' : 'text-gray-900') : (darkMode ? 'text-gray-400' : 'text-gray-600')}`}>{skill}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-6 rounded-xl border mb-8`}>
          <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>4-Phase Roadmap</h2>
          <div className="space-y-6">
            {career.roadmap.map((phase, index) => (
              <div key={index} className={`${darkMode ? 'border-gray-600' : 'border-gray-200'} border-l-4 border-blue-600 pl-4`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold"> {index + 1}</div>
                  <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{phase.phase}</h3>
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} ml-auto`}>{phase.duration}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {phase.skills.map(skill => (
                    <span key={skill} className={`px-3 py-1 rounded-full text-xs font-medium ${displaySkills[skill] ? (darkMode ? 'bg-green-800 text-green-300' : 'bg-green-100 text-green-700') : (darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600')}`}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-6 rounded-xl border`}>
          <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Recommended Resources</h2>
          <div className="space-y-2">
            {career.resources.map((resource, index) => (
              <div key={index} className={`flex items-center gap-3 p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <BookOpen className={darkMode ? 'text-blue-400' : 'text-blue-600'} size={18} />
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{resource}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const ShareModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl max-w-md w-full p-6`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Share Progress</h2>
          <button onClick={() => setShowShareModal(false)} className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
            <X className={darkMode ? 'text-gray-400' : 'text-gray-600'} size={20} />
          </button>
        </div>
        <div className="space-y-4">
          <div className={`flex gap-2 p-3 rounded-lg ${shareTab === 'offline' ? (darkMode ? 'bg-gray-700' : 'bg-gray-100') : ''}`}>
            <button onClick={() => setShareTab('offline')} className={`flex-1 py-2 px-3 rounded ${shareTab === 'offline' ? (darkMode ? 'bg-blue-700 text-white' : 'bg-blue-600 text-white') : (darkMode ? 'text-gray-300' : 'text-gray-600')}`}>Offline Code</button>
            <button onClick={() => setShareTab('cloud')} className={`flex-1 py-2 px-3 rounded ${shareTab === 'cloud' ? (darkMode ? 'bg-blue-700 text-white' : 'bg-blue-600 text-white') : (darkMode ? 'text-gray-300' : 'text-gray-600')}`}>Cloud Link</button>
          </div>
          {shareTab === 'offline' && (
            <div>
              <button onClick={copyOfflineCode} disabled={copiedShare} className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${copiedShare ? 'bg-green-600 text-white' : (darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700')}`}>
                {copiedShare ? <Check size={20} /> : <Copy size={20} />} {copiedShare ? 'Copied!' : 'Copy Code'}
              </button>
              <div className="mt-3 p-3 bg-gray-100 rounded text-xs font-mono text-gray-600 overflow-auto max-h-32">
                {generateOfflineCode(skills)}
              </div>
            </div>
          )}
          {shareTab === 'cloud' && (
            <div>
              <button onClick={createCloudShare} disabled={isSharing || cloudShareUrl} className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${isSharing || cloudShareUrl ? 'bg-gray-500 text-white cursor-not-allowed' : (darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700')}`}>
                {isSharing ? 'Creating...' : cloudShareUrl ? 'Created!' : 'Create Link'}
              </button>
              {cloudShareUrl && (
                <div className="mt-3">
                  <button onClick={copyCloudUrl} className="w-full py-2 px-4 rounded-lg font-medium transition-colors bg-green-600 text-white hover:bg-green-700 mb-3">
                    <Check size={20} className="inline mr-2" /> Copy Link
                  </button>
                  <div className="p-3 bg-gray-100 rounded text-xs font-mono text-gray-600 overflow-auto max-h-20 break-all">
                    {cloudShareUrl}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const ViewModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl max-w-md w-full p-6`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>View Shared Skills</h2>
          <button onClick={() => setShowViewModal(false)} className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
            <X className={darkMode ? 'text-gray-400' : 'text-gray-600'} size={20} />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Paste Share Code</label>
            <input
              type="text"
              placeholder="WEB3SKILLS:... or gist link"
              value={shareInput}
              onChange={(e) => setShareInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const code = shareInput.trim();
                  if (code.startsWith('WEB3SKILLS:')) {
                    loadSharedSkills(code);
                  } else if (code.includes('?gist=')) {
                    const gistId = code.split('?gist=')[1]?.split('&')[0];
                    loadFromGist(gistId);
                  } else {
                    alert('Invalid share code');
                  }
                }
              }}
              className={`w-full px-3 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          <button onClick={() => setShowViewModal(false)} className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}>
            Close
          </button>
        </div>
      </div>
    </div>
  );

  const AgreementModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-2xl max-w-md w-full p-6 border`}>
        <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Privacy & Data Notice</h2>
        <ul className={`space-y-2 mb-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          <li>• All data stored locally in your browser</li>
          <li>• No server storage or cloud backup</li>
          <li>• Shared links are public (URL-encoded)</li>
          <li>• No tracking or analytics</li>
        </ul>
        <label className="flex items-center space-x-2 mb-4 cursor-pointer">
          <input 
            type="checkbox" 
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            I have read and agree to the{' '}
            <button onClick={() => setShowFullAgreement(true)} className={`underline ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
              Privacy Agreement
            </button>
          </span>
        </label>
        <div className="flex gap-3">
          <button
            disabled={!agreedToTerms}
            onClick={() => { localStorage.setItem('web3skills_agreement_accepted', 'v1.0'); setShowAgreementModal(false); }}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${agreedToTerms ? 'bg-blue-600 hover:bg-blue-700 text-white' : (darkMode ? 'bg-gray-700 text-gray-500' : 'bg-gray-200 text-gray-400')} cursor-${agreedToTerms ? 'pointer' : 'not-allowed'}`}
          >
            Continue
          </button>
          <button onClick={() => setShowFullAgreement(true)} className={`px-6 py-3 rounded-lg font-medium ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}>
            Learn More
          </button>
        </div>
      </div>
    </div>
  );

  const FullAgreementModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl max-w-3xl w-full p-8 my-8 max-h-[80vh] overflow-y-auto`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Privacy & Data Agreement</h2>
          <button onClick={() => setShowFullAgreement(false)} className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
            <X className={darkMode ? 'text-gray-400' : 'text-gray-600'} size={24} />
          </button>
        </div>
        <div className={`space-y-6 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          <p className="text-sm mb-4">Last Updated: November 2025</p>
          <div>
            <h3 className={`font-bold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>What Data We Collect</h3>
            <p>We do NOT collect any personal data. All information you enter is stored locally in your browser only.</p>
          </div>
          <div>
            <h3 className={`font-bold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>How Your Data is Stored</h3>
            <ul className="space-y-2">
              <li>• <strong>Local Storage:</strong> Your skills, preferences, and progress are stored in your browser's localStorage</li>
              <li>• <strong>No Backend:</strong> We do not have servers or databases storing your information</li>
              <li>• <strong>Device-Specific:</strong> Your data is only accessible on the device and browser you're using</li>
              <li>• <strong>Manual Backup:</strong> You control data export/import via JSON files</li>
            </ul>
          </div>
          <div>
            <h3 className={`font-bold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Data Sharing & Public Links</h3>
            <ul className="space-y-2">
              <li>• <strong>Optional Sharing:</strong> Sharing your profile is completely optional</li>
              <li>• <strong>URL-Based:</strong> Shared links encode your skills data in the URL itself</li>
              <li>• <strong>Public Access:</strong> Anyone with your shared link can view your encoded skills</li>
              <li>• <strong>No Expiration:</strong> Shared links don't expire and remain accessible</li>
            </ul>
          </div>
          <div>
            <h3 className={`font-bold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Cookies & Tracking</h3>
            <ul className="space-y-2">
              <li>• <strong>No Cookies:</strong> We don't use cookies for tracking</li>
              <li>• <strong>No Analytics:</strong> We don't use Google Analytics or similar services</li>
              <li>• <strong>localStorage Only:</strong> Used solely for saving your progress</li>
            </ul>
          </div>
          <div>
            <h3 className={`font-bold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Your Rights & Control</h3>
            <ul className="space-y-2">
              <li>• <strong>Export Data:</strong> Download your data as JSON anytime</li>
              <li>• <strong>Delete Data:</strong> Clear all data from browser</li>
              <li>• <strong>No Account:</strong> No registration required, no account to delete</li>
              <li>• <strong>Opt-Out of Sharing:</strong> Simply don't use the share feature</li>
            </ul>
          </div>
          <div>
            <h3 className={`font-bold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Contact</h3>
            <p>Developer: Mir Mohammad Luqman | <a href="https://mirmohmmadluqman.github.io/portfolio/" className={`underline ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Portfolio</a></p>
          </div>
          <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}>
            <p className="text-sm"><strong>Your privacy is important.</strong> We built this tool to keep your data in your control.</p>
          </div>
        </div>
        <div className="mt-6">
          <button onClick={() => setShowFullAgreement(false)} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
            I Understand
          </button>
        </div>
      </div>
    </div>
  );

  const Footer = () => (
    <footer className={`mt-16 pt-8 ${darkMode ? 'border-gray-800' : 'border-gray-200'} border-t max-w-7xl mx-auto px-4`}>
      <div className="text-center space-y-3">
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Built with ❤️ by{' '}
          <a href="https://mirmohmmadluqman.github.io/portfolio/" target="_blank" rel="noopener noreferrer" className={darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}>
            Mir Mohammad Luqman
          </a>
        </p>
        <div className={`flex justify-center gap-4 text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
          <button onClick={() => { setShowFullAgreement(true); setShowAgreementModal(true); }} className={darkMode ? 'hover:text-gray-400' : 'hover:text-gray-700'}>
            Privacy Policy
          </button>
          <span>•</span>
          <a href="https://github.com/RiWoT" target="_blank" rel="noopener noreferrer" className={darkMode ? 'hover:text-gray-400' : 'hover:text-gray-700'}>
            GitHub
          </a>
          <span>•</span>
          <span>© 2025 Web3 Skills Tracker</span>
        </div>
      </div>
    </footer>
  );

  return (
    <div className={`min-h-screen transition-colors ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 pb-8">
        {currentView === 'home' && <HomePage />}
        {currentView === 'all-skills' && <AllSkillsView />}
        {currentView === 'careers' && <CareersView />}
        {currentView === 'career-detail' && <CareerDetailView />}
        <Footer />
      </div>
      {showShareModal && <ShareModal />}
      {showViewModal && <ViewModal />}
      {showAgreementModal && <AgreementModal />}
      {showFullAgreement && <FullAgreementModal />}
    </div>
  );
};

export default App;