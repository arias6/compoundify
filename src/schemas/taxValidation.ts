import { z } from "zod";

export const taxInputSchema = z.object({
  grossSalary: z.string().min(1, "REQUIRED"),
  taxRate: z.string().optional(),
  insuranceRate: z.string().optional(),
});

export type TaxInput = z.infer<typeof taxInputSchema>;

export const calculateSalaryTax = (grossSalary: number, customTaxRate?: number, customInsuranceRate?: number) => {
  const insuranceRate = customInsuranceRate !== undefined ? customInsuranceRate / 100 : 0.07;
  const insurance = grossSalary * insuranceRate;
  
  let tax = 0;

  if (customTaxRate !== undefined) {
    tax = grossSalary * (customTaxRate / 100);
  } else {
    const FREE_THRESHOLD = 24000000;
    if (grossSalary > FREE_THRESHOLD) {
      const remaining = grossSalary - FREE_THRESHOLD;
      if (grossSalary <= 30000000) {
        tax = remaining * 0.1;
      } else if (grossSalary <= 38000000) {
        tax = 6000000 * 0.1 + (grossSalary - 30000000) * 0.15;
      } else {
        tax = 6000000 * 0.1 + 8000000 * 0.15 + (grossSalary - 38000000) * 0.2;
      }
    }
  }

  return {
    insurance,
    tax,
    net: grossSalary - insurance - tax,
  };
};