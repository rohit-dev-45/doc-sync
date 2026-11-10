"use client";

import { DocumentRecord } from "@/lib/document-types";
import { formatDocumentDate } from "@/lib/format-date";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type DocumentCardProps = {
    item: DocumentRecord;
    onRename: (document: DocumentRecord) => void;
    onDelete: (document: DocumentRecord) => void;
};

export function DocumentCard({ item, onRename, onDelete }: DocumentCardProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClick(event: MouseEvent) {
            if (!menuRef.current?.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        }

        if (menuOpen) {
            window.document.addEventListener("mousedown", handleClick);
            return () =>
                window.document.removeEventListener("mousedown", handleClick);
        }
    }, [menuOpen]);

    return (
        <article className="group relative w-[148px]">
            <Link
                href={`/documents/${item.id}`}
                className="block overflow-hidden rounded-sm border border-docs-border bg-white transition hover:border-docs-blue hover:shadow-sm"
            >
                <span className="flex h-[186px] flex-col gap-2 bg-[#f8f9fa] px-4 py-5">
                    <span className="h-2 w-2/3 rounded-full bg-[#e0e3e8]" />
                    <span className="h-1.5 w-full rounded-full bg-[#eceff3]" />
                    <span className="h-1.5 w-11/12 rounded-full bg-[#eceff3]" />
                    <span className="h-1.5 w-4/5 rounded-full bg-[#eceff3]" />
                    <span className="h-1.5 w-full rounded-full bg-[#eceff3]" />
                </span>
            </Link>
            <div className="mt-2 flex items-start justify-between gap-1">
                <div className="min-w-0">
                    <Link
                        href={`/documents/${item.id}`}
                        className="block truncate text-sm font-medium text-[#202124]"
                    >
                        {item.title}
                    </Link>
                    <p className="truncate text-xs text-docs-muted">
                        {formatDocumentDate(item.updatedAt)}
                    </p>
                </div>
                <div className="relative" ref={menuRef}>
                    <button
                        type="button"
                        aria-label="Document actions"
                        onClick={() => setMenuOpen((open) => !open)}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-docs-muted hover:bg-black/[0.06]"
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <circle cx="8" cy="3" r="1.3" />
                            <circle cx="8" cy="8" r="1.3" />
                            <circle cx="8" cy="13" r="1.3" />
                        </svg>
                    </button>
                    {menuOpen ? (
                        <div className="absolute right-0 z-10 mt-1 w-36 overflow-hidden rounded-md border border-docs-border bg-white py-1 shadow-lg">
                            <button
                                type="button"
                                className="block w-full px-3 py-2 text-left text-sm hover:bg-[#f1f3f4]"
                                onClick={() => {
                                    setMenuOpen(false);
                                    onRename(item);
                                }}
                            >
                                Rename
                            </button>
                            <button
                                type="button"
                                className="block w-full px-3 py-2 text-left text-sm text-[#d93025] hover:bg-[#fce8e6]"
                                onClick={() => {
                                    setMenuOpen(false);
                                    onDelete(item);
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    ) : null}
                </div>
            </div>
        </article>
    );
}
