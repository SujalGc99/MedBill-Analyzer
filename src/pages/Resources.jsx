import React from 'react';
import { BookOpen, HelpCircle, Code, Database, Scale, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Resources = () => {
    const resources = [
        {
            icon: HelpCircle,
            title: "Frequently Asked Questions",
            description: "Common questions about medical billing, our analysis process, and data privacy.",
            link: "/faq",
            color: "bg-blue-100 text-blue-600"
        },
        {
            icon: Code,
            title: "Technical Architecture",
            description: "Deep dive into how we use AI agents, local processing, and encryption to secure your data.",
            link: "/tech-stack",
            color: "bg-purple-100 text-purple-600"
        },
        {
            icon: Database,
            title: "Fair Price Database (Beta)",
            description: "Explore our aggregating database of standard medical procedure costs by region.",
            link: "#",
            color: "bg-green-100 text-green-600",
            comingSoon: true
        },
        {
            icon: Scale,
            title: "Patient Rights Guide",
            description: "Learn about the No Surprises Act and your rights to transparent healthcare pricing.",
            link: "#",
            color: "bg-amber-100 text-amber-600",
            comingSoon: true
        }
    ];

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 bg-neutral-50">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-6">
                        Resources & Guides
                    </h1>
                    <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                        Everything you need to navigate the complex world of medical billing and healthcare costs.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {resources.map((resource, index) => (
                        <Link
                            key={index}
                            to={resource.comingSoon ? '#' : resource.link}
                            className={`group bg-white p-8 rounded-2xl shadow-sm border border-neutral-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${resource.comingSoon ? 'cursor-default opacity-80' : ''}`}
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${resource.color}`}>
                                    <resource.icon className="w-7 h-7" />
                                </div>
                                {resource.comingSoon && (
                                    <span className="bg-neutral-100 text-neutral-500 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                        Coming Soon
                                    </span>
                                )}
                            </div>

                            <h3 className="text-2xl font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors">
                                {resource.title}
                            </h3>
                            <p className="text-neutral-600 mb-6 leading-relaxed">
                                {resource.description}
                            </p>

                            {!resource.comingSoon && (
                                <div className="flex items-center gap-2 text-primary-600 font-bold group-hover:translate-x-2 transition-transform">
                                    Read Guide <ArrowRight className="w-5 h-5" />
                                </div>
                            )}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Resources;
