import React from 'react';
import { Heart, Github, Linkedin, Shield, Info, FileText, Code } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-neutral-200 mt-20 pt-16 pb-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Column 1: Brand & Mission */}
                    <div className="space-y-6">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="bg-primary-600 p-2 rounded-lg group-hover:bg-primary-700 transition-colors">
                                <Shield className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-xl font-display font-bold text-neutral-900">MedBill Analyzer</span>
                        </Link>
                        <p className="text-neutral-500 leading-relaxed text-sm">
                            Empowering patients with AI-driven price transparency. We help you decode medical jargon, detect overcharges, and negotiate fair prices.
                        </p>
                        <div className="flex items-center gap-4">
                            <SocialLink href="https://github.com/SujalGc99/MedBill-Analyzer" icon={Github} label="GitHub" />
                            <SocialLink href="https://www.linkedin.com/in/sujalgc/" icon={Linkedin} label="LinkedIn" />
                        </div>
                    </div>

                    {/* Column 2: Product */}
                    <div>
                        <h4 className="font-semibold text-neutral-900 mb-6">Product</h4>
                        <ul className="space-y-4 text-sm text-neutral-600">
                            <li><FooterLink to="/">Bill Analyzer</FooterLink></li>
                            <li><FooterLink to="/history">Analysis History</FooterLink></li>
                            <li><FooterLink to="/demo">Demo Mode</FooterLink></li>
                            <li><span className="inline-flex items-center gap-2 text-primary-600"><span className="w-1.5 h-1.5 rounded-full bg-primary-600 animate-pulse" /> Live Beta</span></li>
                        </ul>
                    </div>

                    {/* Column 3: Resources */}
                    <div>
                        <h4 className="font-semibold text-neutral-900 mb-6">Resources</h4>
                        <ul className="space-y-4 text-sm text-neutral-600">
                            <li><FooterLink to="/resources">Resource Hub</FooterLink></li>
                            <li><FooterLink to="/developer">Meet the Developer</FooterLink></li>
                            <li><FooterLink to="/faq">Frequently Asked Questions</FooterLink></li>
                            <li><FooterLink to="/tech-stack">Technical Architecture</FooterLink></li>
                        </ul>
                    </div>

                    {/* Column 4: Legal & Privacy */}
                    <div>
                        <h4 className="font-semibold text-neutral-900 mb-6">Legal & Privacy</h4>
                        <ul className="space-y-4 text-sm text-neutral-600">
                            <li><FooterLink to="/privacy">Privacy Policy</FooterLink></li>
                            <li><FooterLink to="/terms">Terms of Service</FooterLink></li>
                            <li><FooterLink to="/privacy">Data Security</FooterLink></li>
                        </ul>
                        <div className="mt-6 p-4 bg-primary-50 rounded-xl border border-primary-100">
                            <p className="text-xs text-primary-700 font-medium">
                                <Shield className="w-3 h-3 inline mr-1" /> 100% Client-Side Processing
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-neutral-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-neutral-500">
                        © {currentYear} MedBill Analyzer. Open Source Hackathon Project.
                    </p>
                    <p className="flex items-center gap-1 text-sm text-neutral-500">
                        Made with <Heart className="h-4 w-4 text-danger-500 fill-danger-500" /> in Nepal
                    </p>
                </div>
            </div>
        </footer>
    );
};

const SocialLink = ({ href, icon: Icon, label }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 text-neutral-400 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-all"
        aria-label={label}
    >
        <Icon className="w-5 h-5" />
    </a>
);

const FooterLink = ({ to, children }) => (
    <Link to={to} className="flex items-center gap-2 hover:text-primary-600 hover:translate-x-1 transition-all">
        {children}
    </Link>
);

export default Footer;
