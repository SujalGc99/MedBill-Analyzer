import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

const ProblemSection = () => {
    const { t } = useLanguage();

    // Stats data
    const stats = [
        {
            value: "84%",
            label: "of bills have errors",
            description: "Most patients overpay without knowing it.",
            delay: 0
        },
        {
            value: "$50K+",
            label: "audit costs",
            description: "Professional audits are expensive.",
            delay: 0.2
        },
        {
            value: "Weeks",
            label: "to get answers",
            description: "Manual verification takes forever.",
            delay: 0.4
        }
    ];

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4"
                    >
                        The Medical Billing Problem
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-neutral-600 max-w-2xl mx-auto"
                    >
                        You deserve to know if you're paying a fair price.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: stat.delay, duration: 0.5 }}
                            whileHover={{ y: -8 }}
                            className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-neutral-100 text-center group"
                        >
                            <div className="text-5xl md:text-6xl font-display font-bold text-primary-600 mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">
                                {stat.value}
                            </div>
                            <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                                {stat.label}
                            </h3>
                            <p className="text-neutral-500">
                                {stat.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProblemSection;
