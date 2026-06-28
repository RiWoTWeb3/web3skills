import React from 'react';
import { Lightbulb, ArrowRight, Code, Shield, Zap } from 'lucide-react';

const projects = [
  {
    title: "DeFi Yield Aggregator",
    difficulty: "Advanced",
    skills: ["Solidity", "DeFi Protocols", "Foundry"],
    description: "Build a smart contract that automatically moves liquidity between different lending protocols to maximize yield."
  },
  {
    title: "Solana NFT Marketplace",
    difficulty: "Intermediate",
    skills: ["Rust", "Anchor", "React"],
    description: "Create a performant NFT marketplace on Solana using the Anchor framework and Metaplex."
  },
  {
    title: "ZK-Proof Governance",
    difficulty: "Expert",
    skills: ["ZK Proofs", "Circom", "Solidity"],
    description: "Implement a private voting system for DAOs using Zero-Knowledge proofs to ensure voter anonymity."
  },
  {
    title: "Cross-Chain Bridge",
    difficulty: "Expert",
    skills: ["LayerZero", "Solidity", "Rust"],
    description: "Develop a secure bridge for transferring custom tokens between Ethereum and Solana."
  }
];

const ProjectIdeas = ({ darkMode }: { darkMode: boolean }) => {
  return (
    <div className={`${darkMode ? 'surface-industrial border-white/5' : 'bg-white border-gray-200 rounded-xl'} p-6 border`}>
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb size={16} className={darkMode ? 'text-accent-blue' : 'text-yellow-600'} />
        <h3 className={`text-xs font-mono uppercase tracking-widest ${darkMode ? 'text-white' : 'text-gray-900'}`}>Project Ideas</h3>
      </div>
      <div className="space-y-4">
        {projects.map((project, i) => (
          <div key={i} className={`p-3 border ${darkMode ? 'bg-white/[0.02] border-white/5 rounded-[4px]' : 'bg-gray-50 border-gray-100 rounded-lg'}`}>
            <div className="flex justify-between items-start mb-1">
              <h4 className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{project.title}</h4>
              <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                project.difficulty === 'Advanced' ? 'bg-orange-500/10 text-orange-500' :
                project.difficulty === 'Expert' ? 'bg-red-500/10 text-red-500' :
                'bg-green-500/10 text-green-500'
              }`}>
                {project.difficulty}
              </span>
            </div>
            <p className={`text-[11px] mb-2 ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>{project.description}</p>
            <div className="flex flex-wrap gap-1">
              {project.skills.map(skill => (
                <span key={skill} className={`text-[9px] font-mono px-1.5 py-0.5 ${darkMode ? 'bg-accent-blue/10 text-accent-blue' : 'bg-blue-50 text-blue-600'} rounded`}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectIdeas;
