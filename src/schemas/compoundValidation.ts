import { z } from "zod";

// Format number with thousand separators
export const formatNumber = (value: string) => {
  const n = value.replace(/\D/g, "");
  return n.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Remove number formatting
export const parseFormattedNumber = (value: string) => {
  return value.replace(/,/g, "");
};

// Zod validation schema
export const compoundInputSchema = z.object({
  principal: z.string().nonempty("required").regex(/^\d+$/, "invalidNumber"),
  rate: z.string().nonempty("required").regex(/^\d+$/, "invalidNumber"),
  steps: z.string().nonempty("required").regex(/^\d+$/, "invalidWholeNumber"),
});

export type CompoundInput = z.infer<typeof compoundInputSchema>;

// Map validation messages by language
export const getValidationMessage = (code: string, lang: "fa" | "en") => {
  const messages: Record<string, Record<string, string>> = {
    required: {
      en: "This field is required",
      fa: "این فیلد الزامی است",
    },
    invalidNumber: {
      en: "Enter a valid number",
      fa: "عدد معتبر وارد کنید",
    },
    invalidWholeNumber: {
      en: "Enter a whole number",
      fa: "عدد صحیح وارد کنید",
    },
  };

  return messages[code]?.[lang] ?? messages.invalidNumber[lang];
};
