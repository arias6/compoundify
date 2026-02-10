"use client";

import React from 'react';
import { HelpCircle, Sparkles, TrendingUp, Info } from "lucide-react";
import { useLanguageStore } from "@/store/useLanguageStore";
import { texts } from "@/data/texts";

const AboutCompoundIndex = () => {
    const { lang, dir } = useLanguageStore();
    const isRTL = dir === "rtl";
    const t = texts.aboutCompound[lang];

    return (
        <section
            dir={dir}
            className={`${isRTL ? 'font-fa' : 'font-en'} py-16 bg-bg-main`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-center gap-3 mb-6 text-brand-main">
                    <HelpCircle size={32} />
                    <h2 className="text-3xl md:text-4xl font-black text-text-title">
                        {t.title}
                    </h2>
                </div>

                <p className="text-lg md:text-xl text-text-body leading-relaxed mb-12">
                    {t.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <div className="bg-white p-8 rounded-2xl border border-field-border shadow-sm">
                        <div className="w-12 h-12 bg-brand-soft rounded-xl flex items-center justify-center mb-6">
                            <TrendingUp className="text-brand-main" size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-text-title mb-4">
                            {t.powerTitle}
                        </h3>
                        <p className="text-text-body leading-relaxed">
                            {t.powerDesc}
                        </p>
                    </div>

                    <div className="bg-brand-soft p-8 rounded-2xl border border-brand-soft-hover">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6">
                            <Sparkles className="text-brand-main" size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-text-title mb-4">
                            {t.magicFormula.title}
                        </h3>
                        <ul className="space-y-4">
                            {[t.magicFormula.step1, t.magicFormula.step2, t.magicFormula.step3].map((step, index) => (
                                <li key={index} className="flex items-center gap-3 text-text-body">
                                    <div className="w-6 h-6 rounded-full bg-brand-main text-white text-xs flex items-center justify-center font-bold">
                                        {index + 1}
                                    </div>
                                    {step}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="space-y-8">
                    <h3 className="text-2xl font-black text-text-title flex items-center gap-2">
                        <Info className="text-brand-main" />
                        {t.examples.title}
                    </h3>

                    <div className="bg-white border border-field-border rounded-2xl overflow-hidden shadow-sm">
                        <div className="p-8">
                            <h4 className="text-lg font-bold text-brand-main mb-3">
                                {t.examples.snowball.title}
                            </h4>
                            <p className="text-text-body leading-relaxed">
                                {t.examples.snowball.desc}
                            </p>
                        </div>
                        <div className="h-2 bg-brand-main/10 w-full" />
                    </div>

                    <div className="bg-white border border-field-border rounded-2xl overflow-hidden shadow-sm">
                        <div className="p-8">
                            <h4 className="text-lg font-bold text-brand-main mb-3">
                                {t.examples.pennies.title}
                            </h4>
                            <p className="text-text-body leading-relaxed">
                                {t.examples.pennies.desc}
                            </p>
                        </div>
                        <div className="h-2 bg-brand-main/10 w-full" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutCompoundIndex;