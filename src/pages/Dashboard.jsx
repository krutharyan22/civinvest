import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Download, TrendingUp, Calendar, Hash } from 'lucide-react';
import jsPDF from 'jspdf';

export default function Dashboard() {
    const { currentUser } = useAuth();
    const [investments, setInvestments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchInvestments() {
            if (!currentUser) return;

            try {
                const q = query(
                    collection(db, "investments"),
                    where("userId", "==", currentUser.uid),
                    orderBy("timestamp", "desc")
                );

                const querySnapshot = await getDocs(q);
                const data = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setInvestments(data);
            } catch (error) {
                console.error("Error fetching investments:", error);
            }
            setLoading(false);
        }

        fetchInvestments();
    }, [currentUser]);

    const generatePDF = (inv) => {
        const doc = new jsPDF();
        doc.setFontSize(22);
        doc.text("OFFICIAL TOKENIZED INFRASTRUCTURE BOND", 20, 20);
        doc.setFontSize(12);
        doc.text(`Project: ${inv.projectName}`, 20, 40);
        doc.text(`Investor: ${inv.name}`, 20, 50);
        doc.text(`Amount: INR ${inv.amount}`, 20, 60);
        doc.text(`Date: ${inv.timestamp?.toDate().toLocaleDateString() || new Date().toLocaleDateString()}`, 20, 70);
        doc.text(`Transaction Hash: ${inv.txHash}`, 20, 80);
        doc.save(`${inv.projectName}_Bond.pdf`);
    };

    if (loading) {
        return <div className="text-white text-center py-20">Loading portfolio...</div>;
    }

    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            <Helmet>
                <title>Dashboard | Dochi Bonds</title>
            </Helmet>

            <div className="mb-12">
                <h1 className="text-4xl font-black text-white mb-2">My Portfolio</h1>
                <p className="text-gray-400">Track your verified on-chain bond holdings.</p>
            </div>

            {investments.length === 0 ? (
                <div className="text-center py-20 bg-[#161618] rounded-[32px] border border-white/5">
                    <TrendingUp className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">No Investments Yet</h3>
                    <p className="text-gray-400">Start investing in infrastructure projects to see them here.</p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {investments.map((inv) => (
                        <motion.div
                            key={inv.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-[#161618] border border-white/5 p-6 rounded-[24px] hover:border-blue-500/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
                        >
                            <div className="flex-1">
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="text-xl font-bold text-white">{inv.projectName}</h3>
                                    <span className="bg-green-500/10 text-green-400 text-xs font-bold px-3 py-1 rounded-full border border-green-500/20">ACTIVE</span>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                                    <div>
                                        <p className="text-gray-500 text-[10px] uppercase font-bold mb-1">Amount Invested</p>
                                        <p className="text-2xl font-black text-white">₹{inv.amount}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-[10px] uppercase font-bold mb-1">Tx Hash</p>
                                        <div className="flex items-center gap-1 text-blue-400 font-mono text-xs bg-blue-500/10 px-2 py-1 rounded w-fit">
                                            <Hash className="w-3 h-3" /> {inv.txHash?.substring(0, 10)}...
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-[10px] uppercase font-bold mb-1">Date</p>
                                        <div className="flex items-center gap-1 text-gray-300 text-sm font-bold">
                                            <Calendar className="w-3 h-3" /> {inv.timestamp?.toDate().toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <button
                                    onClick={() => generatePDF(inv)}
                                    className="w-full md:w-auto px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all"
                                >
                                    <Download className="w-4 h-4" /> Bond PDF
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
