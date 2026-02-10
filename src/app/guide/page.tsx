"use client";

import React from "react";
import { texts } from "@/data/texts";
import { useLanguageStore } from "@/store/useLanguageStore";
import {
  Calculator,
  TrendingUp,
  Percent,
  Scale,
  CheckCircle2,
  HelpCircle,
  Settings2,
  Zap,
  BookOpen,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

interface ToolGuide {
  id: string;
  title: string;
  howItWorks: string;
  howToUse: string;
  features: string[];
}

interface EduItem {
  title: string;
  desc: string;
  url: string;
}

export default function GuidePage() {
  const { lang, dir } = useLanguageStore();
  const isRTL = dir === "rtl";
  const t = texts.guide[lang];

  const toolIcons: Record<string, React.ReactNode> = {
    calc: <TrendingUp size={32} />,
    loan: <Calculator size={32} />,
    tax: <Percent size={32} />,
    compare: <Scale size={32} />
  };

  return (
    <div dir={dir} className={`${isRTL ? "font-fa" : "font-en"} min-h-screen bg-bg-main py-20 px-4 md:px-8`}>
      <div className="max-w-7xl mx-auto">

        <header className="mb-8 border-b border-field-border pb-12">
          <div className="flex items-center gap-3 text-brand-main mb-6">
            <HelpCircle size={28} />
            <span className="text-sm font-black uppercase tracking-[0.3em]">{isRTL ? "مرکز راهنما" : "Help Center"}</span>
          </div>
          <h1 className="text-3xl md:text-6xl font-black text-text-title tracking-tighter mb-8">
            {t.heroTitle} <br />
            <span className="text-brand-main px-20 text-3xl md:text-7xl">{t.heroTitleAccent}</span>
          </h1>
          <p className="text-text-body text-xl md:text-2xl max-w-3xl font-medium opacity-70 leading-relaxed">
            {t.heroDesc}
          </p>
        </header>

        <div className="grid grid-cols-1 gap-12 mb-32">
          {t.tools.map((tool: ToolGuide) => (
            <div
              key={tool.id}
              className="bg-bg-card border border-field-border rounded-[3rem] p-8 md:p-14 transition-all duration-500 hover:shadow-2xl hover:border-brand-main/30 group"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-brand-soft rounded-4xl flex items-center justify-center text-brand-main group-hover:scale-110 transition-transform duration-500">
                    {toolIcons[tool.id]}
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black text-text-title">{tool.title}</h2>
                </div>
                <div className="h-px flex-1 bg-field-border hidden md:block mx-8" />
                <div className="flex items-center gap-2 text-brand-main font-bold italic">
                  <Zap size={20} className="animate-pulse" />
                  {isRTL ? "موتور محاسباتی" : "Smart Engine"}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-text-title font-black uppercase tracking-widest text-sm">
                      <Settings2 size={18} className="text-brand-main" />
                      {t.worksTitle}
                    </div>
                    <p className="text-text-body text-lg leading-relaxed bg-bg-soft/20 p-6 rounded-3xl border border-field-border/50">
                      {tool.howItWorks}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-text-title font-black uppercase tracking-widest text-sm">
                      <HelpCircle size={18} className="text-brand-main" />
                      {t.usageTitle}
                    </div>
                    <p className="text-text-body text-lg leading-relaxed">
                      {tool.howToUse}
                    </p>
                  </div>
                </div>

                <div className="bg-white border border-field-border rounded-[2.5rem] p-8 md:p-10 shadow-inner">
                  <h3 className="text-xl font-black text-text-title mb-6 flex items-center gap-2">
                    <CheckCircle2 size={24} className="text-brand-main" />
                    {t.featuresTitle}
                  </h3>
                  <ul className="grid grid-cols-1 gap-4">
                    {tool.features.map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-4 text-text-body font-bold bg-bg-main/50 p-4 rounded-2xl border border-transparent hover:border-brand-soft transition-colors">
                        <div className="w-2 h-2 bg-brand-main rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <BookOpen className="text-brand-main" size={40} />
            <h2 className="text-4xl md:text-6xl font-black text-text-title tracking-tight">{t.education.title}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.education.items.map((item: EduItem, idx: number) => (
              <div key={idx} className="bg-white border border-field-border rounded-[2.5rem] p-10 flex flex-col justify-between hover:shadow-xl transition-shadow group">
                <div>
                  <h3 className="text-2xl font-black text-text-title mb-4 group-hover:text-brand-main transition-colors">{item.title}</h3>
                  <p className="text-text-body opacity-70 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
                <Link
                  href={item.url}
                  className="
                    group mt-8 inline-flex items-center gap-2
                    text-brand-main font-black cursor-pointer
                    transition-all duration-300
                  "
                >
                  <span
                    className="
                      relative
                      transition-transform duration-300
                      group-hover:translate-x-1
                    "
                  >
                    {isRTL ? "شروع یادگیری" : "Start Learning"}
                    <span
                      className="
                        absolute left-0 -bottom-1 h-0.5 w-full
                        origin-left scale-x-0
                        bg-linear-to-r from-brand-main/0 via-brand-main to-brand-main/0
                        transition-transform duration-500
                        group-hover:scale-x-100
                      "
                    />
                  </span>
                  <ArrowRight
                    size={20}
                    className={`
                      transition-all duration-300
                      group-hover:translate-x-2 group-hover:scale-110
                      ${isRTL ? "rotate-180 group-hover:-translate-x-2" : ""}
                    `}
                  />
                  <span
                    className="
                      pointer-events-none absolute opacity-0
                      transition-opacity duration-300
                      group-hover:opacity-100
                    "
                  />
                </Link>

              </div>
            ))}
          </div>
        </div>

        <div className="bg-text-title rounded-[3.5rem] p-12 md:p-20 text-center relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-white text-4xl md:text-6xl font-black mb-8">{t.footerTitle}</h2>
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-brand-main/20 to-transparent pointer-events-none" />
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-brand-main/10 rounded-full blur-[100px] group-hover:scale-110 transition-transform duration-700" />
        </div>

      </div>
    </div>
  );
}