# Contributing to Web3 Skills Tracker

Thank you for your interest in contributing to the Web3 Skills Tracker project. This document provides guidelines and instructions for contributing.

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with the following information:

1. Clear, descriptive title
2. Steps to reproduce the issue
3. Expected behavior
4. Actual behavior
5. Screenshots (if applicable)
6. Browser and OS information

### Suggesting Features

We welcome feature suggestions! Please create an issue with:

1. Clear description of the feature
2. Use cases and benefits
3. Potential implementation approach
4. Any relevant examples or mockups

### Adding Skills or Career Paths

To add new skills or career paths:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/add-new-career-path`
3. Update the relevant data structures in `src/App.js`
4. Test your changes locally
5. Commit your changes with a clear message
6. Push to your fork and submit a pull request

#### Adding Skills

Add new skills to the `initialSkills` object and appropriate category:

```javascript
// In initialSkills
'New Skill Name': false,

// In categories
'Category Name': [...existingSkills, 'New Skill Name'],
```

#### Adding Career Paths

Add a new career path to the `careerPaths` object:

```javascript
'Career Path Name': {
  description: 'Brief description of the role',
  requiredSkills: [
    'Skill 1',
    'Skill 2',
    // List 8-12 key skills
  ],
  roadmap: [
    {
      phase: 'Foundation',
      skills: ['Skill 1', 'Skill 2'],
      duration: '2-3 months'
    },
    // Add 3-5 phases
  ],
  resources: [
    'Resource 1',
    'Resource 2',
    // Add 4-6 learning resources
  ]
}
```

### Code Style Guidelines

- Use functional React components
- Follow existing code formatting
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused
- Use Tailwind CSS classes for styling

### Pull Request Process

1. Update the README.md with details of changes if applicable
2. Ensure your code follows the existing style
3. Test thoroughly on multiple browsers
4. Update documentation as needed
5. Reference any related issues in your PR description

### Pull Request Checklist

- [ ] Code follows the project style guidelines
- [ ] All tests pass locally
- [ ] Documentation has been updated
- [ ] Commit messages are clear and descriptive
- [ ] No console errors or warnings
- [ ] Tested on Chrome, Firefox, and Safari
- [ ] Mobile responsive design maintained

## Development Setup

See [SETUP.md](SETUP.md) for detailed setup instructions.

## Testing Guidelines

Before submitting a PR:

1. Test all interactive features
2. Verify localStorage persistence
3. Test import/export functionality
4. Check responsive design on mobile
5. Test in multiple browsers
6. Verify no console errors

## Code Review Process

1. A maintainer will review your PR
2. They may request changes or ask questions
3. Make requested changes and push to your branch
4. Once approved, your PR will be merged

## Community Guidelines

- Be respectful and constructive
- Welcome newcomers
- Help others when possible
- Follow the code of conduct
- Give credit where credit is due

## Questions?

If you have questions about contributing, feel free to:

- Open an issue with the "question" label
- Reach out to the maintainers
- Check existing issues and PRs

## Recognition

Contributors will be recognized in:
- The project README
- Release notes
- GitHub contributors page

Thank you for helping make Web3 Skills Tracker better!