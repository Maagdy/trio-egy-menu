import { useLanguage } from "../contexts/LanguageContext";

interface MenuItemProps {
  name: string;
  description: string;
  price: {
    small?: number | null;
    medium?: number | null;
    large?: number | null;
  };
}

const MenuItem = ({ name, description, price }: MenuItemProps) => {
  const { language } = useLanguage();

  // Get available sizes with their prices
  const getAvailableSizes = () => {
    const sizes = [];

    if (
      price.small !== null &&
      price.small !== undefined &&
      typeof price.small === "number"
    ) {
      sizes.push({ size: "Small", price: price.small, key: "small" });
    }

    if (
      price.medium !== null &&
      price.medium !== undefined &&
      typeof price.medium === "number"
    ) {
      sizes.push({ size: "Medium", price: price.medium, key: "medium" });
    }

    if (
      price.large !== null &&
      price.large !== undefined &&
      typeof price.large === "number"
    ) {
      sizes.push({ size: "Large", price: price.large, key: "large" });
    }

    return sizes;
  };

  const availableSizes = getAvailableSizes();

  return (
    <div
      className={`bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-red-600 ${
        language === "ar" ? "border-r-4 border-l-0" : ""
      }`}
    >
      <div className={`mb-3 ${language === "ar" ? "text-right" : "text-left"}`}>
        <h3
          className={`text-xl font-bold text-red-800 mb-2 ${
            language === "ar" ? "text-right" : "text-left"
          }`}
        >
          {name}
        </h3>

        {/* Size and price options */}
        <div
          className={`flex flex-wrap gap-2 mb-3 ${
            language === "ar" ? "justify-end" : "justify-start"
          }`}
        >
          {availableSizes.map(({ size, price, key }) => (
            <div
              key={key}
              className="bg-green-100 border border-green-300 rounded-full px-3 py-1 flex items-center gap-2"
            >
              <span className="text-sm font-medium text-green-800">{size}</span>
              <span className="text-sm font-bold text-green-700">
                {typeof price === "number" ? `${price} EGP` : "—"}
              </span>
            </div>
          ))}
        </div>
      </div>

      <p
        className={`text-gray-600 leading-relaxed ${
          language === "ar" ? "text-right" : "text-left"
        }`}
      >
        {description}
      </p>
    </div>
  );
};

export default MenuItem;
