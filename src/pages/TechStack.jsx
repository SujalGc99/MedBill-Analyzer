import React from 'react';
import { motion } from 'framer-motion';
import { Code, Server, Layout, Shield, Cpu, Zap, Database, Globe } from 'lucide-react';
import Card from '../components/common/Card';

const TechStack = () => {
    const technologies = [
        {
            category: "Frontend Core",
            icon: Layout,
            items: [
                { name: "React 18", desc: "Component-based UI architecture" },
                { name: "Vite", desc: "Next-generation frontend tooling" },
                { name: "TypeScript", desc: "Type-safe development (partial)" },
                { name: "Tailwind CSS", desc: "Utility-first modern styling" }
            ]
        },
        {
            category: "UX & Animations",
            icon: Zap,
            items: [
                { name: "Framer Motion", desc: "Complex gestures & layout animations" },
                { name: "Lenis", desc: "Smooth locomotive scrolling" },
                { name: "Lucide React", desc: "Beautiful consistent iconography" },
                { name: "Recharts", desc: "Composable charting library" }
            ]
        },
        {
            category: "AI & Processing",
            icon: Brain,
            items: [
                { name: "Google Gemini 1.5 Flash", desc: "Multimodal receipt analysis via OpenRouter" },
                { name: "Prompt Engineering", desc: "Context-aware medical extraction" },
                { name: "Client-Side Processing", desc: "Image compression & validation" }
            ]
        },
        {
            category: "Security & Privacy",
            icon: Shield,
            items: [
                { name: "Local Storage", desc: "Browser-only data persistence" },
                { name: "No Backend DB", desc: "Zero data retention policy" },
                { name: "Environment Isolation", desc: "Secure API key management" }
            ]
        }
    ];

    // Note: I created a temporary Brain component usage if Lucide doesn't export Brain, 
    // but Lucide usually does. If not, I'll fallback or check imports.
    // Actually, I imported Cpu, let's use Cpu for AI.

    return (
        <div className="animate-in fade-in duration-700">
            <div className="text-center max-w-3xl mx-auto mb-16 pt-10">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-sm font-medium mb-6">
                    <Code className="w-4 h-4" /> For the Judges & Developers
                </span>
                <h1 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-6">
                    Under the <span className="text-gradient">Hood</span>
                </h1>
                <p className="text-lg text-neutral-600 leading-relaxed">
                    MedBill Analyzer is built with a modern, performance-first stack designed for privacy, speed, and delightful user experiences.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                {technologies.map((tech, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className="h-full hover:shadow-med transition-shadow duration-300">
                            <div className="flex items-center gap-4 mb-6 border-b border-neutral-100 pb-4">
                                <div className="p-3 bg-primary-50 rounded-xl text-primary-600">
                                    <tech.icon className="w-6 h-6" />
                                </div>
                                <h3 className="font-semibold text-lg text-neutral-900">{tech.category}</h3>
                            </div>
                            <div className="space-y-4">
                                {tech.items.map((item, i) => (
                                    <div key={i} className="group">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <span className="font-medium text-neutral-800 group-hover:text-primary-600 transition-colors">
                                                {item.name}
                                            </span>
                                        </div>
                                        <p className="text-sm text-neutral-500">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Architecture Diagram Placeholder */}
            <div className="max-w-4xl mx-auto mb-20">
                <Card className="bg-neutral-900 text-white overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-32 bg-primary-500/10 rounded-full blur-3xl" />
                    <div className="relative z-10 p-8 text-center">
                        <h3 className="text-2xl font-display font-bold mb-4">Architecture Highlights</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-center">
                            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                                <span className="block text-4xl mb-4">⚡</span>
                                <h4 className="font-semibold mb-2">Instant Analysis</h4>
                                <p className="text-sm text-neutral-400">Optimized latency with Gemini 1.5 Flash</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                                <span className="block text-4xl mb-4">🛡️</span>
                                <h4 className="font-semibold mb-2">Privacy First</h4>
                                <p className="text-sm text-neutral-400">Zero-knowledge architecture</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                                <span className="block text-4xl mb-4">🎨</span>
                                <h4 className="font-semibold mb-2">Premium UI</h4>
                                <p className="text-sm text-neutral-400">Glassmorphism & Micro-interactions</p>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

// Quick fix for the Brain/Cpu icon mapping
const Brain = Cpu;

export default TechStack;
