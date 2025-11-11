# Web3 Career Skills Tracker

A clean, minimal, and comprehensive skills tracking tool for Web3 professionals. Track your progress, explore career paths, and connect with the RiWoT community.

## Features

- **Comprehensive Skills Database**: 97+ skills across 16 categories
- **Career Path Guidance**: 6 curated career paths with detailed roadmaps
- **Progress Tracking**: Clean visual progress indicators for categories and overall completion
- **Persistent Storage**: Your progress is automatically saved in localStorage
- **Import/Export**: Backup and restore your progress via JSON files
- **Career Matching**: See which career paths match your current skill set
- **RiWoT Community Integration**: Connect with Web3 developers and mentors
- **Clean Minimal Design**: Modern, whitespace-focused UI with smooth interactions
- **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile devices

## Career Paths Included

- **Smart Contract Developer** - Build secure, efficient smart contracts
- **Security Auditor** - Identify vulnerabilities and ensure contract security
- **DeFi Developer** - Create decentralized finance protocols
- **Frontend Web3 Developer** - Build user interfaces for dApps
- **Backend Infrastructure Engineer** - Build scalable backend systems
- **Blockchain Architect** - Design blockchain systems and infrastructure

## RiWoT Community

This project is part of the RiWoT Community - a network of Web3 developers helping each other grow.

- **Discord**: [Join our community](https://discord.gg/epWxxeWC)
- **GitHub**: [RiWoT Organization](https://github.com/RiWoT)

Learn smart contract development, DeFi protocols, dApp development, and more with experienced mentors and peers.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/mirmohmmadluqman/web3skills.git

# Navigate to the project directory
cd web3skills

# Install dependencies
npm install

# Start the development server
npm start
```

The application will open at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

## Usage

### Tracking Skills

1. Navigate to "All Skills" to see the complete list
2. Check off skills as you acquire them
3. Your progress is automatically saved
4. View your overall progress and category-specific completion rates

### Exploring Career Paths

1. Go to "Career Paths" to see available roles
2. Select a career path to view required skills
3. See step-by-step learning roadmaps
4. Track your progress toward specific career goals

### Import/Export Data

- **Export**: Click "Export Progress" to download your data as JSON
- **Import**: Click "Import Progress" to restore from a previously exported file

## Project Structure

```
web3skills/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── SkillsChecklist.jsx
│   │   ├── CareerPaths.jsx
│   │   ├── CareerPathDetail.jsx
│   │   └── Navigation.jsx
│   ├── data/
│   │   ├── skills.js
│   │   └── careerPaths.js
│   ├── App.jsx
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```


## Roadmap

- [ ] Add more career paths
- [ ] Resource links for each skill
- [ ] Learning time estimates
- [ ] Skill dependencies and prerequisites
- [ ] Community-contributed career paths
- [ ] Integration with job boards
- [ ] Certification tracking
- [ ] Mentor matching

