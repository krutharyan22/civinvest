import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const data = [
    { month: 'Jan', cost: 4000 },
    { month: 'Feb', cost: 3000 },
    { month: 'Mar', cost: 5000 },
    { month: 'Apr', cost: 4500 },
    { month: 'May', cost: 6000 },
    { month: 'Jun', cost: 5500 },
    { month: 'Jul', cost: 7000 },
];

export default function CostChart() {
    return (
        <div className="w-full h-[300px] bg-[#161618] border border-white/10 rounded-[32px] p-6 shadow-2xl">
            <h3 className="text-xl font-bold mb-4 text-white">Project Value Trend</h3>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                    <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '12px', fontWeight: 'bold' }} />
                    <YAxis stroke="#6b7280" style={{ fontSize: '12px', fontWeight: 'bold' }} />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#161618', border: '1px solid #ffffff10', borderRadius: '12px', color: 'white' }}
                        itemStyle={{ color: '#3b82f6' }}
                    />
                    <Area type="monotone" dataKey="cost" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorCost)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
