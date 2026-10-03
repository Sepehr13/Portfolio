'use client'

import Link from "next/link";
import { Moon, Sun, Download } from 'lucide-react'
import { Button } from "../ui/button";
import { useTheme } from "next-themes";

export default function Navigation() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="fixed z-20 w-full h-16 bg-background text-foreground flex items-center justify-between lg:px-24 px-8">
      <div className="font-bold text-xl">SA</div>
      <div className="hidden space-x-4 md:flex pl-12">
        <Link href="/">
          Home
        </Link>
        <Link href="/about">
          About
        </Link>
        <Link href="/contact">
          Contact
        </Link>
      </div>
      <div className="flex space-x-4">
        <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {theme === "dark" ? <Sun /> : <Moon />}
        </Button>
        <Button variant="outline" size="lg" className="bg-black text-white border-black dark:bg-white dark:text-black dark:border-white hover:bg-gray-800 hover:text-white dark:hover:bg-gray-100">
          <Link href="/Sepehr Azizi Resume.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
            <Download className="mr-2" data-icon="inline-start" /> Download CV
          </Link>
        </Button>
      </div>
    </div>
  );
}