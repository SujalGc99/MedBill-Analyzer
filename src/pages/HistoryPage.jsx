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
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 py-8 px-4">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-display font-bold text-neutral-900">
                        {t('history.title')}
                    </h1>
                    <p className="text-neutral-500 mt-1">
                        {t('history.subtitle', { count: receipts.length })}
                    </p>
                </div>
                {receipts.length > 0 && (
                    <Button variant="secondary" size="sm" onClick={() => {
                        if (window.confirm(t('history.confirmClear'))) clearHistory();
                    }} className="text-danger-600 hover:text-danger-700 hover:bg-danger-50 border-danger-100">
                        <Trash2 className="w-4 h-4 mr-2" />
                        {t('history.clearAll')}
                    </Button>
                )}
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-primary-50 to-white border-primary-100 shadow-lg shadow-primary-900/5">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-primary-100 rounded-lg text-primary-600">
                            <TrendingUp className="h-5 w-5" />
                        </div>
                        <h3 className="font-bold text-primary-900 text-sm tracking-wide uppercase">{t('history.totalSavings')}</h3>
                    </div>
                    <p className="text-3xl font-display font-bold text-primary-700">
                        {formatCurrency(totalSavings)}
                    </p>
                    <p className="text-sm text-primary-600/80 mt-1 font-medium">
                        {t('history.averageSaved', { percent: savingsPercentage?.toFixed(1) })}
                    </p>
                </Card>

                <Card>
                    <h3 className="font-semibold text-neutral-500 text-xs uppercase tracking-wider mb-3">{t('history.totalAnalyzed')}</h3>
                    <p className="text-3xl font-display font-bold text-neutral-900">
                        {formatCurrency(totalSpent + totalSavings)}
                    </p>
                </Card>

                <Card>
                    <h3 className="font-semibold text-neutral-500 text-xs uppercase tracking-wider mb-3">{t('history.overchargesFound')}</h3>
                    <div className="flex items-baseline gap-2">
                        <p className="text-3xl font-display font-bold text-neutral-900">
                            {receipts.filter(r => r.totalSavings > 0).length}
                        </p>
                        <span className="text-sm font-medium text-neutral-500">bills flagged</span>
                    </div>
                </Card>
            </div>

            {/* Receipt List */}
            <div className="space-y-4">
                <h2 className="text-xl font-display font-semibold text-neutral-900 mb-6">{t('history.recentScans')}</h2>
                <div className="grid gap-4">
                    {receipts.map((receipt) => (
                        <div
                            key={receipt.id}
                            onClick={() => setSelectedReceipt(receipt)}
                            className="bg-white border border-neutral-200 rounded-xl p-5 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group"
                        >
                            <div className="flex items-start gap-4">
                                <div className={`p-4 rounded-xl shadow-inner ${receipt.totalSavings > 0 ? 'bg-danger-50 text-danger-600' : 'bg-success-50 text-success-600'}`}>
                                    {receipt.totalSavings > 0 ? <AlertTriangle className="h-6 w-6" /> : <Calendar className="h-6 w-6" />}
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-neutral-900 mb-1 group-hover:text-primary-600 transition-colors">
                                        {formatDate(receipt.timestamp)}
                                    </h3>
                                    <div className="flex items-center gap-2 text-sm text-neutral-500">
                                        <span className="bg-neutral-100 px-2 py-0.5 rounded text-xs font-medium border border-neutral-200">{receipt.country}</span>
                                        <span>•</span>
                                        <span>{receipt.items?.length || 0} items analyzed</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end pl-16 md:pl-0">
                                <div className="text-right">
                                    <p className="font-bold text-neutral-900 text-lg">{formatCurrency(receipt.originalTotal)}</p>
                                    {receipt.totalSavings > 0 && (
                                        <div className="inline-flex items-center gap-1 text-xs font-bold text-success-600 bg-success-50 px-2 py-0.5 rounded-full mt-1">
                                            Saved {formatCurrency(receipt.totalSavings)}
                                        </div>
                                    )}
                                </div>
                                <div className="w-10 h-10 rounded-full bg-neutral-50 flex items-center justify-center group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                                    <ArrowRight className="h-5 w-5" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HistoryPage;
