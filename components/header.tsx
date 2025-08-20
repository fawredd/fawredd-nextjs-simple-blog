"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { menuItems, logo } from "@/lib/config";
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b fixed top-0 left-0 right-0 z-20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src={logo.image}
              alt={logo.alt}
              width={116}
              height={40}
              className="h-10"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.length > 0 &&
              menuItems.map((item, itemIndex) => (
                <Link
                  key={`menu${itemIndex}`}
                  href={item.url}
                  className="text-gray-700 hover:text-green-600 transition-colors"
                >
                  {item.title}
                </Link>
              ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              {menuItems.length > 0 &&
                menuItems.map((item, itemIndex) => (
                  <Link
                    key={`menuMobile${itemIndex}`}
                    href={item.url}
                    className="text-gray-700 hover:text-green-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
