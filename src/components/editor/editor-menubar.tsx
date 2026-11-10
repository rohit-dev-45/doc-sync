"use client";

import { duplicateDocument } from "@/lib/actions/documents";
import { Editor } from "@tiptap/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { EditorMenu, MenuItem, MenuSeparator } from "./editor-menu";
import {
    applyBlockStyle,
    applyTextAlign,
    copySelection,
    cutSelection,
    downloadDocument,
    pasteClipboard,
} from "./editor-commands";

type EditorMenubarProps = {
    editor: Editor | null;
    documentId: string;
    title: string;
    onRename: () => void;
    onFlushSave: () => Promise<void>;
};

const MENUS = ["File", "Edit", "Insert", "Format"] as const;

export function EditorMenubar({
    editor,
    documentId,
    title,
    onRename,
    onFlushSave,
}: EditorMenubarProps) {
    const router = useRouter();
    const [openMenu, setOpenMenu] = useState<(typeof MENUS)[number] | null>(
        null,
    );
    const [copying, setCopying] = useState(false);

    function close() {
        setOpenMenu(null);
    }

    async function makeCopy() {
        if (copying) {
            return;
        }

        setCopying(true);
        close();

        try {
            await onFlushSave();
            const copy = await duplicateDocument(documentId);
            router.push(`/documents/${copy.id}`);
        } catch (error) {
            window.alert(
                error instanceof Error
                    ? error.message
                    : "Could Not Copy This Document.",
            );
            setCopying(false);
        }
    }

    return (
        <div className="flex flex-wrap items-center px-3 py-1 md:px-4">
            <EditorMenu
                label="File"
                open={openMenu === "File"}
                onOpen={() => setOpenMenu("File")}
                onClose={close}
            >
                <MenuItem href="/documents/new" onSelect={close}>
                    New
                </MenuItem>
                <MenuItem href="/" onSelect={close}>
                    Open
                </MenuItem>
                <MenuSeparator />
                <MenuItem
                    onSelect={() => {
                        onRename();
                        close();
                    }}
                >
                    Rename
                </MenuItem>
                <MenuItem disabled={copying} onSelect={() => void makeCopy()}>
                    Make a Copy
                </MenuItem>
                <MenuSeparator />
                <MenuItem
                    disabled={!editor}
                    onSelect={() => {
                        if (!editor) {
                            return;
                        }
                        downloadDocument(title, editor.getHTML());
                        close();
                    }}
                >
                    Download
                </MenuItem>
                <MenuItem
                    onSelect={() => {
                        close();
                        window.print();
                    }}
                >
                    Print
                </MenuItem>
            </EditorMenu>
            <EditorMenu
                label="Edit"
                open={openMenu === "Edit"}
                onOpen={() => setOpenMenu("Edit")}
                onClose={close}
            >
                <MenuItem
                    disabled={!editor?.can()?.undo()}
                    onSelect={() => {
                        editor?.chain().focus().undo().run();
                        close();
                    }}
                >
                    Undo
                </MenuItem>
                <MenuItem
                    disabled={!editor?.can()?.redo()}
                    onSelect={() => {
                        editor?.chain().focus().redo().run();
                        close();
                    }}
                >
                    Redo
                </MenuItem>
                <MenuSeparator />
                <MenuItem
                    disabled={!editor}
                    onSelect={() => {
                        close();
                        if (editor) {
                            void cutSelection(editor);
                        }
                    }}
                >
                    Cut
                </MenuItem>
                <MenuItem
                    disabled={!editor}
                    onSelect={() => {
                        close();
                        if (editor) {
                            void copySelection(editor);
                        }
                    }}
                >
                    Copy
                </MenuItem>
                <MenuItem
                    disabled={!editor}
                    onSelect={() => {
                        close();
                        if (editor) {
                            void pasteClipboard(editor);
                        }
                    }}
                >
                    Paste
                </MenuItem>
                <MenuSeparator />
                <MenuItem
                    onSelect={() => {
                        editor?.chain().focus().selectAll().run();
                        close();
                    }}
                >
                    Select All
                </MenuItem>
                <MenuItem
                    disabled={!editor}
                    onSelect={() => {
                        editor?.chain().focus().deleteSelection().run();
                        close();
                    }}
                >
                    Delete
                </MenuItem>
            </EditorMenu>
            <EditorMenu
                label="Insert"
                open={openMenu === "Insert"}
                onOpen={() => setOpenMenu("Insert")}
                onClose={close}
            >
                <MenuItem
                    disabled={!editor}
                    onSelect={() => {
                        editor?.chain().focus().setHorizontalRule().run();
                        close();
                    }}
                >
                    Horizontal Line
                </MenuItem>
                <MenuItem
                    disabled={!editor}
                    onSelect={() => {
                        editor?.chain().focus().setPageBreak().run();
                        close();
                    }}
                >
                    Page Break
                </MenuItem>
            </EditorMenu>
            <EditorMenu
                label="Format"
                open={openMenu === "Format"}
                onOpen={() => setOpenMenu("Format")}
                onClose={close}
            >
                <MenuItem
                    onSelect={() => {
                        editor?.chain().focus().toggleBold().run();
                        close();
                    }}
                >
                    Bold
                </MenuItem>
                <MenuItem
                    onSelect={() => {
                        editor?.chain().focus().toggleItalic().run();
                        close();
                    }}
                >
                    Italic
                </MenuItem>
                <MenuItem
                    onSelect={() => {
                        editor?.chain().focus().toggleUnderline().run();
                        close();
                    }}
                >
                    Underline
                </MenuItem>
                <MenuItem
                    onSelect={() => {
                        editor?.chain().focus().toggleStrike().run();
                        close();
                    }}
                >
                    StrikeThrough
                </MenuItem>
                <MenuSeparator />
                <MenuItem
                    onSelect={() => {
                        if (editor) {
                            applyBlockStyle(editor, "Normal text");
                        }
                        close();
                    }}
                >
                    Normal Text
                </MenuItem>
                <MenuItem
                    onSelect={() => {
                        if (editor) {
                            applyBlockStyle(editor, "Heading 1");
                        }
                        close();
                    }}
                >
                    Heading 1
                </MenuItem>
                <MenuItem
                    onSelect={() => {
                        if (editor) {
                            applyBlockStyle(editor, "Heading 2");
                        }
                        close();
                    }}
                >
                    Heading 2
                </MenuItem>
                <MenuSeparator />
                <MenuItem
                    onSelect={() => {
                        if (editor) {
                            applyTextAlign(editor, "left");
                        }
                        close();
                    }}
                >
                    Align Left
                </MenuItem>
                <MenuItem
                    onSelect={() => {
                        if (editor) {
                            applyTextAlign(editor, "center");
                        }
                        close();
                    }}
                >
                    Align Center
                </MenuItem>
                <MenuItem
                    onSelect={() => {
                        if (editor) {
                            applyTextAlign(editor, "right");
                        }
                        close();
                    }}
                >
                    Align Right
                </MenuItem>
                <MenuItem
                    onSelect={() => {
                        if (editor) {
                            applyTextAlign(editor, "justify");
                        }
                        close();
                    }}
                >
                    Justify
                </MenuItem>
                <MenuItem
                    onSelect={() => {
                        editor?.chain().focus().indent().run();
                        close();
                    }}
                >
                    Increase indent
                </MenuItem>
                <MenuItem
                    onSelect={() => {
                        editor?.chain().focus().outdent().run();
                        close();
                    }}
                >
                    Decrease Indent
                </MenuItem>
                <MenuSeparator />
                <MenuItem
                    onSelect={() => {
                        editor
                            ?.chain()
                            .focus()
                            .unsetAllMarks()
                            .clearNodes()
                            .run();
                        close();
                    }}
                >
                    Clear Formatting
                </MenuItem>
            </EditorMenu>
        </div>
    );
}
