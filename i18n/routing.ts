import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "es", "fr", "ar", "pt", "ru", "de", "ja", "zh", "hi", "it", "ko", "tr", "nl", "pl", "id", "vi", "th", "bn", "sw"],
  defaultLocale: "en",
  localePrefix: "always",
});
