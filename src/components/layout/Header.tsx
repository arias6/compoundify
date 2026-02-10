"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import {
  Menu, X, Activity, Globe, ChevronDown,
  Home, BookOpen, Info, Mail, Layout,
  Zap, GraduationCap, Calculator, Landmark,
  DollarSign,
  Scale
} from "lucide-react";
import { useNavigationStore } from "@/store/useNavigationStore";
import { useLanguageStore } from "@/store/useLanguageStore";
import { texts } from "@/data/texts";

export default function Header() {
  const {
    isMobileMenuOpen, toggleMobileMenu, closeMobileMenu,
    openSubMenu, setOpenSubMenu
  } = useNavigationStore();

  const { lang, dir, setLanguage } = useLanguageStore();
  const langRef = useRef<HTMLDivElement>(null);
  const t = texts.header[lang];
  const isRTL = dir === "rtl";

  const menuItems = [
    { id: "home", href: "/", text: t.home, icon: Home },
    {
      id: "tools",
      text: t.tools,
      icon: Calculator,
      subItems: [
        { href: "/compound", text: t.compoundCalc, icon: Zap },
        { href: "/loan-calculator", text: t.loanCalc, icon: Landmark },
        { href: "/salary-tax", text: t.salaryTaxCal, icon: DollarSign },
        { href: "/loan-comparison", text: t.loanComparison, icon: Scale },
      ],
    },
    {
      id: "education",
      text: t.education.title,
      icon: BookOpen,
      subItems: [
        { href: "/about-compound", text: t.education.items.whatIs, icon: Layout },
        { href: "/growth-strategies", text: t.education.items.strategies, icon: Zap },
        { href: "/financial-literacy", text: t.education.items.literacy, icon: GraduationCap },
      ],
    },
    { id: "guide", href: "/guide", text: t.guide, icon: Info },
    { id: "about", href: "/about", text: t.about, icon: Activity },
    { id: "contact", href: "/contact", text: t.contact, icon: Mail },
  ];

useEffect(() => {
  const close = (e: MouseEvent) => {
    if (
      langRef.current &&
      !langRef.current.contains(e.target as Node)
    ) {
      if (openSubMenu === "lang") {
        setOpenSubMenu(null);
      }
    }
  };

  document.addEventListener("mousedown", close);
  return () => document.removeEventListener("mousedown", close);
}, [openSubMenu, setOpenSubMenu]);



  return (
    <header dir={dir} className={`${isRTL ? 'font-fa' : 'font-en'} sticky top-0 z-50 w-full border-b border-field-border bg-bg-card/80 backdrop-blur-md`}>
      <div className="mx-auto max-w-7xl">
        <div className="flex h-18 items-center justify-between">

          <Link href="/" onClick={closeMobileMenu} className="group flex items-center gap-2.5 transition-transform active:scale-95">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-main shadow-lg shadow-brand-main/20 group-hover:rotate-12 transition-all duration-500">
              <Activity className="text-white" size={22} />
            </div>
            <span className="text-xl font-black tracking-tight text-text-title uppercase">
              Compound<span className="text-brand-main">ify</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isOpen = openSubMenu === item.id;

              if (item.subItems) {
                return (
                  <div
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => setOpenSubMenu(item.id)}
                    onMouseLeave={() => setOpenSubMenu(null)}
                  >
                    <button className={`flex items-center gap-2 px-4 py-2 text-sm font-bold transition-colors duration-500 cursor-pointer ${isOpen ? 'text-brand-main' : 'text-text-body hover:text-brand-main'}`}>
                      <Icon size={18} />
                      {item.text}
                      <ChevronDown size={14} className={`transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} />
                      <span className={`absolute inset-x-4 bottom-1 h-0.5 bg-brand-main transition-transform duration-500 ${isOpen ? 'scale-x-100' : 'scale-x-0'}`} />
                    </button>
                    {isOpen && (
                      <div className="absolute top-full pt-2 w-64 ltr:left-0 rtl:right-0 animate-in fade-in slide-in-from-top-2 duration-500">
                        <div className="bg-bg-card border border-field-border rounded-xl shadow-xl overflow-hidden p-1.5">
                          {item.subItems.map((sub) => (
                            <Link key={sub.href} href={sub.href} onClick={() => setOpenSubMenu(null)} className="flex items-center gap-3 px-4 py-3 text-xs font-bold text-text-body hover:bg-brand-soft hover:text-brand-main rounded-lg transition-all duration-500 group">
                              <div className="p-1.5 bg-bg-soft rounded-md group-hover:bg-white transition-colors duration-500"><sub.icon size={16} /></div>
                              {sub.text}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link key={item.id} href={item.href || "#"} className="relative flex items-center gap-2 px-4 py-2 text-sm font-bold text-text-body transition-colors duration-500 hover:text-brand-main group">
                  <Icon size={18} />
                  {item.text}
                  <span className="absolute inset-x-4 bottom-1 h-0.5 scale-x-0 bg-brand-main transition-transform duration-500 group-hover:scale-x-100" />
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <div className="relative" ref={langRef}>
              <button onClick={() => setOpenSubMenu(openSubMenu === 'lang' ? null : 'lang')} className="flex items-center gap-2 text-xs font-black bg-bg-soft border border-field-border px-4 py-2.5 rounded-xl text-text-title hover:border-brand-main cursor-pointer transition-all duration-500">
                <Globe size={16} className="text-brand-main" />
                {lang.toUpperCase()}
                <ChevronDown size={14} className={`transition-transform duration-500 ${openSubMenu === 'lang' ? 'rotate-180' : ''}`} />
              </button>
              {openSubMenu === 'lang' && (
                <div className="absolute top-full mt-2 w-32 bg-bg-card border border-field-border rounded-xl shadow-xl overflow-hidden ltr:right-0 rtl:left-0">
                  {Object.entries(t.languages).map(([key, label]) => (
                    <button key={key} onClick={() => { setLanguage(key as "en" | "fa"); setOpenSubMenu(null); }} className="w-full px-4 py-3 text-xs font-bold text-left hover:bg-brand-soft hover:text-brand-main transition-colors duration-500 cursor-pointer">{label}</button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button onClick={toggleMobileMenu} className="flex h-10 w-10 items-center justify-center rounded-lg border border-field-border bg-bg-soft md:hidden transition-all duration-500">
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div className={`absolute inset-x-0 top-full border-b border-field-border bg-bg-card transition-all duration-500 md:hidden ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"}`}>
        <nav className="flex flex-col gap-1.5 p-4">
          {menuItems.map((item) => {
            const isOpen = openSubMenu === item.id;
            if (item.subItems) {
              return (
                <div key={item.id} className="flex flex-col">
                  <button onClick={() => setOpenSubMenu(isOpen ? null : item.id)} className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold transition-all duration-500 ${isOpen ? 'bg-brand-soft text-brand-main' : 'text-text-body'}`}>
                    <div className="flex items-center gap-3"><item.icon size={20} />{item.text}</div>
                    <ChevronDown size={16} className={`transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="flex flex-col gap-1 mt-1 ltr:pl-10 rtl:pr-10 border-s-2 border-brand-soft mx-4 animate-in fade-in duration-500">
                      {item.subItems.map((sub) => (
                        <Link key={sub.href} href={sub.href} onClick={closeMobileMenu} className="flex items-center gap-2 py-3 text-xs font-bold text-text-muted hover:text-brand-main">
                          <sub.icon size={14} />{sub.text}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            return (
              <Link key={item.id} href={item.href || "#"} onClick={closeMobileMenu} className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-text-body hover:bg-brand-soft hover:text-brand-main">
                <item.icon size={20} />{item.text}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}