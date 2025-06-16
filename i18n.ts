import { getRequestConfig } from "next-intl/server";

// This is the configuration for next-intl
// It will load the messages from the specified locale
export default getRequestConfig(async ({ locale }) => {
  // Ensure locale is defined, fallback to 'en' if not
  const safeLocale = locale || "en";

  let messages;
  try {
    messages = (await import(`./messages/${safeLocale}.json`)).default;
  } catch (error) {
    console.error(`Error loading messages for locale ${safeLocale}:`, error);
    // Fallback to English if the locale messages can't be loaded
    messages = (await import(`./messages/en.json`)).default;
  }

  return {
    locale: safeLocale,
    messages,
  };
});
