"use client";

import SalaryTaxCalculator from "@/features/salary-tax/SalaryTaxCalculator";
import { useLanguageStore } from "@/store/useLanguageStore";
import { texts } from "@/data/texts";
import { BookOpen, Info } from "lucide-react";

interface GuideItem {
    label: string;
    desc: string;
}

export default function SalaryTaxPage() {
    const { lang, dir } = useLanguageStore();
    const isRTL = dir === "rtl";
    const t = texts.salaryTax[lang];

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

            <SalaryTaxCalculator />

            <section className="mt-12 bg-bg-soft/50 p-6 rounded-3xl border border-field-border/50">
                <h3 className="text-lg font-bold text-text-title mb-6 flex items-center gap-2">
                    <BookOpen size={20} className="text-brand-main" />
                    {t.guideTitle}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(t.guideItems as GuideItem[]).map((item, i) => (
                        <div key={i} className="flex flex-col gap-1 p-4 bg-bg-card rounded-2xl border border-field-border hover:shadow-sm transition-all">
                            <span className="text-brand-main font-black text-sm uppercase tracking-wider">{item.label}</span>
                            <p className="text-text-body text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="grid grid-cols-1 gap-8 pt-12">
                <div className="bg-bg-card p-8 rounded-3xl border border-field-border">
                    <h3 className="text-xl font-bold text-text-title mb-4 flex items-center gap-2">
                        <Info className="text-brand-main" />
                        {t.theoryTitle}
                    </h3>
                    <p className="text-sm text-text-body leading-relaxed opacity-70">
                        {t.theoryDesc}
                    </p>
                </div>
            </section>
        </div>
    );
}