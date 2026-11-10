"use client";

import { useOthers } from "@liveblocks/react/suspense";

export function PresenceAvatars() {
    const others = useOthers();

    if (others.length === 0) {
        return null;
    }

    const visible = others.slice(0, 3);
    const extra = others.length - visible.length;

    return (
        <ul
            aria-label="People currently in this document"
            className="flex flex-row-reverse items-center pr-1"
        >
            {visible.map((other, index) => {
                const name = other.info.name || "Collaborator";
                const avatar = other.info.avatar;
                const color = other.info.color || "#1a73e8";

                return (
                    <li
                        key={other.connectionId}
                        className="relative -mr-2"
                        style={{ zIndex: visible.length - index }}
                        title={name}
                    >
                        <span
                            className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border-2 border-white text-xs font-medium text-white"
                            style={{
                                backgroundColor: color,
                                boxShadow: `0 0 0 2px ${color}`,
                            }}
                        >
                            {avatar ? (
                                <img
                                    src={avatar}
                                    alt=""
                                    referrerPolicy="no-referrer"
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                name.charAt(0).toUpperCase()
                            )}
                        </span>
                        <span className="sr-only">{name}</span>
                    </li>
                );
            })}
            {extra > 0 ? (
                <li className="relative z-0 -mr-2 flex h-8 min-w-8 items-center justify-center rounded-full bg-[#e8eaed] px-2 text-xs font-medium text-[#3c4043]">
                    +{extra}
                </li>
            ) : null}
        </ul>
    );
}
