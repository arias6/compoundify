"use client";

import { texts } from "@/data/texts";
import CompoundCalculator from "@/features/Compound/CompoundCalculator";
import Hero from "@/features/home/Hero";
import { useLanguageStore } from "@/store/useLanguageStore";
import { Info } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

export default function HomePage() {
  const { lang, dir } = useLanguageStore();
  const isRTL = dir === "rtl";
  const Compound = texts.calculator[lang];
  const loan = texts.loanCalculator[lang];
  const common = texts.common[lang];

  const calculatorRef = useRef<HTMLDivElement>(null);

  const scrollToCalculator = () => {
    if (calculatorRef.current) {
      calculatorRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };

  return (
    <div dir={dir}
      className={`animate-in fade-in duration-1000 ${isRTL ? 'font-fa' : 'font-en'}`}
    >
      <Hero scrollToCalculator={scrollToCalculator} />

      <div ref={calculatorRef}>
        <CompoundCalculator />
      </div>

      <section className="mx-auto max-w-7xl my-16">
        <div className="rounded-3xl space-y-4 bg-brand-main p-12 text-center text-white shadow-2xl shadow-brand-main/40 relative overflow-hidden">
          <div className="space-y-4">
            <div className="bg-bg-card p-8 rounded-3xl border border-field-border">
              <h3 className="text-xl font-bold text-text-title mb-4 flex items-center gap-2">
                <Info className="text-brand-main" />
                {Compound.theoryTitle}
              </h3>
              <div className="flex justify-center items-center gap-4 text-2xl bg-bg-soft font-bold text-brand-main p-6 rounded-2xl text-center mb-4">
                <span>
                  {Compound.theoryFormulaTop}
                </span>
                <span>=</span>
                [
                <span>
                  {Compound.theoryFormulaMid}
                </span>
                <span>+</span>
                <span>
                  {Compound.theoryFormulaMon}
                </span>
                ]
                <span>x</span>
                <span>
                  {Compound.theoryFormulabot}
                </span>
              </div>
              <p className="text-sm text-text-body leading-relaxed opacity-70">
                سود مرکب به زبانی ساده یعنی سودِ رویِ سود. برخلاف سود ساده که فقط به مبلغ اولیه تعلق می‌گیرد.
              </p>
            </div>
            <Link href="/compound">
              <button className="bg-white cursor-pointer text-brand-main px-10 py-4 rounded-2xl font-black text-sm hover:bg-brand-soft transition-all active:scale-95 shadow-xl">
                {common.startFree}
              </button>
            </Link>
          </div>
          <div className="space-y-4">
            <div className="bg-bg-card p-8 rounded-3xl border border-field-border">
              <h3 className="text-xl font-bold text-text-title mb-4 flex items-center gap-2">
                <Info className="text-brand-main" />
                {loan.theoryTitle}
              </h3>
              <div className="flex flex-wrap justify-center items-center gap-4 text-xl md:text-2xl bg-bg-soft font-bold text-brand-main p-6 rounded-2xl text-center mb-4">
                <span>
                  {loan.theoryFormulaTop}
                </span>
                <span>=</span>
                <div className="flex items-center gap-2 border-x border-brand-main/20 px-4">
                  <span>
                    {loan.theoryFormulaMid}
                  </span>
                  <span>+</span>
                  <span>
                    {loan.theoryFormulaMon}
                  </span>
                </div>
                <span>÷</span>
                <span>
                  {loan.theoryFormulabot}
                </span>
              </div>
              <p className="text-sm text-text-body leading-relaxed opacity-70">
                {loan.theoryDesc}
              </p>
            </div>
            <Link href="/oan-calculator">
              <button className="bg-white cursor-pointer text-brand-main px-10 py-4 rounded-2xl font-black text-sm hover:bg-brand-soft transition-all active:scale-95 shadow-xl">
                  {common.startFree}
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}