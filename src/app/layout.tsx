import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { RootProvider } from "fumadocs-ui/provider";
import "./globals.css";
import Cursor from "@/components/cursor/cursor-pointer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s - Soldevkit UI",
    default: "Soldevkit UI - Solana Development Components",
  },
  description:
    "Open-source Solana development component library built with React, TypeScript, Tailwind CSS, and Motion. Browse components for building Solana dApps with modern UI patterns.",
  keywords: [
    "Soldevkit UI",
    "Solana UI Components",
    "Solana UI Library",
    "Solana",
    "Web3",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Motion",
    "Open-source components",
    "Solana dApps",
    "Blockchain UI",
    "Web3 components",
    "Solana development",
  ],
  icons: [
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon-16x16.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "/apple-touch-icon.png",
    },
  ],
  authors: [
    {
      name: "Aman Satyawani",
      url: "https://github.com/satyawaniaman",
    },
  ],
  publisher: "Soldevkit UI",
  openGraph: {
    title: "Soldevkit UI",
    description:
      "Open-source Solana development component library built with React, TypeScript, Tailwind CSS, and Motion. Browse components for building Solana dApps with modern UI patterns.",
    url: "https://soldevkit.com",
    siteName: "Soldevkit UI",
    images: [
      {
        url: "https://soldevkit.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Soldevkit UI - Solana Development Components",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@satyawani_aman",
    title: "Soldevkit UI",
    description:
      "Open-source Solana development component library built with React, TypeScript, Tailwind CSS, and Motion. Browse components for building Solana dApps with modern UI patterns.",
    images: [
      {
        url: "https://soldevkit.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Soldevkit UI - Solana Development Components",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-dvh`}
      >
        <Cursor />
        <RootProvider theme={{ defaultTheme: "dark" }}>{children}</RootProvider>
      </body>
    </html>
  );
}
