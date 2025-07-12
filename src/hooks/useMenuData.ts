import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import {
  getMenuSections,
  checkFirebaseConnection,
} from "../services/menuService";
import type { MenuSection } from "../types/menu";

// ✅ Hook for fetching menu sections based on selected language
export const useMenuSections = (language: "ar" | "en") => {
  const query = useQuery<MenuSection[]>({
    queryKey: ["menuSections", language],
    queryFn: () => getMenuSections(language),
    staleTime: 5 * 60 * 1000, // 5 min
    gcTime: 10 * 60 * 1000, // 10 min
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    enabled: !!language,
  });

  useEffect(() => {
    if (query.error) {
      console.error(`❌ useMenuSections error (${language}):`, query.error);
    }

    if (query.isSuccess) {
      const count = query.data?.length ?? 0;

      if (count === 0) {
        console.warn(
          `⚠️ No sections returned — check categories or menuItems for language: ${language}`
        );
      }
    }
  }, [query.error, query.isSuccess, query.data, language]);

  return query;
};

// ✅ Firebase connection check (for dev/debug)
export const useFirebaseConnection = () => {
  const query = useQuery({
    queryKey: ["firebaseConnection"],
    queryFn: checkFirebaseConnection,
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    retry: 1,
  });

  useEffect(() => {
    if (query.error) {
      console.error("❌ Firebase connection check failed:", query.error);
    }
    if (query.isSuccess) {
      console.log(
        "🔗 Firebase connection status:",
        query.data ? "Connected" : "Disconnected"
      );
    }
  }, [query.error, query.isSuccess, query.data]);

  return query;
};

// ✅ Simplified version for UI rendering
export const useMenuSectionsWithStatus = (language: "ar" | "en") => {
  const query = useMenuSections(language);

  return {
    ...query,
    isEmpty: !query.data || query.data.length === 0,
    hasError: !!query.error,
    errorMessage: query.error?.message || "Unknown error occurred",
    isReady: !query.isLoading && !query.error && !!query.data,
    sectionsCount: query.data?.length || 0,
  };
};
