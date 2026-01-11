// Custom hook for receipt analysis workflow

import { useState, useCallback } from 'react';
import { analyzeReceipt } from '../services/api';
import { processImage } from '../utils/imageProcessing';
import { saveReceipt } from '../services/storage';

export const useAnalysis = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);
    const [progress, setProgress] = useState(0);

    const analyze = useCallback(async (file, country = 'Nepal') => {
        setLoading(true);
        setError(null);
        setResult(null);
        setProgress(0);

        try {
            // Step 1: Process image (20%)
            setProgress(20);
            const { base64, fileName } = await processImage(file);

            // Step 2: Send to API (50%)
            setProgress(50);
            const analysis = await analyzeReceipt(base64, country);

            // Step 3: Save to history (80%)
            setProgress(80);
            const savedReceipt = saveReceipt({
                ...analysis,
                fileName,
                country,
                imageData: base64.substring(0, 100), // Store only thumbnail prefix
            });

            // Step 4: Complete (100%)
            setProgress(100);
            setResult(savedReceipt);

            return savedReceipt;

        } catch (err) {
            console.error('Analysis error:', err);
            setError(err.message || 'Failed to analyze receipt');
            throw err;
        } finally {
            setLoading(false);
            setTimeout(() => setProgress(0), 1000); // Reset progress after delay
        }
    }, []);

    const reset = useCallback(() => {
        setLoading(false);
        setError(null);
        setResult(null);
        setProgress(0);
    }, []);

    return {
        analyze,
        reset,
        loading,
        error,
        result,
        progress,
    };
};

export default useAnalysis;
