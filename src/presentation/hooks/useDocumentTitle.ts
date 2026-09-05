import { useEffect } from "react";

/**
 * Custom hook to dynamically update document.title for SEO & accessibility
 */
export const useDocumentTitle = (title: string, baseSuffix = "Museum Musik Indonesia") => {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${baseSuffix}` : baseSuffix;
    document.title = fullTitle;
  }, [title, baseSuffix]);
};

export default useDocumentTitle;
