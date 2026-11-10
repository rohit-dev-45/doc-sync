import { Liveblocks } from "@liveblocks/node";

export function getLiveblocks() {
    const secret = process.env.LIVEBLOCKS_SECRET_KEY?.trim();

    if (!secret) {
        throw new Error(
            "LIVEBLOCKS_SECRET_KEY is missing. Copy the secret key from the Liveblocks dashboard into .env.",
        );
    }

    return new Liveblocks({ secret });
}
