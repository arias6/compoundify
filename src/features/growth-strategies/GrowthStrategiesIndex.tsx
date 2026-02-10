"use client";

import React from 'react';
import { Rocket, Timer, RefreshCcw, Lightbulb, CheckCircle2 } from "lucide-react";
import { useLanguageStore } from "@/store/useLanguageStore";
import { texts } from "@/data/texts";

const GrowthStrategies = () => {
    const { lang, dir } = useLanguageStore();
    const isRTL = dir === "rtl";
    const t = texts.growthStrategies[lang];

    const getIcon = (index: number) => {
        const props = { size: 28, className: "transition-colors duration-700" };
        switch (index) {
            case 0: return <Timer {...props} />;
            case 1: return <RefreshCcw {...props} />;
            case 2: return <Rocket {...props} />;
            case 3: return <Lightbulb {...props} />;
            default: return <Lightbulb {...props} />;
        }
    };

    return (
        <section dir={dir} className={`${isRTL ? 'font-fa' : 'font-en'} py-12 md:py-20 bg-bg-main`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-text-title mb-4 leading-tight">
                        {t.title}
                    </h2>
                    <p className="text-lg md:text-xl text-brand-main font-bold mb-6">
                        {t.subtitle}
                    </p>
                    <p className="max-w-2xl mx-auto text-text-body text-base md:text-lg leading-relaxed">
                        {t.intro}
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8 mb-16 md:mb-20">
                    {t.strategies.map((strategy, index) => (
                        <div 
                            key={`strategy-${index}`} 
                            className="bg-white border  border-field-border rounded-2xl md:rounded-3xl p-6 md:p-8 hover:shadow-xl transition-all duration-700 group flex flex-col sm:flex-row items-start gap-5"
                        >
                            <div className="p-4 bg-brand-soft text-brand-main rounded-2xl group-hover:bg-brand-main group-hover:text-white transition-colors duration-300 shrink-0">
                                {getIcon(index)}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg md:text-xl font-black text-text-title mb-3">
                                    {strategy.title}
                                </h3>
                                <p className="text-text-body text-sm md:text-base leading-relaxed mb-4">
                                    {strategy.desc}
                                </p>
                                <div className="bg-bg-soft p-3 rounded-lg border-s-4 border-brand-main text-xs md:text-sm font-medium text-text-title italic">
                                    {strategy.tip}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-white border-2 border-brand-main/20 rounded-2xl md:rounded-3xl p-6 md:p-12 relative overflow-hidden">
                    <div className={`absolute top-0 ${isRTL ? 'left-0' : 'right-0'} p-4 opacity-5 md:opacity-10`}>
                        <CheckCircle2 size={120} className="text-brand-main" />
                    </div>
                    <div className="relative z-10 max-w-3xl">
                        <h3 className="text-xl md:text-2xl font-black text-text-title mb-4 flex items-center gap-2">
                            <CheckCircle2 className="text-brand-main" size={24} />
                            {t.summaryTitle}
                        </h3>
                        <p className="text-base md:text-lg text-text-body leading-relaxed">
                            {t.summaryDesc}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GrowthStrategies;