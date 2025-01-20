import { ReactNode } from "react";

import { Button } from "@albert-ambaryan/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { GithubIcon, LucideGithub } from "lucide-react";
import { Link } from "react-router-dom";

interface MainLayoutProps {
  isLoggedIn: boolean;
  onLogout: () => void;
  children: ReactNode;
}

export default function MainLayout({
  children,
  isLoggedIn,
  onLogout,
}: MainLayoutProps) {
  return (
    <div className="grid min-h-[100dvh] grid-rows-[auto_1fr_auto] bg-gradient-to-bl from-gray-50 to-gray-100">
      <header>
        <div className="container mx-auto">
          <div className="mt-4 rounded-lg bg-slate-800 p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex gap-1">
                <span className="font-light">Albert Ambaryan</span>
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text font-extrabold text-transparent">
                  Test App
                </span>
              </div>
              {isLoggedIn && (
                <Button
                  className="bg-gradient-to-r from-purple-700 to-pink-400"
                  onClick={onLogout}
                >
                  Logout
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="flex flex-col items-center justify-center">
        {children}
      </main>

      <footer className="bg-slate-800 text-sm text-slate-400">
        <div className="container mx-auto mb-20 flex items-center justify-center gap-2 pt-10">
          <p>© 2025 Konstantin Surikov</p>
          <a
            target="_blank"
            href="https://github.com/surikov-k"
            className="text-pink-400"
            rel="noreferrer"
          >
            <GitHubLogoIcon />
          </a>
        </div>
      </footer>
    </div>
  );
}
