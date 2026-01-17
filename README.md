# Fixora - Local Service Marketplace

Fixora is a premium service marketplace application built with **Next.js 16 (App Router)** and **Express.js**. It connects local professionals with customers for various home services like electrical, plumbing, cleaning, and more.

## 🚀 Live Demo
- **Frontend:** [https://fixora-market.vercel.app](https://fixora-market.vercel.app) (Replace with your actual Vercel link)
- **Backend:** [https://fixora-backend.onrender.com](https://fixora-backend.onrender.com) (Replace with your actual Backend link)

## 🔑 Mock Login Credentials
Use these credentials to test the protected features:
- **Email:** `user@gmail.com`
- **Password:** `password123`
*(Other roles like `admin@gmail.com` and `provider@gmail.com` also use `password123`)*

## ✨ Features
1. **Cinematic Hero Slider:** A high-end background slider with 3 premium service images and smooth motion effects.
2. **Dynamic Section Typography:** Modern section headings featuring a high-contrast half-white, half-gradient design.
3. **Mock Authentication:** Custom login/register system using cookies for persistent sessions with auto-fill capabilities.
4. **Marketplace (Item List):** A public page to browse all available services with search and filtering.
5. **Service Details:** Full overview of individual services including pricing, features, and provider info.
6. **Protected "Add Service":** Logged-in users can list new services via a comprehensive form.
7. **Role-Based Dashboards:** Unique dashboard experiences for Admin, Provider, and General Users with fixed scroll management.
8. **Premium UI/UX:** Built with Tailwind CSS, Framer Motion for animations, and Lucide React icons.
9. **Newsletter with Glassmorphism:** A sophisticated newsletter section with dark glass aesthetic and subtle glows.


## 🛠️ Technologies Used
- **Frontend:** Next.js 16, React, Tailwind CSS, Framer Motion, Lucide icons, Sonner (Toasts), Nookies.
- **Backend:** Node.js, Express.js, MongoDB (Mongoose), CORS.
- **State Management:** React Hooks (useState, useEffect).

## 📂 Route Summary
| Route | Type | Description |
|-------|------|-------------|
| `/` | Public | Landing Page with 7 sections |
| `/services` | Public | Service Marketplace / Items List |
| `/services/[id]` | Public | Detailed view of a single service |
| `/login` | Public | Authentication page |
| `/register` | Public | New user registration |
| `/add-service` | Protected | Form to add new services (Requires Login) |
| `/dashboard` | Protected | User account & stats overview |
| `/how-it-works` | Public | Detailed process guide |
| `/impact` | Public | Community & Impact statistics |

## ⚙️ Setup & Installation

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account (or local MongoDB)

### 1. Clone the Repository
```bash
git clone https://github.com/YourUsername/Fixora.git
cd Fixora
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` folder:
```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```
Run the server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```
Create a `.env.local` file in the `frontend` folder:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```
Run the application:
```bash
npm run dev
```

---
*Built for SCIC-12 Assignment 9 - Job Task*
