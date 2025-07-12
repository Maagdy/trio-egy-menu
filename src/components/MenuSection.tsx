import MenuItem from "./MenuItem";
import { useLanguage } from "../contexts/LanguageContext";

export interface MenuItemData {
  name: string;
  description: string;
  price: {
    small?: number | null;
    medium?: number | null;
    large?: number | null;
  };
}

interface MenuSectionProps {
  title: string;
  items: MenuItemData[];
  icon?: string;
}

const MenuSection = ({ title, items, icon }: MenuSectionProps) => {
  const { language } = useLanguage();

  return (
    <section className="mb-12">
      <div className="text-center mb-8">
        <h2
          className={`text-4xl font-bold text-red-800 mb-2 flex items-center justify-center gap-3 ${
            language === "ar" ? "flex-row-reverse" : ""
          }`}
        >
          {icon && <span className="text-5xl">{icon}</span>}
          {title}
        </h2>
        <div className="h-1 w-16 bg-red-600 mx-auto rounded"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item, index) => (
          <MenuItem
            key={index}
            name={item.name}
            description={item.description}
            price={item.price}
          />
        ))}
      </div>
    </section>
  );
};

export default MenuSection;
