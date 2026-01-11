// Main App Component

import { useState } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import FileUpload from './components/upload/FileUpload';
import ImagePreview from './components/upload/ImagePreview';
import AnalysisResults from './components/analysis/AnalysisResults';
import Button from './components/common/Button';
import Card from './components/common/Card';
import useAnalysis from './hooks/useAnalysis';
import { SUPPORTED_COUNTRIES } from './constants/prompts';
import { Upload, Loader, CheckCircle, XCircle } from 'lucide-react';

function App() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState('Nepal');
    const { analyze, reset, loading, error, result, progress } = useAnalysis();

    const handleFileSelect = (file) => {
        setSelectedFile(file);
        reset(); // Clear previous results
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
        reset();
    };

    const handleAnalyze = async () => {
        if (!selectedFile) return;

        try {
            await analyze(selectedFile, selectedCountry);
            // Result will be automatically set by the hook
        } catch (err) {
            console.error('Analysis failed:', err);
            // Error will be automatically set by the hook
        }
    };

    const handleNewAnalysis = () => {
        setSelectedFile(null);
        reset();
    };

    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col">
            <Header />

            <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Hero Section */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl sm:text-5xl font-display font-bold text-neutral-900 mb-4">
                        Stop Overpaying for Medicine
                    </h1>
                    <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                        Upload your medical bill and our AI will instantly analyze it, flagging overpriced items
                        and showing you how much you should really pay.
                    </p>
                </div>

                {/* Main Content */}
                <div className="max-w-4xl mx-auto">
                    {!result && !selectedFile && (
                        <Card>
                            {/* Country Selection */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-neutral-700 mb-2">
                                    Select Country
                                </label>
                                <select
                                    value={selectedCountry}
                                    onChange={(e) => setSelectedCountry(e.target.value)}
                                    className="input max-w-xs"
                                    disabled={loading}
                                >
                                    {SUPPORTED_COUNTRIES.map(country => (
                                        <option key={country.code} value={country.name}>
                                            {country.name} ({country.currency})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* File Upload */}
                            <FileUpload onFileSelect={handleFileSelect} disabled={loading} />
                        </Card>
                    )}

                    {/* File Preview & Analyze Button */}
                    {selectedFile && !result && (
                        <div className="space-y-6">
                            <Card>
                                <h2 className="text-xl font-semibold text-neutral-900 mb-4">
                                    Receipt Preview
                                </h2>
                                <ImagePreview file={selectedFile} onRemove={handleRemoveFile} />

                                {/* Analyze Button */}
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
                                                Analyzing... {progress}%
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-2">
                                                <Upload className="h-5 w-5" />
                                                Analyze Receipt
                                            </span>
                                        )}
                                    </Button>

                                    <Button
                                        variant="secondary"
                                        size="lg"
                                        onClick={handleRemoveFile}
                                        disabled={loading}
                                    >
                                        Cancel
                                    </Button>
                                </div>

                                {/* Progress Bar */}
                                {loading && progress > 0 && (
                                    <div className="mt-4">
                                        <div className="bg-neutral-200 rounded-full h-2 overflow-hidden">
                                            <div
                                                className="bg-primary-500 h-full transition-all duration-300 ease-out"
                                                style={{ width: `${progress}%` }}
                                            />
                                        </div>
                                        <p className="text-sm text-neutral-600 text-center mt-2">
                                            {progress < 30 && 'Processing image...'}
                                            {progress >= 30 && progress < 70 && 'Analyzing with AI...'}
                                            {progress >= 70 && 'Finalizing results...'}
                                        </p>
                                    </div>
                                )}

                                {/* Error Message */}
                                {error && (
                                    <div className="mt-4 p-4 bg-danger-50 border border-danger-200 rounded-lg flex items-start gap-3">
                                        <XCircle className="h-5 w-5 text-danger-600 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-medium text-danger-900">Analysis Failed</p>
                                            <p className="text-sm text-danger-700 mt-1">{error}</p>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={handleAnalyze}
                                                className="mt-3"
                                            >
                                                Try Again
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </Card>
                        </div>
                    )}

                    {/* Analysis Results */}
                    {result && (
                        <div className="space-y-6">
                            {/* Success Message */}
                            <Card className="bg-success-50 border border-success-200">
                                <div className="flex items-center gap-3">
                                    <CheckCircle className="h-6 w-6 text-success-600" />
                                    <div>
                                        <h3 className="font-semibold text-success-900">
                                            Analysis Complete!
                                        </h3>
                                        <p className="text-sm text-success-700">
                                            Your receipt has been analyzed. See the results below.
                                        </p>
                                    </div>
                                </div>
                            </Card>

                            {/* Results */}
                            <AnalysisResults result={result} country={selectedCountry} />

                            {/* New Analysis Button */}
                            <div className="flex justify-center">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    onClick={handleNewAnalysis}
                                >
                                    Analyze Another Receipt
                                </Button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Features */}
                {!selectedFile && !result && (
                    <div className="mt-16 max-w-4xl mx-auto">
                        <h2 className="text-2xl font-display font-semibold text-center text-neutral-900 mb-8">
                            How It Works
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Card className="text-center">
                                <div className="inline-flex p-4 bg-primary-100 rounded-full mb-4">
                                    <Upload className="h-8 w-8 text-primary-600" />
                                </div>
                                <h3 className="font-semibold text-neutral-900 mb-2">1. Upload</h3>
                                <p className="text-sm text-neutral-600">
                                    Take a photo or upload your medical receipt
                                </p>
                            </Card>

                            <Card className="text-center">
                                <div className="inline-flex p-4 bg-success-100 rounded-full mb-4">
                                    <Loader className="h-8 w-8 text-success-600" />
                                </div>
                                <h3 className="font-semibold text-neutral-900 mb-2">2. Analyze</h3>
                                <p className="text-sm text-neutral-600">
                                    AI scans and analyzes each item's pricing
                                </p>
                            </Card>

                            <Card className="text-center">
                                <div className="inline-flex p-4 bg-danger-100 rounded-full mb-4">
                                    <CheckCircle className="h-8 w-8 text-danger-600" />
                                </div>
                                <h3 className="font-semibold text-neutral-900 mb-2">3. Save Money</h3>
                                <p className="text-sm text-neutral-600">
                                    See overpriced items and potential savings
                                </p>
                            </Card>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}

export default App;
