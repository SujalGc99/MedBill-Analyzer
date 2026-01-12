// SummaryCard.jsx
import React from 'react';
import Card from '../common/Card';
import { useLanguage } from '../../contexts/LanguageContext';
import { formatCurrency } from '../../utils/formatting';

export const SummaryCard = ({ result, country = 'Nepal' }) => {
    const { t } = useLanguage();
    const { originalTotal, optimizedTotal, totalSavings, savingsPercentage } = result;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            <Card>
                <div className="text-xs sm:text-sm font-medium text-neutral-500 mb-1">{t('history.totalAnalyzed')}</div>
                <div className="text-xl sm:text-2xl font-bold text-neutral-900">{formatCurrency(originalTotal)}</div>
            </Card>

            <Card>
                <div className="text-xs sm:text-sm font-medium text-neutral-500 mb-1">{t('analysis.fairPrice')}</div>
                <div className="text-xl sm:text-2xl font-bold text-primary-600">{formatCurrency(optimizedTotal)}</div>
            </Card>

            <Card className="bg-primary-50 border-primary-100">
                <div className="text-xs sm:text-sm font-medium text-primary-700 mb-1">{t('history.totalSavings')}</div>
                <div className="flex items-baseline gap-2">
                    <span className="text-xl sm:text-2xl font-bold text-primary-700">{formatCurrency(totalSavings)}</span>
                    <span className="text-sm sm:text-base font-semibold text-primary-600">({savingsPercentage}%)</span>
                </div>
            </Card>
        </div>
    );
};

export default SummaryCard;
