"use client";

import { useState } from "react";
import type { Editor } from "@tiptap/react";
import {
    AlignCenterIcon,
    AlignJustifyIcon,
    AlignLeftIcon,
    AlignRightIcon,
    BoldIcon,
    BulletListIcon,
    ItalicIcon,
    MinusIcon,
    NumberedListIcon,
    PlusIcon,
    RedoIcon,
    TextColorIcon,
    UnderlineIcon,
    UndoIcon,
} from "@/components/editor/editor-icons";
import {
    ToolbarButton,
    ToolbarDivider,
    ToolbarMenu,
} from "@/components/editor/toolbar-controls";
import {
    applyBlockStyle,
    applyTextAlign,
    type Align,
} from "@/components/editor/editor-commands";

const STYLES = ["Normal text", "Heading 1", "Heading 2"] as const;
const FONTS = [
    "Arial",
    "Calibri",
    "Georgia",
    "Times New Roman",
    "Courier New",
] as const;
const ZOOMS = ["50%", "75%", "90%", "100%", "125%", "150%"] as const;
const COLORS = [
    "#202124",
    "#d93025",
    "#1a73e8",
    "#188038",
    "#f9ab00",
    "#9334e6",
];
const ALIGNS = ["left", "center", "right", "justify"] as const;

type EditorToolbarProps = {
    editor: Editor | null;
    zoom: string;
    onZoomChange: (zoom: string) => void;
};

function currentStyle(editor: Editor): (typeof STYLES)[number] {
    if (editor.isActive("heading", { level: 1 })) {
        return "Heading 1";
    }
    if (editor.isActive("heading", { level: 2 })) {
        return "Heading 2";
    }
    return "Normal text";
}

function currentFont(editor: Editor): string {
    return (
        (editor.getAttributes("textStyle").fontFamily as string | undefined) ||
        "Arial"
    );
}

function currentSize(editor: Editor): number {
    const raw = editor.getAttributes("textStyle").fontSize as
        string | undefined;
    const parsed = raw ? Number.parseInt(raw, 10) : 11;
    return Number.isFinite(parsed) ? parsed : 11;
}

function currentColor(editor: Editor): string {
    return (
        (editor.getAttributes("textStyle").color as string | undefined) ||
        "#202124"
    );
}

function currentAlign(editor: Editor): Align {
    const match = ALIGNS.find((item) => editor.isActive({ textAlign: item }));
    return match ?? "left";
}

export function EditorToolbar({
    editor,
    zoom,
    onZoomChange,
}: EditorToolbarProps) {
    const [open, setOpen] = useState<string | null>(null);

    function close() {
        setOpen(null);
    }

    function applyStyle(style: (typeof STYLES)[number]) {
        if (!editor) {
            return;
        }
        applyBlockStyle(editor, style);
        close();
    }

    function applySize(size: number) {
        const next = Math.min(96, Math.max(6, size));
        editor?.chain().focus().setFontSize(`${next}pt`).run();
    }

    function applyAlign(next: Align) {
        if (!editor) {
            return;
        }
        applyTextAlign(editor, next);
        close();
    }

    const style = editor ? currentStyle(editor) : "Normal text";
    const font = editor ? currentFont(editor) : "Arial";
    const size = editor ? currentSize(editor) : 11;
    const color = editor ? currentColor(editor) : "#202124";
    const align = editor ? currentAlign(editor) : "left";
    const alignIcon = {
        left: <AlignLeftIcon />,
        center: <AlignCenterIcon />,
        right: <AlignRightIcon />,
        justify: <AlignJustifyIcon />,
    }[align];

    return (
        <div className="px-3 pb-2 md:px-4">
            <div className="flex flex-wrap items-center gap-0.5 rounded-full bg-[#edf2fa] px-2 py-1">
                <ToolbarButton
                    label="Undo"
                    onClick={() => editor?.chain().focus().undo().run()}
                >
                    <UndoIcon />
                </ToolbarButton>
                <ToolbarButton
                    label="Redo"
                    onClick={() => editor?.chain().focus().redo().run()}
                >
                    <RedoIcon />
                </ToolbarButton>
                <ToolbarDivider />
                <ToolbarMenu
                    label={zoom}
                    open={open === "zoom"}
                    onOpen={() => setOpen("zoom")}
                    onClose={close}
                    widthClass="min-w-[100px]"
                >
                    {ZOOMS.map((item) => (
                        <button
                            key={item}
                            type="button"
                            className="block w-full px-3 py-1.5 text-left text-[13px] hover:bg-[#f1f3f4]"
                            onClick={() => {
                                onZoomChange(item);
                                close();
                            }}
                        >
                            {item}
                        </button>
                    ))}
                </ToolbarMenu>
                <ToolbarDivider />
                <ToolbarMenu
                    label={style}
                    open={open === "style"}
                    onOpen={() => setOpen("style")}
                    onClose={close}
                    widthClass="min-w-[160px]"
                >
                    {STYLES.map((item) => (
                        <button
                            key={item}
                            type="button"
                            className="block w-full px-3 py-1.5 text-left text-[13px] hover:bg-[#f1f3f4]"
                            onClick={() => applyStyle(item)}
                        >
                            {item}
                        </button>
                    ))}
                </ToolbarMenu>
                <ToolbarMenu
                    label={font}
                    open={open === "font"}
                    onOpen={() => setOpen("font")}
                    onClose={close}
                    widthClass="min-w-[180px]"
                >
                    {FONTS.map((item) => (
                        <button
                            key={item}
                            type="button"
                            className="block w-full px-3 py-1.5 text-left text-[13px] hover:bg-[#f1f3f4]"
                            style={{ fontFamily: item }}
                            onClick={() => {
                                editor
                                    ?.chain()
                                    .focus()
                                    .setFontFamily(item)
                                    .run();
                                close();
                            }}
                        >
                            {item}
                        </button>
                    ))}
                </ToolbarMenu>
                <div className="flex items-center">
                    <ToolbarButton
                        label="Decrease font size"
                        onClick={() => applySize(size - 1)}
                    >
                        <MinusIcon />
                    </ToolbarButton>
                    <input
                        aria-label="Font size"
                        value={size}
                        onChange={(event) => {
                            const next = Number(event.target.value);
                            if (Number.isFinite(next)) {
                                applySize(next);
                            }
                        }}
                        className="h-8 w-10 rounded-full bg-transparent text-center text-[13px] outline-none"
                    />
                    <ToolbarButton
                        label="Increase font size"
                        onClick={() => applySize(size + 1)}
                    >
                        <PlusIcon />
                    </ToolbarButton>
                </div>
                <ToolbarDivider />
                <ToolbarButton
                    label="Bold"
                    active={editor?.isActive("bold")}
                    onClick={() => editor?.chain().focus().toggleBold().run()}
                >
                    <BoldIcon />
                </ToolbarButton>
                <ToolbarButton
                    label="Italic"
                    active={editor?.isActive("italic")}
                    onClick={() => editor?.chain().focus().toggleItalic().run()}
                >
                    <ItalicIcon />
                </ToolbarButton>
                <ToolbarButton
                    label="Underline"
                    active={editor?.isActive("underline")}
                    onClick={() =>
                        editor?.chain().focus().toggleUnderline().run()
                    }
                >
                    <UnderlineIcon />
                </ToolbarButton>
                <div className="relative">
                    <ToolbarButton
                        label="Text color"
                        onClick={() =>
                            setOpen(open === "color" ? null : "color")
                        }
                    >
                        <TextColorIcon color={color} />
                    </ToolbarButton>
                    {open === "color" ? (
                        <div className="absolute left-0 z-30 mt-1 flex gap-1 rounded-md border border-docs-border bg-white p-2 shadow-lg">
                            {COLORS.map((item) => (
                                <button
                                    key={item}
                                    type="button"
                                    aria-label={`Text color ${item}`}
                                    className="h-6 w-6 rounded-full border border-black/10"
                                    style={{ backgroundColor: item }}
                                    onClick={() => {
                                        editor
                                            ?.chain()
                                            .focus()
                                            .setColor(item)
                                            .run();
                                        close();
                                    }}
                                />
                            ))}
                        </div>
                    ) : null}
                </div>
                <ToolbarDivider />
                <div className="relative">
                    <ToolbarButton
                        label="Alignment"
                        onClick={() =>
                            setOpen(open === "align" ? null : "align")
                        }
                    >
                        {alignIcon}
                    </ToolbarButton>
                    {open === "align" ? (
                        <div className="absolute left-0 z-30 mt-1 flex rounded-md border border-docs-border bg-white p-1 shadow-lg">
                            {ALIGNS.map((item) => (
                                <ToolbarButton
                                    key={item}
                                    label={`Align ${item}`}
                                    active={align === item}
                                    onClick={() => applyAlign(item)}
                                >
                                    {
                                        {
                                            left: <AlignLeftIcon />,
                                            center: <AlignCenterIcon />,
                                            right: <AlignRightIcon />,
                                            justify: <AlignJustifyIcon />,
                                        }[item]
                                    }
                                </ToolbarButton>
                            ))}
                        </div>
                    ) : null}
                </div>
                <ToolbarButton
                    label="Bulleted list"
                    active={editor?.isActive("bulletList")}
                    onClick={() =>
                        editor?.chain().focus().toggleBulletList().run()
                    }
                >
                    <BulletListIcon />
                </ToolbarButton>
                <ToolbarButton
                    label="Numbered list"
                    active={editor?.isActive("orderedList")}
                    onClick={() =>
                        editor?.chain().focus().toggleOrderedList().run()
                    }
                >
                    <NumberedListIcon />
                </ToolbarButton>
            </div>
        </div>
    );
}
