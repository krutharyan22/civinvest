import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserPlus, ArrowRight, Loader2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        if (password !== confirmPassword) {
            return setError("Passwords do not match");
        }

        try {
            setError('');
            setLoading(true);
            await signup(email, password);
            navigate('/');
        } catch (err) {
            console.error(err);
            setError('Failed to create an account: ' + err.message);
        }

        setLoading(false);
    }

    return (
        <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center p-6 relative overflow-hidden">
            <Helmet>
                <title>Sign Up | Dochi Bonds</title>
                <meta name="description" content="Create a new Dochi Bonds account." />
            </Helmet>
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-green-600/20 rounded-full blur-[100px]" />
                <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md bg-[#161618] border border-white/10 p-8 rounded-[32px] shadow-2xl relative z-10"
            >
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-blue-600/20 text-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-12">
                        <UserPlus className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-black text-white tracking-tight mb-2">Create Account</h2>
                    <p className="text-gray-400">Start your infrastructure investment journey.</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl mb-6 text-sm font-bold text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
                        <input
                            type="email"
                            required
                            className="w-full bg-black/40 border border-white/10 p-4 rounded-xl focus:border-blue-500 focus:bg-blue-500/5 outline-none text-white transition-all"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full bg-black/40 border border-white/10 p-4 rounded-xl focus:border-blue-500 focus:bg-blue-500/5 outline-none text-white transition-all"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Confirm Password</label>
                        <input
                            type="password"
                            required
                            className="w-full bg-black/40 border border-white/10 p-4 rounded-xl focus:border-blue-500 focus:bg-blue-500/5 outline-none text-white transition-all"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 py-4 rounded-xl font-bold text-white hover:shadow-lg hover:shadow-blue-600/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <>Sign Up <ArrowRight className="w-5 h-5" /></>}
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-gray-500">
                    Already have an account? <Link to="/login" className="text-blue-500 font-bold hover:underline">Log In</Link>
                </div>
            </motion.div>
        </div>
    );
}
