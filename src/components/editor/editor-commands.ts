import type { Editor } from "@tiptap/react";

export type BlockStyle = "Normal text" | "Heading 1" | "Heading 2";
export type Align = "left" | "center" | "right" | "justify";

export function applyBlockStyle(editor: Editor, style: BlockStyle) {
    if (style === "Heading 1") {
        editor.chain().focus().setHeading({ level: 1 }).run();
        return;
    }

    if (style === "Heading 2") {
        editor.chain().focus().setHeading({ level: 2 }).run();
        return;
    }

    editor.chain().focus().setParagraph().run();
}

export function applyTextAlign(editor: Editor, align: Align) {
    const chain = editor.chain().focus().setTextAlign(align);
    if (align === "right") {
        chain.setTextDirection("rtl");
    } else if (align === "left") {
        chain.setTextDirection("ltr");
    }
    chain.run();
}

export function downloadDocument(title: string, html: string) {
    const safe =
        title.replace(/[<>:"/\\|?*]+/g, " ").trim() || "Untitled document";
    const blob = new Blob(
        [
            `<!doctype html><html><head><meta charset="utf-8"><title>${escapeHtml(
                safe,
            )}</title></head><body>${html}</body></html>`,
        ],
        { type: "text/html;charset=utf-8" },
    );
    const url = URL.createObjectURL(blob);
    const link = window.document.createElement("a");
    link.href = url;
    link.download = `${safe}.html`;
    link.click();
    URL.revokeObjectURL(url);
}

function escapeHtml(value: string) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;");
}

export async function copySelection(editor: Editor) {
    const { from, to } = editor.state.selection;
    const text = editor.state.doc.textBetween(from, to, "\n");
    await navigator.clipboard.writeText(text);
}

export async function cutSelection(editor: Editor) {
    await copySelection(editor);
    editor.chain().focus().deleteSelection().run();
}

export async function pasteClipboard(editor: Editor) {
    const text = await navigator.clipboard.readText();
    if (!text) {
        return;
    }

    const html = text
        .split(/\n/)
        .map((line) => `<p>${escapeHtml(line) || "<br>"}</p>`)
        .join("");
    editor.chain().focus().insertContent(html).run();
}
