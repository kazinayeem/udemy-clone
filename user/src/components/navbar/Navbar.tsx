import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-cyan-100/70 w-full border-b-[0.5px] border-black">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link href={"/"}>
            <Image
              className="dark:invert"
              src="/logo-eRVar-dC.svg"
              alt="Logo"
              width={130}
              height={50}
              priority
            />
          </Link>
        </div>
        <div>
          <Link href="/auth">
            <Button className="bg-blue-600 text-white hover:bg-blue-700">
              Create Account
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
