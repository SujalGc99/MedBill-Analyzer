// Analysis Results - main container for displaying analysis

import { AlertCircle, CheckCircle2, FileText } from 'lucide-react';
import SummaryCard from './SummaryCard';
import ItemBreakdown from './ItemBreakdown';
import Card from '../common/Card';

export const AnalysisResults = ({ result, country = 'Nepal' }) => {
    if (!result) return null;

    const { items, overallAnalysis, originalTotal, optimizedTotal } = result;
    const hasOvercharges = originalTotal > optimizedTotal;

    return (
        <div className="space-y-6 animate-slide-up">
            {/* Overall Status Alert */}
            {hasOvercharges ? (
                <Card className="bg-warning-50 border border-warning-200">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="h-6 w-6 text-warning-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <h3 className="font-semibold text-warning-900 mb-1">
                                Overcharging Detected!
                            </h3>
                            <p className="text-sm text-warning-700">
                                We found some items that are overpriced. See the breakdown below for details.
                            </p>
                        </div>
                    </div>
                </Card>
            ) : (
                <Card className="bg-success-50 border border-success-200">
                    <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-6 w-6 text-success-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <h3 className="font-semibold text-success-900 mb-1">
                                Fair Pricing!
                            </h3>
                            <p className="text-sm text-success-700">
                                All items appear to be fairly priced based on market rates.
                            </p>
                        </div>
                    </div>
                </Card>
            )}

            {/* Summary Cards */}
            <SummaryCard result={result} country={country} />

            {/* Overall Analysis */}
            {overallAnalysis && (
                <Card>
                    <div className="flex items-start gap-3">
                        <FileText className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <h3 className="font-semibold text-neutral-900 mb-2">Analysis Summary</h3>
                            <p className="text-neutral-700 leading-relaxed">{overallAnalysis}</p>
                        </div>
                    </div>
                </Card>
            )}

            {/* Item-by-item breakdown */}
            <div>
                <h2 className="text-xl font-display font-semibold text-neutral-900 mb-4">
                    Item-by-Item Breakdown
                </h2>
                <div className="space-y-3">
                    {items.map((item, index) => (
                        <ItemBreakdown
                            key={index}
                            item={item}
                            country={country}
                        />
                    ))}
                </div>
            </div>

            {/* Disclaimer */}
            <Card className="bg-neutral-50">
                <p className="text-xs text-neutral-600 leading-relaxed">
                    <strong>Disclaimer:</strong> This analysis is based on general market data and AI estimates.
                    Prices may vary by location, pharmacy, and medicine brand. Always consult with healthcare
                    professionals and licensed pharmacies for medical decisions.
                </p>
            </Card>
        </div>
    );
};

export default AnalysisResults;
