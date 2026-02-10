"use client";

import Link from "next/link";
import { Activity, Github, Mail, Heart } from "lucide-react";
import { useLanguageStore } from "@/store/useLanguageStore";
import { texts } from "@/data/texts";

export default function Footer() {
    const { lang, dir } = useLanguageStore();
    const t = texts.footer[lang];
    const isRTL = dir === "rtl";
    const currentYear = new Date().getFullYear();

    const socials = [
        { icon: <Mail size={18} />, label: "Email", href: "mailto:arias713j@gmail.com" },
        { icon: <Github size={18} />, label: "Github", href: "https://github.com/arias6" },
    ];

    return (
        <footer
            dir={dir}
            className={`${isRTL ? 'font-fa' : 'font-en'} bg-bg-card border-t border-field-border`}
        >
            <div className="mx-auto max-w-7xl px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10">

                    <div className="md:col-span-5 flex flex-col items-center md:items-start gap-5 text-center md:text-start">
                        <Link href="/" className="group flex items-center gap-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-main shadow-lg shadow-brand-main/20 transition-transform duration-500 group-hover:rotate-360">
                                <Activity className="text-white" size={20} />
                            </div>
                            <span className="text-xl font-black tracking-tighter text-text-title uppercase">
                                Compound<span className="text-brand-main">ify</span>
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed text-text-body max-w-md">
                            {t.description}
                        </p>
                    </div>

                    <div className="md:col-span-3 flex flex-col items-center md:items-start gap-5 text-center md:text-start">
                        <h3 className="text-xs font-black uppercase  text-text-body">
                            {t.col2Title}
                        </h3>
                        <ul className="space-y-3">
                            {t.educationalLinks.map((link, i) => (
                                <li key={i}>
                                    <Link href={link.href} className="text-sm font-bold text-text-muted hover:text-brand-main transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-2 flex flex-col items-center md:items-start gap-5 text-center md:text-start">
                        <h3 className="text-xs font-black uppercase  text-text-body">
                            {t.col1Title}
                        </h3>
                        <ul className="space-y-3">
                            {texts.footer[lang].toolsLinks.map((route, i) => (
                                <li key={i}>
                                    <Link href={route.href} className="text-sm font-bold text-text-muted hover:text-brand-main transition-colors">
                                        {route.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-2 flex flex-col items-center md:items-start gap-5 text-center">
                        <h3 className="text-xs font-black uppercase  text-text-body">
                            {t.connectTitle}
                        </h3>
                        <div className="flex gap-3">
                            {socials.map((social) => (
                                <Link
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    className="group flex h-10 w-10 items-center justify-center rounded-xl border border-field-border bg-bg-soft transition-all duration-500 hover:-translate-y-1 hover:border-brand-main hover:bg-brand-soft hover:text-brand-main"
                                >
                                    <span className="transition-transform duration-500 group-hover:scale-110">
                                        {social.icon}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-field-border flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-[11px] font-bold text-text-placeholder uppercase">
                        © {currentYear} {texts.common[lang].brandName}. {t.allRights}
                    </p>

                    <div className="group flex items-center gap-2 text-xs font-bold text-text-body">
                        <span>{t.madeWith}</span>
                        <Heart size={14} className="text-brand-main transition-all duration-300 group-hover:scale-125 group-hover:fill-brand-main" />
                        <span className="text-brand-main">{texts.common[lang].heart}</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}