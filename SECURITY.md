# Security Policy

## Overview

Web3 Skills Tracker is a client-side React application designed to help developers track their Web3 skills and career progress. We take security seriously and are committed to ensuring the safety of our users' data.

## Supported Versions

We currently provide security updates for the following versions:

| Version | Supported          | Status |
| ------- | ------------------ | ------ |
| Latest(v3.1) | Yes | Active development |
| 3.0.x    | ⚠️  Limited support | devlopment stopped |
<!-- | 3.x     | :white_check_mark: | Active development |
| 2.x     | :white_check_mark: | Security fixes only |
| < 2.0   | :x:                | No longer supported | -->


## Data Storage & Privacy

### Local Storage Only
- All user data (skills, progress, preferences) is stored exclusively in your browser's localStorage
- **No data is sent to external servers**
- **No user tracking or analytics**
- **No cookies for tracking purposes**
- Your progress data never leaves your device unless you explicitly share or export it

### Shared Data
When you use the "Share" feature:
- Only your **checked skills** are encoded in the share code
- No personal information is included
- Share codes are generated client-side using base64 encoding
- You control who you share the code with

### Export/Import Functionality
- JSON exports contain only your skills data and timestamps
- No sensitive or personal information is included
- Files are generated and processed entirely in your browser
- We recommend storing exported files securely

## Third-Party Dependencies

### NPM Packages
We use the following trusted packages:
- **React**: UI framework (MIT License)
- **Lucide React**: Icon library (ISC License)
- **Tailwind CSS**: Styling framework (MIT License)

### External Links
Our application includes links to educational resources:
- Cyfrin Updraft
- Turbin3
- Ethereum.org
- Solidity Documentation
- Various Web3 learning platforms

**Note**: We are not responsible for the content or security of external websites.

## Security Best Practices for Users

### Protecting Your Data
1. **Backup Regularly**: Use the Export feature to create JSON backups of your progress
2. **Secure Share Codes**: Only share your profile code with trusted individuals
3. **Browser Security**: Keep your browser updated for latest security patches
4. **Clear Cache Carefully**: Clearing browser data will delete your progress (export first!)

### Importing Data
When importing JSON files:
- Only import files you created or trust completely
- The app validates JSON structure but cannot detect malicious modifications
- Importing will overwrite your current progress

## Reporting a Vulnerability

We appreciate the security research community's efforts to help keep our users safe.

### How to Report

If you discover a security vulnerability, please report it by:

1. **Email**: Contact the maintainer at `mirmohmmadluqman@github` or create a private security advisory
2. **GitHub Security Advisory**: Use the [Security tab](https://github.com/mirmohmmadluqman/web3skills/security/advisories) to report privately
3. **NOT through public issues**: Please do not disclose security vulnerabilities publicly

### What to Include

Please provide:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)
- Your contact information for follow-up

### Response Timeline

- **Initial Response**: Within 48 hours of report
- **Status Update**: Every 5 business days until resolved
- **Fix Timeline**: Critical issues within 7 days, others within 30 days
- **Public Disclosure**: After fix is deployed and tested

### What to Expect

**If Accepted**:
- We'll work with you to understand and reproduce the issue
- You'll be credited in the release notes (unless you prefer anonymity)
- We'll notify you when the fix is deployed

**If Declined**:
- We'll explain why the reported issue isn't considered a vulnerability
- You're welcome to seek a second opinion

## Security Considerations

### Client-Side Application
Since this is a client-side only application:
- There are no server-side vulnerabilities
- No database to secure
- No API endpoints to protect
- No user authentication system

### Potential Risks
The main security considerations are:
1. **XSS Prevention**: We sanitize all user inputs
2. **localStorage Access**: Other scripts on your domain could access data
3. **Import Validation**: JSON imports are validated for structure
4. **Share Code Safety**: Codes contain only skill names (no executable code)

## Code Security

### Development Practices
- Dependencies are regularly updated
- No eval() or dangerous functions used
- Input validation on all user data
- Safe JSON parsing with try/catch blocks
- No inline scripts or unsafe HTML rendering

### Open Source
- Full source code available for audit
- Community contributions welcome
- All changes reviewed before merging

## Compliance

### Data Protection
- **GDPR Compliant**: No personal data collected
- **CCPA Compliant**: No data sold or shared with third parties
- **No cookies**: Except essential localStorage for functionality

### Licensing
- MIT License - Free and open source
- ShadCN/UI components used under MIT License
- Unsplash images used under Unsplash License

## Updates & Notifications

### Security Updates
- Critical security fixes are released immediately
- Users are notified via GitHub releases
- Update instructions provided in release notes

### Staying Informed
- Watch the repository for security updates
- Check [Releases](https://github.com/mirmohmmadluqman/web3skills/releases) regularly
- Join RiWoT community Discord for announcements

## Acknowledgments

We thank the following for their security contributions:
- The React security team for framework security
- The open-source community for dependency maintenance
- Security researchers who report vulnerabilities responsibly

## Contact

- **Maintainer**: [@mirmohmmadluqman](https://github.com/mirmohmmadluqman)
- **Organization**: RiWoT
- **Discord**: [https://discord.gg/epWxxeWC](https://discord.gg/epWxxeWC)
- **Repository**: [web3skills](https://github.com/mirmohmmadluqman/web3skills)

---

**Last Updated**: 13 November 2025  
**Version**: 3.1
