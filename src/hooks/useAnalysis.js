// Custom hook for receipt analysis workflow

import { useState, useCallback } from 'react';
import { analyzReceiptComplete } from '../services/api';
import { processImage } from '../utils/imageProcessing';
import { saveReceipt } from '../services/storage';

export const useAnalysis = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);
    const [progress, setProgress] = useState(0);

    const analyze = useCallback(async (file, targetCountry = 'Nepal', originCountry = 'Nepal') => {
        setLoading(true);
        setError(null);
        setResult(null);
        setProgress(0);

        try {
            // Step 1: Process image (10%)
            setProgress(10);
            const { base64, fileName } = await processImage(file);

            // Step 2 & 3: Two-phase analysis with progress tracking
            const onProgressUpdate = (update) => {
                if (update.progress) {
                    setProgress(update.progress);
                }

                // Log location warnings to console
                if (update.warning) {
                    console.warn('⚠️ Location Mismatch:', update.warning);
                }
            };

            const analysis = await analyzReceiptComplete(
                base64,
                targetCountry,
                originCountry,
                onProgressUpdate
            );

            // Sanitize results: Ensure status matches the numbers
            if (analysis.items) {
                analysis.items = analysis.items.map(item => {
                    // Force 'overpriced' if charged > max fair price
                    if (item.chargedPrice > item.fairPriceMax) {
                        return { ...item, status: 'overpriced' };
                    }
                    // Force 'cheap' if charged < min fair price
                    if (item.chargedPrice < item.fairPriceMin) {
                        return { ...item, status: 'cheap' };
                    }
                    // Force 'fair' if within range but wrongly marked
                    if (item.chargedPrice >= item.fairPriceMin &&
                        item.chargedPrice <= item.fairPriceMax &&
                        (item.status === 'overpriced' || item.status === 'cheap')) {
                        return { ...item, status: 'fair' };
                    }
                    return item;
                });

                // Recalculate totals based on sanitized items
                const calculatedOriginal = analysis.items.reduce((sum, item) => sum + (item.chargedPrice || 0), 0);

                // Optimized total = sum of (charged if fair/cheap, fairMax if overpriced)
                const calculatedOptimized = analysis.items.reduce((sum, item) => {
                    const price = item.status === 'overpriced' ? (item.fairPriceMax || item.chargedPrice) : item.chargedPrice;
                    return sum + price;
                }, 0);

                analysis.originalTotal = calculatedOriginal;
                analysis.optimizedTotal = calculatedOptimized;
                analysis.totalSavings = calculatedOriginal - calculatedOptimized;
                analysis.savingsPercentage = calculatedOriginal > 0
                    ? parseFloat(((analysis.totalSavings / calculatedOriginal) * 100).toFixed(1))
                    : 0;
            }

            // Save to history
            const savedReceipt = saveReceipt({
                ...analysis,
                fileName,
                country: targetCountry,
                originCountry,
                imageData: base64.substring(0, 100),
            });

            // Complete
            setProgress(100);
            setResult(savedReceipt);

            // Show validation warnings if any
            if (analysis._validation?.warnings?.length > 0) {
                console.warn('📊 Analysis Warnings:', analysis._validation.warnings);
            }

            // Show location mismatch warning if applicable
            if (analysis._locationMatch && !analysis._locationMatch.isMatch) {
                console.warn('🌍', analysis._locationMatch.warning);
            }

            return savedReceipt;

        } catch (err) {
            console.error('Analysis error:', err);
            setError(err.message || 'Failed to analyze receipt');
            throw err;
        } finally {
            setLoading(false);
            setTimeout(() => setProgress(0), 1000);
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
        setResult,
        progress,
        setProgress,
    };
};

export default useAnalysis;
