// Item Breakdown - individual item display with price comparison

import { CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { formatCurrency } from '../../utils/formatting';

export const ItemBreakdown = ({ item, country = 'Nepal' }) => {
    const { name, chargedPrice, fairPriceMin, fairPriceMax, status, explanation, confidence = 'medium' } = item;

    const isOverpriced = status === 'overpriced';
    const savings = isOverpriced ? chargedPrice - fairPriceMax : 0;

    // Icon based on status
    const StatusIcon = isOverpriced ? AlertTriangle : CheckCircle;

    // Color classes
    const statusColors = {
        overpriced: 'bg-danger-50 border-danger-200',
        fair: 'bg-success-50 border-success-200',
    };

    const iconColors = {
        overpriced: 'text-danger-600',
        fair: 'text-success-600',
    };

    const textColors = {
        overpriced: 'text-danger-700',
        fair: 'text-success-700',
    };

    const badgeColors = {
        overpriced: 'badge-overpriced',
        fair: 'badge-fair',
    };

    const confidenceDisplay = {
        high: { text: 'High confidence', color: 'text-success-600' },
        medium: { text: 'Medium confidence', color: 'text-warning-600' },
        low: { text: 'Low confidence', color: 'text-danger-600' },
    };

    return (
        <div className={`border rounded-lg p-4 transition-all ${statusColors[status] || 'bg-neutral-50 border-neutral-200'}`}>
            <div className="flex items-start gap-3">
                {/* Status Icon */}
                <div className="flex-shrink-0 mt-1">
                    <StatusIcon className={`h-5 w-5 ${iconColors[status]}`} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    {/* Item name and badge */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-medium text-neutral-900 text-base">{name}</h3>
                        <span className={`badge ${badgeColors[status]} flex-shrink-0`}>
                            {status === 'overpriced' ? 'Overpriced' : 'Fair'}
                        </span>
                    </div>

                    {/* Price comparison */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
                        <div>
                            <p className="text-xs text-neutral-600 mb-0.5">Charged Price</p>
                            <p className={`text-lg font-bold ${isOverpriced ? 'text-danger-700' : 'text-neutral-800'}`}>
                                {formatCurrency(chargedPrice, country)}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-neutral-600 mb-0.5">Fair Price Range</p>
                            <p className="text-lg font-bold text-success-700">
                                {formatCurrency(fairPriceMin, country)} - {formatCurrency(fairPriceMax, country)}
                            </p>
                        </div>
                    </div>

                    {/* Savings or status message */}
                    {isOverpriced && savings > 0 && (
                        <div className="flex items-center gap-2 mb-2 p-2 bg-primary-50 border border-primary-200 rounded">
                            <Info className="h-4 w-4 text-primary-600 flex-shrink-0" />
                            <p className="text-sm text-primary-700">
                                <span className="font-semibold">Save {formatCurrency(savings, country)}</span>
                                {' '}by purchasing at fair price
                            </p>
                        </div>
                    )}

                    {/* Explanation */}
                    {explanation && (
                        <p className="text-sm text-neutral-600 mb-2 leading-relaxed">
                            {explanation}
                        </p>
                    )}

                    {/* Confidence indicator */}
                    <div className="flex items-center gap-2">
                        <span className={`text-xs ${confidenceDisplay[confidence].color}`}>
                            {confidenceDisplay[confidence].text}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemBreakdown;
