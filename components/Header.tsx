"use client";

import {
  useUser,
  SignInButton,
  SignedOut,
  SignedIn,
  UserButton,
} from "@clerk/nextjs";
import BreadCrumbs from "./BreadCrumbs";

const Header = () => {
  const { user } = useUser();

  return (
    <div className="flex items-center justify-between p-5">
      {user && (
        <h1 className="text-2xl">
          {user?.firstName}
          {`'s`} Space
        </h1>
      )}

      {/* Breadcrumbs */}
      <BreadCrumbs />
      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};
export default Header;
