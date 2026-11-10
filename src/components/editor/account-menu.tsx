"use client";

import { useEffect, useRef, useState } from "react";
import { UserAvatar } from "../user-avatar";
import { SignOutButton } from "../auth/sign-out-button";

type AccountMenuProps = {
    name: string;
    email?: string | null;
    image?: string | null;
};

export function AccountMenu({ name, email, image }: AccountMenuProps) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClick(event: MouseEvent) {
            if (!ref.current?.contains(event.target as Node)) {
                setOpen(false);
            }
        }

        if (open) {
            window.document.addEventListener("mousedown", handleClick);
            return () =>
                window.document.removeEventListener("mousedown", handleClick);
        }
    }, [open]);

    return (
        <div className="relative" ref={ref}>
            <button
                type="button"
                aria-label="Account"
                onClick={() => setOpen((value) => !value)}
                className="rounded-full focus-visible:outline-docs-blue"
            >
                <UserAvatar name={name} image={image} />
            </button>
            {open ? (
                <div className="absolute right-0 z-30 mt-2 w-64 overflow-hidden rounded-xl border border-docs-border bg-white p-4 shadow-lg">
                    <div className="flex items-center gap-3">
                        <UserAvatar name={name} image={image} />
                        <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-[#202124]">
                                {name}
                            </p>
                            {email ? (
                                <p className="truncate text-xs text-docs-muted">
                                    {email}
                                </p>
                            ) : null}
                        </div>
                    </div>
                    <div className="mt-3 border-t border-docs-border pt-2">
                        <SignOutButton />
                    </div>
                </div>
            ) : null}
        </div>
    );
}
