// ItemBreakdown.jsx
import React from 'react';
import { CheckCircle, AlertCircle, HelpCircle } from 'lucide-react';
import { formatCurrency } from '../../utils/formatting';
import { useLanguage } from '../../contexts/LanguageContext';

const statusColors = {
    fair: 'bg-success-50 border-success-200',
    overpriced: 'bg-warning-50 border-warning-200',
    cheap: 'bg-indigo-50 border-indigo-200',
    unknown: 'bg-neutral-50 border-neutral-200',
};

const statusIcons = {
    fair: CheckCircle,
    overpriced: AlertCircle,
    cheap: CheckCircle,
    unknown: HelpCircle,
};

export const ItemBreakdown = ({ item, country = 'Nepal' }) => {
    const { t } = useLanguage();
    const { name, chargedPrice, fairPriceMin, fairPriceMax, status, explanation, confidence = 'medium' } = item;
    const isOverpriced = status === 'overpriced';
    const StatusIcon = statusIcons[status] || HelpCircle;

    return (
        <div className={`border rounded-lg p-3 sm:p-4 transition-all ${statusColors[status] || 'bg-neutral-50 border-neutral-200'}`}>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <StatusIcon className={`h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 ${isOverpriced ? 'text-warning-600' : (status === 'cheap' ? 'text-indigo-600' : 'text-success-600')}`} />
                        <h3 className="font-semibold text-sm sm:text-base text-neutral-900 leading-tight">{name}</h3>
                    </div>

                    <div className="text-xs sm:text-sm text-neutral-600 ml-6 sm:ml-7 space-y-1">
                        <p className="flex flex-wrap items-center gap-1">
                            <span className="font-medium whitespace-nowrap">{t('analysis.charged')}: </span>
                            <span className="font-semibold">{formatCurrency(chargedPrice)}</span>
                        </p>
                        <p className="flex flex-wrap items-center gap-1">
                            <span className="font-medium whitespace-nowrap">{t('analysis.fairRange')}: </span>
                            <span>{formatCurrency(fairPriceMin)} - {formatCurrency(fairPriceMax)}</span>
                        </p>
                    </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 sm:text-right">
                    <span className={`inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-medium capitalize whitespace-nowrap
                        ${isOverpriced ? 'bg-warning-100 text-warning-800' : (status === 'cheap' ? 'bg-indigo-100 text-indigo-800' : 'bg-success-100 text-success-800')}`}>
                        {status === 'fair' ? t('analysis.fairPrice') : (status === 'overpriced' ? t('analysis.overpriced') : status)}
                    </span>

                    {/* Confidence Indicator */}
                    <div className="mt-2 flex items-center justify-end gap-1 text-xs text-neutral-400" title={`Confidence: ${confidence}`}>
                        <span>{t('analysis.confidence')}:</span>
                        <div className="flex gap-0.5">
                            <div className={`h-1.5 w-1.5 rounded-full ${confidence === 'high' || confidence === 'medium' ? 'bg-primary-500' : 'bg-neutral-300'}`} />
                            <div className={`h-1.5 w-1.5 rounded-full ${confidence === 'high' ? 'bg-primary-500' : 'bg-neutral-300'}`} />
                            <div className={`h-1.5 w-1.5 rounded-full ${confidence === 'high' ? 'bg-primary-500' : 'bg-neutral-300'}`} />
                        </div>
                    </div>
                </div>
            </div>

            {explanation && (
                <div className="mt-3 ml-0 sm:ml-7 text-xs sm:text-sm text-neutral-600 bg-white/50 p-2.5 sm:p-3 rounded border border-neutral-200/50 leading-relaxed">
                    {explanation}
                </div>
            )}
        </div>
    );
};

export default ItemBreakdown;
