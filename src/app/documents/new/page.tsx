import { createDocument } from "@/lib/actions/documents";
import { redirect } from "next/navigation";
import React from "react";

const NewDocumentsPage = async () => {
    const document = await createDocument();
    redirect(`/documents/${document.id}`);
};

export default NewDocumentsPage;
