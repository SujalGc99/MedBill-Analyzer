import React from 'react';
import { Shield, Lock, Eye, Server } from 'lucide-react';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen pt-24 pb-12 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-neutral-200 p-8 md:p-12">
                <div className="text-center mb-12">
                    <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Shield className="w-8 h-8" />
                    </div>
                    <h1 className="text-4xl font-display font-bold text-neutral-900 mb-4">Privacy Policy</h1>
                    <p className="text-lg text-neutral-600">Last updated: {new Date().toLocaleDateString()}</p>
                </div>

                <div className="prose prose-lg prose-neutral max-w-none">
                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4 flex items-center gap-3">
                            <Lock className="w-6 h-6 text-primary-600" />
                            1. Data Privacy & Security
                        </h2>
                        <p>
                            At MedBill Analyzer, we prioritize your privacy above all else. We operate on a <strong>"Client-Side First"</strong> architecture, meaning:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-4">
                            <li>Your medical bills are processed directly in your browser whenever possible.</li>
                            <li>When AI analysis is required, data is transmitted via encrypted (TLS 1.3) channels.</li>
                            <li>We do <strong>not</strong> permanently store your medical bills on our servers.</li>
                            <li>Any temporary data used for analysis is purged immediately after the session ends.</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4 flex items-center gap-3">
                            <Eye className="w-6 h-6 text-primary-600" />
                            2. Information We Collect
                        </h2>
                        <p>
                            We collect minimal data to provide our services:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-4">
                            <li><strong>Usage Data:</strong> Anonymous metrics on how you interact with our website (e.g., pages visited, analysis duration).</li>
                            <li><strong>Uploaded Documents:</strong> Temporary access to uploaded bill images solely for the purpose of extraction and analysis.</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4 flex items-center gap-3">
                            <Server className="w-6 h-6 text-primary-600" />
                            3. AI Analysis Disclosure
                        </h2>
                        <p>
                            Our platform utilizes advanced AI models (such as Claude 3.5 Sonnet and GPT-4) to analyze documents. By using this service, you acknowledge that:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-4">
                            <li>Anonymized text segments from your bills may be processed by third-party AI providers (OpenRouter, Anthropic, OpenAI).</li>
                            <li>These providers are contractually bound to data privacy standards and do not use your data to train their models.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">4. Contact Us</h2>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@medbillanalyzer.com" className="text-primary-600 hover:underline">privacy@medbillanalyzer.com</a>.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
