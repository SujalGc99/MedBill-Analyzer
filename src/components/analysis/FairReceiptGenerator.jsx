import React, { useState, useRef } from 'react';
import { FileDown, Download, CheckCircle, AlertTriangle } from 'lucide-react';
import { formatCurrency } from '../../utils/formatting';
import { useLanguage } from '../../contexts/LanguageContext';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const FairReceiptGenerator = ({ result, originCountry, targetCountry }) => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const receiptRef = useRef(null);
    const { t } = useLanguage();

    // Check if there are any overpriced items
    const overchargedItems = result?.items?.filter(item => item.status === 'overpriced') || [];
    // Always possible to generate receipt now, so we remove the check
    // const hasOvercharges = overchargedItems.length > 0;

    const generateTimestamp = () => {
        const now = new Date();
        return {
            display: now.toLocaleString(),
            filename: now.toISOString().replace(/[:.]/g, '-').slice(0, -5)
        };
    };

    const downloadAsPNG = async () => {
        if (!receiptRef.current) return;

        setIsGenerating(true);
        try {
            const canvas = await html2canvas(receiptRef.current, {
                scale: 2,
                backgroundColor: '#ffffff',
                logging: false
            });

            const link = document.createElement('a');
            const timestamp = generateTimestamp();
            link.download = `fair-receipt-${timestamp.filename}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        } catch (error) {
            console.error('PNG generation failed:', error);
            alert('Failed to generate image. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    const downloadAsPDF = async () => {
        if (!receiptRef.current) return;

        setIsGenerating(true);
        try {
            const canvas = await html2canvas(receiptRef.current, {
                scale: 2,
                backgroundColor: '#ffffff',
                logging: false
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            const imgWidth = 210; // A4 width in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

            const timestamp = generateTimestamp();
            pdf.save(`fair-receipt-${timestamp.filename}.pdf`);
        } catch (error) {
            console.error('PDF generation failed:', error);
            alert('Failed to generate PDF. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    const downloadBoth = async () => {
        await downloadAsPDF();
        setTimeout(() => downloadAsPNG(), 500);
    };

    const timestamp = generateTimestamp();

    return (
        <>
            <button
                onClick={() => setShowPreview(true)}
                className="btn btn-primary flex items-center gap-2"
                disabled={isGenerating}
            >
                <FileDown className="h-5 w-5" />
                Generate Fair Receipt
            </button>

            {showPreview && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
                        <div className="sticky top-0 bg-white border-b border-neutral-200 p-4 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-neutral-900">Fair Receipt Preview</h3>
                            <button
                                onClick={() => setShowPreview(false)}
                                className="text-neutral-500 hover:text-neutral-700 text-2xl"
                            >
                                ×
                            </button>
                        </div>

                        {/* Receipt Preview */}
                        <div className="p-6">
                            <div ref={receiptRef} className="bg-white p-8 border-2 border-neutral-200 rounded-lg">
                                {/* Header */}
                                <div className="text-center mb-6 pb-6 border-b-2 border-primary-500">
                                    <div className="text-3xl font-bold text-primary-600 mb-2">
                                        MedBill Analyzer
                                    </div>
                                    <div className="text-sm text-neutral-600">
                                        Fair Medical Pricing Receipt
                                    </div>
                                    <div className="text-xs text-neutral-500 mt-2">
                                        Generated: {timestamp.display}
                                    </div>
                                </div>

                                {/* Info Section */}
                                <div className="mb-6 bg-neutral-50 p-4 rounded-lg">
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                        <div>
                                            <span className="font-semibold">Original Receipt From:</span>
                                            <div className="text-neutral-700">{originCountry}</div>
                                        </div>
                                        <div>
                                            <span className="font-semibold">Compared Against:</span>
                                            <div className="text-neutral-700">{targetCountry}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Item Breakdown */}
                                <div className="mb-6">
                                    <h4 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
                                        Item Details
                                    </h4>

                                    {result?.items?.map((item, index) => {
                                        const isOverpriced = item.status === 'overpriced';
                                        const savings = item.chargedPrice - item.fairPriceMax;
                                        const savingsPercent = ((savings / item.chargedPrice) * 100).toFixed(1);

                                        return (
                                            <div key={index} className={`mb-3 p-3 border rounded-lg ${isOverpriced ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'
                                                }`}>
                                                <div className="flex justify-between items-start mb-1">
                                                    <div className="font-semibold text-neutral-900">{item.name}</div>
                                                    <div className={`text-xs font-bold px-2 py-0.5 rounded-full ${isOverpriced ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                                                        }`}>
                                                        {isOverpriced ? 'Overcharged' : 'Fair Price'}
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4 text-sm mt-2">
                                                    <div>
                                                        <span className="text-xs text-neutral-500 block">Charged</span>
                                                        <span className={`${isOverpriced ? 'text-red-700 line-through' : 'text-neutral-900 font-medium'}`}>
                                                            {formatCurrency(item.chargedPrice, result.currency)}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <span className="text-xs text-neutral-500 block">Fair Price</span>
                                                        <span className="text-green-700 font-bold">
                                                            {formatCurrency(isOverpriced ? item.fairPriceMax : item.chargedPrice, result.currency)}
                                                        </span>
                                                    </div>
                                                </div>

                                                {isOverpriced && (
                                                    <div className="mt-2 pt-2 border-t border-red-100 text-green-700 font-bold text-sm flex items-center gap-1">
                                                        <CheckCircle className="h-3 w-3" />
                                                        Saving: {formatCurrency(savings, result.currency)} ({savingsPercent}%)
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Summary */}
                                <div className="border-t-2 border-neutral-300 pt-4 mb-6">
                                    <h4 className="text-lg font-bold text-neutral-900 mb-4">Summary</h4>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-red-700">
                                            <span className="font-semibold">Original Total:</span>
                                            <span className="line-through">{formatCurrency(result.originalTotal, result.currency)}</span>
                                        </div>
                                        <div className="flex justify-between text-green-700 font-semibold">
                                            <span>Fair Total:</span>
                                            <span>{formatCurrency(result.optimizedTotal, result.currency)}</span>
                                        </div>
                                        <div className="flex justify-between text-primary-600 font-bold text-lg pt-2 border-t border-neutral-300">
                                            <span>Total Savings:</span>
                                            <span>{formatCurrency(result.totalSavings, result.currency)} ({result.savingsPercentage}%)</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Disclaimer */}
                                <div className="bg-amber-50 border border-amber-300 rounded-lg p-4">
                                    <div className="flex items-start gap-2">
                                        <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                                        <div className="text-xs text-neutral-700">
                                            <div className="font-semibold mb-1 text-neutral-900">Medical Disclaimer</div>
                                            This is an AI-generated estimate based on available market data and should not be considered as medical or legal advice.
                                            Always consult with healthcare professionals or legal experts for official verification.
                                            Fair prices are estimates based on {targetCountry} market standards.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Download Buttons */}
                        <div className="sticky bottom-0 bg-neutral-50 border-t border-neutral-200 p-4 flex gap-3">
                            <button
                                onClick={downloadAsPDF}
                                disabled={isGenerating}
                                className="btn btn-primary flex-1 flex items-center justify-center gap-2"
                            >
                                <Download className="h-4 w-4" />
                                Download PDF
                            </button>
                            <button
                                onClick={downloadAsPNG}
                                disabled={isGenerating}
                                className="btn btn-secondary flex-1 flex items-center justify-center gap-2"
                            >
                                <Download className="h-4 w-4" />
                                Download Image
                            </button>
                            <button
                                onClick={downloadBoth}
                                disabled={isGenerating}
                                className="btn btn-success flex-1 flex items-center justify-center gap-2"
                            >
                                <CheckCircle className="h-4 w-4" />
                                Download Both
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default FairReceiptGenerator;
