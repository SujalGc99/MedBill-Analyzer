import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ShieldCheck, Upload, AlertCircle } from 'lucide-react';
import FileUpload from '../upload/FileUpload';
import ImagePreview from '../upload/ImagePreview';
import Card from '../common/Card';
import Button from '../common/Button';
import { useLanguage } from '../../contexts/LanguageContext';
import { SUPPORTED_COUNTRIES } from '../../constants/prompts';

const UploadSection = ({
    onBack,
    onFileSelect,
    selectedFile,
    onRemoveFile,
    onAnalyze,
    loading,
    error,
    originCountry,
    setOriginCountry,
    targetCountry,
    setTargetCountry,
    onDemoClick
}) => {
    const { t } = useLanguage();

    const DEMO_BILLS = [
        { country: "General", label: "General City Hospital", type: "Inpatient", key: 'GENERAL', image: '/demo/general_hospital.png' },
        { country: "Nepal", label: "Grande Int'l Hospital", type: "Hospital Bill", key: 'NEPAL', image: '/demo/nepal.png' },
        { country: "USA", label: "Example Health System", type: "Emergency Room", key: 'USA', image: '/demo/usa.png' },
        { country: "India", label: "Apollo Clinic", type: "Outpatient", key: 'INDIA', image: '/demo/india.png' }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="min-h-screen py-10 px-4 max-w-5xl mx-auto"
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-neutral-500 hover:text-neutral-900 transition-colors font-medium border border-neutral-200 px-4 py-2 rounded-full bg-white shadow-sm"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </button>
            </div>

            <div className="text-center mb-12">
                <h1 className="text-3xl md:text-5xl font-display font-bold text-neutral-900 mb-4">
                    {selectedFile ? 'Review & Analyze' : 'Upload Your Medical Bill'}
                </h1>
                <p className="text-xl text-neutral-600">
                    {selectedFile ? 'Verify details before we start' : 'Get instant AI-powered analysis in seconds'}
                </p>
            </div>

            {/* Main Content Area */}
            <div className="mb-16">
                {!selectedFile ? (
                    <Card className="glass-panel p-8 md:p-12 border-2 border-dashed border-primary-100/50 shadow-2xl shadow-primary-900/5">
                        <FileUpload onFileSelect={onFileSelect} disabled={loading} />
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left: Preview */}
                        <div className="order-2 lg:order-1">
                            <div className="bg-neutral-900/5 rounded-2xl p-4 border border-neutral-200">
                                <ImagePreview file={selectedFile} onRemove={onRemoveFile} />
                            </div>
                        </div>

                        {/* Right: Config & CTA */}
                        <div className="order-1 lg:order-2 space-y-6">
                            <Card className="glass-panel border-primary-100/50">
                                <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-sm">1</span>
                                    Bill Details
                                </h3>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                                            Bill Origin (Currency & Context)
                                        </label>
                                        <div className="relative">
                                            <select
                                                value={originCountry}
                                                onChange={(e) => setOriginCountry(e.target.value)}
                                                className="w-full p-3 bg-white border border-neutral-200 rounded-xl appearance-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow outline-none"
                                                disabled={loading}
                                            >
                                                {SUPPORTED_COUNTRIES.map(country => (
                                                    <option key={country.code} value={country.name}>
                                                        {country.emoji} {country.name} ({country.currency})
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
                                                ▼
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                                            Compare Against (Standard)
                                        </label>
                                        <div className="relative">
                                            <select
                                                value={targetCountry}
                                                onChange={(e) => setTargetCountry(e.target.value)}
                                                className="w-full p-3 bg-white border border-neutral-200 rounded-xl appearance-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow outline-none"
                                                disabled={loading}
                                            >
                                                {SUPPORTED_COUNTRIES.map(country => (
                                                    <option key={country.code} value={country.name}>
                                                        {country.emoji} {country.name} ({country.currency})
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
                                                ▼
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            <button
                                onClick={onAnalyze}
                                disabled={loading}
                                className="w-full btn-primary text-lg py-4 shadow-xl shadow-primary-500/20 group"
                            >
                                {loading ? 'Starting Analysis...' : 'Analyze Bill Now'}
                                <Upload className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                            </button>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 bg-danger-50 border border-danger-200 rounded-xl flex items-start gap-3 text-sm text-danger-700"
                                >
                                    <AlertCircle className="w-5 h-5 shrink-0" />
                                    <span>{error}</span>
                                </motion.div>
                            )}

                            <p className="text-center text-xs text-neutral-400">
                                By analyzing, you agree to our Terms of Service.
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Demo Bills */}
            <div className="text-center mb-16">
                <p className="text-neutral-500 font-medium mb-6 uppercase tracking-wider text-sm">Don't have a bill handy? Try a demo:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {DEMO_BILLS.map((bill, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -5 }}
                            className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md cursor-pointer border border-neutral-100 group text-left transition-all"
                            onClick={() => onDemoClick(bill.key)}
                        >
                            <div className="h-32 bg-neutral-100 rounded-lg mb-4 overflow-hidden relative">
                                <img
                                    src={bill.image}
                                    alt={bill.label}
                                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                                <div className="absolute inset-0 hidden items-center justify-center text-neutral-400 font-medium bg-neutral-50">
                                    [Preview]
                                </div>
                            </div>
                            <div className="font-bold text-neutral-900">{bill.country}</div>
                            <div className="text-sm text-neutral-500 truncate">{bill.label}</div>
                            <div className="mt-3 text-primary-600 text-sm font-medium group-hover:underline">Try Demo →</div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Privacy Note */}
            <div className="bg-neutral-50 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left max-w-3xl mx-auto border border-neutral-200">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-primary-600 shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="font-bold text-neutral-900 mb-1">Your Privacy Matters</h3>
                    <p className="text-neutral-600 text-sm">
                        Your bill is analyzed securely via encrypted API. No personal data is permanently stored on our servers.
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default UploadSection;
