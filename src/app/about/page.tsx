"use client";

import { texts } from "@/data/texts";
import { useLanguageStore } from "@/store/useLanguageStore";
import Link from "next/link";
import {
  ArrowUpLeft,
  ArrowUpRight,
  BadgeCheck,
  Code2,
  Layers3,
  Rocket,
  Server,
  Sparkles,
} from "lucide-react";

type AboutHighlight = {
  title: string;
  desc: string;
};

type AboutStackGroup = {
  title: string;
  items: string[];
};

type AboutTimelineItem = {
  year: string;
  title: string;
  desc: string;
};

type AboutTexts = {
  pageTitle: string;
  pageSubtitle: string;

  introTitle: string;
  introDesc: string;

  highlightTitle: string;
  highlights: AboutHighlight[];

  stackTitle: string;
  stackSubtitle: string;
  stackGroups: AboutStackGroup[];

  timelineTitle: string;
  timeline: AboutTimelineItem[];

  ctaTitle: string;
  ctaDesc: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

export default function AboutPage() {
  const { lang, dir } = useLanguageStore();
  const isRTL = dir === "rtl";

  const about = texts.about[lang] as AboutTexts;

  const highlightIcons = [Rocket, Layers3, Server, Code2];

  return (
    <div
      dir={dir}
      className={`${isRTL ? "font-fa" : "font-en"
        } flex flex-col items-center space-y-8 py-12`}
    >
      <section className="mx-auto w-7xl px-4">
        <div className="bg-bg-card border border-field-border rounded-3xl p-6 md:p-10 shadow-xl">
          <div className="flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 bg-brand-soft text-brand-main px-4 py-2 rounded-2xl w-fit animate-in slide-in-from-top-2 duration-700">
              <Sparkles size={18} />
              <span className="text-sm font-bold">{about.pageTitle}</span>
            </div>

            <h1 className="text-2xl md:text-4xl font-black text-text-title leading-tight animate-in slide-in-from-top-4 duration-700 delay-100">
              {about.introTitle}
            </h1>

            <p className="text-text-body leading-relaxed max-w-3xl opacity-90 animate-in fade-in duration-700 delay-200">
              {about.introDesc}
            </p>

            <p className="text-text-muted text-sm md:text-base animate-in fade-in duration-700 delay-300">
              {about.pageSubtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2 animate-in fade-in duration-700 delay-500">
              <Link href="mailto:arias713j@gmail.com" target="_blank">
                <button className="cursor-pointer bg-brand-main text-white px-6 py-3 rounded-2xl font-black text-sm hover:bg-brand-hover transition-all active:scale-95 shadow-xl shadow-brand-main/25 w-full sm:w-auto hover:-translate-y-0.5">
                  {about.ctaPrimary}
                </button>
              </Link>
              {isRTL ? (
                <Link href="https://github.com/arias6" target="_blank">
                  <button className="cursor-pointer bg-bg-soft text-text-title px-6 py-3 rounded-2xl font-black text-sm hover:bg-bg-muted transition-all active:scale-95 border border-field-border w-full sm:w-auto flex items-center justify-center gap-2 hover:-translate-y-0.5">
                    {about.ctaSecondary}
                    <ArrowUpLeft size={18} className="text-brand-main" />
                  </button>
                </Link>
              ) : (
                <Link href="https://github.com/arias6" target="_blank">
                  <button className="cursor-pointer bg-bg-soft text-text-title px-6 py-3 rounded-2xl font-black text-sm hover:bg-bg-muted transition-all active:scale-95 border border-field-border w-full sm:w-auto flex items-center justify-center gap-2 hover:-translate-y-0.5">
                    {about.ctaSecondary}
                    <ArrowUpRight size={18} className="text-brand-main" />
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-7xl px-4">
        <div className="bg-bg-card border border-field-border rounded-3xl p-6 md:p-10 shadow-xl">
          <h2 className="text-xl md:text-2xl font-black text-text-title mb-6">
            {about.highlightTitle}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {about.highlights.map((item, idx) => {
              const Icon = highlightIcons[idx] || BadgeCheck;

              return (
                <div
                  key={`${item.title}-${idx}`}
                  className="rounded-3xl border border-field-border bg-bg-soft p-6 transition-all hover:bg-bg-muted hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-2xl bg-brand-soft text-brand-main border border-brand-main/10 transition-all group-hover:scale-110">
                      <Icon size={20} />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-base md:text-lg font-black text-text-title">
                        {item.title}
                      </h3>
                      <p className="text-sm text-text-body leading-relaxed opacity-80">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto w-7xl px-4">
        <div className="bg-bg-card border border-field-border rounded-3xl p-6 md:p-10 shadow-xl">
          <div className="mb-6">
            <h2 className="text-xl md:text-2xl font-black text-text-title">
              {about.stackTitle}
            </h2>
            <p className="text-text-muted text-sm mt-2">{about.stackSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {about.stackGroups.map((group, idx) => (
              <div
                key={`${group.title}-${idx}`}
                className="rounded-3xl border border-field-border bg-bg-soft p-6 transition-all hover:bg-bg-muted hover:-translate-y-1 hover:shadow-lg"
              >
                <h3 className="text-base font-black text-text-title mb-4">
                  {group.title}
                </h3>

                <div className="flex flex-wrap gap-2">
                  {group.items.map((tag, tIdx) => (
                    <span
                      key={`${tag}-${tIdx}`}
                      className="px-4 py-2 rounded-2xl text-xs font-bold bg-bg-card border border-field-border text-text-body transition-all hover:border-field-hover hover:-translate-y-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-7xl px-4">
        <div className="bg-bg-card border border-field-border rounded-3xl p-6 md:p-10 shadow-xl">
          <h2 className="text-xl md:text-2xl font-black text-text-title mb-6">
            {about.timelineTitle}
          </h2>

          <div className="space-y-4">
            {about.timeline.map((item, idx) => (
              <div
                key={`${item.year}-${idx}`}
                className="rounded-3xl border border-field-border bg-bg-soft p-6 transition-all hover:bg-bg-muted hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                  <div className="flex items-center gap-3">
                    <div className="px-4 py-1 rounded-2xl bg-brand-soft text-brand-main border border-brand-main/10 font-black text-sm">
                      {item.year}
                    </div>

                    <h3 className="text-base md:text-lg font-black text-text-title">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-sm text-text-body opacity-80 leading-relaxed md:max-w-2xl">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-3xl bg-brand-main p-6 md:p-8 text-white shadow-2xl shadow-brand-main/35 overflow-hidden relative transition-all hover:-translate-y-1">
            <div className="space-y-3">
              <h3 className="text-lg md:text-xl font-black">{about.ctaTitle}</h3>
              <p className="text-sm opacity-90 leading-relaxed max-w-3xl">
                {about.ctaDesc}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
