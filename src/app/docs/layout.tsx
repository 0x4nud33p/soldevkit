// import * as React from "react";
// import { DocsLayout } from "fumadocs-ui/layouts/docs";
// import { source } from "@/lib/source";

// export default function Layout({ children }: { children: React.ReactNode }) {
//   return <DocsLayout tree={source.pageTree}>{children}</DocsLayout>;
// }
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { Banner } from "fumadocs-ui/components/banner";

import type { ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";
import { source } from "@/lib/source";
import { ThemeSwitcher } from "@/components/docs/theme-switcher";
import XIcon from "@/components/icons/x-icon";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Banner id="coffee-banner" variant="rainbow">
        <a
          href="https://dial.to/?action=solana-action:https://soldevkit.com/api/actions/donate"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-white hover:text-white/90 transition-colors duration-200 underline decoration-white/60 hover:decoration-white underline-offset-2"
        >
          💎 Donate SOL via Blink - Support SoldevKit UI!
        </a>
      </Banner>
      <DocsLayout
        githubUrl="https://github.com/satyawaniaman/soldevkit-UI"
        links={[
          {
            icon: <XIcon />,
            url: "https://x.com/satyawani_aman",
            text: "X",
            type: "icon",
          },
        ]}
        tree={source.pageTree}
        themeSwitch={{
          component: <ThemeSwitcher />,
        }}
        {...baseOptions}
      >
        {children}
      </DocsLayout>
    </>
  );
}
