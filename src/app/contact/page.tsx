"use client";

import { texts } from "@/data/texts";
import { useLanguageStore } from "@/store/useLanguageStore";
import {
  Mail,
  Github,
  ArrowUpRight,
  Globe,
  ExternalLink
} from "lucide-react";

export default function ContactPage() {
  const { lang, dir } = useLanguageStore();
  const isRTL = dir === "rtl";
  const t = texts.contact[lang];

  const socialLinks = [
    {
      id: 1,
      title: "GitHub",
      value: "github.com/arias6",
      icon: <Github size={28} />,
      color: "hover:text-[#24292F]",
      href: "https://github.com/arias6"
    },
  ];

  return (
    <div dir={dir} className={`${isRTL ? "font-fa" : "font-en"} min-h-screen bg-bg-main py-16 px-4 md:px-8`}>
      <div className="max-w-7xl mx-auto">

        <div className="mb-16 border-b border-field-border pb-12">
          <h1 className="text-6xl md:text-8xl font-black text-text-title tracking-tighter mb-6">
            {t.heroTitle} <br />
            <span className="text-brand-main">{t.heroTitleAccent}</span>
          </h1>
          <p className="text-text-body text-xl md:text-2xl max-w-2xl font-medium opacity-70">
            {t.heroDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <a
            href="mailto:arias713j@gmail.com"
            className="md:col-span-2 bg-bg-card border border-field-border rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-between group transition-all duration-500 hover:shadow-2xl hover:border-brand-main/50"
          >
            <div className="flex justify-between items-start">
              <div className="bg-brand-soft p-5 rounded-3xl text-brand-main">
                <Mail size={32} />
              </div>
              <ArrowUpRight className="text-text-muted group-hover:text-brand-main group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" size={32} />
            </div>
            <div className="mt-12">
              <h2 className="text-sm font-black text-text-muted uppercase tracking-[0.2em] mb-2">
                {t.emailLabel}
              </h2>
              <p className="text-3xl md:text-5xl font-black text-text-title break-all">
                arias713j@gmail.com
              </p>
            </div>
          </a>

          <div className="bg-bg-card border border-field-border rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-center items-center text-center">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-brand-main/20 blur-xl rounded-full animate-pulse" />
              <Globe size={48} className="text-brand-main relative z-10" />
            </div>
            <h3 className="text-sm font-black text-text-muted uppercase tracking-widest mb-1">
              {t.locationLabel}
            </h3>
            <p className="text-2xl font-black text-text-title">
              {t.locationValue}
            </p>
          </div>

          {socialLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-bg-card border border-field-border rounded-[2.5rem] p-8 flex items-center justify-between group transition-all duration-300 hover:bg-white hover:shadow-xl"
            >
              <div className="flex items-center gap-5">
                <div className={`text-text-muted transition-colors duration-300 ${link.color}`}>
                  {link.icon}
                </div>
                <span className="text-xl font-black text-text-title">{link.title}</span>
              </div>
              <ExternalLink size={20} className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
          <div className="md:col-span-1 bg-bg-card border border-field-border rounded-[2.5rem] p-8 flex items-center justify-center italic text-text-muted font-medium">
            {isRTL ? "در دسترس برای پروژه‌های فریلنسری" : "Available for freelance work"}
          </div>

          <div className="md:col-span-1 bg-bg-card border border-field-border rounded-[2.5rem] p-8 flex items-center justify-center italic text-text-muted font-medium">
            {isRTL ? "در دسترس برای پروژه‌های فریلنسری" : "Available for freelance work"}
          </div>

          <div className="md:col-span-3 mt-6 bg-text-title rounded-[2.5rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between overflow-hidden relative">
            <div className="relative z-10 text-center md:text-left">
              <h2 className="text-white text-3xl md:text-5xl font-black mb-4">
                {t.ctaTitle}
              </h2>
              <p className="text-white/60 text-lg font-medium">
                {t.ctaDesc}
              </p>
            </div>
            <a
              href="mailto:arias713j@gmail.com"
              className="mt-8 md:mt-0 relative z-10 bg-brand-main text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-brand-hover transition-colors shadow-lg active:scale-95"
            >
              {t.ctaBtn}
            </a>
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-brand-main/20 rounded-full blur-[80px]" />
          </div>

        </div>
      </div>
    </div>
  );
}