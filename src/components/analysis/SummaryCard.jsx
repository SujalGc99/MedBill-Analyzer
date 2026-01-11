// Summary Card - displays total savings and stats

import { TrendingDown, DollarSign, Receipt, Percent } from 'lucide-react';
import { formatCurrency, calculateSavingsPercent } from '../../utils/formatting';
import Card from '../common/Card';

export const SummaryCard = ({ result, country = 'Nepal' }) => {
    const { originalTotal, optimizedTotal, totalSavings, items } = result;

    const savingsPercent = calculateSavingsPercent(originalTotal, optimizedTotal);
    const overchargedCount = items.filter(item => item.status === 'overpriced').length;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Original Total */}
            <Card compact>
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-sm text-neutral-600 mb-1">Original Total</p>
                        <p className="text-2xl font-bold text-neutral-900">
                            {formatCurrency(originalTotal, country)}
                        </p>
                    </div>
                    <div className="p-3 bg-neutral-100 rounded-lg">
                        <Receipt className="h-6 w-6 text-neutral-600" />
                    </div>
                </div>
            </Card>

            {/* Optimized Total */}
            <Card compact>
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-sm text-neutral-600 mb-1">Fair Price</p>
                        <p className="text-2xl font-bold text-success-600">
                            {formatCurrency(optimizedTotal, country)}
                        </p>
                    </div>
                    <div className="p-3 bg-success-100 rounded-lg">
                        <DollarSign className="h-6 w-6 text-success-600" />
                    </div>
                </div>
            </Card>

            {/* Total Savings */}
            <Card compact>
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-sm text-neutral-600 mb-1">You Can Save</p>
                        <p className="text-2xl font-bold text-primary-600">
                            {formatCurrency(totalSavings, country)}
                        </p>
                    </div>
                    <div className="p-3 bg-primary-100 rounded-lg">
                        <TrendingDown className="h-6 w-6 text-primary-600" />
                    </div>
                </div>
            </Card>

            {/* Savings Percentage */}
            <Card compact>
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-sm text-neutral-600 mb-1">Savings</p>
                        <p className="text-2xl font-bold text-danger-600">
                            {savingsPercent.toFixed(1)}%
                        </p>
                        <p className="text-xs text-neutral-500 mt-1">
                            {overchargedCount} of {items.length} items overpriced
                        </p>
                    </div>
                    <div className="p-3 bg-danger-100 rounded-lg">
                        <Percent className="h-6 w-6 text-danger-600" />
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default SummaryCard;
