import { ThemeProvider } from "@/context/ThemeProvider";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
// eslint-disable-next-line camelcase
import { Inter, Space_Grotesk } from "next/font/google";
import React from "react";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    variable: "--font-inter",
});
const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-spaceGrotesk",
});

export const metadata: Metadata = {
    title: "CodeHive - The Developer Community",
    description:
        "CodeHive is a community-driven platform for developers to ask questions, share knowledge, and collaborate on projects.",
    keywords: [
        "CodeHive",
        "developer community",
        "programming help",
        "coding questions",
        "stack overflow clone",
    ],
    authors: [{ name: "Vedran Erak", url: "https://github.com/VED-ER" }],
    icons: {
        icon: "/assets/images/site-logo.svg",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}>
                <ClerkProvider
                    appearance={{
                        elements: {
                            formButtonPrimary: "primary-gradient",
                            footerActionLink: "primary-text-gradient hover: text-primary-500",
                        },
                    }}
                >
                    <ThemeProvider>{children}</ThemeProvider>
                </ClerkProvider>
            </body>
        </html>
    );
}
