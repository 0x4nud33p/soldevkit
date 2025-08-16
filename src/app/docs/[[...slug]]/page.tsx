import { source } from "@/lib/source";
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from "fumadocs-ui/page";
import { TypeTable } from "fumadocs-ui/components/type-table";
import { notFound } from "next/navigation";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { ComponentPreview } from "@/components/mdx/component-preview";
import { ComponentSource } from "@/components/mdx/component-source";
import { ComponentInstallation } from "@/components/mdx/component-installation";
import { ExternalLink } from "@/components/docs/external-links";
import { Steps, Step } from "fumadocs-ui/components/steps";
import { Tabs, Tab } from "fumadocs-ui/components/tabs";
import { Footer } from "@/components/docs/footer";

import { DocsAuthor } from "@/components/mdx/docs-author";
import { DocsBreadcrumb } from "@/components/mdx/docs-breadcrumb";
import { Rate } from "@/components/docs/feedback";
import { submitFeedback } from "@/lib/feedback-action";

// Add these imports
import { LLMCopyButton, ViewOptions } from "@/components/docs/view-button";

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();
  const MDX = page.data.body;

  // Generate URLs for the components
  const githubUrl = `https://github.com/satyawaniaman/soldevkit-UI/tree/main/src/content/docs/${params.slug ? `${params.slug.join("/")}.mdx` : "index.mdx"}`;
  const markdownUrl = `${params.slug ? `/${params.slug.join("/")}` : ""}`;

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      footer={{ component: <Footer /> }}
      tableOfContent={{ style: "clerk" }}
    >
      <DocsBreadcrumb slug={params.slug} />
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="-my-1.5">
        {page.data.description}
      </DocsDescription>

      {page.data.author && (
        <DocsAuthor name={page.data.author.name} url={page.data.author?.url} />
      )}

      <div className="rounded-full w-full h-[2px] bg-gradient-to-r dark:from-transparent dark:via-zinc-600 dark:to-transparent mt-2 mb-4"></div>
      <div className="flex flex-row gap-2 items-center pb-6">
        {/* Add the new components here */}
        <LLMCopyButton markdownUrl={markdownUrl} />
        <ViewOptions markdownUrl={markdownUrl} githubUrl={githubUrl} />
      </div>

      <DocsBody>
        <MDX
          components={{
            ...defaultMdxComponents,
            ComponentPreview,
            ComponentSource,
            ComponentInstallation,
            TypeTable,
            ExternalLink,
            Steps,
            Step,
            Tabs,
            Tab,
          }}
        />
      </DocsBody>

      {/* Add feedback component */}
      <Rate onRateAction={submitFeedback} />
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const image = ["/docs-og", ...(params.slug || []), "image.png"].join("/");

  return {
    title: page.data.title,
    description: page.data.description,
    authors: page.data?.author
      ? [
          {
            name: page.data.author.name,
            ...(page.data.author?.url && { url: page.data.author.url }),
          },
        ]
      : {
          name: "Aman Satyawani",
          url: "https://github.com/satyawaniaman/soldevkit-UI",
        },
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      url: "https://soldevkit.com",
      siteName: "SolDevKit UI",
      images: image,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      site: "@soldevkit",
      title: page.data.title,
      description: page.data.description,
      images: image,
    },
  };
}
