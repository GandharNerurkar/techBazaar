import React from "react";
import Link from "next/link";
import ToggleTheme from "../theme/ToggleTheme";

const OnboardNavbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-40 border-b border-white/30 bg-white/70 py-4 backdrop-blur-2xl dark:border-slate-800/70 dark:bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card flex items-center justify-between rounded-[28px] px-4 py-4 md:px-6">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 text-sm font-bold text-white">
              TB
            </span>
            <div>
              <p className="text-lg font-bold tracking-[0.22em] text-slate-900 dark:text-white">
                TECH_BAZAAR
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-300">
                Secure access
              </p>
            </div>
          </Link>
          <ToggleTheme />
        </div>
      </div>
    </nav>
  );
};

export default OnboardNavbar;
