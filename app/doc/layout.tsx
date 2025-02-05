import LiveBlocksProvider from "@/components/LiveBlocksProvider";
import React from "react";

// Define your props type. Note that we allow `params` to be either an object or a Promise.
interface PageLayoutProps {
  children: React.ReactNode;
  params: { id: string } | Promise<{ id: string }>;
}

// Make your layout an async function so it can await the params if necessary.
export default async function PageLayout({
  children,
  params,
}: PageLayoutProps) {
  // If params is a promise, await it.
  const resolvedParams = await Promise.resolve(params);

  // (You can use resolvedParams if needed.)
  return <LiveBlocksProvider>{children}</LiveBlocksProvider>;
}
