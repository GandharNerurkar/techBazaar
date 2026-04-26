import React from "react";
import Link from "next/link";
import { IoLocationOutline, IoCallOutline } from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";
import { FaFacebookF, FaMediumM, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="mt-10 px-4 pb-6 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="glass-card overflow-hidden rounded-[32px] px-6 py-10 md:px-10">
          <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
            <div>
              <p className="pill-badge mb-4">Tech Bazaar</p>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
                Storefront design that feels premium from first click to checkout.
              </h2>
              <div className="mt-6 space-y-4 text-sm text-slate-600 dark:text-slate-300">
                <div className="flex items-start gap-3">
                  <IoLocationOutline size={20} className="mt-0.5 text-blue-500" />
                  <p>1234 Street, Whitefield, Bangalore, India</p>
                </div>
                <div className="flex items-start gap-3">
                  <IoCallOutline size={20} className="mt-0.5 text-blue-500" />
                  <p>+91 97664 76456</p>
                </div>
                <div className="flex items-start gap-3">
                  <AiOutlineMail size={20} className="mt-0.5 text-blue-500" />
                  <p>hello@techbazaar.store</p>
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                {[FaFacebookF, FaMediumM, FaXTwitter, FaLinkedinIn].map((Icon, index) => (
                  <div key={index} className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200/70 bg-white/80 text-slate-700 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100">
                    <Icon size={15} />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-300">
                Navigate
              </h3>
              <div className="mt-5 space-y-3 text-sm text-slate-700 dark:text-slate-100">
                <Link href="/">Home</Link>
                <p>Collections</p>
                <p>Best Sellers</p>
                <p>Offers</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-300">
                Services
              </h3>
              <div className="mt-5 space-y-3 text-sm text-slate-700 dark:text-slate-100">
                <p>Product Discovery</p>
                <p>Fast Checkout</p>
                <p>Wishlist Sync</p>
                <p>Admin Management</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-300">
                Policies
              </h3>
              <div className="mt-5 space-y-3 text-sm text-slate-700 dark:text-slate-100">
                <p>Privacy Policy</p>
                <p>Terms of Service</p>
                <p>Shipping Rules</p>
                <p>Support</p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-slate-200/70 pt-6 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-300 md:flex-row md:items-center md:justify-between">
            <p>© 2026 TECH_BAZAAR. All rights reserved.</p>
            <p>Built for a cleaner, more modern shopping experience.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
