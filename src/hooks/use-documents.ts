import {
    deleteDocument,
    listDocuments,
    renameDocument,
} from "@/lib/actions/documents";
import { DocumentRecord } from "@/lib/document-types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const documentKeys = {
    all: ["documents"] as const,
};

export function useDocuments() {
    return useQuery({
        queryKey: documentKeys.all,
        queryFn: listDocuments,
        refetchOnMount: "always",
    });
}

export function useRenameDocument() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, title }: { id: string; title: string }) =>
            renameDocument(id, title),
        onSuccess: (document) => {
            queryClient.setQueryData<DocumentRecord[]>(
                documentKeys.all,
                (current) =>
                    current?.map((item) =>
                        item.id === document.id ? document : item,
                    ),
            );
        },
    });
}

export function useDeleteDocument() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteDocument,
        onSuccess: ({ id }) => {
            queryClient.setQueryData<DocumentRecord[]>(
                documentKeys.all,
                (current) => current?.filter((item) => item.id !== id),
            );
        },
    });
}
