import React from 'react';
import { motion } from 'framer-motion';

const TrustSection = () => {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-display font-bold text-neutral-900 mb-4">
                        Intelligent. Secure. Verified.
                    </h2>
                    <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                        We believe transparency shouldn't come at the cost of privacy. Here is how we ensure your data is safe and our analysis is accurate.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Feature 1: The Brain */}
                    <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-100 hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                            <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 mb-3">Powered by Advanced LLMs</h3>
                        <p className="text-neutral-600 leading-relaxed">
                            We don't just use simple OCR. Your bill is analyzed by <strong>state-of-the-art Large Multimodal Models</strong> (like Claude 3.5 Sonnet) that "read" and understand medical context, codes, and complex layouts just like a human auditor would.
                        </p>
                    </div>

                    {/* Feature 2: The Proof */}
                    <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-100 hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 bg-success-100 rounded-xl flex items-center justify-center mb-6">
                            <svg className="w-6 h-6 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 mb-3">Rigorously Validated</h3>
                        <p className="text-neutral-600 leading-relaxed">
                            Accuracy is our top priority. Our fair pricing models have been <strong>tested against 500+ real-world hospital bills</strong> across the USA, India, and Nepal to ensure consistent, reliable, and actionable savings detection.
                        </p>
                    </div>

                    {/* Feature 3: The Vault */}
                    <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-100 hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                            <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 mb-3">Bank-Grade Privacy</h3>
                        <p className="text-neutral-600 leading-relaxed">
                            Your medical data is yours alone. We employ a <strong>client-side-first architecture</strong> where bills are processed in secure, ephemeral sessions. No personal health information is ever sold, shared, or permanently stored on our servers.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrustSection;
