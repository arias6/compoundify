import { z } from "zod";

export const loanInputSchema = z.object({
  loanAmount: z
    .string()
    .min(1, "REQUIRED")
    .refine((v) => !isNaN(parseFloat(v.replace(/,/g, ""))), {
      message: "INVALID_NUMBER",
    }),
  interestRate: z
    .string()
    .min(1, "REQUIRED")
    .refine((v) => !isNaN(parseFloat(v)), {
      message: "INVALID_NUMBER",
    }),
  loanTerm: z
    .string()
    .min(1, "REQUIRED")
    .refine((v) => !isNaN(parseInt(v)), {
      message: "INVALID_NUMBER",
    }),
});

export type LoanInput = z.infer<typeof loanInputSchema>;

export const formatNumber = (val: string) => {
  if (!val) return "";
  const num = val.replace(/[^\d.]/g, "");
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const parseFormattedNumber = (val: string) => {
  return val.replace(/,/g, "");
};

export const getValidationMessage = (msg: string, lang: "en" | "fa") => {
  const messages = {
    REQUIRED: {
      en: "All fields are required",
      fa: "تکمیل تمام فیلدها الزامی است",
    },
    INVALID_NUMBER: {
      en: "Please enter valid numbers",
      fa: "لطفاً عدد معتبر وارد کنید",
    },
  };

  return messages[msg as keyof typeof messages]?.[lang] || msg;
};
