---
description: SolDevKit Web3 React Component Library Rules
globs: ["src/**/*.tsx", "src/**/*.ts"]
alwaysApply: true
---

# SolDevKit Web3 Component Library Rules

## Project Overview

- React component library for Web3/Solana projects
- Provides wallet connection and common DApp UI components
- Components: `src/registry/default/ui`
- Examples: `src/registry/default/examples`
- Docs: `src/app/content/docs`

## Component Standards

### Naming & Structure

- Use PascalCase for component names (e.g., `WalletButton`, `TokenInput`)
- File names in kebab-case (e.g., `wallet-button.tsx`)
- Unique names, no conflicts with React/existing components
- Export as named export: `export const ComponentName`

### Required Dependencies

```typescript
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

### Component base structure
- components will use radix primitives
- components will use tailwind css for styling
- components will use motion for animations

### Styling Rules

- ONLY use Tailwind CSS classes
- NO custom CSS files or styled-components
- Use cn() utility for class merging
- Responsive design: mobile-first approach
- Dark mode support via Tailwind dark: variants

### Animation Guidelines

- Use Framer Motion for all animations
- Keep animations subtle and performant
- Default transition: { duration: 0.2 }
- Common patterns:
	- Fade in: initial={{ opacity: 0 }} animate={{ opacity: 1 }}
	- Slide up: initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
	- Scale: whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}

### TypeScript Requirements

- All components must be fully typed
- Use VariantProps<typeof componentVariants> for variant props
- Export prop interfaces: export interface ComponentProps
- Use proper React types: React.ReactNode, React.ComponentProps
- use tanstack query for data fetching

Solana/Web3 Specific

- Wallet connection components should handle loading states
- Transaction components need error boundaries
- Address/key inputs should have validation
- Token amounts should handle decimals properly
- Network-aware components (mainnet/devnet/testnet)

### File Structure
src/registry/default/ui/
├── wallet-button.tsx

src/registry/default/examples/
├── wallet-button-demo.tsx

### Common Variants to Include

- variant: default, secondary, destructive, outline, ghost
- size: sm, default, lg
- state: loading, success, error (for interactive components)

### Accessibility

- Include proper ARIA labels
- Keyboard navigation support
- Focus management
- Screen reader compatibility

### Performance

- Use React.memo for expensive components
- Lazy load heavy components
- Optimize bundle size with tree-shaking
- Avoid unnecessary re-renders

```
[byterover-mcp]

# important 
always use byterover-retrive-knowledge tool to get the related context before any tasks 
always use byterover-store-knowledge to store all the critical informations after sucessful tasks