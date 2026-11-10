"use client";

import { EditorContent, type Editor } from "@tiptap/react";

type EditorCanvasProps = {
    editor: Editor | null;
    zoom?: string;
    readOnly?: boolean;
};

export function EditorCanvas({
    editor,
    zoom = "100%",
    readOnly = false,
}: EditorCanvasProps) {
    const scale = Number.parseInt(zoom, 10) / 100 || 1;
    const pageWidth = 816;
    const pageHeight = 1056;

    return (
        <div className="flex-1 overflow-auto bg-[#f9fbfd] px-4 py-8 print:overflow-visible print:bg-white print:p-0">
            <div className="flex justify-center print:block">
                <div
                    style={{
                        width: pageWidth * scale,
                        minHeight: pageHeight * scale,
                    }}
                >
                    <div
                        className="editor-page origin-top-left bg-white shadow-[0_1px_3px_1px_rgba(60,64,67,0.15)]"
                        style={{
                            width: pageWidth,
                            minHeight: pageHeight,
                            transform: `scale(${scale})`,
                        }}
                    >
                        <div
                            className={`min-h-[1056px] px-[96px] py-[96px] ${readOnly ? "cursor-default" : "cursor-text"}`}
                            onClick={() => {
                                if (!readOnly) {
                                    editor?.commands.focus();
                                }
                            }}
                        >
                            <EditorContent editor={editor} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
