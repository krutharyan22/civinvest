import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Landmark,
  TrendingUp,
  Download,
  CheckCircle,
  Wallet,
  Search,
  ArrowRight
} from 'lucide-react';

import jsPDF from 'jspdf';

const generateBondPDF = (userData) => {
  const doc = new jsPDF();
  doc.setFontSize(22);
  doc.text("OFFICIAL TOKENIZED INFRASTRUCTURE BOND", 20, 20);
  doc.setFontSize(12);
  doc.text(`Project: ${userData.projectName}`, 20, 40);
  doc.text(`Investor: ${userData.name}`, 20, 50);
  doc.text(`Amount: INR ${userData.amount}`, 20, 60);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 70);
  doc.text(`Transaction Hash: ${userData.txHash || 'STAMPED_ON_CHAIN_0x712'}`, 20, 80);
  doc.save(`${userData.projectName}_Bond.pdf`);
};

// --- REAL WORLD PROJECT DATA ---
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

export default function App() {
  const [step, setStep] = useState('market'); // market -> kyc -> payment -> success
  const [selectedProject, setSelectedProject] = useState(null);
  const [user, setUser] = useState({ name: '', aadhar: '', pan: '', amount: '' });

  const handleInvest = (proj) => {
    setSelectedProject(proj);
    setStep('kyc');
  };

  const completePayment = () => {
    setStep('success');
    generateBondPDF({
      ...user,
      projectName: selectedProject.name,
      txHash: "0x" + Math.random().toString(16).slice(2, 12).toUpperCase()
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white font-sans selection:bg-blue-500 pb-20">

      {/* --- NAVBAR --- */}
      <nav className="p-6 border-b border-white/10 flex justify-between items-center backdrop-blur-md sticky top-0 z-50 bg-[#0a0a0b]/80">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
            <Landmark className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-black tracking-tighter uppercase">Dochi <span className="text-blue-500">Bonds</span></span>
        </div>
        <div className="flex gap-4 items-center">
          <div className="hidden md:flex px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold items-center gap-2 uppercase tracking-widest">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            Live Market
          </div>
          <Wallet className="w-6 h-6 text-gray-400 cursor-pointer" />
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pt-12">
        <AnimatePresence mode="wait">

          {/* --- STEP 1: MARKETPLACE --- */}
          {step === 'market' && (
            <motion.div key="market" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="mb-12">
                <h1 className="text-5xl font-black tracking-tight mb-4 tracking-tighter">Invest in Infrastructure.</h1>
                <p className="text-gray-400 text-lg max-w-2xl font-medium">Tokenized government assets for the modern retail investor.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((proj) => (
                  <div key={proj.id} className="bg-[#161618] border border-white/5 rounded-[32px] overflow-hidden hover:border-blue-500/40 transition-all group shadow-2xl">
                    <div className="relative h-48 overflow-hidden">
                      <img src={proj.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80" alt={proj.name} />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-blue-400 text-[10px] font-black rounded-full border border-white/10 uppercase tracking-widest">
                          {proj.tag}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold leading-tight">{proj.name}</h3>
                        <span className="text-green-400 font-black">{proj.roi}</span>
                      </div>
                      <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-4">{proj.authority}</p>

                      <div className="grid grid-cols-2 gap-3 mb-6">
                        <div className="bg-black/40 p-3 rounded-2xl border border-white/5 text-center">
                          <p className="text-[9px] text-gray-500 uppercase font-black">Min Entry</p>
                          <p className="font-bold text-sm text-white">₹{proj.minInvest}</p>
                        </div>
                        <div className="bg-black/40 p-3 rounded-2xl border border-white/5 text-center">
                          <p className="text-[9px] text-gray-500 uppercase font-black">Impact</p>
                          <p className="text-blue-400 font-bold text-[9px] leading-tight line-clamp-1">{proj.impact}</p>
                        </div>
                      </div>

                      <button onClick={() => handleInvest(proj)} className="w-full bg-blue-600 py-4 rounded-2xl font-bold text-white hover:bg-blue-500 transition-all flex items-center justify-center gap-2 group/btn shadow-lg shadow-blue-600/10">
                        Invest Now <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* --- STEP 2: KYC --- */}
          {step === 'kyc' && (
            <motion.div key="kyc" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md mx-auto">
              <div className="bg-[#161618] p-10 rounded-[40px] border border-white/10 shadow-2xl relative">
                <h2 className="text-3xl font-black mb-8 italic">KYC Details</h2>
                <div className="space-y-4">
                  <input placeholder="Full Name" className="w-full bg-black/40 border border-white/10 p-5 rounded-2xl focus:border-blue-500 outline-none transition-all" onChange={e => setUser({ ...user, name: e.target.value })} />
                  <input placeholder="Aadhar Number" className="w-full bg-black/40 border border-white/10 p-5 rounded-2xl" onChange={e => setUser({ ...user, aadhar: e.target.value })} />
                  <input placeholder="PAN Card" className="w-full bg-black/40 border border-white/10 p-5 rounded-2xl uppercase" onChange={e => setUser({ ...user, pan: e.target.value })} />
                  <input placeholder="Investment Amount (₹)" type="number" className="w-full bg-black/40 border border-white/10 p-5 rounded-2xl font-bold text-blue-400" onChange={e => setUser({ ...user, amount: e.target.value })} />
                  <button onClick={() => setStep('payment')} className="w-full bg-white text-black py-5 rounded-2xl font-black text-lg mt-4 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all">
                    Next: Payment
                  </button>
                  <button onClick={() => setStep('market')} className="w-full text-gray-500 text-sm font-bold mt-2">Back</button>
                </div>
              </div>
            </motion.div>
          )}

          {/* --- STEP 3: PAYMENT --- */}
          {step === 'payment' && (
            <motion.div key="payment" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="max-w-sm mx-auto text-center mt-20">
              <div className="bg-white text-black p-10 rounded-[50px] shadow-2xl">
                <p className="text-gray-400 text-xs uppercase font-bold mb-1">Total to Pay</p>
                <h2 className="text-5xl font-black mb-10 tracking-tighter text-black">₹{user.amount}</h2>
                <button onClick={completePayment} className="w-full bg-[#6739b7] text-white py-5 rounded-3xl font-black text-lg hover:scale-105 transition-transform">
                  Verify & Pay UPI
                </button>
              </div>
            </motion.div>
          )}

          {/* --- STEP 4: SUCCESS --- */}
          {step === 'success' && (
            <motion.div key="success" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-20">
              <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-10">
                <CheckCircle className="text-green-500 w-12 h-12" />
              </div>
              <h1 className="text-6xl font-black mb-4 tracking-tighter">Success!</h1>
              <p className="text-gray-400 text-xl mb-12">Your tokens have been minted on-chain.</p>
              <button
                onClick={() => generateBondPDF({ ...user, projectName: selectedProject.name })}
                className="px-10 py-5 bg-blue-600 rounded-2xl font-black text-lg flex items-center gap-3 mx-auto shadow-2xl shadow-blue-600/40 hover:scale-105 transition-transform"
              >
                <Download className="w-6 h-6" /> Download Bond PDF
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}