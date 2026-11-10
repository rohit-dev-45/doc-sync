import type { AnyExtension } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import { Color } from "@tiptap/extension-color";
import FontFamily from "@tiptap/extension-font-family";
import { FontSize, TextStyle } from "@tiptap/extension-text-style";
import { TextDirection } from "@/components/editor/text-direction";
import { Indent } from "@/components/editor/indent";
import { PageBreak } from "@/components/editor/page-break";

function createBaseExtensions(): AnyExtension[] {
    return [
        StarterKit.configure({
            heading: { levels: [1, 2] },
            undoRedo: false,
            link: {
                openOnClick: false,
                autolink: true,
                defaultProtocol: "https",
            },
        }),
        TextStyle,
        Color,
        FontFamily,
        FontSize,
        TextAlign.configure({
            types: [
                "heading",
                "paragraph",
                "bulletList",
                "orderedList",
                "listItem",
            ],
        }),
        TextDirection,
        Indent,
        PageBreak,
    ];
}

export function createEditorExtensions(liveblocks: AnyExtension) {
    return [liveblocks, ...createBaseExtensions()];
}

export function createViewerExtensions() {
    return createBaseExtensions();
}
