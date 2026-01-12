import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Card from '../components/common/Card';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-neutral-200 last:border-0">
            <button
                className="w-full py-4 flex items-center justify-between text-left focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="font-semibold text-neutral-800">{question}</span>
                {isOpen ? (
                    <ChevronUp className="h-5 w-5 text-neutral-500" />
                ) : (
                    <ChevronDown className="h-5 w-5 text-neutral-500" />
                )}
            </button>
            {isOpen && (
                <div className="pb-4 text-neutral-600 leading-relaxed animate-in slide-in-from-top-2 duration-200">
                    {answer}
                </div>
            )}
        </div>
    );
};

export const FAQPage = () => {
    const { t } = useLanguage();

    // Helper to allow iterating over translations if they were arrays, 
    // but since our translation structure is flat keys, we'll hardcode the keys expected.
    // Ideally translations should support arrays, but we will use a fixed list for now.
    const faqs = [
        { q: 'faq.q1', a: 'faq.a1' },
        { q: 'faq.q2', a: 'faq.a2' },
        { q: 'faq.q3', a: 'faq.a3' },
        { q: 'faq.q4', a: 'faq.a4' },
        { q: 'faq.q5', a: 'faq.a5' },
    ];

    return (
        <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
            <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center p-3 bg-primary-100 rounded-full mb-4">
                    <HelpCircle className="h-8 w-8 text-primary-600" />
                </div>
                <h1 className="text-3xl font-display font-bold text-neutral-900 mb-3">
                    {t('faq.title')}
                </h1>
                <p className="text-neutral-600">
                    {t('faq.subtitle')}
                </p>
            </div>

            <Card>
                <div className="divide-y divide-neutral-200">
                    {faqs.map((item, index) => (
                        <FAQItem
                            key={index}
                            question={t(item.q)}
                            answer={t(item.a)}
                        />
                    ))}
                </div>
            </Card>

            <div className="mt-8 text-center bg-neutral-100 rounded-xl p-6">
                <p className="text-sm text-neutral-500 mb-2">
                    {t('faq.disclaimerTitle')}
                </p>
                <p className="text-xs text-neutral-400 max-w-2xl mx-auto">
                    {t('faq.disclaimer')}
                </p>
            </div>
        </div>
    );
};

export default FAQPage;
