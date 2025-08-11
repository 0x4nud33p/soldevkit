# Contributing to Soldevkit UI

Thank you for your interest in **contributing to Soldevkit UI**! 

**Note:** You only need to modify a few files to add a new component, and it should take you around 10 minutes to complete.

## Getting Started

### Fork and Clone the Repository

#### 1. Fork the Repository

Click [here](https://github.com/satyawaniaman/soldevkit-ui/fork) to fork the repository.

#### 2. Clone your Fork to Your Local Machine

```bash
git clone https://github.com/<YOUR_USERNAME>/soldevkit-ui.git
```

#### 3. Navigate to the Project Directory

```bash
cd soldevkit-ui
```

#### 4. Create a New Branch for Your Changes

```bash
git checkout -b my-branch
```

#### 5. Install Dependencies

```bash
pnpm i
```

#### 6. Run the Project

```bash
pnpm dev
```

## Edit a Component

If you need to modify a component to correct or improve it, you must:

- add a screenshot (photo or video as appropriate) of before and after the modification
- clearly explain why you made the modification

### Edit the code

Edit the component in the `src/registry/default/ui/` folder. Don't forget to adapt the demo and documentation if necessary.

You shouldn't change your behavior completely unless there's a good reason.

### Build the Registry

To update the registry, run the following command:

```bash
pnpm build:registry
```

## Adding a New Component

The addition of a new component must comply with certain rules:

- You can't just copy/paste component code from other libraries. You can be inspired by a component, but it must have added value. For example, taking Shadcn's components and adding Solana-specific functionality.
- If you take inspiration from a component (CodePen, another library, etc.), remember to add the "Credits" section to your documentation. It's important to respect the work of other developers.

To submit your component, please include a demo video in the MR. Once the component has been submitted, it must be validated by @satyawaniaman

To **add a new component to Soldevkit UI**, you will need to update several files. Follow these steps:

### Step 1: Create the Component

Create your main component in `src/registry/default/ui/my-component.tsx`.

```tsx title="src/registry/default/ui/my-component.tsx"
import * as React from 'react';
import { cn } from '@/lib/utils';

export interface MyComponentProps extends React.ComponentProps<'div'> {
  myProp: string;
}

export const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
  ({ className, myProp, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('your-component-styles', className)}
        {...props}
      >
        {/* Your component implementation */}
      </div>
    );
  }
);

MyComponent.displayName = 'MyComponent';
```

### Step 2: Create the Demo Component

Create your demo component in `src/registry/default/examples/my-component-demo.tsx`.

```tsx title="src/registry/default/examples/my-component-demo.tsx"
import { MyComponent } from '../ui/my-component';

export default function MyComponentDemo() {
  return (
    <div className="flex items-center justify-center p-4">
      <MyComponent myProp="Demo value" />
    </div>
  );
}
```

### Step 3: Register the Component

Add your component to the registry by updating `src/registry/registry-ui.ts`:

```tsx title="src/registry/registry-ui.ts"
import type { Registry } from "shadcn/registry";

export const ui: Registry["items"] = [
  // ... existing components
  {
    name: "my-component",
    type: "registry:component",
    title: "My Component",
    description: "Description of your component",
    files: [
      {
        path: "default/ui/my-component.tsx",
        type: "registry:component",
      },
    ],
    dependencies: ["dependency1", "dependency2"], // Add any required dependencies
    registryDependencies: ["input", "button"], // Add any shadcn dependencies
  },
];
```

### Step 4: Register the Demo

Add your demo to the registry by updating `src/registry/registry-examples.ts`:

```tsx title="src/registry/registry-examples.ts"
import type { Registry } from 'shadcn/registry';

export const examples: Registry['items'] = [
  // ... existing examples
  {
    name: 'my-component-demo',
    type: 'registry:example',
    title: 'My Component Demo',
    description: 'Demo showcasing my component',
    files: [
      {
        path: 'default/examples/my-component-demo.tsx',
        type: 'registry:example',
      },
    ],
    registryDependencies: ['https://soldevkit.com/r/my-component.json'],
  },
];
```

### Step 5: Update the Documentation Sidebar

Add your component to the documentation sidebar by updating `src/content/docs/components/meta.json`:

```json title="src/content/docs/components/meta.json"
{
  "title": "Components",
  "pages": [
    "floating-label-input",
    "my-component"
  ]
}
```

### Step 6: Create the Component Documentation

Create an MDX file to document your component in `src/content/docs/components/my-component.mdx`.

```mdx title="src/content/docs/components/my-component.mdx"
---
title: My Component
description: Description for the new component
---

## Preview

<Tabs items={['preview', 'code']}>
  <Tab>
    <ComponentPreview name="my-component-demo" />
  </Tab>
  <Tab>
    <ComponentSource name="my-component-demo" />
  </Tab>
</Tabs>

## Installation

### CLI

<Tabs items={['npm', 'pnpm']}>
  <Tab>
    ```sh
    npx shadcn@latest add https://soldevkit.com/r/my-component.json
    ```
  </Tab>
  <Tab>
    ```sh
    pnpm dlx shadcn@latest add https://soldevkit.com/r/my-component.json
    ```
  </Tab>
</Tabs>

### Manual

<Steps>

<Step>Install the following dependencies</Step>

<Tabs items={['npm', 'pnpm']}>
  <Tab>
    ```sh
    npm install clsx tailwind-merge [other-dependencies]
    ```
  </Tab>
  <Tab>
    ```sh
    pnpm add clsx tailwind-merge [other-dependencies]
    ```
  </Tab>
</Tabs>

<Step>Copy and paste the following code into your project</Step>

<ComponentSource name="my-component" />

</Steps>

## Usage

```tsx
import { MyComponent } from '@/components/soldevkit-ui/my-component';

export default function Example() {
  return <MyComponent myProp="example" />;
}
```

## API Reference

### MyComponent

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| myProp | string | - | Description of the prop |
| className | string | - | Additional CSS classes |

## Credits

- Credits to [you](https://link-to-your-profile.com) for creating the component
```

### Step 7: Build the Registry

To update the registry and generate the necessary files, run:

```bash
pnpm build:registry
```

This command will:
1. Run the internal registry build script (`build:registry:internal`)
2. Generate the external registry files (`build:registry:external`)

## File Structure Summary

When adding a new component, you'll be working with these files:

```
src/
├── registry/
│   ├── default/
│   │   ├── ui/
│   │   │   └── my-component.tsx          # Your component
│   │   └── examples/
│   │       └── my-component-demo.tsx     # Your demo
│   ├── registry-ui.ts                    # Register component
│   └── registry-examples.ts              # Register demo
└── content/
    └── docs/
        └── components/
            ├── meta.json                  # Update sidebar
            └── my-component.mdx           # Documentation
```

## Ask for Help

If you need any assistance or have questions, please feel free to open a [GitHub issue](https://github.com/satyawaniaman/soldevkit-ui/issues/new). We are here to help!

Thank you again for your contribution to Soldevkit UI! We look forward to seeing your improvements and new components.