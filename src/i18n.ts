import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enJSON from "./translations/en.json";
import thJSON from "./translations/th.json";

const resources = {
  en: {
    translation: { ...enJSON },
  },
  th: {
    translation: { ...thJSON },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
