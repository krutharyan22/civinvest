import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Landmark, Wallet, LogOut, User, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    async function handleLogout() {
        try {
            await logout();
            navigate('/login');
        } catch {
            console.error("Failed to log out");
        }
    }

    return (
        <nav className="p-6 border-b border-white/10 flex justify-between items-center backdrop-blur-md sticky top-0 z-50 bg-[#0a0a0b]/80">
            <Link to="/" className="flex items-center gap-2 group">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20 group-hover:scale-110 transition-transform duration-300">
                    <Landmark className="text-white w-6 h-6" />
                </div>
                <span className="text-2xl font-black tracking-tighter uppercase text-white">Dochi <span className="text-blue-500">Bonds</span></span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-4 items-center">
                <div className="px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold flex items-center gap-2 uppercase tracking-widest">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    Live Market
                </div>

                {currentUser ? (
                    <>
                        <span className="text-gray-400 text-sm mr-2 font-medium">Hello, {currentUser.email}</span>
                        <Link to="/dashboard" className="hidden md:flex items-center gap-2 bg-blue-600/10 hover:bg-blue-600/20 border border-blue-600/20 px-4 py-2 rounded-xl text-sm font-bold text-blue-400 transition-all">
                            <Wallet className="w-4 h-4" /> Dashboard
                        </Link>
                        <button onClick={handleLogout} className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-xl text-sm font-bold transition-all text-white">
                            <LogOut className="w-4 h-4" /> Logout
                        </button>
                    </>
                ) : (
                    <div className="flex gap-2">
                        <Link to="/login" className="px-5 py-2.5 rounded-xl text-sm font-bold text-gray-300 hover:text-white hover:bg-white/5 transition-all">
                            Log In
                        </Link>
                        <Link to="/signup" className="px-5 py-2.5 rounded-xl bg-white text-black text-sm font-bold hover:bg-gray-200 transition-all shadow-lg hover:shadow-white/10">
                            Sign Up
                        </Link>
                    </div>
                )}
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white p-2">
                {isMenuOpen ? <X /> : <Menu />}
            </button>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 w-full bg-[#161618] border-b border-white/10 p-6 flex flex-col gap-4 md:hidden shadow-2xl"
                    >
                        {currentUser ? (
                            <>
                                <div className="text-gray-400 text-sm font-bold text-center mb-2">{currentUser.email}</div>
                                <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="w-full py-4 bg-blue-600/10 text-blue-400 border border-blue-600/20 rounded-xl font-bold flex items-center justify-center gap-2">
                                    <Wallet className="w-4 h-4" /> My Dashboard
                                </Link>
                                <button onClick={handleLogout} className="w-full py-4 bg-white/5 rounded-xl font-bold flex items-center justify-center gap-2 text-white">
                                    <LogOut className="w-4 h-4" /> Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="w-full py-4 bg-white/5 text-center rounded-xl font-bold text-white">Log In</Link>
                                <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="w-full py-4 bg-blue-600 text-center rounded-xl font-bold text-white">Sign Up</Link>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
