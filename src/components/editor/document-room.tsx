"use client";

import {
    ClientSideSuspense,
    LiveblocksProvider,
    RoomProvider,
} from "@liveblocks/react/suspense";
import { EditorLoading } from "./editor-loading";
import { EditorShell } from "./editor-shell";

type DocumentRoomProps = {
    documentId: string;
    title: string;
    body?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
};

export function DocumentRoom({
    documentId,
    title,
    body,
    name,
    email,
    image,
}: DocumentRoomProps) {
    return (
        <LiveblocksProvider authEndpoint="/api/liveblocks-auth">
            <RoomProvider id={documentId} initialPresence={{}}>
                <ClientSideSuspense fallback={<EditorLoading />}>
                    <EditorShell
                        documentId={documentId}
                        title={title}
                        body={body}
                        name={name}
                        email={email}
                        image={image}
                    />
                </ClientSideSuspense>
            </RoomProvider>
        </LiveblocksProvider>
    );
}
