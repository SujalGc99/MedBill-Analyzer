import React from 'react';
import { FileText, AlertTriangle, CheckCircle, HelpCircle } from 'lucide-react';

const TermsOfService = () => {
    return (
        <div className="min-h-screen pt-24 pb-12 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-neutral-200 p-8 md:p-12">
                <div className="text-center mb-12">
                    <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <FileText className="w-8 h-8" />
                    </div>
                    <h1 className="text-4xl font-display font-bold text-neutral-900 mb-4">Terms of Service</h1>
                    <p className="text-lg text-neutral-600">Last updated: {new Date().toLocaleDateString()}</p>
                </div>

                <div className="prose prose-lg prose-neutral max-w-none">
                    <section className="mb-10 bg-amber-50 p-6 rounded-xl border border-amber-200">
                        <h2 className="text-xl font-bold text-amber-800 mb-3 flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5" />
                            Critical Medical Disclaimer
                        </h2>
                        <p className="text-amber-900 text-sm mb-0">
                            <strong>MedBill Analyzer is NOT a medical or legal service.</strong> The insights, fair price estimates, and analysis provided by our AI are for informational purposes only. They do not constitute professional medical advice, diagnosis, or legal counsel. Always verify details with your healthcare provider or a qualified attorney.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">1. Acceptance of Terms</h2>
                        <p>
                            By accessing or using MedBill Analyzer, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">2. Description of Service</h2>
                        <p>
                            MedBill Analyzer provides AI-powered analysis of medical bills to help users understand charges and estimate fair market prices. We strive for accuracy but cannot guarantee that all analysis is 100% error-free due to the complexity of medical coding and variability in hospital pricing.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">3. User Responsibilities</h2>
                        <ul className="space-y-3 mt-4">
                            <li className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                                <span>You act responsibly when uploading documents, ensuring you have the right to analyze the data.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                                <span>You understand that "Fair Price" estimates are based on aggregated data and may not reflect specific contract rates.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                                <span>You will not use this platform for any illegal or fraudulent activities.</span>
                            </li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">4. Limitation of Liability</h2>
                        <p>
                            MedBill Analyzer and its creators shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use the service, or for the cost of procurement of substitute services.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;
