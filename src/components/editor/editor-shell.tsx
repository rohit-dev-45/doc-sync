"use client";

import { useMemo, useRef, useState } from "react";
import { useLiveblocksExtension } from "@liveblocks/react-tiptap";
import { createEditorExtensions } from "./editor-extensions";
import { useEditor } from "@tiptap/react";
import { EditorHeader } from "./editor-header";
import { saveDocumentBody } from "@/lib/actions/documents";
import { EditorMenubar } from "./editor-menubar";
import { EditorToolbar } from "./editor-toolbar";
import { EditorCanvas } from "./editor-canvas";

type EditorShellProps = {
    documentId: string;
    title: string;
    body?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
};

export function EditorShell({
    documentId,
    title,
    body = "",
    name,
    email,
    image,
}: EditorShellProps) {
    const titleInputRef = useRef<HTMLInputElement>(null);
    const [zoom, setZoom] = useState("100%");
    const liveblocks = useLiveblocksExtension({
        initialContent: body || "<p></p>",
        comments: false,
        mentions: false,
        ai: false,
    });
    const extensions = useMemo(
        () => createEditorExtensions(liveblocks),
        [liveblocks],
    );

    const editor = useEditor({
        immediatelyRender: false,
        shouldRerenderOnTransaction: true,
        extensions,
        editorProps: {
            attributes: {
                class: "doc-editor",
            },
        },
        onCreate: ({ editor: instance }) => {
            instance.commands.syncTextDirection();
            instance.commands.focus("end");
        },
    });

    return (
        <div className="flex min-h-full flex-col bg-[#f9fbfd]">
            <header className="sticky top-0 z-20 bg-white print:hidden">
                <EditorHeader
                    documentId={documentId}
                    title={title}
                    name={name}
                    email={email}
                    image={image}
                    titleInputRef={titleInputRef}
                    onPrepareShare={async () => {
                        if (!editor) {
                            return;
                        }
                        await saveDocumentBody(documentId, editor.getHTML());
                    }}
                />
                <EditorMenubar
                    editor={editor}
                    documentId={documentId}
                    title={title}
                    onRename={() => {
                        titleInputRef.current?.focus();
                        titleInputRef.current?.select();
                    }}
                    onFlushSave={async () => {
                        if (!editor) {
                            return;
                        }
                        await saveDocumentBody(documentId, editor.getHTML());
                    }}
                />
                <EditorToolbar
                    editor={editor}
                    zoom={zoom}
                    onZoomChange={setZoom}
                />
            </header>
            <EditorCanvas editor={editor} zoom={zoom} />
        </div>
    );
}
