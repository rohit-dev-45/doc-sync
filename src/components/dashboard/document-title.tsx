"use client";

import { useRenameDocument } from "@/hooks/use-documents";
import { forwardRef, useEffect, useState } from "react";

type DocumentTitleProps = {
    id: string;
    title: string;
};

export const DocumentTitle = forwardRef<HTMLInputElement, DocumentTitleProps>(
    function DocumentTitle({ id, title }, ref) {
        const [value, setValue] = useState(title);
        const renameDocument = useRenameDocument();

        useEffect(() => {
            setValue(title);
        }, [title]);

        async function save(raw: string) {
            const next = raw.trim() || "Untitled Document";
            setValue(next);
            if (next !== title) {
                await renameDocument.mutateAsync({ id, title: next });
            }
        }

        return (
            <input
                ref={ref}
                value={value}
                aria-label="Document title"
                onChange={(event) => setValue(event.target.value)}
                onBlur={(event) => {
                    void save(event.currentTarget.value);
                }}
                onKeyDown={(event) => {
                    if (event.key === "Enter") {
                        event.preventDefault();
                        event.currentTarget.blur();
                    }
                }}
                className="min-w-[8rem] max-w-xs truncate rounded px-1 py-0.5 text-lg text-[#202124] outline-none hover:bg-black/[0.04] focus:bg-white focus:shadow-[0_0_0_2px_#1a73e8]"
            />
        );
    },
);
