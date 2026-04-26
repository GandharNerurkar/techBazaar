import React, { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoMdHeartEmpty } from "react-icons/io";
import { HiMagnifyingGlass } from "react-icons/hi2";
import ToggleTheme from "../theme/ToggleTheme";
import { useUserContext } from "@/context/userContext";
import { useCartContext } from "@/context/cartContext";
import { useWishlistContext } from "@/context/wishlistContext";
import { useRouter } from "next/router";
import CustomInput from "../custom-input/CustomInput";

const Navbar: React.FC = () => {
  const { user, logout } = useUserContext();
  const { items } = useCartContext();
  const { items: wishItems } = useWishlistContext();
  const [searchedProduct, setSearchedProduct] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();

  async function fetchProductsByName(name: string) {
    try {
      setIsSearching(true);
      const res = await fetch(`http://localhost:3000/api/product/name/${name}`);
      const data = await res.json();
      setSearchedProduct(data);
    } catch (error) {
      console.log(error);
      setSearchedProduct([]);
    } finally {
      setIsSearching(false);
    }
  }

  const handleSearch = useMemo(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    return (searchTerm: string) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fetchProductsByName(searchTerm);
      }, 300);
    };
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value) {
      handleSearch(value);
    } else {
      setIsSearching(false);
      setSearchedProduct([]);
    }
  };

  return (
    <nav className="sticky top-0 z-40 border-b border-white/30 bg-white/70 py-4 backdrop-blur-2xl dark:border-slate-800/70 dark:bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-[28px] px-4 py-4 md:px-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center justify-between gap-4">
              <Link href="/" className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 text-sm font-bold text-white shadow-lg shadow-blue-500/25">
                  TB
                </span>
                <div>
                  <p className="text-lg font-bold tracking-[0.22em] text-slate-900 dark:text-white">
                    TECH_BAZAAR
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-300">
                    Premium gadgets, sharper storefront
                  </p>
                </div>
              </Link>
              <div className="lg:hidden">
                <ToggleTheme />
              </div>
            </div>

            <div className="relative flex-1 lg:max-w-2xl">
              <div className="relative">
                <HiMagnifyingGlass className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <CustomInput
                  type="text"
                  placeholder="Search products, categories, deals..."
                  className="w-full pl-11 pr-4"
                  name="search"
                  onChange={handleChange}
                  wrapperClass="flex-1"
                  id="search"
                />
              </div>

              <AnimatePresence>
                {(isSearching || searchedProduct.length > 0) && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-[calc(100%+0.75rem)] z-20 w-full overflow-hidden rounded-[24px] border border-white/40 bg-white/95 shadow-2xl shadow-slate-900/10 backdrop-blur-2xl dark:border-slate-700/70 dark:bg-slate-900/95"
                  >
                    {isSearching ? (
                      <p className="px-4 py-4 text-sm text-slate-500 dark:text-slate-300">
                        Searching products...
                      </p>
                    ) : (
                      <ul>
                        {searchedProduct.map((product: any) => (
                          <li key={product.id} className="border-b border-slate-200/70 last:border-none dark:border-slate-800">
                            <Link
                              href={`/${product.category?.name || "product"}/${product.name}`}
                              className="block px-4 py-4 text-sm font-medium text-slate-700 hover:bg-blue-50 dark:text-slate-100 dark:hover:bg-slate-800"
                            >
                              {product.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-end gap-3">
              <div className="hidden lg:block">
                <ToggleTheme />
              </div>

              {user ? (
                <>
                  <Link
                    href="/wishlist"
                    className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200/70 bg-white/80 text-slate-700 shadow-sm hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100"
                  >
                    <IoMdHeartEmpty size={22} />
                    {wishItems.length > 0 && (
                      <span className="absolute -right-1 -top-1 rounded-full bg-rose-500 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                        {wishItems.length}
                      </span>
                    )}
                  </Link>
                  <Link
                    href="/cart"
                    className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200/70 bg-white/80 text-slate-700 shadow-sm hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100"
                  >
                    <MdOutlineShoppingCart size={22} />
                    {items.length > 0 && (
                      <span className="absolute -right-1 -top-1 rounded-full bg-rose-500 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                        {items.length}
                      </span>
                    )}
                  </Link>
                  <button
                    onClick={() => logout(() => { router.replace("/login"); })}
                    className="secondary-button"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="secondary-button">
                    Login
                  </Link>
                  <Link href="/signup" className="primary-button">
                    Signup
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
