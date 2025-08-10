import type { Registry } from 'shadcn/registry';

export const ui: Registry['items'] = [
  {
    name: 'base',
    type: 'registry:style',
    title: 'Base Styles',
    description: 'Base styles and CSS variables for SolDevKit UI',
    files: [
      {
        path: 'styles/base.css',
        type: 'registry:style',
      },
    ],
  },
  {
    name: 'floating-label-input',
    type: 'registry:component',
    title: 'Floating Label Input',
    description: 'Material UI floating label input',
    files: [
      {
        path: 'default/ui/floating-label-input.tsx',
        type: 'registry:component',
      },
    ],
    dependencies: ['@radix-ui/react-label'],
    registryDependencies: ['input'],
  },
];
