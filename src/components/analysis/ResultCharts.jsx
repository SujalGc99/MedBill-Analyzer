import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { motion } from 'framer-motion';
import Card from '../common/Card';

export const ResultCharts = ({ result }) => {
    const { items, originalTotal, optimizedTotal } = result;

    // Data for Bar Chart (Price Comparison)
    const comparisonData = [
        { name: 'Charged', amount: originalTotal, fill: '#ef4444' }, // red-500
        { name: 'Fair Price', amount: optimizedTotal, fill: '#10b981' } // emerald-500
    ];

    // Data for Pie Chart (Top Expensive Items)
    // Sort by price and take top 5
    const pieData = items
        .sort((a, b) => b.chargedPrice - a.chargedPrice)
        .slice(0, 5)
        .map(item => ({
            name: item.name.length > 15 ? item.name.substring(0, 15) + '...' : item.name,
            value: item.chargedPrice
        }));

    const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 border border-neutral-200 rounded-lg shadow-lg">
                    <p className="font-semibold text-neutral-900">{label}</p>
                    <p className="text-primary-600">
                        {payload[0].value.toLocaleString()}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
            >
                <Card className="h-80 flex flex-col">
                    <h3 className="text-lg font-semibold text-neutral-800 mb-2 shrink-0">Price Comparison</h3>
                    <div className="flex-1 w-full min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                                <YAxis hide />
                                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                                <Bar dataKey="amount" radius={[6, 6, 0, 0]} barSize={50} animationDuration={1500}>
                                    {comparisonData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
            >
                <Card className="h-80 flex flex-col">
                    <h3 className="text-lg font-semibold text-neutral-800 mb-2 shrink-0">Cost Breakdown</h3>
                    <div className="flex-1 w-full min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 10 }}>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={50}
                                    outerRadius={70}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </motion.div>
        </div>
    );
};
