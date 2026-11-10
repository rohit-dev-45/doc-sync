import { Extension } from "@tiptap/core";
import type { EditorState, Transaction } from "@tiptap/pm/state";

const INDENT_TYPES = new Set(["paragraph", "heading", "listItem"]);
const MAX_INDENT = 8;

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        indent: {
            indent: () => ReturnType;
            outdent: () => ReturnType;
        };
    }
}

function applyIndent(state: EditorState, tr: Transaction, delta: number) {
    const { from, to } = state.selection;

    state.doc.nodesBetween(from, to, (node, pos) => {
        if (!INDENT_TYPES.has(node.type.name)) {
            return;
        }

        const current = Number(node.attrs.indent ?? 0);
        const next = Math.min(MAX_INDENT, Math.max(0, current + delta));
        if (next === current) {
            return;
        }

        tr.setNodeMarkup(pos, undefined, {
            ...node.attrs,
            indent: next,
        });
    });

    return tr;
}

export const Indent = Extension.create({
    name: "indent",

    addGlobalAttributes() {
        return [
            {
                types: [...INDENT_TYPES],
                attributes: {
                    indent: {
                        default: 0,
                        parseHTML: (element) => {
                            const value = Number(
                                element.getAttribute("data-indent") || 0,
                            );
                            return Number.isFinite(value) ? value : 0;
                        },
                        renderHTML: (attributes) => {
                            const indent = Number(attributes.indent || 0);
                            if (!indent) {
                                return {};
                            }

                            return {
                                "data-indent": String(indent),
                                style: `padding-inline-start: ${indent * 24}px`,
                            };
                        },
                    },
                },
            },
        ];
    },

    addCommands() {
        return {
            indent:
                () =>
                ({ state, tr, dispatch, commands }) => {
                    if (commands.sinkListItem("listItem")) {
                        return true;
                    }

                    applyIndent(state, tr, 1);
                    if (dispatch) {
                        dispatch(tr);
                    }
                    return true;
                },
            outdent:
                () =>
                ({ state, tr, dispatch, commands }) => {
                    if (commands.liftListItem("listItem")) {
                        return true;
                    }

                    applyIndent(state, tr, -1);
                    if (dispatch) {
                        dispatch(tr);
                    }
                    return true;
                },
        };
    },
});
