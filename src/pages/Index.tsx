import Header from "../components/Header";
import MenuSection, { type MenuItemData } from "../components/MenuSection";
import { useLanguage } from "../contexts/LanguageContext";
import { useMenuSections } from "../hooks/useMenuData";

const Index = () => {
  const { t, language } = useLanguage();
  const { data: menuSections, isLoading, error } = useMenuSections(language);

  // helpers — put these in a utils file or inline
  const pricesAsArray = (p?: {
    small?: number | null;
    medium?: number | null;
    large?: number | null;
  }) =>
    [p?.small, p?.medium, p?.large].filter(
      (n): n is number => typeof n === "number"
    );

  const avgPrice = (item: MenuItemData) => {
    const arr = pricesAsArray(item.price);
    return arr.length ? arr.reduce((s, n) => s + n, 0) / arr.length : 0;
  };

  const sections = (menuSections || []).sort((a, b) => {
    const avgA = a.items.length
      ? a.items.reduce((s, itm) => s + avgPrice(itm), 0) / a.items.length
      : 0;

    const avgB = b.items.length
      ? b.items.reduce((s, itm) => s + avgPrice(itm), 0) / b.items.length
      : 0;

    return avgB - avgA;
  });

  if (error) {
    console.error("Error loading menu:", error);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-red-50">
      <Header />

      {/* Hero Section */}
      <section className="py-16 px-4 text-center bg-gradient-to-r from-yellow-100 to-orange-100">
        <div className="max-w-4xl mx-auto">
          <h2
            className={`text-3xl font-bold text-red-800 mb-4 ${
              language === "ar" ? "text-right" : "text-left"
            }`}
          >
            {t("welcome")}
          </h2>
          <p
            className={`text-lg text-gray-700 leading-relaxed ${
              language === "ar" ? "text-right" : "text-left"
            }`}
          >
            {t("heroDescription")}
          </p>
        </div>
      </section>

      {/* Menu Sections */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {isLoading ? (
          <div className="text-center py-8">
            <p className="text-lg text-gray-600">Loading menu...</p>
          </div>
        ) : (
          sections.map((section, index) => (
            <MenuSection
              key={index}
              title={section.title}
              items={section.items}
              icon={section.icon}
            />
          ))
        )}
      </main>

      {/* Custom Pizza Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-yellow-100 to-orange-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className={`text-3xl font-bold text-red-800 mb-6 ${
                language === "ar" ? "text-right" : "text-left"
              }`}
            >
              {t("customPizzaTitle")}
            </h2>
            <p
              className={`text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto ${
                language === "ar" ? "text-right" : "text-left"
              }`}
            >
              {t("customPizzaDescription")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3
                className={`text-xl font-semibold text-red-800 mb-4 ${
                  language === "ar" ? "text-right" : "text-left"
                }`}
              >
                {t("cheeseTitle")}
              </h3>
              <p
                className={`text-gray-600 ${
                  language === "ar" ? "text-right" : "text-left"
                }`}
              >
                {t("cheeseOptions")}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3
                className={`text-xl font-semibold text-red-800 mb-4 ${
                  language === "ar" ? "text-right" : "text-left"
                }`}
              >
                {t("meatTitle")}
              </h3>
              <p
                className={`text-gray-600 ${
                  language === "ar" ? "text-right" : "text-left"
                }`}
              >
                {t("meatOptions")}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3
                className={`text-xl font-semibold text-red-800 mb-4 ${
                  language === "ar" ? "text-right" : "text-left"
                }`}
              >
                {t("coldMeatTitle")}
              </h3>
              <p
                className={`text-gray-600 ${
                  language === "ar" ? "text-right" : "text-left"
                }`}
              >
                {t("coldMeatOptions")}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3
                className={`text-xl font-semibold text-red-800 mb-4 ${
                  language === "ar" ? "text-right" : "text-left"
                }`}
              >
                {t("vegetableTitle")}
              </h3>
              <p
                className={`text-gray-600 ${
                  language === "ar" ? "text-right" : "text-left"
                }`}
              >
                {t("vegetableOptions")}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3
                className={`text-xl font-semibold text-red-800 mb-4 ${
                  language === "ar" ? "text-right" : "text-left"
                }`}
              >
                {t("sauceTitle")}
              </h3>
              <p
                className={`text-gray-600 ${
                  language === "ar" ? "text-right" : "text-left"
                }`}
              >
                {t("sauceOptions")}
              </p>
            </div>
          </div>

          <div className="text-center">
            <p
              className={`text-lg font-semibold text-red-800 ${
                language === "ar" ? "text-right" : "text-left"
              }`}
            >
              {t("customPizzaContact")}
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-red-900 text-white py-8 px-4 mt-16">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-yellow-300 mb-4">
            {t("restaurantName")}
          </h3>
          <p className="text-red-100 mb-2">📍 {t("location")}</p>
          <p className="text-red-100 mb-2">📞 {t("phone")}</p>
          <p className="text-red-100 mb-4">🕒 {t("hours")}</p>
          <div className="h-1 w-16 bg-yellow-300 mx-auto rounded mb-4"></div>
          <p className="text-sm text-red-200 mb-4">{t("followUs")}</p>

          {/* Social Media Icons */}
          <div className="flex justify-center gap-6">
            <a
              href="https://www.facebook.com/share/19ugPeYwX2/?mibextid=wwXIfr"
              className="text-yellow-300 hover:text-[#1877F2] transition-colors duration-300"
              aria-label="Facebook"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            <a
              href="https://www.instagram.com/trioegy1"
              className="text-yellow-300 hover:text-[#E1306C] transition-colors duration-300"
              aria-label="Instagram"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            <a
              href="https://www.tiktok.com/@trio.egy3?_t=zs-8upcobseymb&_r=1"
              className="text-yellow-300 hover:text-black transition-colors duration-300"
              aria-label="TikTok"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
