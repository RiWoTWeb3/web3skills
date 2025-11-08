import React, { useState, useEffect } from 'react';
import { Download, Upload, CheckCircle, Circle, TrendingUp, BookOpen, Target, Award } from 'lucide-react';

const App = () => {
  const initialSkills = {
    'Python': false, 'Rust': false, 'Go': false, 'TypeScript': false, 'Solidity': false, 'Huff': false, 'Yul': false,
    'React': false, 'Next.js': false, 'REST API': false, 'GraphQL': false, 'Foundry': false, 'Hardhat': false,
    'Figma': false, 'Adobe Creative Suite': false, 'AI Design Tools': false, 'Slither': false, 'Echidna': false,
    'Certora': false, 'AWS': false, 'CI/CD': false, 'DevOps Principles': false, 'Cloud Architecture': false,
    'Git': false, 'Linux': false, 'Database Design': false, 'Database Optimization': false, 'Distributed Systems': false,
    'Time-Series Observability': false, 'Blockchain Fundamentals': false, 'EVM Mechanics': false,
    'Smart Contract Development': false, 'Production EVM Smart Contracts': false, 'High-TVL Contracts': false,
    'AMMs (Automated Market Makers)': false, 'Oracles': false, 'DeFi Understanding': false, 'DeFi Products': false,
    'dApps': false, 'Solana Development': false, 'Developer Infrastructure': false, 'L2s (Layer 2)': false,
    'Bridges': false, 'ERC-4337': false, 'ZK Proofs': false, 'EIPs Contributions': false, 'System Design': false,
    'System Architecture': false, 'API Building & Scaling': false, 'High-Throughput Systems': false,
    'Low-Latency Systems': false, 'Production Systems': false, 'Large-Scale Cloud Systems': false,
    'Brand Design': false, 'Marketing Design': false, 'Interactive Design': false, 'Visual Design': false,
    'Typography': false, 'Composition': false, 'Motion Design': false, 'Storytelling': false,
    'Visual Systems': false, 'Creative Strategy': false, 'Programmatic Statistical Analysis': false,
    'Quantitative Skills': false, 'Analytic Skills': false, 'High-Frequency Market Making': false,
    'Protocol Microstructure': false, 'Excellent Coding': false, 'Debugging': false, 'Algorithms': false,
    'Production Monitoring': false, 'High-Quality Code Delivery': false, 'End-to-End Project Management': false,
    'Handle Multiple Projects': false, 'Communication': false, 'Collaboration': false, 'Mentoring': false,
    'Leadership': false, 'Guiding Technical Teams': false, 'Autonomy': false, 'Adapt to Feedback': false,
    'Align with Business Goals': false, 'Billing/Monetization Systems': false, 'Security Tools Experience': false,
    'Startup Experience': false, 'Web3 Experience': false, 'Passion for Web3': false, 'Crypto Experience': false,
    'Open-source Contributions': false,
  };

  const [skills, setSkills] = useState(initialSkills);
  const [currentView, setCurrentView] = useState('home');
  const [selectedCareer, setSelectedCareer] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('web3skills');
    if (saved) {
      setSkills(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('web3skills', JSON.stringify(skills));
  }, [skills]);

  const categories = {
    'Programming Languages': ['Python', 'Rust', 'Go', 'TypeScript', 'Solidity', 'Huff', 'Yul'],
    'Frontend Technologies': ['React', 'Next.js'],
    'Backend & API': ['REST API', 'GraphQL'],
    'Development Tools': ['Foundry', 'Hardhat', 'Figma', 'Adobe Creative Suite', 'AI Design Tools'],
    'Security Tools': ['Slither', 'Echidna', 'Certora'],
    'Cloud & DevOps': ['AWS', 'CI/CD', 'DevOps Principles', 'Cloud Architecture'],
    'Version Control & OS': ['Git', 'Linux'],
    'Database & Systems': ['Database Design', 'Database Optimization', 'Distributed Systems', 'Time-Series Observability'],
    'Blockchain & Web3': [
      'Blockchain Fundamentals', 'EVM Mechanics', 'Smart Contract Development', 'Production EVM Smart Contracts',
      'High-TVL Contracts', 'AMMs (Automated Market Makers)', 'Oracles', 'DeFi Understanding', 'DeFi Products',
      'dApps', 'Solana Development', 'Developer Infrastructure', 'L2s (Layer 2)', 'Bridges', 'ERC-4337',
      'ZK Proofs', 'EIPs Contributions'
    ],
    'Architecture & Design Patterns': [
      'System Design', 'System Architecture', 'API Building & Scaling', 'High-Throughput Systems',
      'Low-Latency Systems', 'Production Systems', 'Large-Scale Cloud Systems'
    ],
    'Design Skills': [
      'Brand Design', 'Marketing Design', 'Interactive Design', 'Visual Design', 'Typography',
      'Composition', 'Motion Design', 'Storytelling', 'Visual Systems', 'Creative Strategy'
    ],
    'Trading & Quantitative': [
      'Programmatic Statistical Analysis', 'Quantitative Skills', 'Analytic Skills',
      'High-Frequency Market Making', 'Protocol Microstructure'
    ],
    'Technical Coding': [
      'Excellent Coding', 'Debugging', 'Algorithms', 'Production Monitoring', 'High-Quality Code Delivery'
    ],
    'Project Management': ['End-to-End Project Management', 'Handle Multiple Projects'],
    'Soft Skills': [
      'Communication', 'Collaboration', 'Mentoring', 'Leadership', 'Guiding Technical Teams',
      'Autonomy', 'Adapt to Feedback', 'Align with Business Goals'
    ],
    'Specialized Experience': [
      'Billing/Monetization Systems', 'Security Tools Experience', 'Startup Experience',
      'Web3 Experience', 'Passion for Web3', 'Crypto Experience', 'Open-source Contributions'
    ]
  };

  const careerPaths = {
    'Smart Contract Developer': {
      description: 'Build secure, efficient smart contracts for decentralized applications',
      requiredSkills: ['Solidity', 'Rust', 'Smart Contract Development', 'Production EVM Smart Contracts', 'Foundry', 'Hardhat', 'EVM Mechanics', 'Gas Optimization', 'Security Best Practices'],
      roadmap: [
        { phase: 'Foundation', skills: ['Blockchain Fundamentals', 'Solidity', 'JavaScript/TypeScript', 'Git'], duration: '2-3 months' },
        { phase: 'Core Development', skills: ['Smart Contract Development', 'Foundry', 'Hardhat', 'Testing', 'EVM Mechanics'], duration: '3-4 months' },
        { phase: 'Advanced Concepts', skills: ['Gas Optimization', 'Security Patterns', 'Upgradeable Contracts', 'Production EVM Smart Contracts'], duration: '3-4 months' },
        { phase: 'Specialization', skills: ['DeFi Protocols', 'High-TVL Contracts', 'Auditing', 'Open-source Contributions'], duration: '4-6 months' }
      ],
      resources: ['CryptoZombies', 'Solidity Documentation', 'OpenZeppelin', 'Ethernaut']
    },
    'Security Auditor': {
      description: 'Identify vulnerabilities and ensure smart contract security',
      requiredSkills: ['Solidity', 'Security Tools Experience', 'Smart Contract Development', 'Slither', 'Echidna', 'Certora', 'EVM Mechanics', 'DeFi Understanding'],
      roadmap: [
        { phase: 'Foundation', skills: ['Solidity', 'Smart Contract Development', 'EVM Mechanics'], duration: '3-4 months' },
        { phase: 'Security Fundamentals', skills: ['Common Vulnerabilities', 'Security Patterns', 'Slither', 'Static Analysis'], duration: '2-3 months' },
        { phase: 'Advanced Security', skills: ['Formal Verification', 'Echidna', 'Certora', 'Manual Code Review'], duration: '3-4 months' },
        { phase: 'Practical Experience', skills: ['Bug Bounties', 'Audit Reports', 'DeFi Security', 'Real-world Audits'], duration: '4-6 months' }
      ],
      resources: ['Damn Vulnerable DeFi', 'Ethernaut', 'Code4rena', 'Immunefi']
    },
    'DeFi Developer': {
      description: 'Create decentralized finance protocols and applications',
      requiredSkills: ['Solidity', 'DeFi Understanding', 'DeFi Products', 'AMMs (Automated Market Makers)', 'Oracles', 'Smart Contract Development', 'TypeScript', 'React'],
      roadmap: [
        { phase: 'DeFi Basics', skills: ['Blockchain Fundamentals', 'DeFi Understanding', 'Smart Contract Development'], duration: '2-3 months' },
        { phase: 'Core Protocols', skills: ['AMMs (Automated Market Makers)', 'Lending Protocols', 'Oracles', 'Yield Farming'], duration: '3-4 months' },
        { phase: 'Advanced DeFi', skills: ['Flash Loans', 'Liquidity Provision', 'Price Feeds', 'Cross-chain'], duration: '3-4 months' },
        { phase: 'Production', skills: ['High-TVL Contracts', 'Security', 'Gas Optimization', 'Frontend Integration'], duration: '4-5 months' }
      ],
      resources: ['Uniswap Docs', 'Aave Docs', 'DeFi MOOC', 'Chainlink Documentation']
    },
    'Frontend Web3 Developer': {
      description: 'Build user interfaces for decentralized applications',
      requiredSkills: ['React', 'Next.js', 'TypeScript', 'Web3.js/Ethers.js', 'Blockchain Fundamentals', 'dApps', 'Wallet Integration'],
      roadmap: [
        { phase: 'Frontend Foundation', skills: ['HTML/CSS', 'JavaScript', 'React', 'TypeScript'], duration: '2-3 months' },
        { phase: 'Web3 Integration', skills: ['Web3.js/Ethers.js', 'Wallet Connections', 'Blockchain Fundamentals'], duration: '2-3 months' },
        { phase: 'dApp Development', skills: ['Smart Contract Interaction', 'Transaction Handling', 'IPFS', 'The Graph'], duration: '3-4 months' },
        { phase: 'Advanced UI/UX', skills: ['Next.js', 'State Management', 'Real-time Updates', 'Mobile Responsive'], duration: '2-3 months' }
      ],
      resources: ['Scaffold-ETH', 'RainbowKit', 'Wagmi', 'Web3Modal']
    },
    'Backend Infrastructure Engineer': {
      description: 'Build scalable backend systems for Web3 applications',
      requiredSkills: ['Go', 'Rust', 'Python', 'Distributed Systems', 'API Building & Scaling', 'Database Design', 'High-Throughput Systems', 'Cloud Architecture'],
      roadmap: [
        { phase: 'Backend Basics', skills: ['Python/Go/Rust', 'REST API', 'Database Design', 'Git'], duration: '3-4 months' },
        { phase: 'Distributed Systems', skills: ['Microservices', 'Message Queues', 'Caching', 'Load Balancing'], duration: '3-4 months' },
        { phase: 'Blockchain Integration', skills: ['Node Infrastructure', 'RPC Services', 'Indexing', 'Event Listening'], duration: '3-4 months' },
        { phase: 'Scale & Performance', skills: ['High-Throughput Systems', 'Database Optimization', 'Cloud Architecture'], duration: '4-5 months' }
      ],
      resources: ['System Design Primer', 'AWS/GCP Docs', 'Alchemy/Infura Docs']
    },
    'Blockchain Architect': {
      description: 'Design and architect blockchain systems and infrastructure',
      requiredSkills: ['System Architecture', 'Blockchain Fundamentals', 'L2s (Layer 2)', 'Bridges', 'Distributed Systems', 'High-Throughput Systems', 'EVM Mechanics', 'Solidity'],
      roadmap: [
        { phase: 'Deep Blockchain Knowledge', skills: ['Blockchain Fundamentals', 'Consensus Mechanisms', 'EVM Mechanics', 'Network Architecture'], duration: '4-5 months' },
        { phase: 'System Design', skills: ['System Architecture', 'Distributed Systems', 'Scalability', 'Security'], duration: '3-4 months' },
        { phase: 'Layer 2 & Scaling', skills: ['L2s (Layer 2)', 'Rollups', 'Bridges', 'Sidechains'], duration: '4-5 months' },
        { phase: 'Advanced Architecture', skills: ['Cross-chain', 'Interoperability', 'Performance Optimization', 'Production Systems'], duration: '5-6 months' }
      ],
      resources: ['Ethereum.org', 'Layer 2 Docs', 'Blockchain Architecture Books']
    }
  };

  const toggleSkill = (skill) => {
    setSkills(prev => ({ ...prev, [skill]: !prev[skill] }));
  };

  const exportData = () => {
    const dataStr = JSON.stringify(skills, null, 2);
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
          setSkills(imported);
        } catch (error) {
          alert('Invalid file format');
        }
      };
      reader.readAsText(file);
    }
  };

  const getCategoryProgress = (categoryName) => {
    const categorySkills = categories[categoryName];
    const checked = categorySkills.filter(skill => skills[skill]).length;
    return { checked, total: categorySkills.length, percentage: (checked / categorySkills.length) * 100 };
  };

  const getCareerMatch = (careerName) => {
    const career = careerPaths[careerName];
    const allSkillsNeeded = career.requiredSkills;
    const matchedSkills = allSkillsNeeded.filter(skill => skills[skill]);
    return { matched: matchedSkills.length, total: allSkillsNeeded.length, percentage: (matchedSkills.length / allSkillsNeeded.length) * 100 };
  };

  const totalSkills = Object.keys(skills).length;
  const checkedSkills = Object.values(skills).filter(Boolean).length;
  const overallProgress = (checkedSkills / totalSkills) * 100;

  const HomePage = () => (
    <div>
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-xl mb-6">
        <h1 className="text-4xl font-bold mb-2">Web3 Career Skills Tracker</h1>
        <p className="text-xl opacity-90">Track your progress and plan your Web3 career journey</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-700">Overall Progress</h3>
            <TrendingUp className="text-blue-600" size={24} />
          </div>
          <div className="text-3xl font-bold text-blue-600">{checkedSkills}/{totalSkills}</div>
          <div className="w-full bg-gray-200 rounded-full h-3 mt-3">
            <div className="bg-blue-600 h-3 rounded-full transition-all" style={{ width: `${overallProgress}%` }} />
          </div>
          <p className="text-sm text-gray-600 mt-2">{overallProgress.toFixed(1)}% Complete</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-700">Categories Mastered</h3>
            <Award className="text-green-600" size={24} />
          </div>
          <div className="text-3xl font-bold text-green-600">
            {Object.keys(categories).filter(cat => getCategoryProgress(cat).percentage === 100).length}/{Object.keys(categories).length}
          </div>
          <p className="text-sm text-gray-600 mt-2">Complete skill categories</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-700">Best Career Match</h3>
            <Target className="text-purple-600" size={24} />
          </div>
          <div className="text-lg font-bold text-purple-600">
            {Object.keys(careerPaths).reduce((best, career) => {
              const match = getCareerMatch(career);
              const bestMatch = getCareerMatch(best);
              return match.percentage > bestMatch.percentage ? career : best;
            })}
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {getCareerMatch(Object.keys(careerPaths).reduce((best, career) => {
              const match = getCareerMatch(career);
              const bestMatch = getCareerMatch(best);
              return match.percentage > bestMatch.percentage ? career : best;
            })).percentage.toFixed(0)}% match
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Quick Actions</h2>
          <div className="flex gap-3">
            <button onClick={exportData} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              <Download size={18} />
              Export Progress
            </button>
            <label className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 cursor-pointer">
              <Upload size={18} />
              Import Progress
              <input type="file" accept=".json" onChange={importData} className="hidden" />
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => setCurrentView('all-skills')}
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-left"
        >
          <BookOpen className="text-blue-600 mb-3" size={32} />
          <h3 className="text-xl font-bold text-gray-800 mb-2">All Skills</h3>
          <p className="text-gray-600">Browse and track all {totalSkills} Web3 skills organized by category</p>
        </button>

        <button
          onClick={() => setCurrentView('careers')}
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-left"
        >
          <Target className="text-purple-600 mb-3" size={32} />
          <h3 className="text-xl font-bold text-gray-800 mb-2">Career Paths</h3>
          <p className="text-gray-600">Explore different Web3 roles and get personalized roadmaps</p>
        </button>
      </div>
    </div>
  );

  const AllSkillsView = () => (
    <div>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <button onClick={() => setCurrentView('home')} className="text-blue-600 hover:text-blue-800 mb-4">
          ← Back to Home
        </button>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">All Skills</h1>
        <p className="text-gray-600">Track your progress across all {totalSkills} Web3 skills</p>
      </div>

      {Object.entries(categories).map(([categoryName, categorySkills]) => {
        const progress = getCategoryProgress(categoryName);
        return (
          <div key={categoryName} className="bg-white p-6 rounded-lg shadow-md mb-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">{categoryName}</h2>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">{progress.checked}/{progress.total}</span>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${progress.percentage}%` }} />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {categorySkills.map(skill => (
                <label key={skill} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={skills[skill] || false}
                    onChange={() => toggleSkill(skill)}
                    className="w-5 h-5 rounded border-2 border-gray-300 text-blue-600"
                  />
                  <span className={`text-base ${skills[skill] ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                    {skill}
                  </span>
                </label>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );

  const CareersView = () => (
    <div>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <button onClick={() => setCurrentView('home')} className="text-blue-600 hover:text-blue-800 mb-4">
          ← Back to Home
        </button>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Career Paths</h1>
        <p className="text-gray-600">Explore different Web3 careers and see how you match</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(careerPaths).map(([careerName, careerData]) => {
          const match = getCareerMatch(careerName);
          return (
            <div key={careerName} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{careerName}</h3>
              <p className="text-gray-600 mb-4">{careerData.description}</p>
              
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-700">Your Match</span>
                  <span className="text-sm text-gray-600">{match.matched}/{match.total} skills</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${match.percentage >= 70 ? 'bg-green-600' : match.percentage >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`}
                    style={{ width: `${match.percentage}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-1">{match.percentage.toFixed(0)}% Complete</p>
              </div>

              <button
                onClick={() => { setSelectedCareer(careerName); setCurrentView('career-detail'); }}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
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

    return (
      <div>
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <button onClick={() => setCurrentView('careers')} className="text-blue-600 hover:text-blue-800 mb-4">
            ← Back to Career Paths
          </button>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{selectedCareer}</h1>
          <p className="text-gray-600 mb-4">{career.description}</p>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-gray-700">Your Progress</span>
              <span className="text-sm text-gray-600">{match.matched}/{match.total} skills</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div className="bg-blue-600 h-4 rounded-full" style={{ width: `${match.percentage}%` }} />
            </div>
            <p className="text-sm text-gray-600 mt-2">{match.percentage.toFixed(1)}% Complete</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Required Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {career.requiredSkills.map(skill => (
              <div key={skill} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                {skills[skill] ? (
                  <CheckCircle className="text-green-600" size={20} />
                ) : (
                  <Circle className="text-gray-400" size={20} />
                )}
                <span className={skills[skill] ? 'text-gray-800 font-medium' : 'text-gray-600'}>
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Learning Roadmap</h2>
          <div className="space-y-6">
            {career.roadmap.map((phase, index) => (
              <div key={index} className="border-l-4 border-blue-600 pl-6 pb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">{phase.phase}</h3>
                  <span className="text-sm text-gray-500 ml-auto">{phase.duration}</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {phase.skills.map(skill => (
                    <span
                      key={skill}
                      className={`px-3 py-1 rounded-full text-sm ${
                        skills[skill]
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Recommended Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {career.resources.map((resource, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                <BookOpen className="text-blue-600" size={20} />
                <span className="text-gray-800">{resource}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {currentView === 'home' && <HomePage />}
        {currentView === 'all-skills' && <AllSkillsView />}
        {currentView === 'careers' && <CareersView />}
        {currentView === 'career-detail' && <CareerDetailView />}
      </div>
    </div>
  );
};

export default App;
