import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Fixora | Local Service Marketplace",
    description: "Connect with skilled local professionals for all your home and office needs.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-[#0f172a] text-white antialiased`}>
                <Navbar />
                <main className="min-h-screen pt-16">
                    {children}
                </main>
                <Footer />
                <Toaster position="top-center" theme="dark" richColors />
            </body>
        </html>
    );
}
