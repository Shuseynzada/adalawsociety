"use client";
import { mainLogo } from "@/assets";
import Image from "next/image";
import { Button } from "./ui/button";
import { Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <div className="px-20 mt-5">
      <div className="grid sm:grid-cols-2">
        <div>
          <Image
            src={mainLogo}
            alt="Law Society Logo"
            className="outline outline-offset-4 rounded-full bg-[#F8F8FF] p-1 mx-auto sm:mx-0"
            width={90}
            height={90}
          />
          <span>
            Join our newsletter to stay up to date on features and releases.
          </span>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Enter your email"
              className="text-lg border border-black px-2 py-1 w-full"
            />
            <Button
              variant="outline"
              className="border border-black rounded-none"
            >
              Subscribe
            </Button>
          </div>
          <span className="block text-sm my-4">
            By subscribing you agree to with our Privacy Policy and provide
            consent to receive updates from our company.
          </span>
        </div>
        <div className="px-20">
          <h3>Follow us</h3>
          <ul className="p-2 flex flex-col gap-4">
            <li className="flex gap-3"><Facebook/> Facebook </li>
            <li className="flex gap-3"><Instagram/> Instagram </li>
            <li className="flex gap-3"><Linkedin/> Linkedin </li>
          </ul>
        </div>
      </div>
      <div className="h-[1px] w-full bg-black my-1"></div>
      <div className="text-end font-medium mb-5 mt-3">© 2024 ADA Law Society. All rights reserved.</div>
    </div>
  );
};

export default Footer;