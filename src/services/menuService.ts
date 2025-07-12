import {
  getDocs,
  collection,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import type { MenuItem, MenuSection } from "../types/menu";

export const getMenuSections = async (
  language: "ar" | "en"
): Promise<MenuSection[]> => {
  try {
    // Check Firebase connection first
    const isConnected = await checkFirebaseConnection();
    if (!isConnected) {
      console.error("❌ Firebase connection failed");
      return [];
    }

    // 1. Fetch menu items in selected language with enhanced debugging
    const itemsQuery = query(
      collection(db, "menuItems"),
      where("language", "==", language)
    );

    const itemsSnap = await getDocs(itemsQuery);

    // Debug: Check if collection exists and has any documents
    if (itemsSnap.empty) {
      console.warn("⚠️ No documents found in menuItems collection");

      // Try to fetch all documents to see what's available
      const allItemsSnap = await getDocs(collection(db, "menuItems"));

      if (allItemsSnap.size > 0) {
        const languages = new Set();
        allItemsSnap.forEach((doc) => {
          const data = doc.data();
          languages.add(data.language);
        });
      }

      return [];
    }

    const items = itemsSnap.docs.map((doc) => {
      const data = doc.data();

      return { id: doc.id, ...data };
    });

    // 2. Fetch categories in the same language with enhanced debugging
    const catQuery = query(
      collection(db, "categories"),
      where("language", "==", language)
    );

    const catSnap = await getDocs(catQuery);

    if (catSnap.empty) {
      console.warn("⚠️ No categories found for language:", language);

      // Try to fetch all categories to see what's available
    }

    const categoryMap: Record<string, string> = {};
    catSnap.forEach((doc) => {
      const data = doc.data();
      categoryMap[data.categoryId] = data.name;
    });

    // 3. Group items by resolved category name
    const sectionsMap: Record<string, MenuItem[]> = {};

    items.forEach((item: any) => {
      const categoryId = item.categoryId;
      const categoryName = categoryMap[categoryId] || "🗂 Uncategorized";

      const formattedItem: MenuItem = {
        id: item.id || item.itemId,
        name: item.name,
        description: item.description,
        price: {
          small: item.price?.small ?? null,

          medium: item.price?.medium ?? null,
          large: item.price?.large ?? null,
        },
      };

      if (!sectionsMap[categoryName]) {
        sectionsMap[categoryName] = [];
      }

      sectionsMap[categoryName].push(formattedItem);
    });

    // 4. Convert to MenuSection[]
    const sections: MenuSection[] = Object.entries(sectionsMap).map(
      ([categoryName, items]) => ({
        id: categoryName,
        title: categoryName,
        icon: "", // You can map icon later if needed
        items,
      })
    );

    return sections;
  } catch (err) {
    console.error("🚨 getMenuSections error:", err);

    // Enhanced error logging
    if (err instanceof Error) {
      console.error("Error name:", err.name);
      console.error("Error message:", err.message);
      console.error("Error stack:", err.stack);
    }

    return [];
  }
};

// Enhanced Firebase connection check
export const checkFirebaseConnection = async (): Promise<boolean> => {
  try {
    console.log("🔍 Checking Firebase connection...");

    // Try to read a simple document
    const testDoc = doc(db, "test", "connection");
    await getDoc(testDoc);

    console.log("✅ Firebase connection successful");
    return true;
  } catch (error) {
    console.error("❌ Firebase connection failed:", error);

    // Check if it's a network error, permission error, etc.
    if (error instanceof Error) {
      console.error("Connection error details:", {
        name: error.name,
        message: error.message,
        code: (error as any).code,
      });
    }

    return false;
  }
};
