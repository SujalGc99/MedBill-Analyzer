// Main App Component
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import HistoryPage from './pages/HistoryPage';
import FAQPage from './pages/FAQPage';

import { LanguageProvider } from './contexts/LanguageContext';
import TechStack from './pages/TechStack';

import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Resources from './pages/Resources';
import DeveloperPage from './pages/DeveloperPage';
import ScrollToTop from './components/layout/ScrollToTop';

function App() {
    return (
        <LanguageProvider>
            <Router>
                <ScrollToTop />
                <div className="min-h-screen bg-neutral-50 flex flex-col font-sans text-neutral-900 antialiased">

                    <Header />
                    <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full max-w-7xl">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/history" element={<HistoryPage />} />
                            <Route path="/faq" element={<FAQPage />} />
                            <Route path="/tech-stack" element={<TechStack />} />
                            {/* New Routes */}
                            <Route path="/privacy" element={<PrivacyPolicy />} />
                            <Route path="/terms" element={<TermsOfService />} />
                            <Route path="/resources" element={<Resources />} />
                            <Route path="/developer" element={<DeveloperPage />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </LanguageProvider>
    );
}

export default App;
