import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#0D1324] text-white py-10 px-6 mt-5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand Info */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <div className="p-2 rounded-full text-white">
              <Image
                className="dark:invert"
                src="/logo-eRVar-dC.svg"
                alt="Logo"
                color="white"
                width={130}
                height={50}
                priority
              />
            </div>
          </div>
          <p className="text-sm text-gray-400">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text.
          </p>
        </div>
        <div>
          <h3 className="text-base font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <a href="#" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                About us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Contact us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Privacy policy
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-base font-semibold mb-4">
            Subscribe to our newsletter
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            The latest news, articles, and resources, sent to your inbox weekly.
          </p>
          <div className="flex items-center space-x-2">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-[#1E2331] border-none text-white placeholder-gray-400"
            />
            <Button className="bg-blue-600 text-white hover:bg-blue-700">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
        Copyright 2024 © Kazi Nayeem. All Right Reserved.
      </div>
    </footer>
  );
}
