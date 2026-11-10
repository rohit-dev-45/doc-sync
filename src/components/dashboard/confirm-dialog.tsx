"use client";

import type { ReactNode } from "react";

type ConfirmDialogProps = {
    title: string;
    description: string;
    confirmLabel: string;
    pending?: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    children?: ReactNode;
    confirmTone?: "danger" | "primary";
};

export function ConfirmDialog({
    title,
    description,
    confirmLabel,
    pending,
    onCancel,
    onConfirm,
    children,
    confirmTone = "primary",
}: ConfirmDialogProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="dialog-title"
                className="w-full max-w-sm rounded-xl bg-white p-6 shadow-2xl"
            >
                <h2
                    id="dialog-title"
                    className="text-lg font-medium text-[#202124]"
                >
                    {title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-docs-muted">
                    {description}
                </p>
                {children}
                <div className="mt-6 flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="h-9 rounded-md px-4 text-sm font-medium text-docs-blue hover:bg-[#e8f0fe]"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        disabled={pending}
                        onClick={onConfirm}
                        className={`h-9 rounded-md px-4 text-sm font-medium text-white disabled:opacity-70 ${
                            confirmTone === "danger"
                                ? "bg-[#d93025] hover:bg-[#c5221f]"
                                : "bg-docs-blue hover:bg-docs-blue-hover"
                        }`}
                    >
                        {pending ? "Working..." : confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}
