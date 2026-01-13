import React from 'react';
import { motion } from 'framer-motion';
import { Upload, ArrowRight, ShieldCheck, Zap, Globe } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const HeroSection = ({ onUploadClick, demoMode, onDemoClick }) => {
    const { t } = useLanguage();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.3, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
    };

    return (
        <div className="relative pt-20 pb-32 lg:pt-32 lg:pb-48 overflow-hidden">
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 bg-neutral-50 -z-20" />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,#e0f2fe_0%,#f0fdf4_100%)] opacity-70 -z-10 animate-bg-shift" />

            {/* Floating Particles/Mesh Effect can go here */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-primary-300/20 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-[20%] right-[10%] w-80 h-80 bg-secondary-300/20 rounded-full blur-3xl animate-float delay-1000" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-5xl mx-auto"
                >
                    {/* Badge */}
                    <motion.div variants={itemVariants} className="flex justify-center mb-8">
                        {demoMode ? (
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-600 text-white text-sm font-bold shadow-lg shadow-primary-500/30 ring-4 ring-primary-100">
                                <span className="animate-pulse">●</span> Judge Demo Mode Active
                            </span>
                        ) : (
                            <span className="hidden" />
                        )}
                    </motion.div>

                    {/* Headline */}
                    <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-display font-bold tracking-tight text-neutral-900 mb-8 leading-[1.1]">
                        Medical Bills. <br />
                        <span className="text-gradient-hero">Decoded. Verified. Fair.</span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p variants={itemVariants} className="text-xl md:text-2xl text-neutral-600 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
                        AI-powered transparency for healthcare costs. Stop overpaying and understand exactly what you're being charged for.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <button
                            onClick={onUploadClick}
                            className="bg-white text-primary-600 text-xl font-semibold px-10 py-5 rounded-2xl shadow-2xl hover:-translate-y-1 hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.3)] transition-all duration-300 min-w-[240px] flex items-center justify-center gap-3 group border border-transparent"
                        >
                            <Upload className="w-6 h-6 group-hover:scale-110 transition-transform" />
                            Upload Your Bill
                        </button>

                        <button
                            onClick={onDemoClick} // Always allow clicking
                            className="text-neutral-600 text-lg font-medium hover:text-primary-600 transition-colors flex items-center gap-2 group px-6 py-4"
                        >
                            Try Demo Bill
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>

                    {/* Trust Indicators */}
                    <motion.div
                        variants={itemVariants}
                        className="mt-16 flex flex-wrap justify-center gap-8 text-neutral-500 font-medium text-sm md:text-base bg-white/40 backdrop-blur-sm py-4 px-8 rounded-full inline-flex border border-white/50"
                    >
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="w-5 h-5 text-primary-600" />
                            <span>100% Private</span>
                        </div>
                        <div className="w-px h-4 bg-neutral-300 hidden sm:block" />
                        <div className="flex items-center gap-2">
                            <Zap className="w-5 h-5 text-warning-500" />
                            <span>Results in 30s</span>
                        </div>
                        <div className="w-px h-4 bg-neutral-300 hidden sm:block" />
                        <div className="flex items-center gap-2">
                            <Globe className="w-5 h-5 text-success-600" />
                            <span>Multi-Region</span>
                        </div>
                    </motion.div>

                    {/* Scroll Indicator */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5, duration: 1 }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:block"
                    >
                        <div className="w-6 h-10 border-2 border-neutral-300 rounded-full flex justify-center p-1">
                            <motion.div
                                animate={{ y: [0, 12, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                                className="w-1.5 h-1.5 bg-neutral-400 rounded-full"
                            />
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default HeroSection;
