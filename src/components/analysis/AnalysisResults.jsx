// Analysis Results - main container for displaying analysis

// AnalysisResults.jsx
import React, { useState } from 'react';
import { ItemBreakdown } from './ItemBreakdown';
import { SummaryCard } from './SummaryCard';
import { ResultCharts } from './ResultCharts';
import { ReportHeader } from './ReportHeader';
import { FairReceiptGenerator } from './FairReceiptGenerator';
import { LocationMismatchWarning } from './LocationMismatchWarning';
import { ComparisonInfoBanner } from './ComparisonInfoBanner';
import ImagePreview from '../upload/ImagePreview';
import { useLanguage } from '../../contexts/LanguageContext';
import { formatCurrency } from '../../utils/formatting';
import { usePDFExport } from '../../hooks/usePDFExport';
import { Download, Loader, Eye, EyeOff } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';

export const AnalysisResults = ({ result, file, country = 'Nepal', originCountry = 'Nepal', onReanalyze }) => {
    const { t } = useLanguage();
    const { exportToPDF, isExporting } = usePDFExport();
    const [showPreview, setShowPreview] = useState(true);

    if (!result) return null;
    const { items, overallAnalysis, originalTotal, optimizedTotal, totalSavings, _detectionData } = result;
    const hasOvercharges = originalTotal > optimizedTotal;

    const handleDownload = async () => {
        await exportToPDF('analysis-content', `medbill-analysis-${Date.now()}.pdf`);
    };

    return (
        <div className="animate-slide-up">
            {/* Header / Actions - Mobile Only Actions could go here */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h2 className="text-2xl font-bold font-display text-neutral-900">Analysis Results</h2>
                    <p className="text-neutral-500">We found potential savings in your bill.</p>
                </div>

                <div className="flex gap-3">
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
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">

                {/* LEFT PANEL - Analysis Content (scrollable) */}
                <div id="analysis-content" className="lg:col-span-7 space-y-6">
                    {/* Report Header */}
                    <ReportHeader />

                    {/* Alerts & Warnings */}
                    <LocationMismatchWarning
                        detectionData={_detectionData}
                        userSelectedOrigin={originCountry}
                        onReanalyze={onReanalyze}
                    />
                    <ComparisonInfoBanner
                        originCountry={originCountry}
                        targetCountry={country}
                        detectionData={_detectionData}
                    />

                    {/* Primary Status Card */}
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

                    {/* Charts & Summary */}
                    <SummaryCard result={result} country={country} />
                    <ResultCharts result={result} />

                    {/* AI Analysis Text */}
                    {overallAnalysis && (
                        <Card>
                            <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-3">
                                {t('analysis.summary')}
                            </h3>
                            <p className="text-neutral-700 leading-relaxed whitespace-pre-wrap font-sans">
                                {overallAnalysis}
                            </p>
                        </Card>
                    )}

                    {/* Detailed Item Breakdown */}
                    <div>
                        <h2 className="text-xl font-display font-semibold text-neutral-900 mb-4 flex items-center justify-between">
                            {t('analysis.itemBreakdown')}
                            <span className="text-sm font-normal text-neutral-500 bg-neutral-100 px-2 py-1 rounded-full">{items.length} items</span>
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
                    <Card className="bg-neutral-50 border-none shadow-none">
                        <p className="text-xs text-neutral-500 italic text-center">
                            {t('analysis.disclaimer')}
                        </p>
                    </Card>
                </div>


                {/* RIGHT PANEL - Original Bill (Sticky) */}
                <div className="hidden lg:block lg:col-span-5 sticky top-24">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-neutral-900">Original Bill</h3>
                        <button
                            onClick={() => setShowPreview(!showPreview)}
                            className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
                        >
                            {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            {showPreview ? 'Hide' : 'Show'}
                        </button>
                    </div>

                    {showPreview && file && (
                        <div className="bg-neutral-900 rounded-xl overflow-hidden shadow-2xl border border-neutral-800 ring-1 ring-white/10" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                            {/* Reusing ImagePreview but removing remove button capability via CSS or prop if supported, or just using raw image for cleaner view */}
                            <div className="relative">
                                <ImagePreview file={file} onRemove={undefined} />
                                {/* Overlay to prevent interaction if needed, or simple view */}
                            </div>
                        </div>
                    )}

                    {!file && (
                        <div className="bg-neutral-100 rounded-xl p-8 text-center text-neutral-400 border border-dashed border-neutral-300">
                            No image available
                        </div>
                    )}

                    <div className="mt-6 bg-primary-50 p-4 rounded-xl border border-primary-100">
                        <h4 className="font-semibold text-primary-800 mb-2 text-sm">💡 Negotiation Tip</h4>
                        <p className="text-sm text-primary-700">
                            Use the saved "Fair Receipt" to show the billing department what you expect to pay based on market rates.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AnalysisResults;
