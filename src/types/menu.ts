export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: {
    small?: number | null;
    medium?: number | null;
    large?: number | null;
  };
}

export interface MenuSection {
  id: string;
  title: string;
  icon: string;
  items: MenuItem[];
}

export interface MenuData {
  ar: {
    pizzas: MenuItem[];
    appetizers: MenuItem[];
    beverages: MenuItem[];
    desserts: MenuItem[];
  };
  en: {
    pizzas: MenuItem[];
    appetizers: MenuItem[];
    beverages: MenuItem[];
    desserts: MenuItem[];
  };
}
