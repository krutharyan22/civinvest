import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Download, ArrowLeft, Loader2 } from 'lucide-react';
import jsPDF from 'jspdf';
import { Helmet } from 'react-helmet-async';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

// Mock data (in a real app, fetch from DB)
const projects = [
    {
        id: 1,
        name: "Delhi-Mumbai Smart Expressway",
        authority: "NHAI",
        roi: "12.4% Fixed",
        minInvest: "5,000",
        impact: "857M kg CO2 Reduction",
        tag: "Green Transport",
        img: "https://images.unsplash.com/photo-1545143333-636a661f184e?auto=format&fit=crop&q=80&w=800",
        details: "8-lane motorway with integrated solar lighting and EV charging stations. AI-powered incident detection."
    },
    {
        id: 2,
        name: "North Delhi Solar Microgrid",
        authority: "Tata Power-DDL",
        roi: "14.2% Variable",
        minInvest: "2,500",
        impact: "2MW Clean Energy",
        tag: "Renewable Energy",
        img: "https://images.unsplash.com/photo-1509391366360-fe5bb584852a?auto=format&fit=crop&q=80&w=800",
        details: "Blockchain-enabled peer-to-peer solar trading for 150+ residential meters using smart grid technology."
    },
    {
        id: 3,
        name: "Indore Municipal Green Bond",
        authority: "Indore Municipal Corp",
        roi: "8.25% Tax-Free",
        minInvest: "1,000",
        impact: "Zero-Waste Urban Initative",
        tag: "Smart City",
        img: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=800",
        details: "Funding for 60MW captive solar plant. India's first municipal green bond for retail investors."
    }
];

const generateBondPDF = (userData, project) => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text("OFFICIAL TOKENIZED INFRASTRUCTURE BOND", 20, 20);
    doc.setFontSize(12);
    doc.text(`Project: ${project.name}`, 20, 40);
    doc.text(`Investor: ${userData.name}`, 20, 50);
    doc.text(`Amount: INR ${userData.amount}`, 20, 60);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 70);
    doc.text(`Transaction Hash: ${userData.txHash || 'STAMPED_ON_CHAIN_0x712'}`, 20, 80);
    doc.save(`${project.name}_Bond.pdf`);
};

export default function InvestFlow() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [step, setStep] = useState('kyc'); // kyc -> payment -> success
    const [project, setProject] = useState(null);
    const [user, setUser] = useState({ name: '', aadhar: '', pan: '', amount: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const foundProject = projects.find(p => p.id === parseInt(id));
        if (foundProject) {
            setProject(foundProject);
            // Pre-fill min invest
            setUser(prev => ({ ...prev, amount: foundProject.minInvest.replace(/,/g, '') }));
        } else {
            navigate('/'); // Redirect if invalid ID
        }
    }, [id, navigate]);

    if (!project) return null;

    const completePayment = async () => {
        setLoading(true);
        try {
            const txHash = "0x" + Math.random().toString(16).slice(2, 12).toUpperCase();

            // Save to Firestore
            await addDoc(collection(db, "investments"), {
                userId: currentUser.uid,
                userEmail: currentUser.email,
                projectId: project.id,
                projectName: project.name,
                amount: user.amount,
                aadhar: user.aadhar,
                pan: user.pan,
                name: user.name,
                txHash: txHash,
                timestamp: serverTimestamp()
            });

            // Update local state for PDF generation
            setUser(prev => ({ ...prev, txHash }));
            setStep('success');
        } catch (e) {
            console.error("Error saving investment: ", e);
            alert("Transaction failed to record. Please ensure you are logged in and checks your internet connection.");
        }
        setLoading(false);
    };

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <Helmet>
                <title>Invest in {project.name} | Dochi Bonds</title>
            </Helmet>

            <div className="mb-8">
                <Link to="/" className="text-gray-400 hover:text-white flex items-center gap-2 text-sm font-bold mb-4">
                    <ArrowLeft className="w-4 h-4" /> Back to Market
                </Link>
                <h1 className="text-3xl font-black text-white">{project.name}</h1>
                <p className="text-gray-400">Minting tokenized bonds on Dochi Chain.</p>
            </div>

            <AnimatePresence mode="wait">

                {/* --- STEP 1: KYC --- */}
                {step === 'kyc' && (
                    <motion.div key="kyc" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
                        <div className="bg-[#161618] p-10 rounded-[40px] border border-white/10 shadow-2xl relative max-w-xl mx-auto">
                            <h2 className="text-2xl font-black mb-8 italic text-blue-400">1. Verified KYC Details</h2>
                            <div className="space-y-4">
                                <input placeholder="Full Name (as on Aadhar)" className="w-full bg-black/40 border border-white/10 p-5 rounded-2xl focus:border-blue-500 outline-none text-white transition-all" onChange={e => setUser({ ...user, name: e.target.value })} />
                                <input placeholder="Aadhar Number" className="w-full bg-black/40 border border-white/10 p-5 rounded-2xl text-white outline-none" onChange={e => setUser({ ...user, aadhar: e.target.value })} />
                                <input placeholder="PAN Card" className="w-full bg-black/40 border border-white/10 p-5 rounded-2xl uppercase text-white outline-none" onChange={e => setUser({ ...user, pan: e.target.value })} />

                                <div className="relative">
                                    <span className="absolute left-5 top-5 text-gray-500 font-bold">₹</span>
                                    <input
                                        placeholder="Investment Amount"
                                        type="number"
                                        value={user.amount}
                                        className="w-full bg-black/40 border border-white/10 p-5 pl-10 rounded-2xl font-bold text-blue-400 outline-none focus:border-blue-500 transition-all"
                                        onChange={e => setUser({ ...user, amount: e.target.value })}
                                    />
                                </div>

                                <button onClick={() => setStep('payment')} className="w-full bg-white text-black py-5 rounded-2xl font-black text-lg mt-4 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all">
                                    Proceed to Payment
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* --- STEP 2: PAYMENT --- */}
                {step === 'payment' && (
                    <motion.div key="payment" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="max-w-sm mx-auto text-center mt-12">
                        <div className="bg-white text-black p-10 rounded-[50px] shadow-2xl">
                            <p className="text-gray-400 text-xs uppercase font-bold mb-1">Total Limit Order</p>
                            <h2 className="text-5xl font-black mb-10 tracking-tighter text-black">₹{user.amount}</h2>
                            <button
                                onClick={completePayment}
                                disabled={loading}
                                className="w-full bg-[#6739b7] text-white py-5 rounded-3xl font-black text-lg hover:scale-105 transition-transform shadow-xl shadow-purple-500/30 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? <Loader2 className="animate-spin" /> : "Verify & Pay UPI"}
                            </button>
                            <button onClick={() => setStep('kyc')} className="w-full text-gray-400 text-sm font-bold mt-4">Edit Amount</button>
                        </div>
                    </motion.div>
                )}

                {/* --- STEP 3: SUCCESS --- */}
                {step === 'success' && (
                    <motion.div key="success" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-20">
                        <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-10">
                            <CheckCircle className="text-green-500 w-12 h-12" />
                        </div>
                        <h1 className="text-6xl font-black mb-4 tracking-tighter text-white">Success!</h1>
                        <p className="text-gray-400 text-xl mb-12">Your tokens have been minted on-chain.</p>
                        <button
                            onClick={() => generateBondPDF(user, project)}
                            className="px-10 py-5 bg-blue-600 rounded-2xl font-black text-lg flex items-center gap-3 mx-auto shadow-2xl shadow-blue-600/40 hover:scale-105 transition-transform text-white"
                        >
                            <Download className="w-6 h-6" /> Download Bond PDF
                        </button>
                        <div className="mt-8">
                            <Link to="/" className="text-gray-500 hover:text-white font-bold">Return to Marketplace</Link>
                        </div>
                    </motion.div>
                )}

            </AnimatePresence>
        </div>
    );
}
