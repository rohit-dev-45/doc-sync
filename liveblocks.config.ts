declare global {
    interface Liveblocks {
        Presence: Record<string, never>;
        Storage: Record<string, never>;
        UserMeta: {
            id: string;
            info: {
                name: string;
                email: string;
                avatar: string;
                color: string;
            };
        };
        RoomEvent: never;
        ThreadMetadata: Record<string, never>;
    }
}

export {};
