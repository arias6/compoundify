"use client";

import React from 'react';
import { BookOpen, Wallet, ArrowUpRight, ShieldAlert, BadgeDollarSign, GraduationCap } from "lucide-react";
import { useLanguageStore } from "@/store/useLanguageStore";
import { texts } from "@/data/texts";

const FinancialLiteracy = () => {
    const { lang, dir } = useLanguageStore();
    const isRTL = dir === "rtl";
    const t = texts.financialLiteracy[lang];

    const getIcon = (index: number) => {
        const props = { size: 28, className: "transition-colors duration-300" };
        switch (index) {
            case 0: return <ArrowUpRight {...props} />;
            case 1: return <Wallet {...props} />;
            case 2: return <ShieldAlert {...props} />;
            case 3: return <BadgeDollarSign {...props} />;
            default: return <BookOpen {...props} />;
        }
    };

    return (
        <section dir={dir} className={`${isRTL ? 'font-fa' : 'font-en'} py-12 md:py-20 bg-bg-main`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 md:mb-16">
                    <div className="inline-flex items-center justify-center p-3 bg-brand-soft rounded-2xl text-brand-main mb-4">
                        <BookOpen size={32} />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-text-title mb-4">
                        {t.title}
                    </h2>
                    <p className="text-lg md:text-xl text-brand-main font-bold mb-6 italic">
                        {t.subtitle}
                    </p>
                    <p className="max-w-3xl mx-auto text-text-body text-base md:text-lg leading-relaxed">
                        {t.intro}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16 md:mb-20">
                    {t.topics.map((topic, index) => (
                        <div
                            key={`topic-${index}`}
                            className="bg-white border border-field-border rounded-2xl md:rounded-3xl p-6 md:p-8 hover:shadow-xl transition-all duration-300 group flex flex-col sm:flex-row items-start gap-6"
                        >
                            <div className="p-4 bg-brand-soft text-brand-main rounded-2xl group-hover:bg-brand-main group-hover:text-white transition-colors duration-300 shrink-0">
                                {getIcon(index)}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-black text-text-title mb-3">
                                    {topic.title}
                                </h3>
                                <p className="text-text-body text-sm md:text-base leading-relaxed mb-4">
                                    {topic.desc}
                                </p>
                                <div className="inline-block bg-bg-muted px-4 py-2 rounded-lg border-e-4 border-brand-main text-xs md:text-sm font-bold text-text-title">
                                    {topic.tip}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-brand-main text-white rounded-2xl md:rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
                    <div className={`absolute -bottom-6 ${isRTL ? '-left-6' : '-right-6'} opacity-10 rotate-12`}>
                        <GraduationCap size={200} />
                    </div>
                    <div className="relative z-10 text-center md:text-start">
                        <h3 className="text-2xl md:text-3xl font-black mb-4">
                            {t.footerTitle}
                        </h3>
                        <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl">
                            {t.footerDesc}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FinancialLiteracy;