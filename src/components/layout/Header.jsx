// App Header Component

import { Activity } from 'lucide-react';

export const Header = () => {
    return (
        <header className="bg-white border-b border-neutral-200 sticky top-0 z-40 shadow-sm">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary-100 rounded-lg">
                            <Activity className="h-6 w-6 text-primary-600" />
                        </div>
                        <div>
                            <h1 className="text-xl font-display font-bold text-neutral-900">
                                MedBill Analyzer
                            </h1>
                            <p className="text-xs text-neutral-500">Transparent Medical Pricing</p>
                        </div>
                    </div>

                    {/* Version badge */}
                    <div className="hidden sm:block">
                        <span className="badge bg-neutral-100 text-neutral-700 border border-neutral-300">
                            MVP v1.0
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
