import { auth } from "@/lib/auth";
import { getLiveblocks } from "@/lib/liveblocks";
import { prisma } from "@/lib/prisma";
import { colorForUser } from "@/lib/user-color";

export async function POST(request: Request) {
    const session = await auth();
    const user = session?.user;
    const userId = user?.id;

    if (!user || !userId) {
        return new Response("Unauthorized", { status: 401 });
    }

    const payload = (await request.json()) as { room?: string };
    const room = payload.room;

    if (!room) {
        return new Response("Bad Request", { status: 400 });
    }

    const document = await prisma.document.findFirst({
        where: { id: room, ownerId: userId },
        select: { id: true },
    });

    if (!document) {
        return new Response("Forbidden", { status: 403 });
    }

    const liveblocksSession = getLiveblocks().prepareSession(userId, {
        userInfo: {
            name: user.name ?? user.email ?? "Signed In",
            email: user.email ?? "",
            avatar: user.image ?? "",
            color: colorForUser(userId),
        },
    });

    liveblocksSession.allow(room, liveblocksSession.FULL_ACCESS);

    const { status, body } = await liveblocksSession.authorize();

    return new Response(body, { status });
}
