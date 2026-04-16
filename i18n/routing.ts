import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "es", "fr", "ar", "pt", "ru", "de", "ja", "zh", "hi"],
  defaultLocale: "en",
});
