import { forwardRef } from "react";
import { GroupBase, Props as ReactSelectProps } from "react-select";
import CreatableSelect from "react-select/creatable";

import { cn } from "@/lib/utils";

export type CreatableMultiSelectProps<
    Option,
    IsMulti extends boolean = true,
    Group extends GroupBase<Option> = GroupBase<Option>,
> = Omit<ReactSelectProps<Option, IsMulti, Group>, "theme" | "classNames"> & {
    error?: boolean;
    containerClassName?: string;
    hideDropdownIndicator?: boolean;
};

export const CreatableMultiSelect = forwardRef<any, CreatableMultiSelectProps<any>>(
    ({ className, error, containerClassName, hideDropdownIndicator, ...props }, ref) => {
        return (
            <CreatableSelect
                ref={ref}
                isMulti
                unstyled
                closeMenuOnSelect={false}
                className={containerClassName}
                classNames={{
                    control: ({ isFocused }) =>
                        cn(
                            "flex !min-h-0 rounded-md border border-input background-light900_dark300 px-3 py-[3px] text-sm shadow-sm transition-colors",
                            "placeholder:text-muted-foreground focus-visible:outline-none",
                            "disabled:cursor-not-allowed disabled:opacity-50",
                            isFocused && "ring-1 ring-ring",
                            error && "border-destructive ring-destructive",
                            className
                        ),
                    placeholder: () => "text-muted-foreground",
                    input: () => "text-base",
                    menu: () =>
                        "mt-2 rounded-md border bg-popover text-popover-foreground shadow-md py-1",
                    menuList: () => "text-sm",
                    option: ({ isFocused, isSelected }) =>
                        cn(
                            "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 outline-none transition-colors",
                            isSelected && "bg-primary text-primary-foreground",
                            isFocused && !isSelected && "bg-accent text-accent-foreground",
                            !isFocused &&
                                !isSelected &&
                                "text-popover-foreground hover:bg-accent hover:text-accent-foreground"
                        ),
                    multiValue: () =>
                        "inline-flex items-center bg-secondary py-1 px-2 rounded-md text-secondary-foreground mr-1",
                    multiValueLabel: () => "px-2 text-base leading-none",
                    multiValueRemove: () =>
                        cn(
                            "flex items-center justify-center p-1 rounded-md",
                            "hover:bg-destructive hover:text-destructive-foreground"
                        ),
                    valueContainer: () => "gap-1 flex flex-wrap items-center",
                    clearIndicator: () => "p-1 text-muted-foreground hover:text-foreground",
                    dropdownIndicator: () =>
                        `p-1 text-muted-foreground hover:text-foreground ${hideDropdownIndicator ? "!hidden" : ""}`,
                    indicatorSeparator: () =>
                        `bg-input mx-2 my-2 w-[1px] ${hideDropdownIndicator ? "hidden" : ""}`,
                    noOptionsMessage: () => "text-muted-foreground p-2 text-sm",
                }}
                {...props}
            />
        );
    }
);

CreatableMultiSelect.displayName = "CreatableMultiSelect";
