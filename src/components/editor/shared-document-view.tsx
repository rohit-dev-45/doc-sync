"use client";

import { useEditor } from "@tiptap/react";
import { createViewerExtensions } from "./editor-extensions";
import { Logo } from "../logo";
import Link from "next/link";
import { EditorCanvas } from "./editor-canvas";

type SharedDocumentViewProps = {
    title: string;
    body: string;
};

export function SharedDocumentView({ title, body }: SharedDocumentViewProps) {
    const editor = useEditor({
        immediatelyRender: false,
        editable: false,
        content: body || "<p></p>",
        extensions: createViewerExtensions(),
        editorProps: {
            attributes: {
                class: "doc-editor doc-editor-readonly",
            },
        },
        onCreate: ({ editor: instance }) => {
            instance.commands.syncTextDirection();
        },
    });

    return (
        <div className="flex min-h-full flex-col bg-[#f9fbfd]">
            <header className="sticky top-0 z-20 border-b border-docs-border bg-white print:hidden">
                <div className="flex items-center justify-between gap-3 px-3 py-2 md:px-4">
                    <div className="flex min-w-0 items-center gap-3">
                        <Logo size="sm" />
                        <div className="min-w-0">
                            <p className="truncate text-[18px] font-normal text-[#202124]">
                                {title}
                            </p>
                            <p className="text-xs text-docs-muted">View only</p>
                        </div>
                    </div>
                    <Link
                        href="/login"
                        className="h-10 shrink-0 rounded-full px-4 text-sm font-medium leading-10 text-[#0b57d0] hover:bg-[#e8f0fe]"
                    >
                        Sign In
                    </Link>
                </div>
            </header>
            <EditorCanvas editor={editor} readOnly />
        </div>
    );
}
