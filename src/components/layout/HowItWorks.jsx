import React from 'react';
import { motion } from 'framer-motion';
import { Upload, FileSearch, Scale, FileCheck } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const HowItWorks = () => {
    const { t } = useLanguage();

    const steps = [
        {
            icon: Upload,
            title: "Upload Your Bill",
            desc: "Drag & drop or click to upload. We support JPG, PNG, and PDF.",
            color: "text-primary-600",
            bg: "bg-primary-50"
        },
        {
            icon: FileSearch,
            title: "AI Analysis",
            desc: "Our AI extracts line items and verifies codes against regional standards.",
            color: "text-purple-600",
            bg: "bg-purple-50"
        },
        {
            icon: Scale,
            title: "Price Check",
            desc: "We compare your charges with fair market rates for your specific hospital tier.",
            color: "text-warning-600",
            bg: "bg-warning-50"
        },
        {
            icon: FileCheck,
            title: "Get Report",
            desc: "Download a detailed audit report and fair price receipt to negotiate savings.",
            color: "text-success-600",
            bg: "bg-success-50"
        }
    ];

    return (
        <section className="py-24 bg-neutral-50 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4"
                    >
                        How It Works
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-neutral-600"
                    >
                        Simple. Fast. Transparent.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-neutral-200 -z-10" />

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="relative text-center group"
                        >
                            {/* Step Number Badge */}
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold shadow-lg z-10 border-2 border-white">
                                {index + 1}
                            </div>

                            <div className={`w-24 h-24 mx-auto rounded-3xl ${step.bg} flex items-center justify-center mb-6 shadow-soft group-hover:scale-110 transition-transform duration-300`}>
                                <step.icon className={`w-10 h-10 ${step.color}`} />
                            </div>

                            <h3 className="text-xl font-bold text-neutral-900 mb-3">{step.title}</h3>
                            <p className="text-neutral-600 text-sm leading-relaxed px-2">
                                {step.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                    className="mt-16 text-center"
                >
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-sm border border-neutral-200 text-neutral-500 text-sm">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        Your data never leaves your device (except for secure AI processing)
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HowItWorks;
