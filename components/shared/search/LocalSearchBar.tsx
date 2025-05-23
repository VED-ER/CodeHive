"use client";

import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRef } from "react";

interface LocalSearchBarProps {
    route: string;
    iconPosition: "left" | "right";
    imgSrc: string;
    placeholder: string;
    otherClasses?: string;
}

const LocalSearchBar = ({
    iconPosition,
    imgSrc,
    placeholder,
    otherClasses,
}: LocalSearchBarProps) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    return (
        <div
            className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
        >
            {iconPosition === "left" && (
                <Image
                    src={imgSrc}
                    alt="search icon"
                    width={24}
                    height={24}
                    className="cursor-pointer"
                    onClick={() => inputRef.current?.focus()}
                />
            )}

            <Input
                ref={inputRef}
                type="text"
                placeholder={placeholder}
                value=""
                onChange={() => {}}
                className="paragraph-regular no-focus placeholder background-light800_darkgradient! border-none shadow-none outline-none"
            />

            {iconPosition === "right" && (
                <Image
                    src={imgSrc}
                    alt="search icon"
                    width={24}
                    height={24}
                    className="cursor-pointer"
                    onClick={() => inputRef.current?.focus()}
                />
            )}
        </div>
    );
};

export default LocalSearchBar;
