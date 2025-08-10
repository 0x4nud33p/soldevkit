import { type Registry } from 'shadcn/registry';
import { ui } from './registry-ui';
import { examples } from './registry-examples';

export const registry = {
  name: 'soldevkit-ui',
  homepage: 'https://soldevkit.com',
  items: [...ui, ...examples],
} satisfies Registry;
