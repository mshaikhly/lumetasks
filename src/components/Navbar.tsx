"use client";

import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "./ui/mode-toggle";
import AboutDialog from "./AboutDialog";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import ResetButton from "./ResetButton";

export default function Navbar() {
  const { theme, resolvedTheme } = useTheme(); // Include resolvedTheme
  const [currentTheme, setCurrentTheme] = useState<string | undefined>();

  useEffect(() => {
    // Set the resolved theme after the client has hydrated
    setCurrentTheme(resolvedTheme || theme);
  }, [theme, resolvedTheme]);

  return (
    <nav className="md:sticky md:top-0 md:z-50 relative bg-background border rounded shadow">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-14 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center" prefetch={false}>
            {currentTheme && (
              <Image
                src={currentTheme === "dark" ? "/logodark.svg" : "/logolight.svg"}
                alt="LumeTasks Logo"
                width={150} // Adjust width as needed
                height={40} // Adjust height as needed
                priority // Ensures the image is loaded immediately for performance
              />
            )}
            <span className="sr-only">LumeTasks</span>
          </Link>

          {/* Navigation Links */}

          {/* Mode Toggle */}
          <div className="flex items-center gap-2">
            <AboutDialog />
            <ResetButton />
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
