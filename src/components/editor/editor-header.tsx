"use client";

import Link from "next/link";
import { RefObject, useState } from "react";
import { Logo } from "../logo";
import { DocumentTitle } from "../dashboard/document-title";
import { StarIcon } from "./editor-icons";
import { PresenceAvatars } from "./presence-avatars";
import { AccountMenu } from "./account-menu";
import { ShareDialog } from "./share-dialog";

type EditorHeaderProps = {
    documentId: string;
    title: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    titleInputRef: RefObject<HTMLInputElement | null>;
    onPrepareShare?: () => Promise<void>;
};

export function EditorHeader({
    documentId,
    title,
    name,
    email,
    image,
    titleInputRef,
    onPrepareShare,
}: EditorHeaderProps) {
    const [starred, setStarred] = useState(false);
    const [shareOpen, setShareOpen] = useState(false);
    const displayName = name ?? email ?? "Signed In";

    async function openShare() {
        await onPrepareShare?.();
        setShareOpen(true);
    }

    return (
        <>
            <div className="flex items-center justify-between gap-3 px-3 pt-2 md:px-4">
                <div className="flex min-w-0 items-center gap-1">
                    <Link
                        href="/"
                        aria-label="Back to DocSync home"
                        className="shrink-0 rounded-full p-1 hover:bg-black/[0.06]"
                    >
                        <Logo size="sm" showWordmark={false} />
                    </Link>
                    <div className="min-w-0">
                        <div className="flex items-center gap-1">
                            <DocumentTitle
                                ref={titleInputRef}
                                id={documentId}
                                title={title}
                            />
                            <button
                                type="button"
                                aria-label={
                                    starred
                                        ? "Unstar document"
                                        : "Star document"
                                }
                                aria-pressed={starred}
                                onClick={() => setStarred((value) => !value)}
                                className="flex h-8 w-8 items-center justify-center rounded-full text-docs-muted hover:bg-black/[0.06]"
                            >
                                <StarIcon filled={starred} />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                    <PresenceAvatars />
                    <button
                        type="button"
                        onClick={() => void openShare()}
                        className="h-10 rounded-full bg-[#c2e7ff] px-6 text-sm font-medium text-[#001d35] hover:bg-[#b3d9f2]"
                    >
                        Share
                    </button>
                    <AccountMenu
                        name={displayName}
                        email={email}
                        image={image}
                    />
                </div>
            </div>
            {shareOpen ? (
                <ShareDialog
                    documentId={documentId}
                    email={email}
                    onClose={() => setShareOpen(false)}
                />
            ) : null}
        </>
    );
}
