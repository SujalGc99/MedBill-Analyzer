// Comparison Info Banner Component
import React from 'react';
import { Info, ArrowRight } from 'lucide-react';

/**
 * Info banner showing what comparison was made (origin vs target country)
 * Only shown when origin ≠ target
 * @param {string} originCountry - Country where bill is from
 * @param {string} targetCountry - Country being compared against
 * @param {object} detectionData - Optional detection data for more context
 */
export const ComparisonInfoBanner = ({ originCountry, targetCountry, detectionData }) => {
    // Don't show if comparing to same country
    if (originCountry?.toLowerCase() === targetCountry?.toLowerCase()) {
        return null;
    }

    return (
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-3 mb-4">
            <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-medium text-primary-900">
                            Bill from {originCountry}
                        </span>
                        <ArrowRight className="w-4 h-4 text-primary-500" />
                        <span className="text-sm font-medium text-primary-900">
                            Compared to {targetCountry} market prices
                        </span>
                    </div>

                    {detectionData && (
                        <p className="text-xs text-primary-700 mt-1">
                            Auto-detected currency: <strong>{detectionData.detectedCurrency}</strong>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ComparisonInfoBanner;
