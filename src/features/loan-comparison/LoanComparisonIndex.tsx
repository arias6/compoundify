"use client";

import { useState } from "react";
import { useLanguageStore } from "@/store/useLanguageStore";
import { texts } from "@/data/texts";
import { formatNumber, parseFormattedNumber, getValidationMessage } from "@/schemas/loanValidation";
import { calculateSingleLoan, LoanDetails, loanComparisonSchema } from "@/schemas/loanComparisonValidation";
import { RefreshCw, Scale, CheckCircle2, AlertCircle, TrendingDown, Wallet } from "lucide-react";

export default function LoanComparisonIndex() {
    const { lang, dir } = useLanguageStore();
    const isRTL = dir === "rtl";
    const t = texts.loanComparison[lang];

    const [loan1, setLoan1] = useState({ amount: "", rate: "", term: "" });
    const [loan2, setLoan2] = useState({ amount: "", rate: "", term: "" });
    const [results, setResults] = useState<{ res1: LoanDetails, res2: LoanDetails } | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleNumberInput = (value: string, callback: (val: string) => void, isAmount: boolean = false) => {
        const cleaned = value.replace(/[^0-9.]/g, "");
        if (isAmount) {
            callback(formatNumber(cleaned));
        } else {
            callback(cleaned);
        }
    };

    const handleCompare = () => {
        const v1 = loanComparisonSchema.safeParse(loan1);
        const v2 = loanComparisonSchema.safeParse(loan2);

        if (!v1.success || !v2.success) {
            setError(getValidationMessage("REQUIRED", lang));
            return;
        }

        const res1 = calculateSingleLoan(
            parseFloat(parseFormattedNumber(loan1.amount)),
            parseFloat(loan1.rate),
            parseInt(loan1.term)
        );
        const res2 = calculateSingleLoan(
            parseFloat(parseFormattedNumber(loan2.amount)),
            parseFloat(loan2.rate),
            parseInt(loan2.term)
        );
        setResults({ res1, res2 });
        setError(null);
    };

    const isWinner = (val1: number, val2: number) => val1 < val2;

    return (
        <div dir={dir} className={`${isRTL ? "font-fa" : "font-en"} max-w-7xl mx-auto p-6 bg-bg-card rounded-3xl shadow-xl border border-field-border/50`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 rounded-2xl bg-bg-soft/40 border border-field-border focus-within:border-brand-main/50 transition-all">
                    <h3 className="font-bold mb-4 text-text-title flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-brand-main/10 text-brand-main flex items-center justify-center">1</span>
                        {t.loanOne}
                    </h3>
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder={t.amount}
                            value={loan1.amount}
                            onChange={e => handleNumberInput(e.target.value, (val) => setLoan1({ ...loan1, amount: val }), true)}
                            className="w-full p-4 rounded-xl border border-field-border bg-bg-card outline-none focus:border-brand-main transition-all"
                        />
                        <div className="grid grid-cols-2 gap-3">
                            <input
                                type="text"
                                placeholder={t.rate}
                                value={loan1.rate}
                                onChange={e => handleNumberInput(e.target.value, (val) => setLoan1({ ...loan1, rate: val }))}
                                className="p-4 rounded-xl border border-field-border bg-bg-card outline-none focus:border-brand-main transition-all"
                            />
                            <input
                                type="text"
                                placeholder={t.term}
                                value={loan1.term}
                                onChange={e => handleNumberInput(e.target.value, (val) => setLoan1({ ...loan1, term: val }))}
                                className="p-4 rounded-xl border border-field-border bg-bg-card outline-none focus:border-brand-main transition-all"
                            />
                        </div>
                    </div>
                </div>

                <div className="p-6 rounded-2xl bg-bg-soft/40 border border-field-border focus-within:border-brand-main/50 transition-all">
                    <h3 className="font-bold mb-4 text-text-title flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-brand-main/10 text-brand-main flex items-center justify-center">2</span>
                        {t.loanTwo}
                    </h3>
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder={t.amount}
                            value={loan2.amount}
                            onChange={e => handleNumberInput(e.target.value, (val) => setLoan2({ ...loan2, amount: val }), true)}
                            className="w-full p-4 rounded-xl border border-field-border bg-bg-card outline-none focus:border-brand-main transition-all"
                        />
                        <div className="grid grid-cols-2 gap-3">
                            <input
                                type="text"
                                placeholder={t.rate}
                                value={loan2.rate}
                                onChange={e => handleNumberInput(e.target.value, (val) => setLoan2({ ...loan2, rate: val }))}
                                className="p-4 rounded-xl border border-field-border bg-bg-card outline-none focus:border-brand-main transition-all"
                            />
                            <input
                                type="text"
                                placeholder={t.term}
                                value={loan2.term}
                                onChange={e => handleNumberInput(e.target.value, (val) => setLoan2({ ...loan2, term: val }))}
                                className="p-4 rounded-xl border border-field-border bg-bg-card outline-none focus:border-brand-main transition-all"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {error && <p className="mt-4 text-error font-bold text-sm bg-error/5 p-3 rounded-xl border border-error/10">{error}</p>}

            <div className="flex gap-4 mt-8">
                <button onClick={handleCompare}
                    className="flex-1 cursor-pointer flex items-center justify-center gap-2 bg-brand-main text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-brand-hover hover:scale-105 active:scale-95 transition-all duration-300"
                >
                    <Scale size={20} /> {t.compareBtn}
                </button>
                <button onClick={() => { setResults(null); setLoan1({ amount: "", rate: "", term: "" }); setLoan2({ amount: "", rate: "", term: "" }); setError(null); }}
                    className="flex-1 cursor-pointer flex items-center justify-center gap-2 bg-bg-soft text-text-title py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-bg-muted hover:scale-105 active:scale-95 transition-all duration-300"
                >
                    <RefreshCw size={20} /> {t.resetBtn}
                </button>
            </div>

            {results && (
                <div className="mt-12 space-y-8 animate-fadeIn">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 rounded-3xl bg-bg-card border border-field-border relative overflow-hidden">
                            <div className="flex items-center gap-2 mb-6 text-text-body font-bold">
                                <Wallet size={18} className="text-brand-main" />
                                {t.monthlyPayment}
                            </div>
                            <div className="flex justify-between items-end">
                                <div className={`text-center flex-1 ${isWinner(results.res1.emi, results.res2.emi) ? 'text-success' : 'opacity-50'}`}>
                                    <span className="block text-xs mb-1">{t.loanOne}</span>
                                    <span className="text-xl font-black">{formatNumber(results.res1.emi.toFixed(0))}</span>
                                </div>
                                <div className="h-10 w-px bg-field-border mx-4"></div>
                                <div className={`text-center flex-1 ${isWinner(results.res2.emi, results.res1.emi) ? 'text-success' : 'opacity-50'}`}>
                                    <span className="block text-xs mb-1">{t.loanTwo}</span>
                                    <span className="text-xl font-black">{formatNumber(results.res2.emi.toFixed(0))}</span>
                                </div>
                            </div>
                            {results.res1.emi !== results.res2.emi && (
                                <div className="mt-4 pt-4 border-t border-field-border text-center text-xs font-bold text-text-body">
                                    {isWinner(results.res1.emi, results.res2.emi) ? t.loanOne : t.loanTwo} {isRTL ? "قسط ماهانه کمتری دارد" : "has a lower monthly payment"}
                                </div>
                            )}
                        </div>

                        <div className="p-6 rounded-3xl bg-bg-card border border-field-border relative overflow-hidden">
                            <div className="flex items-center gap-2 mb-6 text-text-body font-bold">
                                <TrendingDown size={18} className="text-error" />
                                {t.totalInterest}
                            </div>
                            <div className="flex justify-between items-end">
                                <div className={`text-center flex-1 ${isWinner(results.res1.totalInterest, results.res2.totalInterest) ? 'text-success' : 'opacity-50'}`}>
                                    <span className="block text-xs mb-1">{t.loanOne}</span>
                                    <span className="text-xl font-black">{formatNumber(results.res1.totalInterest.toFixed(0))}</span>
                                </div>
                                <div className="h-10 w-px bg-field-border mx-4"></div>
                                <div className={`text-center flex-1 ${isWinner(results.res2.totalInterest, results.res1.totalInterest) ? 'text-success' : 'opacity-50'}`}>
                                    <span className="block text-xs mb-1">{t.loanTwo}</span>
                                    <span className="text-xl font-black">{formatNumber(results.res2.totalInterest.toFixed(0))}</span>
                                </div>
                            </div>
                            {results.res1.totalInterest !== results.res2.totalInterest && (
                                <div className="mt-4 pt-4 border-t border-field-border text-center text-xs font-bold text-text-body">
                                    {isWinner(results.res1.totalInterest, results.res2.totalInterest) ? t.loanOne : t.loanTwo} {isRTL ? "هزینه تمام‌شده کمتری دارد" : "costs less in total interest"}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={`p-8 rounded-4xl border-2 transition-all ${results.res1.totalInterest === results.res2.totalInterest ? 'bg-bg-soft border-field-border' : 'bg-success/5 border-success/20 shadow-xl shadow-success/5'}`}>
                        {results.res1.totalInterest !== results.res2.totalInterest ? (
                            <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-right">
                                <div className="w-16 h-16 rounded-2xl bg-success text-white flex items-center justify-center shadow-lg shadow-success/20">
                                    <CheckCircle2 size={32} />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-2xl font-black text-text-title mb-1">
                                        {t.winnerMatch} {results.res1.totalInterest < results.res2.totalInterest ? t.loanOne : t.loanTwo}
                                    </h4>
                                    <p className="text-success font-bold text-lg">
                                        {t.savingsTitle} {formatNumber(Math.abs(results.res1.totalInterest - results.res2.totalInterest).toFixed(0))}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4 justify-center">
                                <AlertCircle className="text-brand-main" size={32} />
                                <p className="font-bold text-xl text-text-title">{t.equalOptions}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}