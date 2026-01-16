# Fixora - Local Service Marketplace

Fixora is a premium full-stack local service marketplace platform designed to connect service providers with customers in real-time. Built with a focus on modern aesthetics (glassmorphism), performance, and user experience.

## ✨ Features

- **Dynamic Landing Page**: 7 sections including Hero, Services, How It Works, Top Providers, Testimonials, and Newsletter.
- **Service Listings**: Publicly accessible list of services fetched from the Express.js backend.
- **Dynamic Routing**: Detailed view for each service with specific provider info and rates.
- **Provider Dashboard (Protected)**: Authenticated users can list new services through a premium form.
- **Mock Authentication**: Secure session management using browser cookies.
- **Responsive Design**: Fully optimized for Mobile, Tablet, and Desktop.
- **Rich UI**: High-end styling with Tailwind CSS, Framer Motion animations, and Lucide icons.

## 🛠️ Tech Stack

- **Frontend**: Next.js 15+ (App Router), React 19, Tailwind CSS, Framer Motion.
- **Backend**: Node.js, Express.js.
- **Auth**: Cookie-based mock authentication.
- **Styling**: Glassmorphism & Modern Dark UI.

## 🚀 Getting Started

### 1. Clone & Setup Backend
```bash
cd backend
npm install
npm run dev
```
The backend runs on `http://localhost:5000`.

### 2. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```
The frontend runs on `http://localhost:3000`.

## 🔐 Mock Credentials

To access protected routes like **Add Service**, use the following credentials:
- **Email**: `admin@fixora.com`
- **Password**: `123456`

## 📁 Routes

| Route | Accessibility | Description |
|-------|---------------|-------------|
| `/` | Public | Landing page with platform overview |
| `/services` | Public | List of all available services |
| `/services/[id]`| Public | Detailed view of a specific service |
| `/login` | Public | Mock login page |
| `/add-service` | Protected | Form to create a new service listing |

## 📸 Screenshots

- High-end Hero section with gradient typography.
- Glassmorphic service cards with hover effects.
- Dynamic booking sidebar on service details.
- Success/Error toast notifications for service creation.

---
Built by **Antigravity** for the Advanced Agentic Coding workflow.
