# 🚀 MediStore - Premium Online Pharmacy

**MediStore** is a sophisticated and user-centric online pharmacy platform designed to bridge the gap between healthcare and technology. Built with **Next.js 15 (App Router)** and **Tailwind CSS**, it offers a high-performance, visually stunning experience for purchasing OTC medicines.

---

## ✨ Key Features

- **Modern & Immersive UI:** A premium dark-themed interface with smooth animations powered by **Framer Motion**.
- **Secure Authentication:** Robust login and signup system using React Context API for state management.
- **Medicine Catalog:** Effortlessly browse, search, and filter medicines by category.
- **Advanced Cart System:** Real-time cart updates (add/remove/quantity adjustment) with persistent state.
- **Optimized Checkout:** A seamless multi-step checkout process with shipping and tax calculations.
- **Customer Feedback:** Integrated review system where verified purchasers can rate and review medicines.
- **Responsive Architecture:** Fully optimized for mobile, tablet, and desktop screens.
- **Performance Optimized:** Leveraging Next.js Server Components and Image optimization for lightning-fast loads.

---

## 🛠 Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **State Management:** React Context API
- **Feedback:** React Hot Toast

---

## 📂 Project Structure

```text
├── src/
│   ├── app/                # Next.js App Router (Pages, Layouts, & Groups)
│   ├── components/         # Reusable UI components (Shared & Specific)
│   ├── lib/                # Auth Context, API instance, and Helpers
│   └── styles/             # Global CSS and Tailwind configurations
├── public/                 # Static assets (Images, Logos, Pngs)
├── next.config.js          # Next.js specific configurations
└── tailwind.config.js      # Tailwind CSS customization
```

## Getting Started

Clone the Repository:
```bash
git clone [https://github.com/Maksudur7/MediStore-Frontend.git](https://github.com/Maksudur7/MediStore-Frontend.git)
cd MediStore-Frontend
```

Install Dependencies:
```bash
npm install
# or
yarn install
```

Environment Setup:
Create a .env.local file in the root directory and add your backend API URL
```bash
NEXT_PUBLIC_API_URL=your_backend_api_url_here
```

Run Development Server: 
```bash
npm run dev
```
---

## Open http://localhost:3000 in your browser to see the result.

## Build for Production :
```bash
npm run build
npm start
```
