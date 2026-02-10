import { create } from "zustand";

interface LanguageState {
  lang: "en" | "fa";
  dir: "ltr" | "rtl";
  setLanguage: (lang: "en" | "fa") => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  lang: "fa",
  dir: "rtl",
  setLanguage: (lang) =>
    set({
      lang,
      dir: lang === "fa" ? "rtl" : "ltr",
    }),
}));
