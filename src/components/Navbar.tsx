"use client";

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Pill, Search, User, LogOut } from "lucide-react";

export default function Navbar() {
    // এখানে ডিফল্টভাবে null রাখা হয়েছে (Public)। আপনি টেস্ট করার জন্য 'CUSTOMER', 'SELLER' বা 'ADMIN' লিখে দেখতে পারেন।
    const [role, setRole] = useState<'ADMIN' | 'SELLER' | 'CUSTOMER' | null>(null);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const navLinks = {
        PUBLIC: [
            { name: 'Home', href: '/' },
            { name: 'Shop', href: '/shop' },
        ],
        CUSTOMER: [
            { name: 'Shop', href: '/shop' },
            { name: 'My Orders', href: '/orders' },
            { name: 'Profile', href: '/profile' },
        ],
        SELLER: [
            { name: 'Dashboard', href: '/seller/dashboard' },
            { name: 'Inventory', href: '/seller/medicines' },
            { name: 'Orders', href: '/seller/orders' },
        ],
        ADMIN: [
            { name: 'Dashboard', href: '/admin' },
            { name: 'Users', href: '/admin/users' },
            { name: 'Categories', href: '/admin/categories' },
        ],
    };

    // বর্তমান রোল অনুযায়ী লিংক সিলেক্ট করা
    const currentLinks = role ? navLinks[role] : navLinks.PUBLIC;

    return (
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-6xl">
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="flex items-center justify-between px-6 py-3 bg-[#0a192f]/60 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
            >
                {/* --- LOGO --- */}
                <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tighter group">
                    <div className="bg-teal-500/20 p-2 rounded-full group-hover:rotate-12 transition-transform">
                        <Pill className="text-teal-400 w-6 h-6" />
                    </div>
                    <span className="text-white">Medi<span className="text-teal-400">Store</span></span>
                </Link>

                {/* --- DYNAMIC NAV LINKS --- */}
                <div className="hidden md:flex items-center gap-6">
                    {currentLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-gray-300 hover:text-teal-400 transition-colors relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-400 transition-all group-hover:w-full" />
                        </Link>
                    ))}
                </div>

                {/* --- ACTIONS --- */}
                <div className="flex items-center gap-4">
                    {/* Search Trigger */}
                    <button
                        onClick={() => setIsSearchOpen(!isSearchOpen)}
                        className="p-2 text-gray-300 hover:text-teal-400 transition-colors"
                    >
                        <Search className="w-5 h-5" />
                    </button>

                    {/* Cart (Only for Customers/Public) */}
                    {(role === 'CUSTOMER' || !role) && (
                        <Link href="/cart" className="relative p-2 text-gray-300 hover:text-teal-400 transition-colors">
                            <ShoppingCart className="w-5 h-5" />
                            <span className="absolute top-1 right-1 bg-teal-500 text-[10px] text-white font-bold w-4 h-4 flex items-center justify-center rounded-full border border-[#0a192f]">
                                0
                            </span>
                        </Link>
                    )}

                    {/* Authentication / Profile */}
                    {role ? (
                        <div className="flex items-center gap-3 border-l border-white/10 pl-4">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-teal-500 to-blue-500 flex items-center justify-center text-xs font-bold border border-white/20">
                                {role[0]}
                            </div>
                            <button
                                onClick={() => setRole(null)} // Logout Simulation
                                className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    ) : (
                        <>
                            <Link href="/login">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="hidden sm:block bg-teal-500 hover:bg-teal-400 text-[#050b18] px-6 py-2 rounded-full text-sm font-bold transition-all shadow-lg shadow-teal-500/20"
                                >
                                    Login
                                </motion.button>
                            </Link>
                            <Link href="/register">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="hidden sm:block bg-teal-500 hover:bg-teal-400 text-[#050b18] px-6 py-2 rounded-full text-sm font-bold transition-all shadow-lg shadow-teal-500/20"
                                >
                                    Register
                                </motion.button>
                            </Link>
                        </>
                    )}
                </div>
            </motion.div>

            {/* --- EXPANDABLE SEARCH BAR --- */}
            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 10 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 w-full px-4"
                    >
                        <div className="bg-[#0a192f]/90 backdrop-blur-2xl border border-white/10 p-4 rounded-3xl shadow-2xl">
                            <input
                                type="text"
                                placeholder="Search medicines, health products..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-teal-500 transition-colors text-white"
                                autoFocus
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}