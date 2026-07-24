"use client";

import * as React from "react";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button/Button";

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command/Command";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover/Popover";

export interface SelectOption {
    label: string;
    value: string;

    icon?: React.ReactNode;

    disabled?: boolean;
}

interface SearchableSelectProps {

    options: SelectOption[];

    value?: string;

    onChange: (value: string) => void;

    onSearch: (value: string) => void;

    placeholder?: string;

    searchPlaceholder?: string;

    emptyMessage?: string;

    disabled?: boolean;

    loading?: boolean;

    className?: string;
}

export function SearchableSelect({

    options,

    value,

    onChange,

    onSearch,

    placeholder = "Select option",

    searchPlaceholder = "Search...",

    emptyMessage = "No results found.",

    disabled,

    className,

}: SearchableSelectProps) {

    const [open, setOpen] = React.useState(false);

    const selected = options.find(
        option => option.value === value
    );

    return (

        <Popover
            open={open}
            onOpenChange={setOpen}
        >

           <PopoverTrigger

               className={cn(
                   "w-full justify-between flex items-center px-3 py-2 rounded-lg border border-input bg-input hover:bg-input/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
                   className
               )}
           >
                    {selected ? (
                        <div className="flex items-center gap-2">
                            {selected.icon}
                            {selected.label}
                        </div>
                    ) : (
                        <span className="text-muted-foreground">
                            {placeholder}
                        </span>
                    )}
                    <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
            </PopoverTrigger>

            <PopoverContent
                className="w-[320px] p-0 bg-muted border border-border ring-0"
            >

                <Command className="border-0 ring-0">

                    <CommandInput
                        placeholder={searchPlaceholder}
                        onValueChange={onSearch}
                        className="ring-0"
                    />

                    <CommandList>

                        <CommandEmpty>
                            {emptyMessage}
                        </CommandEmpty>

                        <CommandGroup>

                            {options.map(option => (

                                <CommandItem
                                    className="bg-neutral-900 hover:bg-neutral-500 cursor-pointer"
                                    key={option.value}

                                    value={option.label}

                                    disabled={option.disabled}

                                    onSelect={() => {

                                        onChange(option.value);

                                        setOpen(false);

                                    }}

                                >

                                    <div className="flex items-center gap-2 flex-1">

                                        {option.icon}

                                        {option.label}

                                    </div>

                                    <Check

                                        className={cn(

                                            "h-4 w-4",

                                            value === option.value
                                                ? "opacity-100"
                                                : "opacity-0"

                                        )}

                                    />

                                </CommandItem>

                            ))}

                        </CommandGroup>

                    </CommandList>

                </Command>

            </PopoverContent>

        </Popover>

    );
}