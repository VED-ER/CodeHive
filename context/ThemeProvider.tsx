"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type ThemeContextType = {
    mode: "light" | "dark";
    setMode: (mode: "light" | "dark") => void;
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
    const [mode, setMode] = useState<"light" | "dark">("light");

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const handleThemeChange = () => {
        if (mode === "dark") {
            setMode("light");
            document.documentElement.classList.remove("dark");
            document.documentElement.classList.add("light");
        } else {
            setMode("dark");
            document.documentElement.classList.remove("light");
            document.documentElement.classList.add("dark");
        }
    };

    useEffect(() => {
        console.log("mode changed");
    }, [mode]);

    return <ThemeContext.Provider value={{ mode, setMode }}>{children}</ThemeContext.Provider>;
}
