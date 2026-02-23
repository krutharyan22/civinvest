import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CostChart from '../components/CostChart';
import { Helmet } from 'react-helmet-async';

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

export default function Marketplace() {
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    const handleInvest = (id) => {
        if (!currentUser) {
            navigate('/login');
        } else {
            navigate(`/invest/${id}`);
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            <Helmet>
                <title>Marketplace | Dochi Bonds</title>
                <meta name="description" content="Invest in tokenized government infrastructure projects." />
            </Helmet>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
                <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-4 tracking-tighter leading-tight">
                    Invest in the <span className="text-blue-500">Future</span> of India.
                </h1>
                <p className="text-gray-400 text-lg max-w-2xl font-medium mb-8">Tokenized government assets for the modern retail investor. Secure, transparent, and high-yield infrastructure bonds.</p>

                {/* Graph Section */}
                <div className="mb-12">
                    <CostChart />
                </div>
            </motion.div>

            {/* --- TRUST & SECURITY SECTION --- */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mb-20 p-10 bg-blue-600/5 border border-blue-500/10 rounded-[40px] flex flex-col md:flex-row items-center gap-10"
            >
                <div className="flex-1">
                    <h2 className="text-3xl font-black mb-4">On-Chain Trust.</h2>
                    <p className="text-gray-400 leading-relaxed mb-6">
                        Every bond on Dochi is backed by real-world government infrastructure and verified on the blockchain. Our smart contracts ensure that interest payouts are automated and transparent.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">Govt. Verified</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500" />
                            <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">256-bit Encrypted</span>
                        </div>
                    </div>
                </div>
                <div className="flex-1 bg-black/40 p-6 rounded-3xl border border-white/5 font-mono text-[10px] text-blue-400 overflow-hidden">
                    <div className="animate-pulse">
                        {`{`}
                        <br />
                        &nbsp;&nbsp;address: "0x71C765...d897",
                        <br />
                        &nbsp;&nbsp;verified: true,
                        <br />
                        &nbsp;&nbsp;asset_type: "Infrastructure_Bond",
                        <br />
                        &nbsp;&nbsp;yield: "12.4%",
                        <br />
                        &nbsp;&nbsp;backing: "National highway Authority"
                        <br />
                        {`}`}
                    </div>
                </div>
            </motion.div>

            {/* --- HOW IT WORKS / ABOUT SECTION --- */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-6"
            >
                <div className="bg-[#161618] border border-white/5 p-8 rounded-[32px] hover:border-blue-500/20 transition-all">
                    <h3 className="text-xl font-bold mb-2 text-white">1. Choose Asset</h3>
                    <p className="text-gray-400 text-sm">Browse verified government infrastructure projects like highways, solar grids, and urban development.</p>
                </div>
                <div className="bg-[#161618] border border-white/5 p-8 rounded-[32px] hover:border-blue-500/20 transition-all">
                    <h3 className="text-xl font-bold mb-2 text-white">2. Fractions Invest</h3>
                    <p className="text-gray-400 text-sm">Buy fractionalized bonds starting from ₹1,000. Access high-yield assets previously reserved for institutions.</p>
                </div>
                <div className="bg-[#161618] border border-white/5 p-8 rounded-[32px] hover:border-blue-500/20 transition-all">
                    <h3 className="text-xl font-bold mb-2 text-white">3. Earn Returns</h3>
                    <p className="text-gray-400 text-sm">Receive regular interest payouts directly to your account. Track asset performance and value in real-time.</p>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                {projects.map((proj) => (
                    <div key={proj.id} className="bg-[#161618] border border-white/5 rounded-[32px] overflow-hidden hover:border-blue-500/40 transition-all group shadow-2xl flex flex-col">
                        <div className="relative h-48 overflow-hidden">
                            <img src={proj.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80" alt={proj.name} />
                            <div className="absolute top-4 left-4">
                                <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-blue-400 text-[10px] font-black rounded-full border border-white/10 uppercase tracking-widest">
                                    {proj.tag}
                                </span>
                            </div>
                        </div>

                        <div className="p-6 flex flex-col flex-grow">
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

                            <div className="mt-auto">
                                <button onClick={() => handleInvest(proj.id)} className="w-full bg-blue-600 py-4 rounded-2xl font-bold text-white hover:bg-blue-500 transition-all flex items-center justify-center gap-2 group/btn shadow-lg shadow-blue-600/10">
                                    Invest Now <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- FAQ SECTION --- */}
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-black mb-10 text-center">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    {[
                        { q: "What is a tokenized bond?", a: "A tokenized bond is a digital representation of a traditional bond on the blockchain, allowing for fractional ownership and easier trading." },
                        { q: "How are my investments secured?", a: "Your investments are secured by real infrastructure assets and legally binding contracts with government authorities." },
                        { q: "When do I get my interest?", a: "Interest is typically paid out quarterly or annually, depending on the specific project, directly into your Dochi wallet." }
                    ].map((faq, i) => (
                        <div key={i} className="bg-[#161618] border border-white/5 p-6 rounded-2xl">
                            <h4 className="font-bold mb-2 text-white">{faq.q}</h4>
                            <p className="text-gray-400 text-sm">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
