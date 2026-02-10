import { z } from "zod";

export const loanComparisonSchema = z.object({
  amount: z.string().min(1, "REQUIRED"),
  rate: z.string().min(1, "REQUIRED"),
  term: z.string().min(1, "REQUIRED"),
});

export interface LoanDetails {
  emi: number;
  totalInterest: number;
  totalPayment: number;
  principal: number;
}

export const calculateSingleLoan = (
  P: number,
  r: number,
  n: number,
): LoanDetails => {
  if (r === 0) {
    return { emi: P / n, totalInterest: 0, totalPayment: P, principal: P };
  }
  const monthlyRate = r / 100 / 12;
  const emi =
    (P * monthlyRate * Math.pow(1 + monthlyRate, n)) /
    (Math.pow(1 + monthlyRate, n) - 1);
  const totalPayment = emi * n;
  const totalInterest = totalPayment - P;

  return { emi, totalInterest, totalPayment, principal: P };
};
