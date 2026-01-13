import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const ReportHeader = () => {
    return (
        <div className="flex items-center justify-between border-b pb-4 mb-6 border-neutral-200">
            <div className="flex items-center gap-2">
                <div className="p-2 bg-primary-600 rounded-lg">
                    <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h1 className="text-xl font-display font-bold text-neutral-900">MedBill Audit Report</h1>
                    <p className="text-xs text-neutral-500 uppercase tracking-widest font-semibold">AI-Powered Verification</p>
                </div>
            </div>
            <div className="text-right">
                <p className="text-sm font-medium text-neutral-600">Generated on</p>
                <p className="text-sm font-bold text-neutral-900">{new Date().toLocaleDateString()}</p>
            </div>
        </div>
    );
};
