import { SharedDocumentView } from "@/components/editor/shared-document-view";
import { getSharedDocument } from "@/lib/actions/documents";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

type SharedDocumentPageProps = {
    params: Promise<{ token: string }>;
};

export async function generateMetadata({
    params,
}: SharedDocumentPageProps): Promise<Metadata> {
    const { token } = await params;
    const document = await getSharedDocument(token);

    return {
        title: document?.title ?? "Shared Document",
    };
}

const SharedDocumentPage = async ({ params }: SharedDocumentPageProps) => {
    const { token } = await params;
    const document = await getSharedDocument(token);

    if (!document) {
        notFound();
    }

    return <SharedDocumentView title={document.title} body={document.body} />;
};

export default SharedDocumentPage;
