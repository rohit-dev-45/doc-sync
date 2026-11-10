import { mergeAttributes, Node } from "@tiptap/core";

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        pageBreak: {
            setPageBreak: () => ReturnType;
        };
    }
}

export const PageBreak = Node.create({
    name: "pageBreak",
    group: "block",
    atom: true,
    selectable: true,

    parseHTML() {
        return [{ tag: "div[data-page-break]" }];
    },

    renderHTML({ HTMLAttributes }) {
        return [
            "div",
            mergeAttributes(HTMLAttributes, {
                "data-page-break": "",
                class: "page-break",
            }),
        ];
    },

    addCommands() {
        return {
            setPageBreak:
                () =>
                ({ commands }) =>
                    commands.insertContent({ type: this.name }),
        };
    },
});
