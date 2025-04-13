import { useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

type Language = "nl" | "en" | "fr";

const LanguageSwitcher = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: "nl", name: "Nederlands", flag: "🇳🇱" },
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
  ];

  const currentLanguage = languages.find(
    (lang) => lang.code === (i18n.language as Language)
  );

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageChange = (lang: Language) => {
    i18n.changeLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/70 backdrop-blur-sm shadow-soft transition-all duration-300 hover:shadow-md"
        aria-label={t("changeLanguage")}
      >
        <span className="font-medium text-sm">
          {currentLanguage?.flag} {currentLanguage?.code.toUpperCase()}
        </span>
      </button>

      {isOpen && (
        <div className="absolute mt-2 right-0 w-40 bg-white/90 backdrop-blur-md rounded-lg shadow-soft z-50">
          <ul className="py-2">
            {languages.map((lang) => (
              <li key={lang.code}>
                <button
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full text-left px-4 py-2 hover:bg-salon-softer-pink flex items-center gap-2 ${
                    i18n.language === lang.code
                      ? "bg-salon-softer-pink text-salon-pink"
                      : "text-salon-text-dark"
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
