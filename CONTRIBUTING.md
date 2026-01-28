# Contributing to Poker Quiz

First off, thank you for considering contributing to Poker Quiz! It's people like you that make this project better for everyone.

## Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct:
- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Accept responsibility for your mistakes

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Describe the behavior you observed and what you expected**
- **Include screenshots if applicable**
- **Include your browser and OS information**

### Suggesting Features

Feature suggestions are welcome! Please:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested feature**
- **Explain why this feature would be useful**
- **Include mockups or examples if possible**

### Adding New Scenarios

One of the best ways to contribute is by adding new poker scenarios! Here's how:

1. Open `lib/data/scenarios.ts`
2. Add a new scenario object following this structure:

```typescript
{
  id: 'unique-scenario-id',
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert',
  street: 'preflop' | 'flop' | 'turn' | 'river',
  heroPosition: 'UTG' | 'MP' | 'CO' | 'BTN' | 'SB' | 'BB',
  heroCards: [card('A', 'spades'), card('K', 'hearts')],
  communityCards: [], // Empty for preflop
  pot: 100,
  players: [
    player('UTG', 1000, false, false, 0),
    // ... other players
    player('BTN', 1000, true, false, 0), // isHero = true
  ],
  actionHistory: [
    action('raise', 'UTG', 30),
    // ... previous actions
  ],
  validActions: ['fold', 'call', 'raise'],
  optimalAction: 'raise',
  optimalAmount: 90,
  explanation: 'Detailed explanation of why this is the correct play...',
  keyConcept: 'Short key concept (e.g., "3-bet for value")',
  tags: ['preflop', '3-bet', 'value'],
}
```

**Guidelines for scenarios:**
- Ensure the scenario is realistic and educational
- Provide clear, accurate explanations
- Use appropriate difficulty ratings
- Include relevant tags for filtering

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run the linter and type checker:
   ```bash
   pnpm lint
   pnpm typecheck
   ```
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

#### Pull Request Guidelines

- Follow the existing code style
- Update documentation if needed
- Add tests if applicable
- Keep PRs focused on a single feature/fix
- Write clear commit messages

## Development Setup

1. Fork and clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Start the development server:
   ```bash
   pnpm dev
   ```
4. Make your changes and test them locally

## Style Guide

### TypeScript

- Use TypeScript strict mode
- Prefer `const` over `let`
- Use meaningful variable names
- Add types to function parameters and return values

### React

- Use functional components with hooks
- Keep components small and focused
- Use proper prop typing

### CSS

- Use Tailwind CSS utility classes
- Follow mobile-first approach
- Keep custom CSS minimal

## Questions?

Feel free to open an issue with your question or reach out to the maintainers.

Thank you for contributing! ♠️ ♥️ ♦️ ♣️
