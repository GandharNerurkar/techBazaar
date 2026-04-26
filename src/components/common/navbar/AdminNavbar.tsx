import React from "react";
import Link from "next/link";
import ToggleTheme from "../theme/ToggleTheme";
import { useUserContext } from "@/context/userContext";
import { useRouter } from "next/router";

const AdminNavbar: React.FC = () => {
  const router = useRouter();
  const { user, logout } = useUserContext();

  return (
    <nav className="sticky top-0 z-40 border-b border-white/30 bg-white/70 py-4 backdrop-blur-2xl dark:border-slate-800/70 dark:bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-[28px] px-4 py-4 md:px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 to-blue-600 text-sm font-bold text-white">
                AD
              </span>
              <div>
                <Link href="/admin" className="text-lg font-bold tracking-[0.22em] text-slate-900 dark:text-white">
                  TECH_BAZAAR
                </Link>
                <p className="text-xs text-slate-500 dark:text-slate-300">
                  Admin control center
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link href="/admin" className="secondary-button">
                Dashboard
              </Link>
              <Link href="/admin/add-product" className="primary-button">
                Add Product
              </Link>
              <ToggleTheme />
              {user != null && (
                <button
                  onClick={() => logout(() => { router.replace("/login"); })}
                  className="secondary-button"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
