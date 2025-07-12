import { useLanguage } from "../contexts/LanguageContext";
import Motto from "./Motto";

const Header = () => {
  const { t, toggleLanguage, language } = useLanguage();

  return (
    <header className="bg-gradient-to-r from-red-800 to-red-900 text-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Motto and Language Toggle */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-between mb-6 gap-2 ${
            language === "ar" ? "flex-row-reverse" : ""
          }`}
        >
          <Motto />

          <button
            onClick={toggleLanguage}
            className="bg-yellow-400 text-red-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
          >
            {t("language")}
          </button>
        </div>

        {/* Title and Tagline */}
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-2 text-yellow-300">
            {t("restaurantName")}
          </h1>
          <p className="text-xl text-red-100">{t("tagline")}</p>
          <div className="mt-4 h-1 w-24 bg-yellow-300 mx-auto rounded"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
