import RoomProvider from "@/components/RoomProvider";
import { auth } from "@clerk/nextjs/server";

// Make the layout function async so it can handle params that might be asynchronous.
export default async function DocLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  // Allow params to be either a plain object or a promise that resolves to one.
  params: { id: string } | Promise<{ id: string }>;
}) {
  // Resolve params in case it's a promise.
  const resolvedParams = await Promise.resolve(params);
  const { id } = resolvedParams;

  // You can perform auth protection here (if this function call is synchronous).
  auth.protect();

  return <RoomProvider roomId={id}>{children}</RoomProvider>;
}
