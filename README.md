# 💰 Compoundify

A lightweight, frontend-only financial toolkit for making financial calculations simple and interactive — for everyone. Supports **English** and **Persian (RTL)**.

Compoundify provides four essential financial calculators to help users make informed decisions quickly:

- **Compound Interest Calculator** — future value of investments over time, detailed tables, interactive charts
- **Bank Loan Calculator** — monthly installments, total repayment, and a full repayment schedule
- **Bank Loan Comparison Tool** — compare multiple loans side by side
- **Income Tax Calculator** — income tax based on Iranian tax rules, with salary breakdown and deductions

All calculations run entirely **on the client side** — no backend, no API calls, instant results.

---

## 🚀 Getting Started

### Option 1: Docker (recommended)

```bash
# Build the image
docker build -t compoundify .

# Run the container
docker run -p 3000:3000 compoundify
```

Then open http://localhost:3000.

### Option 2: Local development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open http://localhost:3000 in your browser.

### Production build (local)

```bash
npm run build     # Build for production
npm run start     # Start production server
```

---

## ✨ Features

- 💹 Compound interest calculator with growth visualization
- 🏦 Bank loan calculator with repayment schedule tables
- 🔍 Side-by-side bank loan comparison with charts
- 💵 Income tax calculator based on Iranian tax rules
- 🧩 Zod-validated inputs with instant results as you type
- 📊 Charts rendered with ECharts
- 🌐 Persian (RTL) and English (LTR) layouts with a language toggle
- 📱 Fully responsive — desktop, tablet, and mobile

---

## 🛠 Tech Stack

| Category           | Technology                            |
| ------------------ | ------------------------------------- |
| Framework          | Next.js 15 (App Router)               |
| Language           | TypeScript                            |
| Frontend           | React 19                              |
| Styling            | Tailwind CSS v4                       |
| State Management   | Zustand                               |
| Charts             | ECharts                               |
| Icons              | Lucide React                          |
| Validation         | Zod                                   |
| Linting            | ESLint                                |
| Containerization   | Docker (multi-stage build)            |

---

## 🧠 Architecture

- **100% frontend** — no backend, no API calls, no server-side persistent state
- **Client-side calculations** — inputs validated with Zod and recalculated instantly
- **Standalone Next.js output** — optimized for production in Docker