"use client";

import CompoundCalculator from "@/features/Compound/CompoundCalculator";
import { useLanguageStore } from "@/store/useLanguageStore";
import { texts } from "@/data/texts";
import { Info, Zap } from "lucide-react";


export default function CompoundPage() {
    const { lang, dir } = useLanguageStore();
    const isRTL = dir === "rtl";
    const t = texts.calculator[lang];

    return (
        <div dir={dir} className={`max-w-7xl mx-auto p-4 md:p-8 ${isRTL ? 'font-fa' : 'font-en'}`}>
            <section className="text-center space-y-4 mb-12">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-text-title leading-tight mb-6">
                    <span className="text-brand-main block md:inline"> {t.introTitle}</span>
                </h1>
                <p className="text-lg md:text-xl text-text-body leading-relaxed mb-10 max-w-2xl mx-auto">
                    {t.introDesc}
                </p>
            </section>
            <CompoundCalculator />
            <section className="grid grid-cols-1 gap-8 mt-20 border-t border-field-border pt-12">
                <div className="bg-bg-card p-8 rounded-3xl border border-field-border">
                    <h3 className="text-xl font-bold text-text-title mb-4 flex items-center gap-2">
                        <Info className="text-brand-main" />
                        {t.theoryTitle}
                    </h3>
                    <div className="flex justify-center items-center gap-4 text-2xl bg-bg-soft font-bold text-brand-main p-6 rounded-2xl text-center mb-4">
                        <span>
                            {t.theoryFormulaTop}
                        </span>
                        <span>=</span>
                        [
                        <span>
                            {t.theoryFormulaMid}
                        </span>
                        <span>+</span>
                        <span>
                            {t.theoryFormulaMon}
                        </span>
                        ]
                        <span>x</span>
                        <span>
                            {t.theoryFormulabot}
                        </span>
                    </div>
                    <p className="text-sm text-text-body leading-relaxed opacity-70">
                        سود مرکب به زبانی ساده یعنی سودِ رویِ سود. برخلاف سود ساده که فقط به مبلغ اولیه تعلق می‌گیرد.
                    </p>
                </div>

                <div className="bg-brand-soft p-8 rounded-3xl border border-brand-soft-hover">
                    <h3 className="text-xl font-bold text-brand-main mb-4 flex items-center gap-2">
                        <Zap />
                        {t.practicalTitle}
                    </h3>
                    <ul className="space-y-4">
                        {t.tips.map((tip, i) => (
                            <li key={i} className="flex gap-3 text-sm font-bold text-text-title">
                                <div className="h-5 w-5 rounded-full bg-brand-main text-white flex items-center justify-center text-[10px] shrink-0">{i + 1}</div>
                                {tip}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </div>
    )
}
