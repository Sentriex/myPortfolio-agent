/**
 * @file src/app/layout.tsx
 * @version 0.1.0
 * @description Root layout for the entire application.
 * @module App
 *
 * @summary This component sets up the global structure of the application, including the
 * HTML shell, body attributes, and font loading. It imports the global CSS to ensure
 * consistent styling across all pages.
 *
 * @dependencies
 * - next/font/google: For loading the 'Space Grotesk' font.
 * - @/app/global.css: For global application styles.
 *
 * @outputs
 * - React.Component: The root layout component.
 *
 * @changelog
 * - 0.1.0 (2025-08-09): Initial creation.
 */
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./global.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "A portfolio website built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={spaceGrotesk.className}>{children}</body>
    </html>
  );
}
