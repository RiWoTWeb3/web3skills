# Setup Guide for Web3 Skills Tracker

## Quick Start

### 1. Create React App

```bash
npx create-react-app web3skills
cd web3skills
```

### 2. Install Dependencies

```bash
npm install lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 3. Configure Tailwind CSS

Update `tailwind.config.js`:

```javascript
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Update `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

### 4. Replace App.js

Replace the content of `src/App.js` with the provided App component code.

### 5. Update index.js

Make sure `src/index.js` looks like this:

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### 6. Run the Application

```bash
npm start
```

The application will open at `http://localhost:3000`

## File Structure

```
web3skills/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── App.js          # Main application component
│   ├── index.js        # Entry point
│   └── index.css       # Global styles with Tailwind
├── .gitignore
├── package.json
├── README.md
├── SETUP.md           # This file
└── tailwind.config.js
```

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` directory.

## Deployment Options

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `build`

### GitHub Pages
```bash
npm install -g gh-pages
```

Add to `package.json`:
```json
"homepage": "https://mirmohmmadluqman.github.io/web3skills",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

Then run:
```bash
npm run deploy
```

## Customization

### Adding New Skills

Edit the `initialSkills` object in `App.js`:

```javascript
const initialSkills = {
  // Add new skills here
  'Your New Skill': false,
};
```

Then add them to the appropriate category in the `categories` object.

### Adding New Career Paths

Add a new entry to the `careerPaths` object:

```javascript
'Your Career Path': {
  description: 'Description of the role',
  requiredSkills: ['Skill 1', 'Skill 2'],
  roadmap: [
    {
      phase: 'Phase Name',
      skills: ['Skill 1', 'Skill 2'],
      duration: '2-3 months'
    }
  ],
  resources: ['Resource 1', 'Resource 2']
}
```

## Troubleshooting

### Tailwind styles not working
- Make sure `tailwind.config.js` has the correct content paths
- Verify `@tailwind` directives are in `index.css`
- Restart the development server

### LocalStorage not persisting
- Check browser settings (ensure cookies/storage are enabled)
- Try a different browser
- Check browser console for errors

### Build fails
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Clear npm cache: `npm cache clean --force`

## Contributing

See the main README.md for contribution guidelines.

## Support

For issues or questions, please open an issue on GitHub:
https://github.com/mirmohmmadluqman/web3skills/issues