"use client";

import { useState } from "react";
import { useLanguageStore } from "@/store/useLanguageStore";
import { texts } from "@/data/texts";
import {
    loanInputSchema,
    LoanInput,
    formatNumber,
    parseFormattedNumber,
    getValidationMessage,
} from "@/schemas/loanValidation";
import { RefreshCw, Calculator } from "lucide-react";

interface ScheduleRow {
    month: number;
    payment: string;
    principal: string;
    interest: string;
    balance: string;
}

interface LoanResult {
    emi: string;
    totalInterest: string;
    totalRepayment: string;
    schedule: ScheduleRow[];
}

export default function LoanCalculator() {
    const { lang, dir } = useLanguageStore();
    const isRTL = dir === "rtl";
    const t = texts.loanCalculator[lang];

    const [inputs, setInputs] = useState<LoanInput>({
        loanAmount: "",
        interestRate: "",
        loanTerm: "",
    });
    const [result, setResult] = useState<LoanResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (field: keyof LoanInput, value: string) => {
        setInputs({ ...inputs, [field]: formatNumber(value) });
        setError(null);
    };

    const calculateLoan = () => {
        const sanitized: LoanInput = {
            loanAmount: parseFormattedNumber(inputs.loanAmount),
            interestRate: parseFormattedNumber(inputs.interestRate),
            loanTerm: parseFormattedNumber(inputs.loanTerm),
        };

        const parsed = loanInputSchema.safeParse(sanitized);

        if (!parsed.success) {
            const issue = parsed.error.issues[0];
            setError(getValidationMessage(issue.message, lang));
            setResult(null);
            return;
        }

        const P = parseFloat(parsed.data.loanAmount);
        const annualRate = parseFloat(parsed.data.interestRate) / 100;
        const monthlyRate = annualRate / 12;
        const n = parseInt(parsed.data.loanTerm);

        const emi = (P * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
        const totalRepayment = emi * n;
        const totalInterest = totalRepayment - P;

        let balance = P;
        const schedule: ScheduleRow[] = [];

        for (let i = 1; i <= n; i++) {
            const interest = balance * monthlyRate;
            const principal = emi - interest;
            balance -= principal;
            schedule.push({
                month: i,
                payment: formatNumber(emi.toFixed(0)),
                principal: formatNumber(principal.toFixed(0)),
                interest: formatNumber(interest.toFixed(0)),
                balance: formatNumber(Math.max(0, balance).toFixed(0)),
            });
        }

        setResult({
            emi: formatNumber(emi.toFixed(0)),
            totalInterest: formatNumber(totalInterest.toFixed(0)),
            totalRepayment: formatNumber(totalRepayment.toFixed(0)),
            schedule,
        });
        setError(null);
    };

    const resetForm = () => {
        setInputs({ loanAmount: "", interestRate: "", loanTerm: "" });
        setResult(null);
        setError(null);
    };

    return (
        <div
            dir={dir}
            className={`${isRTL ? "font-fa" : "font-en"} max-w-5xl mx-auto p-6 bg-bg-card rounded-3xl shadow-xl`}
        >
            <h2 className="text-3xl font-extrabold mb-6">{t.title}</h2>

            {error && (
                <div className="mb-4 p-3 rounded-lg bg-error text-white font-semibold">
                    {error}
                </div>
            )}

            <div className="flex flex-col gap-4">
                <div>
                    <label className="block mb-2 text-text-body">
                        {t.loanAmountLabel}
                    </label>
                    <input
                        type="text"
                        value={inputs.loanAmount}
                        onChange={(e) => handleChange("loanAmount", e.target.value)}
                        placeholder={t.placeholderAmount}
                        className="w-full px-5 py-3 rounded-xl border border-field-border focus:border-field-focus focus:outline-none transition-all duration-300 hover:shadow-md"
                    />
                </div>

                <div className="flex gap-4 flex-col sm:flex-row">
                    <div className="flex-1">
                        <label className="block mb-2 text-text-body">
                            {t.interestRateLabel}
                        </label>
                        <input
                            type="text"
                            value={inputs.interestRate}
                            onChange={(e) => handleChange("interestRate", e.target.value)}
                            placeholder={t.placeholderRate}
                            className="w-full px-5 py-3 rounded-xl border border-field-border focus:border-field-focus focus:outline-none transition-all duration-300 hover:shadow-md"
                        />
                    </div>

                    <div className="flex-1">
                        <label className="block mb-2 text-text-body">
                            {t.loanTermLabel}
                        </label>
                        <input
                            type="text"
                            value={inputs.loanTerm}
                            onChange={(e) => handleChange("loanTerm", e.target.value)}
                            placeholder={t.placeholderTerm}
                            className="w-full px-5 py-3 rounded-xl border border-field-border focus:border-field-focus focus:outline-none transition-all duration-300 hover:shadow-md"
                        />
                    </div>
                </div>
            </div>

            <div className="flex gap-4 mt-6">
                <button
                    onClick={calculateLoan}
                    className="flex-1 cursor-pointer flex items-center justify-center gap-2 bg-brand-main text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-brand-hover hover:scale-105 active:scale-95 transition-all duration-300"
                >
                    <Calculator size={20} /> {t.calculateBtn}
                </button>

                <button
                    onClick={resetForm}
                    className="flex-1 cursor-pointer flex items-center justify-center gap-2 bg-bg-soft text-text-title py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-bg-muted hover:scale-105 active:scale-95 transition-all duration-300"
                >
                    <RefreshCw size={20} /> {t.resetBtn}
                </button>
            </div>

            {result && (
                <div className="mt-8 flex flex-col gap-8">
                    <div className="p-6 rounded-3xl bg-linear-to-r from-brand-soft/40 to-brand-soft/15 shadow-xl flex flex-col items-start justify-between gap-6 animate-fadeIn">
                        <div className="w-full">
                            <h3 className="text-2xl font-extrabold text-text-title mb-3">
                                {t.resultTitle}
                            </h3>
                            <div className="flex flex-col gap-2 text-text-body">
                                <p className="text-lg">
                                    {t.monthlyPayment}: <span className="text-2xl font-bold text-brand-main">{result.emi}</span>
                                </p>
                                <p className="text-lg">
                                    {t.totalInterest}: <span className="text-2xl font-bold text-error">{result.totalInterest}</span>
                                </p>
                                <p className="text-lg">
                                    {t.totalRepayment}: <span className="text-2xl font-bold text-text-title">{result.totalRepayment}</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="animate-fadeIn">
                        <h3 className="text-xl font-semibold mb-4">{t.breakdownTitle}</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse rounded-xl shadow-sm divide-y divide-field-border">
                                <thead className="bg-bg-soft">
                                    <tr>
                                        <th className="px-5 py-3 text-center font-semibold">{t.tableMonth}</th>
                                        <th className="px-5 py-3 text-center font-semibold">{t.tablePayment}</th>
                                        <th className="px-5 py-3 text-center font-semibold">{t.tablePrincipal}</th>
                                        <th className="px-5 py-3 text-center font-semibold">{t.tableInterest}</th>
                                        <th className="px-5 py-3 text-center font-semibold">{t.tableBalance}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {result.schedule.map((row) => (
                                        <tr key={row.month} className="hover:bg-bg-muted transition-all duration-200 border-b border-field-border">
                                            <td className="px-5 py-3 text-center">{row.month}</td>
                                            <td className="px-5 py-3 text-center font-semibold text-brand-main">{row.payment}</td>
                                            <td className="px-5 py-3 text-center font-semibold text-success">{row.principal}</td>
                                            <td className="px-5 py-3 text-center font-semibold text-error">{row.interest}</td>
                                            <td className="px-5 py-3 text-center font-semibold">{row.balance}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}