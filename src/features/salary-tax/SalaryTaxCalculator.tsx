"use client";

import { useState } from "react";
import { useLanguageStore } from "@/store/useLanguageStore";
import { texts } from "@/data/texts";
import { formatNumber, parseFormattedNumber, getValidationMessage } from "@/schemas/loanValidation";
import { calculateSalaryTax, taxInputSchema } from "@/schemas/taxValidation";
import { RefreshCw, Calculator, Wallet, ShieldCheck, DollarSign, Settings2 } from "lucide-react";

export default function SalaryTaxCalculator() {
    const { lang, dir } = useLanguageStore();
    const isRTL = dir === "rtl";
    const t = texts.salaryTax[lang];

    const [inputs, setInputs] = useState({
        salary: "",
        taxRate: "",
        insuranceRate: ""
    });

    const [result, setResult] = useState<{ tax: string, insurance: string, net: string } | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleCalculate = () => {
        const rawSalary = parseFormattedNumber(inputs.salary);
        const parsed = taxInputSchema.safeParse({
            grossSalary: rawSalary,
            taxRate: inputs.taxRate,
            insuranceRate: inputs.insuranceRate
        });

        if (!parsed.success) {
            setError(getValidationMessage("REQUIRED", lang));
            return;
        }

        const salaryNum = parseFloat(rawSalary);
        const customTax = inputs.taxRate ? parseFloat(inputs.taxRate) : undefined;
        const customIns = inputs.insuranceRate ? parseFloat(inputs.insuranceRate) : undefined;

        const { tax, insurance, net } = calculateSalaryTax(salaryNum, customTax, customIns);

        setResult({
            tax: formatNumber(tax.toFixed(0)),
            insurance: formatNumber(insurance.toFixed(0)),
            net: formatNumber(net.toFixed(0))
        });
        setError(null);
    };

    return (
        <div dir={dir} className={`${isRTL ? "font-fa" : "font-en"} max-w-5xl mx-auto p-6 bg-bg-card rounded-3xl shadow-xl`}>
            <h2 className="text-3xl font-extrabold mb-6">{t.title}</h2>

            <div className="space-y-6">
                <div>
                    <label className="block mb-2 text-text-body font-bold">{t.salaryLabel}</label>
                    <input
                        type="text"
                        value={inputs.salary}
                        onChange={(e) => setInputs({ ...inputs, salary: formatNumber(e.target.value) })}
                        placeholder={t.placeholderSalary}
                        className="w-full px-5 py-4 rounded-2xl border border-field-border focus:border-field-focus outline-none transition-all text-lg shadow-sm"
                    />
                </div>

                <div className="p-6 rounded-2xl bg-bg-soft/50 border border-field-border border-dashed">
                    <div className="flex items-center gap-2 mb-4 text-text-title font-bold opacity-80">
                        <Settings2 size={18} />
                        <span>{t.customSettings}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-2 text-sm text-text-body">{t.taxRateLabel}</label>
                            <input
                                type="text"
                                value={inputs.taxRate}
                                onChange={(e) => setInputs({ ...inputs, taxRate: e.target.value })}
                                placeholder={t.placeholderTaxRate}
                                className="w-full px-4 py-3 rounded-xl border border-field-border focus:border-field-focus outline-none bg-bg-card"
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm text-text-body">{t.insuranceRateLabel}</label>
                            <input
                                type="text"
                                value={inputs.insuranceRate}
                                onChange={(e) => setInputs({ ...inputs, insuranceRate: e.target.value })}
                                placeholder={t.placeholderInsuranceRate}
                                className="w-full px-4 py-3 rounded-xl border border-field-border focus:border-field-focus outline-none bg-bg-card"
                            />
                        </div>
                    </div>
                </div>

                {error && <p className="text-error text-sm font-bold bg-error/10 p-3 rounded-lg">{error}</p>}

                <div className="flex gap-4">
                    <button onClick={handleCalculate}
                        className="flex-1 cursor-pointer flex items-center justify-center gap-2 bg-brand-main text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-brand-hover hover:scale-105 active:scale-95 transition-all duration-300"
                    >
                        <Calculator size={20} /> {t.calculateBtn}
                    </button>
                    <button onClick={() => { setInputs({ salary: "", taxRate: "", insuranceRate: "" }); setResult(null); setError(null); }}
                        className="flex-1 cursor-pointer flex items-center justify-center gap-2 bg-bg-soft text-text-title py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-bg-muted hover:scale-105 active:scale-95 transition-all duration-300"
                    >
                        <RefreshCw size={20} /> {t.resetBtn}
                    </button>
                </div>
            </div>

            {result && (
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 animate-fadeIn">
                    <div className="p-5 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex flex-col items-center text-center">
                        <ShieldCheck className="text-blue-500 mb-2" />
                        <span className="text-xs font-bold opacity-70 mb-1">{t.insurance}</span>
                        <span className="text-xl font-black">{result.insurance}</span>
                    </div>
                    <div className="p-5 rounded-2xl bg-error/10 border border-error/20 flex flex-col items-center text-center">
                        <DollarSign className="text-error mb-2" />
                        <span className="text-xs font-bold opacity-70 mb-1">{t.taxAmount}</span>
                        <span className="text-xl font-black">{result.tax}</span>
                    </div>
                    <div className="p-5 rounded-2xl bg-success/10 border border-success/20 flex flex-col items-center text-center scale-105 shadow-xl shadow-success/5">
                        <Wallet className="text-success mb-2" />
                        <span className="text-xs font-bold opacity-70 mb-1">{t.netSalary}</span>
                        <span className="text-xl font-black text-success">{result.net}</span>
                    </div>
                </div>
            )}
        </div>
    );
}