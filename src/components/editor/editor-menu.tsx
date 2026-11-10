"use client";

import Link from "next/link";
import { ReactNode, useEffect, useRef } from "react";

type EditorMenuProps = {
    label: string;
    open: boolean;
    onOpen: () => void;
    onClose: () => void;
    children: ReactNode;
};

export function EditorMenu({
    label,
    open,
    onOpen,
    onClose,
    children,
}: EditorMenuProps) {
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
                className={`rounded px-2 py-1 text-[13px] text-[#202124] hover:bg-black/[0.06] ${
                    open ? "bg-black/[0.06]" : ""
                }`}
            >
                {label}
            </button>
            {open ? (
                <div className="absolute left-0 z-30 mt-1 min-w-[220px] overflow-hidden rounded-md border border-docs-border bg-white py-1 shadow-lg">
                    {children}
                </div>
            ) : null}
        </div>
    );
}

type MenuItemProps = {
    children: ReactNode;
    onSelect?: () => void;
    href?: string;
    disabled?: boolean;
};

export function MenuItem({
    children,
    onSelect,
    href,
    disabled,
}: MenuItemProps) {
    const className = `block w-full px-4 py-2 text-left text-[13px] ${
        disabled
            ? "cursor-default text-[#9aa0a6]"
            : "text-[#202124] hover:bg-[#f1f3f4]"
    }`;

    if (href && !disabled) {
        return (
            <Link href={href} className={className} onClick={onSelect}>
                {children}
            </Link>
        );
    }

    return (
        <button
            type="button"
            disabled={disabled}
            className={className}
            onClick={onSelect}
        >
            {children}
        </button>
    );
}

export function MenuSeparator() {
    return <div className="my-1 h-px bg-docs-border" />;
}
