"use client";

import { useState } from "react";
import { useLanguageStore } from "@/store/useLanguageStore";
import { texts } from "@/data/texts";
import {
    compoundInputSchema,
    CompoundInput,
    formatNumber,
    parseFormattedNumber,
    getValidationMessage,
} from "@/schemas/compoundValidation";
import { RefreshCw, Calculator } from "lucide-react";
import CompoundChart from "./CompoundChart";

interface Result {
    step: number;
    amount: string;
    gain: string;
    gainPercent: string;
}

export default function CompoundCalculator() {
    const { lang, dir } = useLanguageStore();
    const isRTL = dir === "rtl";
    const t = texts.calculator[lang];

    const [inputs, setInputs] = useState<CompoundInput>({
        principal: "",
        rate: "",
        steps: "",
    });
    const [results, setResults] = useState<Result[]>([]);
    const [error, setError] = useState<string | null>(null);

    // Handle input changes and format numbers
    const handleChange = (field: keyof CompoundInput, value: string) => {
        if (field === "principal") {
            setInputs({ ...inputs, principal: formatNumber(value) });
        } else {
            setInputs({ ...inputs, [field]: formatNumber(value) });
        }
        setError(null);
    };

    // Calculate compound interest results
    const calculateCompound = () => {
        const sanitized: CompoundInput = {
            principal: parseFormattedNumber(inputs.principal),
            rate: parseFormattedNumber(inputs.rate),
            steps: parseFormattedNumber(inputs.steps),
        };

        const parsed = compoundInputSchema.safeParse(sanitized);

        if (!parsed.success) {
            const issue = parsed.error.issues[0];
            setError(getValidationMessage(issue.message, lang));
            setResults([]);
            return;
        }

        const P = parseFloat(parsed.data.principal);
        const r = parseFloat(parsed.data.rate) / 100;
        const n = parseInt(parsed.data.steps);

        const tempResults: Result[] = [];

        for (let i = 1; i <= n; i++) {
            const amount = P * Math.pow(1 + r, i);
            const gain = amount - P;
            const gainPercent = (gain / P) * 100;

            tempResults.push({
                step: i,
                amount: formatNumber(amount.toFixed(0)),
                gain: formatNumber(gain.toFixed(0)),
                gainPercent: formatNumber(gainPercent.toFixed(0)),
            });
        }

        setResults(tempResults);
        setError(null);
    };

    // Reset all inputs and results
    const resetForm = () => {
        setInputs({ principal: "", rate: "", steps: "" });
        setResults([]);
        setError(null);
    };

    const totalAmount = results.length ? results[results.length - 1].amount : "0";
    const totalGain = results.length
        ? formatNumber(
            (
                parseInt(parseFormattedNumber(totalAmount)) -
                parseInt(parseFormattedNumber(inputs.principal))
            ).toString()
        )
        : "0";

    const totalGainPercent = results.length
        ? formatNumber(
            (
                (parseInt(parseFormattedNumber(totalGain)) /
                    parseInt(parseFormattedNumber(inputs.principal))) *
                100
            ).toFixed(0)
        )
        : "0";

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
                        {t.principalLabel}
                    </label>
                    <input
                        type="text"
                        value={inputs.principal}
                        onChange={(e) =>
                            handleChange("principal", e.target.value)
                        }
                        placeholder={t.placeholderPrincipal}
                        className="w-full px-5 py-3 rounded-xl border border-field-border focus:border-field-focus focus:outline-none transition-all duration-300 hover:shadow-md"
                    />
                </div>

                <div className="flex gap-4 flex-col sm:flex-row">
                    <div className="flex-1">
                        <label className="block mb-2 text-text-body">
                            {t.rateLabel}
                        </label>
                        <input
                            type="text"
                            value={inputs.rate}
                            onChange={(e) =>
                                handleChange("rate", e.target.value)
                            }
                            placeholder={t.placeholderRate}
                            className="w-full px-5 py-3 rounded-xl border border-field-border focus:border-field-focus focus:outline-none transition-all duration-300 hover:shadow-md"
                        />
                    </div>

                    <div className="flex-1">
                        <label className="block mb-2 text-text-body">
                            {t.stepsLabel}
                        </label>
                        <input
                            type="text"
                            value={inputs.steps}
                            onChange={(e) =>
                                handleChange("steps", e.target.value)
                            }
                            placeholder={t.placeholderSteps}
                            className="w-full px-5 py-3 rounded-xl border border-field-border focus:border-field-focus focus:outline-none transition-all duration-300 hover:shadow-md"
                        />
                    </div>
                </div>
            </div>

            <div className="flex gap-4 mt-6">
                <button
                    onClick={calculateCompound}
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

            {results.length > 0 && (
                <div className="mt-8 flex flex-col gap-8">
                    <div className="p-6 rounded-3xl bg-linear-to-r from-brand-soft/40 to-brand-soft/15 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6 animate-fadeIn">
                        <div className="flex-1 mb-6 lg:mb-0">
                            <h3 className="text-2xl font-extrabold text-text-title mb-3">
                                {t.totalTitle}
                            </h3>

                            <div className="flex flex-col gap-2 text-text-body">
                                <p className="text-lg">
                                    {t.finalAmount}:{" "}
                                    <span className="text-2xl font-bold text-brand-main">
                                        {totalAmount} $
                                    </span>
                                </p>
                                <p className="text-lg">
                                    {t.totalGain}:{" "}
                                    <span className="text-2xl font-bold text-brand-main">
                                        {totalGain} $
                                    </span>
                                </p>
                                <p className="text-lg">
                                    {t.totalGainPercent}:{" "}
                                    <span className="text-2xl font-bold text-brand-main">
                                        ({totalGainPercent}%)
                                    </span>
                                </p>
                            </div>
                        </div>

                        <div className="flex-1 w-full lg:w-4/5 min-h-55">
                            <CompoundChart results={results} />
                        </div>

                    </div>
                    <div className="animate-fadeIn">
                        <h3 className="text-xl font-semibold mb-4">{t.breakdownTitle}</h3>

                        <div className="hidden lg:block overflow-x-auto">
                            <table className="w-full border-collapse rounded-xl shadow-sm divide-y divide-field-border">
                                <thead className="bg-bg-soft">
                                    <tr>
                                        <th className="px-5 py-3 text-center font-semibold">{t.step}</th>
                                        <th className="px-5 py-3 text-center font-semibold">{t.amount}</th>
                                        <th className="px-5 py-3 text-center font-semibold">{t.gain}</th>
                                        <th className="px-5 py-3 text-center font-semibold">{t.gainPercent}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {results.map((r) => (
                                        <tr key={r.step} className="hover:bg-bg-muted transition-all duration-200 border-b border-field-border">
                                            <td className="px-5 py-3 text-center">{r.step}</td>
                                            <td className="px-5 py-3 text-center font-semibold text-brand-main">${r.amount}</td>
                                            <td className="px-5 py-3 text-center font-semibold">${r.gain}</td>
                                            <td className="px-5 py-3 text-center font-semibold">{r.gainPercent}%</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="lg:hidden flex flex-col gap-4">
                            {results.map((r) => (
                                <div
                                    key={r.step}
                                    className="bg-bg-card border border-field-border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200 animate-fadeIn"
                                >
                                    <div className="flex justify-between mb-2">
                                        <span className="font-medium">{t.step}:</span>
                                        <span className="font-bold text-brand-main">{r.step}</span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <span className="font-medium">{t.amount}:</span>
                                        <span className="font-semibold text-brand-main">${r.amount}</span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <span className="font-medium">{t.gain}:</span>
                                        <span className="font-semibold">${r.gain}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium">{t.gainPercent}:</span>
                                        <span className="font-semibold">{r.gainPercent}%</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
