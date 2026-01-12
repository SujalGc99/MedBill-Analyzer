// Home Page Component (Refactored from App.jsx)
import React, { useState } from 'react';
import FileUpload from '../components/upload/FileUpload';
import ImagePreview from '../components/upload/ImagePreview';
import AnalysisResults from '../components/analysis/AnalysisResults';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import useAnalysis from '../hooks/useAnalysis';
import { useLanguage } from '../contexts/LanguageContext';
import { SUPPORTED_COUNTRIES } from '../constants/prompts';
import { Upload, Loader, CheckCircle, XCircle } from 'lucide-react';

export const HomePage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedTargetCountry, setSelectedTargetCountry] = useState('Nepal');
    const [selectedOriginCountry, setSelectedOriginCountry] = useState('Nepal');
    const { analyze, reset, loading, error, result, progress } = useAnalysis();
    const { t } = useLanguage();

    const handleFileSelect = (file) => {
        setSelectedFile(file);
        reset();
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
        reset();
    };

    const handleAnalyze = async () => {
        if (!selectedFile) return;
        try {
            await analyze(selectedFile, selectedTargetCountry, selectedOriginCountry);
        } catch (err) {
            console.error('Analysis failed:', err);
        }
    };

    const handleNewAnalysis = () => {
        setSelectedFile(null);
        reset();
    };

    const handleReanalyze = async (correctedOrigin, correctedTarget) => {
        if (!selectedFile) return;

        // Update the selected countries
        setSelectedOriginCountry(correctedOrigin);
        setSelectedTargetCountry(correctedTarget);

        // Reset and re-analyze with new countries
        reset();

        try {
            await analyze(selectedFile, correctedTarget, correctedOrigin);
        } catch (err) {
            console.error('Re-analysis failed:', err);
        }
    };

    return (
        <div className="animate-in fade-in duration-500">
            {/* Hero Section */}
            {!selectedFile && !result && (
                <div className="text-center mb-10">
                    <h1 className="text-4xl sm:text-5xl font-display font-bold text-neutral-900 mb-4 tracking-tight">
                        {t('home.heroTitle')}
                    </h1>
                    <p className="text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
                        {t('home.heroSubtitle')}
                    </p>
                </div>
            )}

            {/* Main Content */}
            <div className="max-w-4xl mx-auto relative z-10 transition-all duration-300">
                {!result && !selectedFile && (
                    <Card className="border-primary-100 shadow-xl shadow-primary-500/5">
                        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">
                                    Bill Origin (Currency)
                                </label>
                                <select
                                    value={selectedOriginCountry}
                                    onChange={(e) => {
                                        setSelectedOriginCountry(e.target.value);
                                        // Auto-set target to same if not set (UX improvement)
                                        // if (selectedTargetCountry === 'Nepal') setSelectedTargetCountry(e.target.value);
                                    }}
                                    className="input w-full"
                                    disabled={loading}
                                >
                                    {SUPPORTED_COUNTRIES.map(country => (
                                        <option key={country.code} value={country.name}>
                                            {country.name} ({country.currency})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">
                                    Compare with Market (Standard)
                                </label>
                                <select
                                    value={selectedTargetCountry}
                                    onChange={(e) => setSelectedTargetCountry(e.target.value)}
                                    className="input w-full"
                                    disabled={loading}
                                >
                                    {SUPPORTED_COUNTRIES.map(country => (
                                        <option key={country.code} value={country.name}>
                                            {country.name} ({country.currency})
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <FileUpload onFileSelect={handleFileSelect} disabled={loading} />
                    </Card>
                )}

                {/* Preview & Analyze */}
                {selectedFile && !result && (
                    <div className="space-y-6">
                        <Card>
                            <h2 className="text-xl font-semibold text-neutral-900 mb-4">{t('home.previewTitle')}</h2>
                            <ImagePreview file={selectedFile} onRemove={handleRemoveFile} />

                            <div className="mt-6 flex flex-col sm:flex-row gap-3">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    onClick={handleAnalyze}
                                    loading={loading}
                                    disabled={loading}
                                    className="flex-1 sm:flex-none"
                                >
                                    {loading ? (
                                        <span className="flex items-center gap-2">
                                            <Loader className="h-5 w-5 animate-spin" />
                                            {t('home.analyzingBtn')} {progress}%
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            <Upload className="h-5 w-5" />
                                            {t('home.analyzeBtn')}
                                        </span>
                                    )}
                                </Button>
                                <Button variant="secondary" size="lg" onClick={handleRemoveFile} disabled={loading}>
                                    {t('home.cancelBtn')}
                                </Button>
                            </div>

                            {loading && progress > 0 && (
                                <div className="mt-6">
                                    <div className="flex justify-between text-xs font-medium text-neutral-500 mb-1">
                                        <span>{t('home.analyzingBtn')}</span>
                                        <span>{progress}%</span>
                                    </div>
                                    <div className="bg-neutral-100 rounded-full h-2 overflow-hidden">
                                        <div
                                            className="bg-primary-500 h-full transition-all duration-300 ease-out"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                    <p className="text-sm text-neutral-500 text-center mt-3 animate-pulse">
                                        {progress < 30 && t('home.processing')}
                                        {progress >= 30 && progress < 70 && t('home.analyzing')}
                                        {progress >= 70 && t('home.finalizing')}
                                    </p>
                                </div>
                            )}

                            {error && (
                                <div className="mt-4 p-4 bg-danger-50 border border-danger-200 rounded-lg flex items-start gap-3">
                                    <XCircle className="h-5 w-5 text-danger-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-medium text-danger-900">{t('home.analysisFailed')}</p>
                                        <p className="text-sm text-danger-700 mt-1">{error}</p>
                                        <Button variant="danger" size="sm" onClick={handleAnalyze} className="mt-3">{t('home.tryAgain')}</Button>
                                    </div>
                                </div>
                            )}
                        </Card>
                    </div>
                )}

                {/* Results */}
                {result && (
                    <div className="space-y-6">
                        <Card className="bg-success-50 border border-success-200">
                            <div className="flex items-center gap-3">
                                <CheckCircle className="h-6 w-6 text-success-600" />
                                <div>
                                    <h3 className="font-semibold text-success-900">{t('home.analysisComplete')}</h3>
                                    <p className="text-sm text-success-700">{t('home.seeResults')}</p>
                                </div>
                            </div>
                        </Card>

                        <AnalysisResults
                            result={result}
                            country={selectedTargetCountry}
                            originCountry={selectedOriginCountry}
                            onReanalyze={handleReanalyze}
                        />

                        <div className="flex justify-center gap-4">
                            <Button variant="secondary" size="lg" onClick={() => window.location.href = '/history'}>
                                {t('home.viewHistory')}
                            </Button>
                            <Button variant="primary" size="lg" onClick={handleNewAnalysis}>
                                {t('home.analyzeAnother')}
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            {/* Features Section */}
            {!selectedFile && !result && (
                <div className="mt-24 border-t border-neutral-200 pt-16">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl font-display font-semibold text-center text-neutral-900 mb-12">
                            {t('home.howItWorks')}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center group hover:-translate-y-1 transition-transform duration-300">
                                <div className="inline-flex p-4 bg-primary-100 rounded-2xl mb-4 group-hover:bg-primary-200 transition-colors">
                                    <Upload className="h-8 w-8 text-primary-600" />
                                </div>
                                <h3 className="font-semibold text-neutral-900 mb-2">{t('home.step1Title')}</h3>
                                <p className="text-sm text-neutral-600 leading-relaxed px-4">
                                    {t('home.step1Desc')}
                                </p>
                            </div>

                            <div className="text-center group hover:-translate-y-1 transition-transform duration-300 delay-100">
                                <div className="inline-flex p-4 bg-purple-100 rounded-2xl mb-4 group-hover:bg-purple-200 transition-colors">
                                    <Loader className="h-8 w-8 text-purple-600" />
                                </div>
                                <h3 className="font-semibold text-neutral-900 mb-2">{t('home.step2Title')}</h3>
                                <p className="text-sm text-neutral-600 leading-relaxed px-4">
                                    {t('home.step2Desc')}
                                </p>
                            </div>

                            <div className="text-center group hover:-translate-y-1 transition-transform duration-300 delay-200">
                                <div className="inline-flex p-4 bg-success-100 rounded-2xl mb-4 group-hover:bg-success-200 transition-colors">
                                    <CheckCircle className="h-8 w-8 text-success-600" />
                                </div>
                                <h3 className="font-semibold text-neutral-900 mb-2">{t('home.step3Title')}</h3>
                                <p className="text-sm text-neutral-600 leading-relaxed px-4">
                                    {t('home.step3Desc')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default HomePage;
