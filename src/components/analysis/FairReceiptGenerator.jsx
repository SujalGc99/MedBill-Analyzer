import React, { useState, useRef } from 'react';
import { FileDown, Download, CheckCircle, AlertTriangle } from 'lucide-react';
import { formatCurrency } from '../../utils/formatting';
import { useLanguage } from '../../contexts/LanguageContext';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Helper to determine status color
const getWebStatusColor = (charged, fairMax) => {
    if (charged <= fairMax) return 'green'; // Fair or under
    const percentOver = ((charged - fairMax) / fairMax) * 100;
    if (percentOver <= 10) return 'green';
    if (percentOver <= 30) return 'yellow';
    return 'red';
};

export const FairReceiptGenerator = ({ result, originCountry, targetCountry }) => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const receiptRef = useRef(null);
    const { t } = useLanguage();

    const generateTimestamp = () => {
        const now = new Date();
        return {
            display: now.toLocaleString(),
            filename: now.toISOString().replace(/[:.]/g, '-').slice(0, -5)
        };
    };

    const handleDownload = async (format = 'pdf') => {
        if (!receiptRef.current) return;
        setIsGenerating(true);

        try {
            // Clone the element to capture full height
            const element = receiptRef.current;
            const clone = element.cloneNode(true);

            // Set styles to ensure full capture
            clone.style.position = 'fixed';
            clone.style.top = '0';
            clone.style.left = '0';
            clone.style.zIndex = '-9999';
            clone.style.width = '800px'; // Fixed width for consistent output
            clone.style.height = 'auto';
            clone.style.overflow = 'visible';

            document.body.appendChild(clone);

            const canvas = await html2canvas(clone, {
                scale: 2,
                backgroundColor: '#ffffff',
                logging: false,
                useCORS: true // if images are used
            });

            document.body.removeChild(clone);

            if (format === 'png' || format === 'both') {
                const link = document.createElement('a');
                const timestamp = generateTimestamp();
                link.download = `fair-receipt-${timestamp.filename}.png`;
                link.href = canvas.toDataURL('image/png');
                link.click();
            }

            if (format === 'pdf' || format === 'both') {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF({
                    orientation: 'portrait',
                    unit: 'mm',
                    format: 'a4'
                });

                const imgWidth = 210;
                const imgHeight = (canvas.height * imgWidth) / canvas.width;

                // If height > A4, we might need multi-page, but for receipts usually single long strip or scaled to fit is preferred.
                // For now, let's scale to width and let height flow (possibly spanning pages if we added logic, but simplistic approach is 1 page long or scaled)
                // Actually, if it's too long, better to split. But receipt style usually fits on one long page or we just scale it.
                // Let's stick to single page A4 scaling for now as it's a receipt.

                if (imgHeight > 297) {
                    // If taller than A4, maybe change to custom size? 
                    // Or just let it be.
                }

                pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
                const timestamp = generateTimestamp();
                pdf.save(`fair-receipt-${timestamp.filename}.pdf`);
            }

        } catch (error) {
            console.error('Generation failed:', error);
            alert('Failed to generate receipt. Please try again.');
        } finally {
            setIsGenerating(false);
        }
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
                        <div className="sticky top-0 bg-white border-b border-neutral-200 p-4 flex justify-between items-center z-10">
                            <h3 className="text-lg font-bold text-neutral-900">Fair Receipt Preview</h3>
                            <button
                                onClick={() => setShowPreview(false)}
                                className="text-neutral-500 hover:text-neutral-700 text-2xl"
                            >
                                ×
                            </button>
                        </div>

                        {/* Receipt Preview */}
                        <div className="p-6 overflow-y-auto">
                            <div ref={receiptRef} className="bg-white p-8 border-2 border-neutral-200 rounded-lg max-w-[800px] mx-auto">
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
                                        const statusColor = getWebStatusColor(item.chargedPrice, item.fairPriceMax);
                                        const savings = item.chargedPrice - item.fairPriceMax;
                                        const savingsPercent = ((savings / item.chargedPrice) * 100).toFixed(1);

                                        // Dynamic styles based on status
                                        let bgClass, borderClass, textClass, badgeClass;
                                        if (statusColor === 'red') {
                                            bgClass = 'bg-red-50';
                                            borderClass = 'border-red-200';
                                            textClass = 'text-red-700';
                                            badgeClass = 'bg-red-100 text-red-700';
                                        } else if (statusColor === 'yellow') {
                                            bgClass = 'bg-yellow-50';
                                            borderClass = 'border-yellow-200';
                                            textClass = 'text-yellow-700';
                                            badgeClass = 'bg-yellow-100 text-yellow-700';
                                        } else {
                                            bgClass = 'bg-green-50';
                                            borderClass = 'border-green-200';
                                            textClass = 'text-green-700';
                                            badgeClass = 'bg-green-100 text-green-700';
                                        }

                                        return (
                                            <div key={index} className={`mb-3 p-3 border rounded-lg ${bgClass} ${borderClass}`}>
                                                <div className="flex justify-between items-start mb-1">
                                                    <div className="font-semibold text-neutral-900">{item.name}</div>
                                                    <div className={`text-xs font-bold px-2 py-0.5 rounded-full ${badgeClass}`}>
                                                        {statusColor === 'green' ? 'Fair Price' : (statusColor === 'yellow' ? 'Moderate' : 'Overcharged')}
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4 text-sm mt-2">
                                                    <div>
                                                        <span className="text-xs text-neutral-500 block">Charged</span>
                                                        <span className={`${statusColor !== 'green' ? 'line-through opacity-70' : 'font-medium'} text-neutral-900`}>
                                                            {formatCurrency(item.chargedPrice, result.currency)}
                                                        </span>
                                                        {statusColor !== 'green' && (
                                                            <span className={`${textClass} font-bold ml-2`}>
                                                                {formatCurrency(item.chargedPrice, result.currency)}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <span className="text-xs text-neutral-500 block">Fair Price</span>
                                                        <span className="text-green-700 font-bold">
                                                            {formatCurrency(item.fairPriceMax, result.currency)}
                                                        </span>
                                                    </div>
                                                </div>

                                                {statusColor !== 'green' && (
                                                    <div className="mt-2 pt-2 border-t border-black/5 text-green-700 font-bold text-sm flex items-center gap-1">
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
                                        <div className="flex justify-between text-neutral-600">
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
                                onClick={() => handleDownload('pdf')}
                                disabled={isGenerating}
                                className="btn btn-primary flex-1 flex items-center justify-center gap-2"
                            >
                                <Download className="h-4 w-4" />
                                Download PDF
                            </button>
                            <button
                                onClick={() => handleDownload('png')}
                                disabled={isGenerating}
                                className="btn btn-secondary flex-1 flex items-center justify-center gap-2"
                            >
                                <Download className="h-4 w-4" />
                                Download Image
                            </button>
                            <button
                                onClick={() => handleDownload('both')}
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
