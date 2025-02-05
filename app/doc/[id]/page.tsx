import RoomProvider from "@/components/RoomProvider";
import { auth } from "@clerk/nextjs/server";
import { ReactNode } from "react";

// Define the props type explicitly
type DocLayoutProps = {
  children: ReactNode;
  params: {
    id: string;
  };
};

const DocLayout = ({ children, params: { id } }: DocLayoutProps) => {
  // Use the auth.protect() method
  auth.protect();

  return <RoomProvider roomId={id}>{children}</RoomProvider>;
};

export default DocLayout;
