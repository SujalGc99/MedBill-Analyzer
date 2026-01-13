import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import FileUpload from '../components/upload/FileUpload';
import ImagePreview from '../components/upload/ImagePreview';
import AnalysisResults from '../components/analysis/AnalysisResults';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import LoadingScreen from '../components/common/LoadingScreen';
import HeroSection from '../components/layout/HeroSection';
import ProblemSection from '../components/layout/ProblemSection';
import HowItWorks from '../components/layout/HowItWorks';
import TrustSection from '../components/layout/TrustSection';
import UploadSection from '../components/layout/UploadSection';
import useAnalysis from '../hooks/useAnalysis';
import { useLanguage } from '../contexts/LanguageContext';
import { SUPPORTED_COUNTRIES } from '../constants/prompts';
import { DEMO_DATA } from '../constants/demoData';
import { Upload, Loader, CheckCircle, XCircle } from 'lucide-react';

export const HomePage = () => {
    const [viewMode, setViewMode] = useState('landing'); // 'landing' | 'upload'
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedTargetCountry, setSelectedTargetCountry] = useState('Nepal');
    const [selectedOriginCountry, setSelectedOriginCountry] = useState('Nepal');
    const { analyze, reset, loading, error, result, progress, setResult, setProgress } = useAnalysis();
    const { t } = useLanguage();

    // Demo Mode Logic
    const [searchParams] = useSearchParams();
    const isDemoMode = searchParams.get('demo') === 'true';

    const triggerDemoAnalysis = (countryKey = 'USA') => {
        reset();

        // Auto-set countries based on demo selection
        const demoData = DEMO_DATA[countryKey] || DEMO_DATA['USA'];

        const countryMapping = {
            'USA': 'USA',
            'INDIA': 'India',
            'NEPAL': 'Nepal',
            'GENERAL': 'USA' // General Hospital uses USA context
        };

        const countryName = countryMapping[countryKey] || 'USA';

        setSelectedOriginCountry(countryName);
        setSelectedTargetCountry(countryName); // Default to local comparison

        setViewMode('processing');

        // Simulate progress for smooth UX
        setProgress(10);
        setTimeout(() => setProgress(35), 600);
        setTimeout(() => setProgress(65), 1200);
        setTimeout(() => setProgress(90), 1800);

        // Simulate loading then set result
        setTimeout(() => {
            setResult(demoData);
            setProgress(100);
            setViewMode('analysis');
        }, 2000);
    };

    const handleFileSelect = (file) => {
        setSelectedFile(file);
    };

    const handleAnalyze = async (fileToAnalyze) => {
        // Handle case where fileToAnalyze is a Click Event or not a File
        const isFile = fileToAnalyze instanceof File;
        const file = isFile ? fileToAnalyze : selectedFile;

        if (!file) {
            console.error('No file selected for analysis');
            return;
        }

        try {
            await analyze(file, selectedTargetCountry, selectedOriginCountry);
        } catch (err) {
            console.error('Analysis failed:', err);
        }
    };

    const handleReanalyze = async (correctedOrigin, correctedTarget) => {
        setSelectedOriginCountry(correctedOrigin);
        setSelectedTargetCountry(correctedTarget);
        reset(); // Clear previous result
        try {
            // We need to keep the file from state
            if (selectedFile) {
                await analyze(selectedFile, correctedTarget, correctedOrigin);
            }
        } catch (err) {
            console.error('Re-analysis failed:', err);
        }
    };

    const handleNewAnalysis = () => {
        setSelectedFile(null);
        reset();
        setViewMode('upload');
    };

    // Effect for Demo Mode
    useEffect(() => {
        if (isDemoMode) {
            // Optional: Auto-start demo or just stay in demo mode
        }
    }, [isDemoMode]);


    // VIEW CONTROLLER LOGIC
    if (loading || viewMode === 'processing') {
        return <LoadingScreen progress={progress} />;
    }

    if (result) {
        return (
            <div className="min-h-screen bg-neutral-50 pb-20 pt-10 px-4">
                <div className="max-w-7xl mx-auto">
                    <AnalysisResults
                        result={result}
                        file={selectedFile}
                        country={selectedTargetCountry}
                        originCountry={selectedOriginCountry}
                        onReanalyze={handleReanalyze}
                    />
                    <div className="mt-12 flex justify-center">
                        <Button variant="secondary" size="lg" onClick={handleNewAnalysis}>
                            Analyze Another Bill
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    if (viewMode === 'upload') {
        return (
            <UploadSection
                onBack={() => setViewMode('landing')}
                onFileSelect={handleFileSelect}
                selectedFile={selectedFile}
                onRemoveFile={() => setSelectedFile(null)}
                onAnalyze={handleAnalyze}
                loading={loading}
                error={error}

                // Country Selection Props
                originCountry={selectedOriginCountry}
                setOriginCountry={setSelectedOriginCountry}
                targetCountry={selectedTargetCountry}
                setTargetCountry={setSelectedTargetCountry}
                onDemoClick={triggerDemoAnalysis}
            />
        );
    }

    // Default: Landing Page View
    return (
        <div className="animate-in fade-in duration-500">
            <HeroSection
                onUploadClick={() => setViewMode('upload')}
                demoMode={isDemoMode}
                onDemoClick={triggerDemoAnalysis}
            />
            <ProblemSection />
            <HowItWorks />
            <TrustSection />
        </div>
    );
};

export default HomePage;
