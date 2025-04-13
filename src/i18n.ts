import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import your translation files
import translationEN from "./locales/en.json";
import translationNL from "./locales/nl.json";
import translationFR from "./locales/fr.json";

// the translations
const resources = {
  en: {
    translation: translationEN,
  },
  nl: {
    translation: translationNL,
  },
  fr: {
    translation: translationFR,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "nl",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
