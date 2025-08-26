import type { Metadata } from "next";
// 1. Impor font yang diinginkan dari next/font/google
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Providers from "@/app/components/Providers";
import Navbar from "@/app/components/NavBar";
import Footer from "@/app/components/Footer";
import React from "react";

// 2. Konfigurasi font
const inter = Inter({
    subsets: ["latin"],
    variable: '--font-inter', // Buat CSS variable untuk font ini
    display: 'swap',
});

const poppins = Poppins({
    subsets: ["latin"],
    weight: ['400', '700'], // Tentukan ketebalan yang akan digunakan
    variable: '--font-poppins', // Buat CSS variable
    display: 'swap',
});

// --- METADATA YANG DIPERBARUI ---
export const metadata: Metadata = {
    title: "Nanda's Portfolio | Web Developer",
    description: "Jelajahi portofolio web development dari Nanda. Temukan proyek-proyek inovatif, keahlian teknis, dan solusi kreatif yang telah dikerjakan.",
    // Menambahkan Open Graph metadata untuk tampilan saat share di media sosial
    openGraph: {
        title: "Nanda's Portfolio | Web Developer",
        description: "Jelajahi portofolio web development dari Nanda.",

        locale: 'id_ID', // Sesuaikan dengan bahasa target Anda (misal: 'en_US')
        type: 'website',
    },

};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
        <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Providers>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
        </Providers>
        </body>
        </html>
    );
}
