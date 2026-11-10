import { DocumentRoom } from "@/components/editor/document-room";
import { getDocument } from "@/lib/actions/documents";
import { auth } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import React from "react";

type DocumentPageProps = {
    params: Promise<{ id: string }>;
};

const EditorPage = async ({ params }: DocumentPageProps) => {
    const session = await auth();

    if (!session?.user) {
        redirect("/login");
    }

    if (!process.env.LIVEBLOCKS_SECRET_KEY?.trim()) {
        return (
            <div className="flex min-h-full items-center justify-center bg-[#f9fbfd] px-6">
                <div className="max-w-md rounded-lg border border-docs-border bg-white p-6 text-[#202124] shadow-sm">
                    <h1 className="text-lg font-medium">
                        Liveblocks Key Needed
                    </h1>
                    <p className="mt-2 text-sm leading-6 text-docs-muted">
                        Add{" "}
                        <code className="rounded bg-black/[0.06] px-1">
                            LIVEBLOCKS_SECRET_KEY
                        </code>{" "}
                        From The Liveblocks Dashboard To Your{" "}
                        <code className="rounded bg-black/[0.06] px-1">
                            .env
                        </code>{" "}
                        File, Then Restart The Dev Server.
                    </p>
                </div>
            </div>
        );
    }

    const { id } = await params;
    const document = await getDocument(id);

    if (!document) {
        notFound();
    }

    return (
        <DocumentRoom
            documentId={document.id}
            title={document.title}
            body={document.body}
            name={session.user.name}
            email={session.user.email}
            image={session.user.image}
        />
    );
};

export default EditorPage;
