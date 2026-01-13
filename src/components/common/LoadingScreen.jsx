import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, BrainCircuit, Search, Calculator, FileCheck, Lightbulb } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const TIPS = [
    { icon: "💡", text: "Medical bills contain an average of 3-5 errors that can inflate costs by 15-30%" },
    { icon: "🔍", text: "Always check for duplicate charges - they're one of the most common billing errors" },
    { icon: "💰", text: "The same procedure can vary by 300% between hospitals in the same city" },
    { icon: "📊", text: "Our AI compares your bill against 50,000+ verified medical procedures" },
    { icon: "⚡", text: "Most bill errors are unintentional - automated systems make mistakes too" }
];

const LoadingScreen = ({ progress }) => {
    const { t } = useLanguage();
    const [currentTip, setCurrentTip] = useState(0);

    // Rotate tips
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTip(prev => (prev + 1) % TIPS.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const steps = [
        { label: "Document uploaded", active: progress > 0, complete: progress > 10 },
        { label: "Detecting language and region...", active: progress > 10, complete: progress > 30 },
        { label: "Extracting line items...", active: progress > 30, complete: progress > 60 },
        { label: "Comparing with fair prices...", active: progress > 60, complete: progress > 85 },
        { label: "Generating insights...", active: progress > 85, complete: progress >= 100 }
    ];

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-8">
            {/* Animated Medical Icon */}
            <div className="mb-12 relative">
                <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl animate-pulse" />
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        filter: ["drop-shadow(0 0 20px rgba(255,255,255,0.3))", "drop-shadow(0 0 40px rgba(255,255,255,0.6))", "drop-shadow(0 0 20px rgba(255,255,255,0.3))"]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="relative bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20"
                >
                    <Search className="w-16 h-16 text-white" />
                </motion.div>
            </div>

            <h2 className="text-3xl font-display font-bold mb-8">Analyzing Your Medical Bill...</h2>

            {/* Progress Bar */}
            <div className="w-full max-w-md h-3 bg-white/10 rounded-full mb-12 overflow-hidden relative border border-white/20 backdrop-blur-sm shadow-xl">
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-success-400 to-info-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: "easeInOut", duration: 0.5 }}
                />
                {/* Glow effect */}
                <motion.div
                    className="absolute top-0 bottom-0 bg-white/50 w-2 blur-sm"
                    initial={{ left: 0 }}
                    animate={{ left: `${progress}%` }}
                    transition={{ ease: "easeInOut", duration: 0.5 }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-full animate-shimmer" />
            </div>

            {/* Status Steps */}
            <div className="w-full max-w-md space-y-3 mb-16">
                {steps.map((step, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: step.active ? 1 : 0.4, x: 0 }}
                        className={`flex items-center gap-3 ${step.active ? 'font-semibold' : ''}`}
                    >
                        <div className={`w-5 h-5 flex items-center justify-center rounded-full border ${step.complete ? 'bg-success-400 border-success-400 text-white' : 'border-white/50'}`}>
                            {step.complete && <FileCheck className="w-3 h-3" />}
                        </div>
                        <span>{step.label}</span>
                    </motion.div>
                ))}
            </div>

            {/* Rotating Tips */}
            <div className="max-w-xl mx-auto text-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentTip}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10"
                    >
                        <div className="text-3xl mb-3">{TIPS[currentTip].icon}</div>
                        <p className="text-lg font-medium leading-relaxed">
                            {TIPS[currentTip].text}
                        </p>
                    </motion.div>
                </AnimatePresence>
                <p className="text-white/50 text-sm mt-4 uppercase tracking-widest">Did You Know?</p>
            </div>
        </div>
    );
};

export default LoadingScreen;
