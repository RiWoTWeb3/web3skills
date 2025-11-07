# Deployment Guide

This guide covers various deployment options for the Web3 Skills Tracker.

## Preparation

Before deploying, ensure:

1. All tests pass: `npm test`
2. Build succeeds: `npm run build`
3. No console errors in production build
4. localStorage works correctly
5. Import/export functions work

## Deployment Options

### 1. Vercel (Recommended)

Vercel offers the easiest deployment with automatic HTTPS and global CDN.

#### Via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

#### Via GitHub Integration

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel auto-detects React and deploys

**Configuration:**
- Framework Preset: Create React App
- Build Command: `npm run build`
- Output Directory: `build`

### 2. Netlify

Netlify provides similar features to Vercel with excellent performance.

#### Via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy

# Deploy to production
netlify deploy --prod
```

#### Via Netlify UI

1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Select your repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
6. Click "Deploy site"

**Custom Domain:**
- Go to Site settings > Domain management
- Add custom domain
- Configure DNS records

### 3. GitHub Pages

Free hosting directly from your GitHub repository.

#### Setup

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to `package.json`:
```json
{
  "homepage": "https://mirmohmmadluqman.github.io/web3skills",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

3. Deploy:
```bash
npm run deploy
```

4. Enable GitHub Pages:
   - Go to repository Settings > Pages
   - Source: Deploy from branch
   - Branch: gh-pages
   - Save

**Note:** GitHub Pages may take a few minutes to update.

### 4. AWS Amplify

Enterprise-grade hosting with AWS infrastructure.

#### Setup

1. Install Amplify CLI:
```bash
npm install -g @aws-amplify/cli
```

2. Configure:
```bash
amplify configure
```

3. Initialize:
```bash
amplify init
```

4. Add hosting:
```bash
amplify add hosting
```

5. Publish:
```bash
amplify publish
```

### 5. Firebase Hosting

Fast and secure hosting by Google.

#### Setup

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login:
```bash
firebase login
```

3. Initialize:
```bash
firebase init hosting
```

Configuration:
- Public directory: `build`
- Single-page app: Yes
- Automatic builds: Optional

4. Deploy:
```bash
npm run build
firebase deploy
```

### 6. Docker Deployment

For containerized deployments.

#### Dockerfile

Create `Dockerfile` in project root:

```dockerfile
# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Build and Run

```bash
# Build image
docker build -t web3skills .

# Run container
docker run -p 80:80 web3skills
```

## Environment Variables

If you add environment variables in the future:

1. Create `.env` file (don't commit to git):
```
REACT_APP_API_URL=your_api_url
```

2. Use in code:
```javascript
const apiUrl = process.env.REACT_APP_API_URL;
```

3. Add to deployment platform:
   - **Vercel:** Environment Variables in project settings
   - **Netlify:** Environment variables in site settings
   - **GitHub Pages:** Use GitHub Secrets

## Performance Optimization

### Build Optimization

1. Analyze bundle size:
```bash
npm install --save-dev source-map-explorer
```

Add to `package.json`:
```json
"scripts": {
  "analyze": "source-map-explorer 'build/static/js/*.js'"
}
```

2. Run analysis:
```bash
npm run build
npm run analyze
```

### CDN Configuration

For static assets, consider using a CDN:

1. Upload build files to CDN
2. Update asset URLs
3. Configure CORS if needed

### Caching Headers

Configure caching for better performance:

**Vercel:** Create `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/static/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

**Netlify:** Create `netlify.toml`:
```toml
[[headers]]
  for = "/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

## Monitoring

### Set up monitoring:

1. **Vercel Analytics:** Enable in project settings
2. **Google Analytics:** Add tracking code to `public/index.html`
3. **Sentry:** For error tracking

## SSL/HTTPS

All recommended platforms provide automatic HTTPS:

- Vercel: Automatic
- Netlify: Automatic
- GitHub Pages: Automatic for github.io domains
- Firebase: Automatic

For custom domains, SSL certificates are provided automatically.

## Continuous Deployment

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./build
```

## Troubleshooting

### Build Fails

1. Clear cache: `npm cache clean --force`
2. Delete `node_modules` and `package-lock.json`
3. Reinstall: `npm install`
4. Try build again: `npm run build`

### 404 Errors

For single-page apps, configure redirects:

**Netlify:** Create `public/_redirects`:
```
/*    /index.html   200
```

**Vercel:** Create `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

### LocalStorage Issues

Ensure your deployment platform allows localStorage:
- Check browser settings
- Verify HTTPS is enabled
- Test in incognito mode

## Post-Deployment Checklist

- [ ] Site loads correctly
- [ ] All skills are visible
- [ ] Checkboxes work
- [ ] Progress saves to localStorage
- [ ] Export downloads JSON file
- [ ] Import loads JSON file
- [ ] All career paths accessible
- [ ] Mobile responsive
- [ ] No console errors
- [ ] HTTPS enabled
- [ ] Custom domain configured (if applicable)

## Support

For deployment issues:
- Check platform documentation
- Review GitHub issues
- Contact support for your hosting platform