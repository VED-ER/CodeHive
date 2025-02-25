"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type ThemeContextType = {
    mode: "light" | "dark" | "system";
    theme: "light" | "dark";
    setMode: (mode: "light" | "dark" | "system") => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [mode, setMode] = useState<"light" | "dark" | "system">("system");
    const [theme, setTheme] = useState<"light" | "dark">(
        localStorage?.theme === "dark" ||
            (!("theme" in localStorage) &&
                window.matchMedia("(prefers-color-scheme: dark)").matches)
            ? "dark"
            : "light"
    );

    const handleThemeChange = () => {
        if (
            !("theme" in localStorage && window.matchMedia("(prefers-color-scheme: dark)").matches)
        ) {
            setMode("system");
            setTheme("dark");
            document.documentElement.classList.add("dark");
        } else if (localStorage.theme === "dark") {
            setMode("dark");
            setTheme("dark");
            document.documentElement.classList.add("dark");
        } else {
            setMode("light");
            setTheme("light");
            document.documentElement.classList.remove("dark");
        }
    };

    useEffect(() => {
        console.log("in");

        handleThemeChange();
    }, [mode]);

    return (
        <ThemeContext.Provider value={{ mode, setMode, theme }}>{children}</ThemeContext.Provider>
    );
}
