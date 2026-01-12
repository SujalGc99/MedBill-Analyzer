// Analysis Results - main container for displaying analysis

// AnalysisResults.jsx
import React from 'react';
import { ItemBreakdown } from './ItemBreakdown';
import { SummaryCard } from './SummaryCard';
import { FairReceiptGenerator } from './FairReceiptGenerator';
import { LocationMismatchWarning } from './LocationMismatchWarning';
import { ComparisonInfoBanner } from './ComparisonInfoBanner';
import { useLanguage } from '../../contexts/LanguageContext';
import { formatCurrency } from '../../utils/formatting';
import { usePDFExport } from '../../hooks/usePDFExport';
import { Download, Loader } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';

export const AnalysisResults = ({ result, country = 'Nepal', originCountry = 'Nepal', onReanalyze }) => {
    const { t } = useLanguage();
    const { exportToPDF, isExporting } = usePDFExport();

    if (!result) return null;
    const { items, overallAnalysis, originalTotal, optimizedTotal, totalSavings, _detectionData, _locationMatch } = result;
    const hasOvercharges = originalTotal > optimizedTotal;

    const handleDownload = async () => {
        await exportToPDF('analysis-content', `medbill-analysis-${Date.now()}.pdf`);
    };

    return (
        <div className="space-y-6 animate-slide-up">
            {/* Action Bar */}
            <div className="flex justify-end gap-3">
                <FairReceiptGenerator
                    result={result}
                    originCountry={originCountry}
                    targetCountry={country}
                />

                <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleDownload}
                    disabled={isExporting}
                    className="flex items-center gap-2"
                >
                    {isExporting ? <Loader className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                    {isExporting ? t('home.downloading') : t('home.downloadPdf')}
                </Button>
            </div>

            {/* Printable Content */}
            <div id="analysis-content" className="space-y-6">
                {/* Location Mismatch Warning - Shows when detected location ≠ user selection */}
                <LocationMismatchWarning
                    detectionData={_detectionData}
                    userSelectedOrigin={originCountry}
                    onReanalyze={onReanalyze}
                />

                {/* Comparison Info - Shows when comparing different countries */}
                <ComparisonInfoBanner
                    originCountry={originCountry}
                    targetCountry={country}
                    detectionData={_detectionData}
                />

                {/* Overall Status Alert */}
                {hasOvercharges ? (
                    <Card className="bg-warning-50 border border-warning-200">
                        <h3 className="font-bold text-warning-800 text-lg mb-1">{t('analysis.overchargingDetected')}</h3>
                        <p className="text-warning-700">
                            {t('analysis.youCouldSave', { amount: formatCurrency(totalSavings) })}
                        </p>
                    </Card>
                ) : (
                    <Card className="bg-success-50 border border-success-200">
                        <h3 className="font-bold text-success-800 text-lg mb-1">{t('analysis.fairPricing')}</h3>
                        <p className="text-success-700">
                            {t('analysis.pricesLookFair')}
                        </p>
                    </Card>
                )}

                {/* Summary Cards */}
                <SummaryCard result={result} country={country} />

                {/* Overall Analysis */}
                {overallAnalysis && (
                    <Card>
                        <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-3">
                            {t('analysis.summary')}
                        </h3>
                        <p className="text-neutral-700 leading-relaxed whitespace-pre-wrap">
                            {overallAnalysis}
                        </p>
                    </Card>
                )}

                {/* Item-by-item breakdown */}
                <div>
                    <h2 className="text-xl font-display font-semibold text-neutral-900 mb-4">{t('analysis.itemBreakdown')}</h2>
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
                    <p className="text-xs text-neutral-500 italic text-center">
                        {t('analysis.disclaimer')}
                    </p>
                </Card>
            </div>
        </div>
    );
};

export default AnalysisResults;
