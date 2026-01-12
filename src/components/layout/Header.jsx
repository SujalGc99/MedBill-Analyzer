// Header.jsx
import { Link, useLocation } from 'react-router-dom';
import { Activity, Languages, HelpCircle, ScanLine, History, Download } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { usePWAInstall } from '../../hooks/usePWAInstall';

const NavLink = ({ to, icon: Icon, label, active }) => (
    <Link
        to={to}
        className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${active
            ? 'text-primary-700 bg-primary-50 font-semibold'
            : 'text-neutral-600 hover:text-primary-600 hover:bg-neutral-50'
            }`}
    >
        <Icon className={`h-4 w-4 ${active ? 'text-primary-600' : 'text-neutral-500'}`} />
        <span>{label}</span>
    </Link>
);

export const Header = () => {
    const { t, language, toggleLanguage } = useLanguage();
    const location = useLocation();
    const { supportsPWA, install } = usePWAInstall();

    return (
        <header className="bg-white border-b border-neutral-200 sticky top-0 z-40 shadow-sm">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                            <div className="p-2 bg-primary-100 rounded-lg">
                                <Activity className="h-6 w-6 text-primary-600" />
                            </div>
                            <div>
                                <h1 className="text-xl font-display font-bold text-neutral-900">
                                    {t('app.name')}
                                </h1>
                                <p className="text-xs text-neutral-500">{t('app.tagline')}</p>
                            </div>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center gap-6">
                        <div className="hidden sm:flex items-center gap-6 text-sm font-medium">
                            <NavLink to="/" icon={ScanLine} label={t('nav.home')} active={location.pathname === '/'} />
                            <NavLink to="/history" icon={History} label={t('nav.history')} active={location.pathname === '/history'} />
                            <NavLink to="/faq" icon={HelpCircle} label={t('nav.faq')} active={location.pathname === '/faq'} />
                        </div>

                        <div className="flex items-center gap-3">
                            {supportsPWA && (
                                <button
                                    onClick={install}
                                    className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-600 hover:bg-primary-700 text-white transition-colors text-sm font-medium shadow-sm"
                                    title="Install App"
                                >
                                    <Download className="h-4 w-4" />
                                    <span>Install App</span>
                                </button>
                            )}

                            <button
                                onClick={toggleLanguage}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors text-sm font-medium text-neutral-700"
                                title="Switch Language"
                            >
                                <Languages className="h-4 w-4" />
                                <span>{language === 'en' ? 'नेपाली' : 'English'}</span>
                            </button>

                            <div className="hidden sm:block">
                                <span className="badge bg-neutral-100 text-neutral-700 border border-neutral-300">
                                    {t('app.version')}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
