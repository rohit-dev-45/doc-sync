"use client";

import { ReactNode, useEffect, useRef } from "react";
import { ChevronIcon } from "./editor-icons";

type ToolbarMenuProps = {
    label: string;
    open: boolean;
    onOpen: () => void;
    onClose: () => void;
    widthClass?: string;
    children: ReactNode;
};

export function ToolbarMenu({
    label,
    open,
    onOpen,
    onClose,
    widthClass = "min-w-[160px]",
    children,
}: ToolbarMenuProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClick(event: MouseEvent) {
            if (!ref.current?.contains(event.target as Node)) {
                onClose();
            }
        }

        if (open) {
            window.document.addEventListener("mousedown", handleClick);
            return () =>
                window.document.removeEventListener("mousedown", handleClick);
        }
    }, [open, onClose]);

    return (
        <div className="relative" ref={ref}>
            <button
                type="button"
                onClick={open ? onClose : onOpen}
                className={`flex h-8 items-center gap-1 rounded-full px-2 text-[13px] text-[#202124] hover:bg-white ${
                    open ? "bg-white shadow-sm" : ""
                }`}
            >
                <span className="max-w-[7rem] truncate">{label}</span>
                <ChevronIcon className="text-docs-muted" />
            </button>
            {open ? (
                <div
                    className={`absolute left-0 z-30 mt-1 overflow-hidden rounded-md border border-docs-border bg-white py-1 shadow-lg ${widthClass}`}
                >
                    {children}
                </div>
            ) : null}
        </div>
    );
}

type ToolbarButtonProps = {
    label: string;
    active?: boolean;
    onClick?: () => void;
    children: ReactNode;
};

export function ToolbarButton({
    label,
    active,
    onClick,
    children,
}: ToolbarButtonProps) {
    return (
        <button
            type="button"
            aria-label={label}
            aria-pressed={active}
            onClick={onClick}
            className={`flex h-8 w-8 items-center justify-center rounded-full text-[#202124] hover:bg-white ${
                active ? "bg-white shadow-sm" : ""
            }`}
        >
            {children}
        </button>
    );
}

export function ToolbarDivider() {
    return <span className="mx-1 h-5 w-px bg-[#c4c7c5]" aria-hidden="true" />;
}
