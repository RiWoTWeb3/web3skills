import React from 'react';
import { HelpCircle, CheckCircle, ChevronRight } from 'lucide-react';

const questions = [
  {
    category: "Solidity",
    q: "What is the difference between transfer, send, and call in Solidity?",
    a: "transfer and send have a fixed gas limit of 2300. transfer throws on failure, send returns false. call is the recommended way to send Ether and returns a success boolean, allowing for customizable gas limits."
  },
  {
    category: "Security",
    q: "Explain a reentrancy attack and how to prevent it.",
    a: "Reentrancy occurs when a contract calls an external contract before updating its state. Prevention includes using the Checks-Effects-Interactions pattern or a ReentrancyGuard modifier."
  },
  {
    category: "Solana",
    q: "What are PDAs (Program Derived Addresses)?",
    a: "PDAs are addresses that don't have a private key and are 'derived' from a program ID and seeds. They allow programs to programmatically sign for accounts."
  },
  {
    category: "EVM",
    q: "What is the role of the Memory, Stack, and Storage in EVM?",
    a: "Stack is for small local variables (limited to 1024 items). Memory is a linear, volatile area for temporary data. Storage is a persistent, expensive area that lives on the blockchain."
  }
];

const InterviewPrepView = ({ darkMode }: { darkMode: boolean }) => {
  return (
    <div className="space-y-8 animate-slideUp">
      <div className="mb-8">
        <h1 className={`text-5xl font-extrabold mb-4 ${darkMode ? 'text-white' : 'text-gray-900 text-shadow'}`}>
          {darkMode ? 'INTERVIEW_PREP.CORE' : 'Interview Preparation'}
        </h1>
        <p className={`text-xl ${darkMode ? 'text-slate-400 font-mono text-sm uppercase' : 'text-gray-700'}`}>
          Technical Q&A for Web3 Engineering Roles
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {questions.map((item, i) => (
          <div key={i} className={`${darkMode ? 'surface-industrial border-white/5' : 'bg-white border-gray-200 rounded-2xl'} p-8 border group`}>
            <div className="flex items-start gap-4">
              <div className={`p-2 rounded ${darkMode ? 'bg-accent-blue/10 text-accent-blue' : 'bg-blue-50 text-blue-600'}`}>
                <HelpCircle size={24} />
              </div>
              <div className="flex-1">
                <span className={`text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 border rounded mb-3 inline-block ${
                  darkMode ? 'bg-white/5 border-white/10 text-slate-400' : 'bg-gray-100 border-gray-200 text-gray-600'
                }`}>
                  {item.category}
                </span>
                <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{item.q}</h3>
                <div className={`p-4 border-l-2 ${darkMode ? 'bg-black/20 border-accent-blue/30 text-slate-300' : 'bg-blue-50/50 border-blue-200 text-gray-700'} text-sm leading-relaxed`}>
                  {item.a}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={`${darkMode ? 'surface-industrial border-accent-blue/20 bg-accent-blue/5' : 'bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-200 rounded-2xl'} p-12 border relative overflow-hidden`}>
        <div className="relative z-10 text-center">
          <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Want to practice more?</h2>
          <p className={`text-lg mb-8 ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>Join our Discord community to participate in weekly mock interviews.</p>
          <a
            href="https://discord.gg/qMd7jwV7UG"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-8 py-4 font-bold transition-all ${
              darkMode ? 'btn-industrial-primary' : 'bg-blue-600 hover:bg-blue-700 text-white rounded-xl'
            }`}
          >
            Join Community <ChevronRight size={20} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default InterviewPrepView;
