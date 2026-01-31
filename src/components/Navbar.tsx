"use client";

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Pill, Search, User, LogOut } from "lucide-react";
import { useAuth } from '../lib/auth-context'; 

export default function Navbar() {
    const { user, logout, loading } = useAuth();
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const handleLogout = () => {
        logout();
    };
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
            { name: 'Dashboard', href: '/seller' },
            { name: 'Inventory', href: '/seller/medicines' },
            { name: 'Orders', href: '/seller/orders' },
        ],
        ADMIN: [
            { name: 'Dashboard', href: '/admin' },
            { name: 'Users', href: '/admin/users' },
            { name: 'Categories', href: '/admin/categories' },
        ],
    };

 
    const currentRole = user?.role?.toUpperCase() || 'PUBLIC';
    const currentLinks = navLinks[currentRole as keyof typeof navLinks] || navLinks.PUBLIC;

    return (
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-6xl">
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex items-center justify-between px-6 py-3 bg-[#0a192f]/60 backdrop-blur-xl border border-white/10 rounded-full shadow-lg"
            >
                <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tighter group">
                    <div className="bg-teal-500/20 p-2 rounded-full group-hover:rotate-12 transition-transform">
                        <Pill className="text-teal-400 w-6 h-6" />
                    </div>
                    <span className="text-white uppercase tracking-widest text-lg font-black">
                        Medi<span className="text-teal-400">Store</span>
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-6">
                    {!loading && currentLinks.map((link) => (
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

                <div className="flex items-center gap-4">
                    <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="p-2 text-gray-300 hover:text-teal-400">
                        <Search className="w-5 h-5" />
                    </button>

                    {(currentRole === 'CUSTOMER' || currentRole === 'PUBLIC') && (
                        <Link href="/cart" className="relative p-2 text-gray-300 hover:text-teal-400">
                            <ShoppingCart className="w-5 h-5" />
                            <span className="absolute -top-1 -right-1 bg-teal-500 text-[10px] text-white font-bold w-4 h-4 flex items-center justify-center rounded-full border border-[#0a192f]">
                                0
                            </span>
                        </Link>
                    )}
                    {loading ? (
                        <div className="w-8 h-8 rounded-full border-2 border-teal-500 border-t-transparent animate-spin"></div>
                    ) : user ? (
                        <div className="flex items-center gap-3 border-l border-white/10 pl-4">
                            <div className="flex flex-col items-end hidden sm:flex">
                                <span className="text-[10px] text-teal-400 font-bold uppercase">{user.role}</span>
                                <span className="text-xs text-white font-medium">{user.name?.split(' ')[0]}</span>
                            </div>
                            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-teal-500 to-blue-500 flex items-center justify-center text-[#050b18] font-bold">
                                {user.name?.[0].toUpperCase()}
                            </div>
                            <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-red-400">
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link href="/login" className="text-white text-sm font-bold px-4 hover:text-teal-400">Login</Link>
                            <Link href="/register" className="bg-teal-500 hover:bg-teal-400 text-[#050b18] px-5 py-2 rounded-full text-sm font-bold shadow-lg shadow-teal-500/20">
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </motion.div>

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
                                placeholder="Search medicines..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-teal-400 text-white"
                                autoFocus
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}