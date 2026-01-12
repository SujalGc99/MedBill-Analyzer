// History Page Component
import React from 'react';
import useHistory from '../hooks/useHistory';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import AnalysisResults from '../components/analysis/AnalysisResults';
import { useLanguage } from '../contexts/LanguageContext';
import { Calendar, Trash2, ArrowRight, TrendingUp, AlertTriangle } from 'lucide-react';
import { formatCurrency, formatDate } from '../utils/formatting';

export const HistoryPage = () => {
    const { receipts, statistics, loading, deleteReceipt, clearHistory } = useHistory();
    const { t } = useLanguage();
    const [selectedReceipt, setSelectedReceipt] = React.useState(null);

    const handleDelete = (id, e) => {
        e.stopPropagation();
        if (window.confirm(t('history.confirmDelete'))) {
            deleteReceipt(id);
            if (selectedReceipt?.id === id) {
                setSelectedReceipt(null);
            }
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="spinner h-8 w-8 text-primary-500"></div>
            </div>
        );
    }

    if (receipts.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="inline-flex p-4 bg-neutral-100 rounded-full mb-4">
                    <Calendar className="h-8 w-8 text-neutral-400" />
                </div>
                <h2 className="text-xl font-semibold text-neutral-900 mb-2">{t('history.noHistoryTitle')}</h2>
                <p className="text-neutral-500 mb-6">{t('history.noHistoryDesc')}</p>
                <Button variant="primary" onClick={() => window.location.href = '/'}>
                    {t('history.scanFirst')}
                </Button>
            </div>
        );
    }

    // if a receipt is selected, show its details
    if (selectedReceipt) {
        return (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="mb-6 flex items-center justify-between">
                    <Button variant="secondary" onClick={() => setSelectedReceipt(null)}>
                        ← {t('history.backToHistory')}
                    </Button>
                    <Button variant="danger" size="sm" onClick={(e) => handleDelete(selectedReceipt.id, e)}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        {t('history.delete')}
                    </Button>
                </div>
                <AnalysisResults result={selectedReceipt} country={selectedReceipt.country} />
            </div>
        );
    }

    // Overview Statistics
    const { totalSavings, totalSpent, savingsPercentage } = statistics || {};

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-display font-bold text-neutral-900">{t('history.title')}</h1>
                    <p className="text-neutral-500 text-sm">{t('history.subtitle', { count: receipts.length })}</p>
                </div>
                {receipts.length > 0 && (
                    <Button variant="secondary" size="sm" onClick={() => {
                        if (window.confirm(t('history.confirmClear'))) clearHistory();
                    }}>
                        {t('history.clearAll')}
                    </Button>
                )}
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-primary-50 border-primary-100">
                    <div className="flex items-center gap-3 mb-2">
                        <TrendingUp className="h-5 w-5 text-primary-600" />
                        <h3 className="font-semibold text-primary-900">{t('history.totalSavings')}</h3>
                    </div>
                    <p className="text-2xl font-bold text-primary-700">
                        {formatCurrency(totalSavings)}
                    </p>
                    <p className="text-xs text-primary-600 mt-1">
                        {t('history.averageSaved', { percent: savingsPercentage?.toFixed(1) })}
                    </p>
                </Card>

                <Card>
                    <h3 className="font-semibold text-neutral-700 text-sm mb-2">{t('history.totalAnalyzed')}</h3>
                    <p className="text-2xl font-bold text-neutral-900">
                        {formatCurrency(totalSpent + totalSavings)}
                    </p>
                </Card>

                <Card>
                    <h3 className="font-semibold text-neutral-700 text-sm mb-2">{t('history.overchargesFound')}</h3>
                    <p className="text-2xl font-bold text-neutral-900">
                        {receipts.filter(r => r.totalSavings > 0).length} <span className="text-sm font-normal text-neutral-500">{t('app.newScan').toLowerCase().replace('new ', '')}</span>
                    </p>
                </Card>
            </div>

            {/* Receipt List */}
            <div className="space-y-4">
                <h2 className="text-lg font-semibold text-neutral-900">{t('history.recentScans')}</h2>
                <div className="grid gap-4">
                    {receipts.map((receipt) => (
                        <div
                            key={receipt.id}
                            onClick={() => setSelectedReceipt(receipt)}
                            className="bg-white border border-neutral-200 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
                        >
                            <div className="flex items-start gap-4">
                                <div className={`p-3 rounded-lg ${receipt.totalSavings > 0 ? 'bg-danger-50 text-danger-600' : 'bg-success-50 text-success-600'}`}>
                                    {receipt.totalSavings > 0 ? <AlertTriangle className="h-6 w-6" /> : <Calendar className="h-6 w-6" />}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-neutral-900">
                                        {formatDate(receipt.timestamp)}
                                    </h3>
                                    <p className="text-sm text-neutral-500">
                                        {t('history.itemsAnalyzed', { count: receipt.items?.length || 0 })} • {receipt.country}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                                <div className="text-right">
                                    <p className="font-medium text-neutral-900">{formatCurrency(receipt.originalTotal)}</p>
                                    {receipt.totalSavings > 0 && (
                                        <p className="text-xs font-semibold text-success-600">
                                            {t('history.saved')} {formatCurrency(receipt.totalSavings)}
                                        </p>
                                    )}
                                </div>
                                <ArrowRight className="h-5 w-5 text-neutral-400 group-hover:text-primary-500 transition-colors" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HistoryPage;
