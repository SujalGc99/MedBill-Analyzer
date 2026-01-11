// App Footer Component

import { Heart, Github } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-white border-t border-neutral-200 mt-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Disclaimer */}
                <div className="bg-warning-50 border border-warning-200 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold text-warning-900 text-sm mb-2">
                        ⚠️ Important Disclaimer
                    </h3>
                    <p className="text-xs text-warning-700 leading-relaxed">
                        This tool provides price estimates based on general market data and should be used
                        as a <strong>reference only</strong>. Always consult with healthcare professionals
                        and licensed pharmacies for medical decisions. We are not responsible for medical
                        decisions made based on this information.
                    </p>
                </div>

                {/* Privacy Note */}
                <div className="bg-success-50 border border-success-200 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold text-success-900 text-sm mb-2">
                        🔒 Data Privacy
                    </h3>
                    <p className="text-xs text-success-700 leading-relaxed">
                        All receipts are processed securely via encrypted API. We do not store your medical
                        information on our servers. Analysis history is saved locally in your browser only.
                    </p>
                </div>

                {/* Footer Links */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-neutral-600">
                    <p className="flex items-center gap-1">
                        Made with <Heart className="h-4 w-4 text-danger-500 fill-current" /> for patients in Nepal
                    </p>

                    <div className="flex items-center gap-4">
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 hover:text-primary-600 transition-colors"
                        >
                            <Github className="h-4 w-4" />
                            <span>Open Source</span>
                        </a>
                        <span className="text-neutral-400">|</span>
                        <span>© 2026 MedBill Analyzer</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
