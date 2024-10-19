import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { defaultLocale, SupportedLocale } from "@/translations";

export const useLanguage = () => {
  const {
    i18n: { changeLanguage, language },
  } = useTranslation();

  const setLanguage = (lang: SupportedLocale) => {
    localStorage.setItem("language", lang);
    changeLanguage(lang);
  };

  const toggleLanguage = () => {
    const newLang = language === "en" ? "th" : "en";
    setLanguage(newLang as SupportedLocale);
  };

  useEffect(() => {
    const storedLang =
      (localStorage.getItem("language") as SupportedLocale) || defaultLocale;
    changeLanguage(storedLang);
  }, [changeLanguage]);

  return { language, setLanguage, toggleLanguage };
};
