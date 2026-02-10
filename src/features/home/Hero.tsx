"use client";

import { ArrowDown, TrendingUp, DollarSign, Clock, Target, Zap } from "lucide-react";
import { useLanguageStore } from "@/store/useLanguageStore";
import { texts } from "@/data/texts";

interface HeroProps {
    scrollToCalculator: () => void;
}

export default function Hero({ scrollToCalculator }: HeroProps) {
    const { lang, dir } = useLanguageStore();
    const isRTL = dir === "rtl";
    const t = texts.hero[lang];

    return (
        <section
            dir={dir}
            className={`${isRTL ? 'font-fa' : 'font-en'} relative w-full bg-Linear-to-b from-bg-main to-white overflow-hidden pt-24 pb-20`}
        >
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-4xl h-72 bg-brand-soft/30 blur-3xl -z-10"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-7xl mx-auto">
                    <div className="mb-12">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-text-title leading-tight mb-6">
                            {t.title}
                            <span className="text-brand-main block md:inline"> {t.titleAccent}</span>
                        </h1>

                        <p className="text-lg md:text-xl text-text-body leading-relaxed mb-10 max-w-2xl mx-auto">
                            {t.description}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                        <div className="bg-white p-6 rounded-xl border border-field-border shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-center w-12 h-12 bg-brand-soft rounded-full mb-4 mx-auto">
                                <DollarSign className="text-brand-main" size={24} />
                            </div>
                            <h3 className="font-bold text-text-title mb-2">{t.features.interest.title}</h3>
                            <p className="text-sm text-text-body">{t.features.interest.desc}</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-field-border shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-center w-12 h-12 bg-brand-soft rounded-full mb-4 mx-auto">
                                <Clock className="text-brand-main" size={24} />
                            </div>
                            <h3 className="font-bold text-text-title mb-2">{t.features.time.title}</h3>
                            <p className="text-sm text-text-body">{t.features.time.desc}</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-field-border shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-center w-12 h-12 bg-brand-soft rounded-full mb-4 mx-auto">
                                <TrendingUp className="text-brand-main" size={24} />
                            </div>
                            <h3 className="font-bold text-text-title mb-2">{t.features.growth.title}</h3>
                            <p className="text-sm text-text-body">{t.features.growth.desc}</p>
                        </div>
                    </div>

                    <div className="bg-bg-card border border-field-border rounded-xl p-6 mb-12 max-w-lg mx-auto">
                        <div className="flex items-center gap-3 mb-4">
                            <Zap className="text-brand-main" size={20} />
                            <span className="font-bold text-text-title">{t.example.title}</span>
                        </div>
                        <p className="text-text-body mb-3">{t.example.initial}</p>
                        <p className="text-text-body mb-3">{t.example.annual}</p>
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-field-border">
                            <span className="text-sm text-text-muted">{t.example.afterTen}</span>
                            <span className="text-xl font-black text-brand-main">{t.example.result}</span>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <button
                            onClick={scrollToCalculator}
                            className="group cursor-pointer inline-flex items-center gap-3 bg-brand-main text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-brand-hover transition-colors duration-300 shadow-lg hover:shadow-xl"
                        >
                            <Target size={20} />
                            <span>{t.primaryBtn}</span>
                            <ArrowDown size={20} className="animate-bounce" />
                        </button>

                        <p className="text-sm text-text-muted">{t.freeText}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}