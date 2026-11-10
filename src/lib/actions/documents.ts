"use server";

import { randomBytes } from "node:crypto";
import { DocumentRecord } from "../document-types";
import { prisma } from "../prisma";
import { requireUserId } from "../session";

function toRecord(
    document: {
        id: string;
        title: string;
        createdAt: Date;
        updatedAt: Date;
        body?: string;
    },
    options?: { includeBody?: boolean },
): DocumentRecord {
    return {
        id: document.id,
        title: document.title,
        createdAt: document.createdAt.toISOString(),
        updatedAt: document.updatedAt.toISOString(),
        ...(options?.includeBody ? { body: document.body ?? "" } : {}),
    };
}

export async function listDocuments(): Promise<DocumentRecord[]> {
    const userId = await requireUserId();
    const documents = await prisma.document.findMany({
        where: { ownerId: userId },
        orderBy: { updatedAt: "desc" },
    });

    return documents.map((document) => toRecord(document));
}

export async function getDocument(id: string): Promise<DocumentRecord | null> {
    const userId = await requireUserId();
    const document = await prisma.document.findFirst({
        where: { id, ownerId: userId },
    });

    return document ? toRecord(document, { includeBody: true }) : null;
}

export async function createDocument(): Promise<DocumentRecord> {
    const userId = await requireUserId();
    const document = await prisma.document.create({
        data: {
            ownerId: userId,
            title: "Untitled Document",
        },
    });

    return toRecord(document);
}

export async function renameDocument(
    id: string,
    title: string,
): Promise<DocumentRecord> {
    const userId = await requireUserId();
    const trimmed = title.trim() || "Untitled Document";

    const existing = await prisma.document.findFirst({
        where: { id, ownerId: userId },
    });

    if (!existing) {
        throw new Error("Document Not Found.");
    }

    const document = await prisma.document.update({
        where: { id },
        data: { title: trimmed },
    });

    return toRecord(document);
}

export async function deleteDocument(id: string): Promise<{ id: string }> {
    const userId = await requireUserId();
    const existing = await prisma.document.findFirst({
        where: { id, ownerId: userId },
    });

    if (!existing) {
        throw new Error("Document Not Found.");
    }

    await prisma.document.delete({ where: { id } });
    return { id };
}

export async function duplicateDocument(id: string): Promise<DocumentRecord> {
    const userId = await requireUserId();
    const existing = await prisma.document.findFirst({
        where: { id, ownerId: userId },
    });

    if (!existing) {
        throw new Error("Document Not Found.");
    }

    const document = await prisma.document.create({
        data: {
            ownerId: userId,
            title: `Copy Of ${existing.title}`,
            body: existing.body,
        },
    });

    return toRecord(document, { includeBody: true });
}

export async function saveDocumentBody(
    id: string,
    body: string,
): Promise<void> {
    const userId = await requireUserId();
    const existing = await prisma.document.findFirst({
        where: { id, ownerId: userId },
        select: { id: true },
    });

    if (!existing) {
        throw new Error("Document Not Found.");
    }

    await prisma.document.update({
        where: { id },
        data: { body },
    });
}

export async function ensureShareLink(id: string): Promise<{ token: string }> {
    const userId = await requireUserId();
    const existing = await prisma.document.findFirst({
        where: { id, ownerId: userId },
        select: { id: true, shareToken: true },
    });

    if (!existing) {
        throw new Error("Document Not Found.");
    }

    if (existing.shareToken) {
        return { token: existing.shareToken };
    }

    const token = randomBytes(18).toString("base64url");
    const document = await prisma.document.update({
        where: { id },
        data: { shareToken: token },
    });

    return { token: document.shareToken as string };
}

export async function getSharedDocument(token: string): Promise<{
    title: string;
    body: string;
} | null> {
    if (!token) {
        return null;
    }

    const document = await prisma.document.findUnique({
        where: { shareToken: token },
        select: { title: true, body: true },
    });

    if (!document) {
        return null;
    }

    return {
        title: document.title,
        body: document.body,
    };
}
