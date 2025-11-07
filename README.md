# Web3 Career Skills Tracker

A comprehensive skills tracking and career planning tool for Web3 professionals. Track your progress across different skill categories, explore career paths, and plan your journey in the Web3 ecosystem.

## Features

- **Comprehensive Skills Database**: 97+ skills across 16 categories
- **Career Path Guidance**: Curated skill sets and roadmaps for specific Web3 roles
- **Progress Tracking**: Visual progress indicators for each category and overall completion
- **Persistent Storage**: Your progress is automatically saved locally
- **Import/Export**: Backup and restore your progress via JSON files
- **Career Assessment**: See which career paths match your current skill set
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Career Paths Included

- Smart Contract Developer
- Security Auditor
- DeFi Developer
- Frontend Web3 Developer
- Backend Infrastructure Engineer
- DevOps Engineer
- Blockchain Architect
- Designer (UI/UX/Brand)
- Quantitative Trader
- Full Stack Web3 Developer

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

## Technology Stack

- React 18
- Tailwind CSS
- Lucide React (icons)
- Local Storage API

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

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Roadmap

- [ ] Add more career paths
- [ ] Resource links for each skill
- [ ] Learning time estimates
- [ ] Skill dependencies and prerequisites
- [ ] Community-contributed career paths
- [ ] Integration with job boards
- [ ] Certification tracking
- [ ] Mentor matching

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Contact

Mohammad Luqman - [@mirmohmmadluqman](https://github.com/mirmohmmadluqman)
Project Link: [https://github.com/mirmohmmadluqman/web3skills](https://github.com/mirmohmmadluqman/web3skills)

## Acknowledgments

- Data sourced from real Web3 job descriptions
- Built with modern React best practices
- Inspired by the growing Web3 developer community
