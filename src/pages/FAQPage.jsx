import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Card from '../components/common/Card';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-neutral-200 last:border-0">
            <button
                className="w-full py-5 flex items-center justify-between text-left focus:outline-none group"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className={`font-semibold text-lg transition-colors ${isOpen ? 'text-primary-700' : 'text-neutral-800 group-hover:text-primary-600'}`}>
                    {question}
                </span>
                <div className={`p-2 rounded-full transition-all duration-300 ${isOpen ? 'bg-primary-100 rotate-180' : 'bg-neutral-100 group-hover:bg-neutral-200'}`}>
                    <ChevronDown className={`h-5 w-5 ${isOpen ? 'text-primary-600' : 'text-neutral-500'}`} />
                </div>
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mb-5' : 'max-h-0 opacity-0'}`}
            >
                <p className="text-neutral-600 leading-relaxed text-[15px]">
                    {answer}
                </p>
            </div>
        </div>
    );
};

export const FAQPage = () => {
    const { t } = useLanguage();

    const faqs = [
        { q: 'faq.q1', a: 'faq.a1' },
        { q: 'faq.q2', a: 'faq.a2' },
        { q: 'faq.q3', a: 'faq.a3' },
        { q: 'faq.q4', a: 'faq.a4' },
        { q: 'faq.q5', a: 'faq.a5' },
    ];

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 animate-in fade-in duration-500">
            <div className="text-center mb-16">
                <div className="inline-flex items-center justify-center p-4 bg-primary-100/50 rounded-2xl mb-6 ring-4 ring-primary-50">
                    <HelpCircle className="h-10 w-10 text-primary-600" />
                </div>
                <h1 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-4 tracking-tight">
                    {t('faq.title')}
                </h1>
                <p className="text-xl text-neutral-500 max-w-2xl mx-auto font-light">
                    {t('faq.subtitle')}
                </p>
            </div>

            <Card className="glass-panel border-neutral-200/60 shadow-xl shadow-primary-900/5 p-2">
                <div className="bg-white/50 rounded-xl px-6 md:px-8">
                    {faqs.map((item, index) => (
                        <FAQItem
                            key={index}
                            question={t(item.q)}
                            answer={t(item.a)}
                        />
                    ))}
                </div>
            </Card>

            <div className="mt-12 text-center">
                <div className="inline-block bg-neutral-100 rounded-2xl p-6 md:p-8 max-w-3xl">
                    <p className="font-semibold text-neutral-900 mb-2 flex items-center justify-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-neutral-400"></span>
                        {t('faq.disclaimerTitle')}
                    </p>
                    <p className="text-sm text-neutral-500 leading-relaxed">
                        {t('faq.disclaimer')}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FAQPage;
