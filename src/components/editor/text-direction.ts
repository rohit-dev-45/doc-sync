import { Extension } from "@tiptap/core";
import type { EditorState, Transaction } from "@tiptap/pm/state";
import { Plugin } from "@tiptap/pm/state";
import type { Node as ProseMirrorNode } from "@tiptap/pm/model";

const BLOCK_TYPES = new Set([
    "paragraph",
    "heading",
    "bulletList",
    "orderedList",
    "listItem",
]);

type TextDirectionValue = "ltr" | "rtl";

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        textDirection: {
            setTextDirection: (direction: TextDirectionValue) => ReturnType;
            syncTextDirection: () => ReturnType;
        };
    }
}

const RTL_CHAR =
    /[\u0590-\u05FF\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB1D-\uFDFF\uFE70-\uFEFF]/;
const LTR_CHAR = /[A-Za-z]/;

export function inferTextDirection(text: string): TextDirectionValue | null {
    for (const char of text) {
        if (RTL_CHAR.test(char)) {
            return "rtl";
        }
        if (LTR_CHAR.test(char)) {
            return "ltr";
        }
    }

    return null;
}

function childWantsRtl(node: ProseMirrorNode) {
    let found = false;

    node.descendants((child) => {
        if (child.attrs.textAlign === "right") {
            found = true;
            return false;
        }

        return true;
    });

    return found;
}

function desiredDirection(node: ProseMirrorNode): TextDirectionValue | null {
    if (node.attrs.textAlign === "right" || childWantsRtl(node)) {
        return "rtl";
    }

    return inferTextDirection(node.textContent);
}

function collectSelectionPositions(state: EditorState) {
    const positions = new Set<number>();
    const { from, to } = state.selection;

    state.doc.nodesBetween(from, to, (node, pos) => {
        if (BLOCK_TYPES.has(node.type.name)) {
            positions.add(pos);
        }
    });

    const $from = state.selection.$from;
    for (let depth = $from.depth; depth > 0; depth -= 1) {
        if (BLOCK_TYPES.has($from.node(depth).type.name)) {
            positions.add($from.before(depth));
        }
    }

    return positions;
}

function applyDirection(
    tr: Transaction,
    state: EditorState,
    direction: TextDirectionValue,
) {
    const dir = direction === "rtl" ? "rtl" : null;

    collectSelectionPositions(state).forEach((pos) => {
        const node = tr.doc.nodeAt(pos);
        if (
            !node ||
            !BLOCK_TYPES.has(node.type.name) ||
            node.attrs.dir === dir
        ) {
            return;
        }

        tr.setNodeMarkup(pos, undefined, { ...node.attrs, dir });
    });

    return tr;
}

function syncDocumentDirection(state: EditorState, tr: Transaction) {
    const updates: { pos: number; dir: string | null }[] = [];

    state.doc.descendants((node, pos) => {
        if (!BLOCK_TYPES.has(node.type.name)) {
            return;
        }

        const desired = desiredDirection(node);
        const nextDir = desired === "rtl" ? "rtl" : null;

        if (node.attrs.dir === nextDir) {
            return;
        }

        if (nextDir === "rtl" || node.attrs.dir === "rtl") {
            updates.push({ pos, dir: nextDir });
        }
    });

    updates.forEach(({ pos, dir }) => {
        const node = tr.doc.nodeAt(pos);
        if (!node || node.attrs.dir === dir) {
            return;
        }

        tr.setNodeMarkup(pos, undefined, { ...node.attrs, dir });
    });

    return tr;
}

export const TextDirection = Extension.create({
    name: "textDirection",

    addGlobalAttributes() {
        return [
            {
                types: [...BLOCK_TYPES],
                attributes: {
                    dir: {
                        default: null,
                        parseHTML: (element) => {
                            const dir = element.getAttribute("dir");
                            return dir === "rtl" || dir === "ltr" ? dir : null;
                        },
                        renderHTML: (attributes) => {
                            if (attributes.dir !== "rtl") {
                                return {};
                            }

                            return { dir: "rtl" };
                        },
                    },
                },
            },
        ];
    },

    addCommands() {
        return {
            setTextDirection:
                (direction) =>
                ({ state, tr, dispatch }) => {
                    applyDirection(
                        tr,
                        state,
                        direction === "rtl" ? "rtl" : "ltr",
                    );
                    tr.setMeta("textDirection", true);

                    if (dispatch) {
                        dispatch(tr);
                    }

                    return true;
                },
            syncTextDirection:
                () =>
                ({ state, tr, dispatch }) => {
                    syncDocumentDirection(state, tr);
                    tr.setMeta("textDirection", true);

                    if (dispatch) {
                        dispatch(tr);
                    }

                    return true;
                },
        };
    },

    addProseMirrorPlugins() {
        return [
            new Plugin({
                appendTransaction(transactions, _oldState, newState) {
                    if (
                        !transactions.some(
                            (transaction) => transaction.docChanged,
                        )
                    ) {
                        return null;
                    }

                    if (
                        transactions.some((transaction) =>
                            transaction.getMeta("textDirection"),
                        )
                    ) {
                        return null;
                    }

                    const tr = syncDocumentDirection(newState, newState.tr);
                    return tr.steps.length > 0 ? tr : null;
                },
            }),
        ];
    },
});
