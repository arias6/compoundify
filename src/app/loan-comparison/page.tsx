"use client";

import LoanComparisonIndex from "@/features/loan-comparison/LoanComparisonIndex";
import { useLanguageStore } from "@/store/useLanguageStore";
import { texts } from "@/data/texts";
import { BookOpen, Info, Zap, Scale } from "lucide-react";


export default function LoanComparisonPage() {
    const { lang, dir } = useLanguageStore();
    const isRTL = dir === "rtl";
    const t = texts.loanComparison[lang];

    return (
        <div dir={dir} className={`max-w-7xl mx-auto p-4 md:p-8 ${isRTL ? 'font-fa' : 'font-en'}`}>
            <section className="text-center space-y-4 mb-12">
                <div className="flex justify-center mb-4">
                    <div className="bg-brand-soft p-3 rounded-2xl text-brand-main">
                        <Scale size={40} />
                    </div>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-text-title leading-tight mb-6">
                    <span className="text-brand-main block md:inline"> {t.introTitle}</span>
                </h1>
                <p className="text-lg md:text-xl text-text-body leading-relaxed mb-10 max-w-2xl mx-auto opacity-80">
                    {t.introDesc}
                </p>
            </section>

            <LoanComparisonIndex />

            <section className="mt-12 bg-bg-soft/50 p-6 rounded-3xl border border-field-border/50">
                <h3 className="text-lg font-bold text-text-title mb-6 flex items-center gap-2">
                    <BookOpen size={20} className="text-brand-main" />
                    {isRTL ? "چرا باید وام‌ها را مقایسه کنیم؟" : "Why Compare Loans?"}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="p-4 bg-bg-card rounded-2xl border border-field-border hover:shadow-sm transition-all">
                        <span className="text-brand-main font-black text-sm uppercase tracking-wider block mb-1">
                            {isRTL ? "سود کل" : "Total Interest"}
                        </span>
                        <p className="text-text-body text-sm leading-relaxed">
                            {isRTL
                                ? "گاهی یک درصد سود کمتر می‌تواند میلیون‌ها تومان در بازپرداخت نهایی صرفه‌جویی کند."
                                : "Even a 1% difference can save you thousands in the long run."}
                        </p>
                    </div>
                    <div className="p-4 bg-bg-card rounded-2xl border border-field-border hover:shadow-sm transition-all">
                        <span className="text-brand-main font-black text-sm uppercase tracking-wider block mb-1">
                            {isRTL ? "فشار اقساط" : "Monthly Burden"}
                        </span>
                        <p className="text-text-body text-sm leading-relaxed">
                            {isRTL
                                ? "با تغییر مدت زمان وام، می‌توانید قسطی را انتخاب کنید که به بودجه ماهانه شما فشار نیاورد."
                                : "Adjust the term to find a monthly payment that fits your budget."}
                        </p>
                    </div>
                    <div className="p-4 bg-bg-card rounded-2xl border border-field-border hover:shadow-sm transition-all">
                        <span className="text-brand-main font-black text-sm uppercase tracking-wider block mb-1">
                            {isRTL ? "تصمیم هوشمندانه" : "Smart Decision"}
                        </span>
                        <p className="text-text-body text-sm leading-relaxed">
                            {isRTL
                                ? "اعداد دروغ نمی‌گویند؛ همیشه قبل از امضای قرارداد، محاسبات را کنار هم بگذارید."
                                : "Numbers don't lie; always run the math before signing any contract."}
                        </p>
                    </div>
                </div>
            </section>

            <section className="grid grid-cols-1 gap-8 pt-12">
                <div className="bg-bg-card p-8 rounded-3xl border border-field-border">
                    <h3 className="text-xl font-bold text-text-title mb-4 flex items-center gap-2">
                        <Info className="text-brand-main" />
                        {isRTL ? "نکته کلیدی در مقایسه" : "Key Comparison Tip"}
                    </h3>
                    <p className="text-sm text-text-body leading-relaxed opacity-70">
                        {isRTL
                            ? "هنگام مقایسه، حتماً هزینه‌های جانبی مانند کارمزد تشکیل پرونده یا بیمه عمر وام را هم در نظر بگیرید که ممکن است در نرخ سود اسمی اعلام نشوند."
                            : "When comparing, consider extra costs like processing fees or insurance that might not be included in the nominal interest rate."}
                    </p>
                </div>

                <div className="bg-brand-soft p-8 rounded-3xl border border-brand-soft-hover">
                    <h3 className="text-xl font-bold text-brand-main mb-4 flex items-center gap-2">
                        <Zap />
                        {isRTL ? "قانون طلایی" : "Golden Rule"}
                    </h3>
                    <div className="flex gap-3 text-sm font-bold text-text-title">
                        <div className="h-5 w-5 rounded-full bg-brand-main text-white flex items-center justify-center text-[10px] shrink-0">
                            !
                        </div>
                        {isRTL
                            ? "هرچه مدت زمان بازپرداخت طولانی‌تر باشد، مجموع سودی که به بانک می‌دهید بیشتر خواهد بود، حتی اگر اقساط ماهانه کمتر به نظر برسند."
                            : "The longer the loan term, the more total interest you pay, even if monthly installments seem lower."}
                    </div>
                </div>
            </section>
        </div>
    );
}