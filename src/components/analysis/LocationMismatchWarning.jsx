// Location Mismatch Warning Component
import React, { useState } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { SUPPORTED_COUNTRIES } from '../../constants/prompts';

/**
 * Warning banner shown when detected bill location doesn't match user selection
 * @param {object} detectionData - Location detection result from AI
 * @param {string} userSelectedOrigin - Country user claimed bill is from
 * @param {function} onReanalyze - Callback to trigger re-analysis with corrected countries
 */
export const LocationMismatchWarning = ({ detectionData, userSelectedOrigin, onReanalyze }) => {
    const [showCorrection, setShowCorrection] = useState(false);
    const [correctedOrigin, setCorrectedOrigin] = useState('');
    const [correctedTarget, setCorrectedTarget] = useState('');

    if (!detectionData) return null;

    const isMatch = detectionData.detectedCountry?.toLowerCase() === userSelectedOrigin?.toLowerCase();

    // Don't show warning if locations match
    if (isMatch) return null;

    // Auto-set corrected origin to detected country on first show
    if (showCorrection && !correctedOrigin) {
        setCorrectedOrigin(detectionData.detectedCountry);
    }

    const handleReanalyze = () => {
        if (onReanalyze && correctedOrigin) {
            onReanalyze(correctedOrigin, correctedTarget || correctedOrigin);
        }
    };

    return (
        <div className="bg-warning-50 border-l-4 border-warning-500 p-4 mb-4 rounded-r-lg">
            <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-warning-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                    <h3 className="text-sm font-semibold text-warning-800 mb-1">
                        Location Mismatch Detected
                    </h3>
                    <p className="text-sm text-warning-700 mb-2">
                        Our AI detected this bill is from <strong>{detectionData.detectedCountry}</strong> ({detectionData.detectedCurrency}),
                        but you selected <strong>{userSelectedOrigin}</strong>.
                    </p>

                    {detectionData.evidence && detectionData.evidence.length > 0 && (
                        <div className="mt-2">
                            <p className="text-xs font-medium text-warning-800 mb-1">Evidence:</p>
                            <ul className="text-xs text-warning-700 list-disc list-inside space-y-0.5">
                                {detectionData.evidence.slice(0, 3).map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="mt-3 flex items-center gap-2 flex-wrap">
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-warning-100 text-warning-800">
                            Confidence: {detectionData.confidence}
                        </span>

                        {onReanalyze && !showCorrection && (
                            <button
                                onClick={() => setShowCorrection(true)}
                                className="inline-flex items-center gap-1 px-3 py-1 rounded text-xs font-medium bg-warning-600 text-white hover:bg-warning-700 transition-colors"
                            >
                                <RefreshCw className="w-3 h-3" />
                                Re-analyze with Correct Location
                            </button>
                        )}
                    </div>

                    {/* Re-analysis Form */}
                    {showCorrection && onReanalyze && (
                        <div className="mt-4 p-3 bg-white rounded border border-warning-200">
                            <p className="text-xs font-medium text-neutral-700 mb-2">Correct the location and re-analyze:</p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                                <div>
                                    <label className="block text-xs font-medium text-neutral-600 mb-1">
                                        Bill Origin
                                    </label>
                                    <select
                                        value={correctedOrigin || detectionData.detectedCountry}
                                        onChange={(e) => setCorrectedOrigin(e.target.value)}
                                        className="w-full px-2 py-1.5 text-sm border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-warning-500"
                                    >
                                        {SUPPORTED_COUNTRIES.map(country => (
                                            <option key={country.code} value={country.name}>
                                                {country.name} ({country.currency})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-neutral-600 mb-1">
                                        Compare with Market
                                    </label>
                                    <select
                                        value={correctedTarget || correctedOrigin || detectionData.detectedCountry}
                                        onChange={(e) => setCorrectedTarget(e.target.value)}
                                        className="w-full px-2 py-1.5 text-sm border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-warning-500"
                                    >
                                        {SUPPORTED_COUNTRIES.map(country => (
                                            <option key={country.code} value={country.name}>
                                                {country.name} ({country.currency})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={handleReanalyze}
                                    className="flex-1 px-3 py-1.5 text-sm font-medium bg-warning-600 text-white rounded hover:bg-warning-700 transition-colors flex items-center justify-center gap-1"
                                >
                                    <RefreshCw className="w-3.5 h-3.5" />
                                    Re-analyze Now
                                </button>
                                <button
                                    onClick={() => setShowCorrection(false)}
                                    className="px-3 py-1.5 text-sm font-medium bg-neutral-200 text-neutral-700 rounded hover:bg-neutral-300 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}

                    <p className="text-xs text-warning-600 mt-2 italic">
                        ⚠️ The price comparison may be inaccurate due to this mismatch. Please verify the bill origin.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LocationMismatchWarning;
