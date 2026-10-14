'use client'

import Link from "next/link";
import { Moon, Sun, Download, SunMoon } from 'lucide-react'
import { Button } from "../ui/button";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const subscribeToMount = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export default function Navigation() {
  const { theme, setTheme } = useTheme()
  const mounted = useSyncExternalStore(subscribeToMount, getClientSnapshot, getServerSnapshot)

  return (
    <div className="fixed z-20 w-full h-16 text-foreground border-b">
      <div className="absolute z-20 top-0 left-0 w-full h-full backdrop-blur-sm"></div>
      <div className="absolute z-30 top-0 left-0 w-full flex items-center justify-between lg:px-24 px-8 h-full">
        <div className="font-bold text-xl">SA</div>
        <div className="flex space-x-4">
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {mounted && theme === "system" ? <SunMoon /> : mounted && theme === "dark" ? <Sun /> : <Moon />}
          </Button>
          <Button variant="outline" size="lg" className="bg-black text-white border-black dark:bg-white dark:text-black dark:border-white hover:bg-gray-800 hover:text-white dark:hover:bg-gray-100">
            <Link href="/Sepehr Azizi Resume.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
              <Download className="mr-2" data-icon="inline-start" /> Download CV
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}