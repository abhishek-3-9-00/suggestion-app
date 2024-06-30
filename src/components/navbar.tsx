"use client";

import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const user: User = session?.user as User;
  const onMessageClick = () => {
    router.push("/");
  };

  return (
    <nav className="p-4 md:p-6 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-2">
          <video autoPlay loop muted width="60" height="auto">
            <source src="/Message.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <a
            onClick={onMessageClick}
            className="text-xl font-bold mb-4 md:mb-0"
          >
            Message Center
          </a>
        </div>
        {session ? (
          <>
            <span className="mr-4 text-lg font-semibold">
              <span className="typewriter-text">
                Welcome, {user?.username || user?.email}
              </span>
            </span>
            <Button className="w-full md:w-auto" onClick={() => signOut()}>
              Logout
            </Button>
          </>
        ) : (
          <Link href="/sign-in">
            <Button className="w-full md:w-auto">Login</Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
