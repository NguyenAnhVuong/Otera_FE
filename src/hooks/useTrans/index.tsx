"use client";
import vi from "@/locales/vi";
import { useEffect, useState } from "react";

const useTrans = () => {
  const [language, setLanguage] = useState("vi");

  const getLocaleText = (language: string) => {
    switch (language) {
      case "vi":
        return vi;
      default:
        return vi;
    }
  };

  useEffect(() => {
    const language = localStorage.getItem("language");
    if (language) {
      setLanguage(language);
    }
  }, []);

  return { localeText: getLocaleText(language), setLanguage };
};

export default useTrans;
