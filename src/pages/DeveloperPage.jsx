import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, ExternalLink, Code2, Globe, Heart } from 'lucide-react';
import Card from '../components/common/Card';

const DeveloperPage = () => {
    return (
        <div className="min-h-screen bg-neutral-50 pt-24 pb-20 px-4">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-display font-bold text-neutral-900 mb-6">
                        Meet the Developer
                    </h1>
                    <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                        The mind behind MedBill Analyzer, dedicated to bringing transparency to healthcare through code.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                    {/* Profile Card */}
                    <div className="md:col-span-5 lg:col-span-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-3xl p-4 shadow-xl shadow-primary-900/5 border border-neutral-100"
                        >
                            <div className="aspect-[4/5] rounded-2xl overflow-hidden mb-6 relative group">
                                <img
                                    src="/sujal_gc.jpg"
                                    alt="Sujal Gc"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>

                            <div className="text-center mb-2">
                                <h2 className="text-2xl font-bold text-neutral-900">Sujal Gc</h2>
                                <p className="text-primary-600 font-medium">Full Stack Developer</p>
                            </div>

                            <div className="flex justify-center gap-3 mt-6">
                                <a
                                    href="https://github.com/SujalGc99/MedBill-Analyzer"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 rounded-full bg-neutral-50 text-neutral-600 hover:bg-neutral-900 hover:text-white transition-all transform hover:-translate-y-1"
                                    title="GitHub Repository"
                                >
                                    <Github className="w-5 h-5" />
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/sujalgc/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 rounded-full bg-neutral-50 text-neutral-600 hover:bg-[#0077b5] hover:text-white transition-all transform hover:-translate-y-1"
                                    title="LinkedIn Profile"
                                >
                                    <Linkedin className="w-5 h-5" />
                                </a>
                            </div>
                        </motion.div>
                    </div>

                    {/* Bio & Details */}
                    <div className="md:col-span-7 lg:col-span-8 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Card className="p-8">
                                <h3 className="text-xl font-bold text-neutral-900 mb-4 flex items-center gap-2">
                                    <Code2 className="w-5 h-5 text-primary-500" />
                                    About The Project
                                </h3>
                                <p className="text-neutral-600 leading-relaxed mb-6">
                                    MedBill Analyzer was born from a simple observation: understanding medical bills shouldn't require a medical degree.
                                    Built using modern web technologies and advanced AI, this tool aims to empower patients with the data they need to negotiate fair prices.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium">React 19</span>
                                    <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-sm font-medium">AI Integration</span>
                                    <span className="px-3 py-1 rounded-full bg-green-50 text-green-700 text-sm font-medium">Privacy First</span>
                                </div>
                            </Card>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Card className="p-8 border-primary-100 bg-gradient-to-br from-white to-primary-50/30">
                                <h3 className="text-xl font-bold text-neutral-900 mb-4 flex items-center gap-2">
                                    <Globe className="w-5 h-5 text-primary-500" />
                                    The Vision
                                </h3>
                                <blockquote className="text-lg text-neutral-700 italic border-l-4 border-primary-500 pl-4 my-4">
                                    "Technology should serve humanity. With MedBill Analyzer, we're using AI to level the playing field between patients and the healthcare billing complex."
                                </blockquote>
                                <div className="flex items-center gap-2 text-sm text-neutral-500 mt-6 pt-6 border-t border-neutral-100">
                                    <Heart className="w-4 h-4 text-red-500 fill-current" />
                                    <span>Built with passion in Nepal</span>
                                </div>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeveloperPage;
