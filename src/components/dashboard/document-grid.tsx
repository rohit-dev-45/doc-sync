"use client";

import {
    useDeleteDocument,
    useDocuments,
    useRenameDocument,
} from "@/hooks/use-documents";
import { DocumentRecord } from "@/lib/document-types";
import { useState } from "react";
import { NewDocumentCard } from "./new-document-card";
import { DocumentCard } from "./document-card";
import { ConfirmDialog } from "./confirm-dialog";

type DocumentGridProps = {
    searchQuery?: string;
};

export function DocumentGrid({ searchQuery = "" }: DocumentGridProps) {
    const documents = useDocuments();
    const renameDocument = useRenameDocument();
    const deleteDocument = useDeleteDocument();
    const [renaming, setRenaming] = useState<DocumentRecord | null>(null);
    const [title, setTitle] = useState("");
    const [deleting, setDeleting] = useState<DocumentRecord | null>(null);
    const query = searchQuery.trim().toLowerCase();
    const visibleDocuments = query
        ? documents.data?.filter((item) =>
              item.title.toLowerCase().includes(query),
          )
        : documents.data;

    return (
        <>
            <section className="bg-[#f1f3f4] px-4 py-8 md:px-10">
                <div className="mx-auto max-w-6xl">
                    <h1 className="mb-4 text-base text-[#202124]">
                        Start a New Document
                    </h1>
                    <NewDocumentCard />
                </div>
            </section>

            <section className="px-4 py-8 md:px-10">
                <div className="mx-auto max-w-6xl">
                    <h2 className="mb-5 text-base text-[#202124]">
                        {query ? "Search Results" : "Recent Documents"}
                    </h2>
                    {documents.isLoading ? (
                        <p className="text-sm text-docs-muted">
                            Loading Documents...
                        </p>
                    ) : documents.isError ? (
                        <p className="text-sm text-[#d93025]">
                            Could Not Load Your Documents. Refresh And Try
                            Again.
                        </p>
                    ) : !documents.data?.length ? (
                        <p className="text-sm text-docs-muted">
                            Documents You Create Will Show Up Here.
                        </p>
                    ) : !visibleDocuments?.length ? (
                        <p className="text-sm text-docs-muted">
                            No Documents Match “{searchQuery.trim()}”.
                        </p>
                    ) : (
                        <div className="flex flex-wrap gap-x-6 gap-y-8">
                            {visibleDocuments.map((item) => (
                                <DocumentCard
                                    key={item.id}
                                    item={item}
                                    onRename={(doc) => {
                                        setRenaming(doc);
                                        setTitle(doc.title);
                                    }}
                                    onDelete={setDeleting}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {renaming ? (
                <ConfirmDialog
                    title="Rename"
                    description="Enter a New Name For This Document."
                    confirmLabel="OK"
                    pending={renameDocument.isPending}
                    onCancel={() => setRenaming(null)}
                    onConfirm={async () => {
                        await renameDocument.mutateAsync({
                            id: renaming.id,
                            title,
                        });
                        setRenaming(null);
                    }}
                >
                    <input
                        autoFocus
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        className="mt-4 h-10 w-full rounded border border-docs-border px-3 text-sm outline-none focus:border-docs-blue"
                    />
                </ConfirmDialog>
            ) : null}

            {deleting ? (
                <ConfirmDialog
                    title="Delete Document?"
                    description={`"${deleting.title}" Will Be Permanently Deleted. This Cannot Be Undone.`}
                    confirmLabel="Delete"
                    confirmTone="danger"
                    pending={deleteDocument.isPending}
                    onCancel={() => setDeleting(null)}
                    onConfirm={async () => {
                        await deleteDocument.mutateAsync(deleting.id);
                        setDeleting(null);
                    }}
                />
            ) : null}
        </>
    );
}
