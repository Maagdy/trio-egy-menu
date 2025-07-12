import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface LanguageContextType {
  language: "ar" | "en";
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  ar: {
    // Header
    restaurantName: "Trio.egy",
    tagline: "مطعم إيطالي أصيل",

    // Hero Section
    welcome: "مرحباً بكم في Trio.egy",
    heroDescription:
      "استمتعوا بالطعم الأصيل لإيطاليا هنا في السويس. بيتزا مصنوعة بأجود المكونات والوصفات التقليدية وشغف الطبخ اللي اتربينا عليه.",
    // Custom Pizza Section
    customPizzaTitle: "اصنع بيتزا حسب طلبك",
    customPizzaDescription:
      "أنشئ بيتزا فريدة من نوعها بناءً على تفضيلاتك الشخصية. اختر من الخيارات التالية لتحصل على النكهة المثالية.",
    cheeseTitle: "نوع الجبنة",
    cheeseOptions: "موزاريلا - شيدر - رومي - بلو تشيز",
    meatTitle: "نوع اللحم",
    meatOptions: "شرائح لحم - فراخ شيش - جمبري - كابوريا",
    coldMeatTitle: "نوع اللحم البارد",
    coldMeatOptions: "سموكد بيف - تركي مدخن - سلامي - بيبروني - بسطرمة",
    vegetableTitle: "نوع الخضروات",
    vegetableOptions:
      "زيتون اسود - فلفل اخضر - شرائح بصل - مشروم فريش - فلفل هالبينو",
    sauceTitle: "نوع الصوص",
    sauceOptions: "رانش - باربيكيو - تيستي - هالبينو",
    customPizzaContact:
      "اتصل بنا لطلب بيتزا مخصصة أو قم بزيارة المطعم لتجربة فريدة",

    // Footer
    location: "السويس، شارع الشهداء",
    phone: "01200047417 , 01065502943",
    hours: "مفتوح يومياً: 12:00 ظهراً - 12:00 منتصف الليل",
    followUs: "تابعونا على وسائل التواصل الاجتماعي للعروض والتحديثات اليومية!",

    // Language Toggle
    language: "English",
  },
  en: {
    // Header
    restaurantName: "Trio.egy",
    tagline: "Authentic Italian Pizzeria",

    // Hero Section
    welcome: "Welcome to Trio.egy",
    heroDescription:
      "Experience the authentic taste of Italy right here in Suez. Our pizzas are made with the finest ingredients, traditional recipes, and the passion for cooking we’ve grown up with.", // Custom Pizza Section
    customPizzaTitle: "Customize Your Own Pizza",
    customPizzaDescription:
      "Create a unique pizza tailored to your personal preferences. Choose from the following options to craft your perfect flavor combination.",
    cheeseTitle: "Cheese Type",
    cheeseOptions: "Mozzarella - Cheddar - Roumi - Blue Cheese",
    meatTitle: "Meat Type",
    meatOptions: "Beef Strips - Chicken Shish - Shrimp - Crab",
    coldMeatTitle: "Cold Meat Type",
    coldMeatOptions:
      "Smoked Beef - Smoked Turkey - Salami - Pepperoni - Pastrami",
    vegetableTitle: "Vegetable Type",
    vegetableOptions:
      "Black Olives - Green Peppers - Onion Slices - Fresh Mushrooms - Jalapeño Peppers",
    sauceTitle: "Sauce Type",
    sauceOptions: "Ranch - BBQ - Tasty - Jalapeño",
    customPizzaContact:
      "Call us to order a custom pizza or visit our restaurant for a unique experience",

    // Footer
    location: "Suez, Al-Shuhada Street",
    phone: "01200047417 , 01065502943",
    hours: "Open Daily: 12:00 PM - 12:00 AM",
    followUs: "Follow us on social media for daily specials and updates!",

    // Language Toggle
    language: "العربية",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<"ar" | "en">("ar");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "ar" ? "en" : "ar"));
  };

  const t = (key: string): string => {
    return (
      translations[language][key as keyof (typeof translations)["ar"]] || key
    );
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      <div
        className={language === "ar" ? "rtl" : "ltr"}
        dir={language === "ar" ? "rtl" : "ltr"}
      >
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
