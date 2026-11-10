"use client";

import { ensureShareLink } from "@/lib/actions/documents";
import { useEffect, useState } from "react";

type ShareDialogProps = {
    documentId: string;
    email?: string | null;
    onClose: () => void;
};

export function ShareDialog({ documentId, email, onClose }: ShareDialogProps) {
    const [copied, setCopied] = useState(false);
    const [link, setLink] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        let cancelled = false;

        async function loadLink() {
            try {
                const { token } = await ensureShareLink(documentId);
                if (!cancelled) {
                    setLink(`${window.location.origin}/share/${token}`);
                }
            } catch {
                if (!cancelled) {
                    setError("Could Not Create a Share Link.");
                }
            }
        }

        void loadLink();

        return () => {
            cancelled = true;
        };
    }, [documentId]);

    async function copyLink() {
        if (!link) {
            return;
        }

        await navigator.clipboard.writeText(link);
        setCopied(true);
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="share-title"
                className="w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl"
            >
                <div className="flex items-start justify-between gap-4">
                    <h2
                        id="share-title"
                        className="text-xl font-normal text-[#202124]"
                    >
                        Share
                    </h2>
                    <button
                        type="button"
                        aria-label="Close"
                        onClick={onClose}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-docs-muted hover:bg-black/[0.06]"
                    >
                        ×
                    </button>
                </div>
                <p className="mt-5 text-sm font-medium text-[#202124]">
                    People With Access
                </p>
                <div className="mt-2 flex items-center justify-between rounded-lg py-2">
                    <div>
                        <p className="text-sm text-[#202124]">
                            {email ?? "You"}
                        </p>
                        <p className="text-xs text-docs-muted">Owner</p>
                    </div>
                    <span className="text-xs text-docs-muted">Owner</span>
                </div>
                <p className="mt-4 text-sm font-medium text-[#202124]">
                    General Access
                </p>
                <p className="mt-1 text-sm text-docs-muted">
                    Anyone With This Link Can View. They Do Not Need An Account.
                </p>
                <input
                    readOnly
                    value={error || link || "Creating Link…"}
                    aria-label="View-only share link"
                    className="mt-4 h-12 w-full rounded-lg border border-docs-border bg-[#f1f3f4] px-3 text-sm text-[#202124]"
                />
                <div className="mt-6 flex items-center justify-between">
                    <button
                        type="button"
                        onClick={copyLink}
                        disabled={!link}
                        className="h-10 rounded-full border border-docs-border px-4 text-sm font-medium text-[#0b57d0] hover:bg-[#e8f0fe] disabled:opacity-50"
                    >
                        {copied ? "Link Copied" : "Copy Link"}
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="h-10 rounded-full bg-docs-blue px-5 text-sm font-medium text-white hover:bg-docs-blue-hover"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
}
