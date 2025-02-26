import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatAndDivideNumber(
    num: number,
    options?: {
        decimalPlaces?: number; // Number of decimal places (default: 1)
        locale?: string; // Locale for formatting (default: 'en-US')
        thousandAbbreviation?: string; // Abbreviation for thousands (default: 'K')
        millionAbbreviation?: string; // Abbreviation for millions (default: 'M')
    }
): string {
    if (num === 0) return "0";
    const {
        decimalPlaces = 1,
        locale = "en-US",
        thousandAbbreviation = "K",
        millionAbbreviation = "M",
    } = options || {};

    const formatter = new Intl.NumberFormat(locale, {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
    });

    if (num >= 1000000) {
        const formattedNum = formatter.format(num / 1000000);
        return `${formattedNum}${millionAbbreviation}`;
    } else if (num >= 1000) {
        const formattedNum = formatter.format(num / 1000);
        return `${formattedNum}${thousandAbbreviation}`;
    } else {
        return formatter.format(num);
    }
}
