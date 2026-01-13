import React from 'react';
import { TrendingDown, CheckCircle, AlertTriangle, Wallet } from 'lucide-react';
import { formatCurrency } from '../../utils/formatting';
import { motion } from 'framer-motion';

export const SummaryCard = ({ result, country }) => {
    const { originalTotal, optimizedTotal, totalSavings, savingsPercentage } = result;
    const hasSavings = totalSavings > 0;

    const cards = [
        {
            label: "Total Charged",
            amount: originalTotal,
            icon: Wallet,
            color: "text-neutral-600",
            bg: "bg-neutral-100",
            delay: 0
        },
        {
            label: "Fair Market Price",
            amount: optimizedTotal,
            icon: CheckCircle,
            color: "text-success-600",
            bg: "bg-success-100",
            delay: 0.1
        },
        {
            label: "Potential Savings",
            amount: totalSavings,
            icon: hasSavings ? TrendingDown : AlertTriangle,
            color: hasSavings ? "text-primary-600" : "text-neutral-400",
            bg: hasSavings ? "bg-primary-100" : "bg-neutral-100",
            trend: hasSavings ? `-${savingsPercentage}%` : "0%",
            delay: 0.2
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {cards.map((card, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: card.delay, duration: 0.5 }}
                    className="glass-card p-6 rounded-2xl border border-white/20 shadow-lg"
                >
                    <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-xl ${card.bg}`}>
                            <card.icon className={`w-6 h-6 ${card.color}`} />
                        </div>
                        {card.trend && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                {card.trend}
                            </span>
                        )}
                    </div>
                    <div>
                        <p className="text-sm font-medium text-neutral-500 mb-1">{card.label}</p>
                        <h3 className="text-2xl font-display font-bold text-neutral-900">
                            {formatCurrency(card.amount, country)}
                        </h3>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};
