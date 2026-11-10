"use client";

import Link from "next/link";
import { Logo } from "../logo";
import { DocumentSearch } from "./document-search";
import { UserAvatar } from "../user-avatar";
import { SignOutButton } from "../auth/sign-out-button";

type AppHeaderProps = {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    searchQuery?: string;
    onSearchQueryChange?: (query: string) => void;
};

export function AppHeader({
    name,
    email,
    image,
    searchQuery,
    onSearchQueryChange,
}: AppHeaderProps) {
    const displayName = name ?? email ?? "Signed in";
    const showSearch = onSearchQueryChange !== undefined;

    return (
        <header
            className={
                showSearch
                    ? "sticky top-0 z-20 flex h-16 items-center gap-4 bg-white px-3 md:px-4"
                    : "sticky top-0 z-20 flex h-16 items-center justify-between border-b border-docs-border bg-white px-4 md:px-6"
            }
        >
            <Link
                href="/"
                className="shrink-0 rounded-md focus-visible:outline-docs-blue"
            >
                <Logo size="sm" />
            </Link>
            {showSearch ? (
                <div className="flex min-w-0 flex-1 justify-center">
                    <div className="w-full max-w-[720px]">
                        <DocumentSearch
                            value={searchQuery ?? ""}
                            onChange={onSearchQueryChange}
                        />
                    </div>
                </div>
            ) : null}
            <div className="flex shrink-0 items-center gap-3">
                <div className="hidden min-w-0 text-right sm:block">
                    <p className="truncate text-sm font-medium leading-tight text-foreground">
                        {displayName}
                    </p>
                    {email ? (
                        <p className="truncate text-xs text-docs-muted">
                            {email}
                        </p>
                    ) : null}
                </div>
                <UserAvatar name={displayName} image={image} />
                <SignOutButton />
            </div>
        </header>
    );
}
