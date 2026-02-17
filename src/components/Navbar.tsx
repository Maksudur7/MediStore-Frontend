"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Pill, Search, User, LogOut, Menu, X } from "lucide-react";
import { useAuth } from '../lib/auth-context'; 

export default function Navbar() {
    const { user, logout, loading } = useAuth();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        setIsMobileMenuOpen(false);
    };

    const navLinks = {
        PUBLIC: [
            { name: 'Home', href: '/' },
            { name: 'Shop', href: '/shop' },
        ],
        CUSTOMER: [
            { name: 'Home', href: '/' },
            { name: 'Shop', href: '/shop' },
            { name: 'My Orders', href: '/orders' },
            { name: 'Profile', href: '/profile' },
        ],
        SELLER: [
            { name: 'Home', href: '/' },
            { name: 'Dashboard', href: '/seller' },
            { name: 'Inventory', href: '/seller/medicines' },
            { name: 'Orders', href: '/seller/orders' },
        ],
        ADMIN: [
            { name: 'Home', href: '/' },
            { name: 'Dashboard', href: '/admin' },
            { name: 'Users', href: '/admin/users' },
            { name: 'Categories', href: '/admin/categories' },
        ],
    };

    const currentRole = user?.role?.toUpperCase() || 'PUBLIC';
    const displayLinks = navLinks[currentRole as keyof typeof navLinks] || navLinks.PUBLIC;

    return (
        <nav className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-6xl transition-all duration-300 ${scrolled ? 'top-2' : 'top-6'}`}>
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex items-center justify-between px-6 py-3 bg-[#0a192f]/80 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl"
            >
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tighter group">
                    <div className="bg-teal-500/20 p-2 rounded-full group-hover:rotate-12 transition-transform">
                        <Pill className="text-teal-400 w-6 h-6" />
                    </div>
                    <span className="text-white uppercase tracking-widest text-lg font-black hidden sm:inline">
                        Medi<span className="text-teal-400">Store</span>
                    </span>
                </Link>

                {/* Desktop Menu - Role Based */}
                <div className="hidden md:flex items-center gap-6">
                    {!loading && displayLinks.map((link) => (
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

                <div className="flex items-center gap-2">
                    <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="p-2 text-gray-300 hover:text-teal-400 transition-colors">
                        <Search className="w-5 h-5" />
                    </button>

                    {(currentRole === 'CUSTOMER' || currentRole === 'PUBLIC') && (
                        <Link href="/cart" className="relative p-2 text-gray-300 hover:text-teal-400 transition-colors">
                            <ShoppingCart className="w-5 h-5" />
                            <span className="absolute top-1 right-1 bg-teal-500 text-[10px] text-[#0a192f] font-black w-4 h-4 flex items-center justify-center rounded-full border border-[#0a192f]">
                                0
                            </span>
                        </Link>
                    )}

                    <div className="flex items-center">
                        {loading ? (
                            <div className="w-8 h-8 rounded-full border-2 border-teal-500 border-t-transparent animate-spin ml-2"></div>
                        ) : user ? (
                            <div className="flex items-center gap-3 border-l border-white/10 ml-2 pl-4">
                                <div className="hidden lg:flex flex-col items-end">
                                    <span className="text-[9px] text-teal-400 font-black uppercase tracking-tighter leading-none">{user.role}</span>
                                    <span className="text-xs text-white font-medium">{user.name?.split(' ')[0]}</span>
                                </div>
                                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-teal-500 to-blue-600 flex items-center justify-center text-[#0a192f] font-black shadow-lg shadow-teal-500/20">
                                    {user.name?.[0].toUpperCase()}
                                </div>
                                <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-red-400 transition-colors">
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <div className="hidden md:flex items-center gap-2 ml-4">
                                <Link href="/login" className="text-white text-sm font-bold px-3 hover:text-teal-400">Login</Link>
                                <Link href="/register" className="bg-teal-500 hover:bg-teal-400 text-[#0a192f] px-5 py-2 rounded-full text-sm font-bold transition-all transform active:scale-95">
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                    <button 
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 text-gray-300 hover:text-teal-400 transition-colors"
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </motion.div>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 10, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        className="md:hidden mt-2 bg-[#0a192f]/95 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl mx-auto w-full"
                    >
                        <div className="flex flex-col p-6 gap-4">
                            {displayLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-lg font-medium text-gray-300 hover:text-teal-400 p-2 rounded-xl hover:bg-white/5 transition-all"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <hr className="border-white/10" />
                            {!user && (
                                <div className="flex flex-col gap-3 pt-2">
                                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-white text-center py-3 rounded-xl border border-white/10">Login</Link>
                                    <Link href="/register" onClick={() => setIsMobileMenuOpen(false)} className="bg-teal-500 text-[#0a192f] text-center py-3 rounded-xl font-black">Register</Link>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 10 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 w-full px-4 mt-2"
                    >
                        <div className="bg-[#0a192f]/90 backdrop-blur-2xl border border-white/10 p-2 rounded-full shadow-2xl flex items-center px-6">
                            <Search className="text-teal-400 w-5 h-5 mr-3" />
                            <input
                                type="text"
                                placeholder="Search medicines by name or category..."
                                className="w-full bg-transparent py-3 outline-none text-white text-sm"
                                autoFocus
                            />
                            <button onClick={() => setIsSearchOpen(false)} className="text-gray-500 hover:text-white">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}