type UserAvatarProps = {
    name?: string | null;
    image?: string | null;
};

export function UserAvatar({ name, image }: UserAvatarProps) {
    const initial = (name ?? "?").charAt(0).toUpperCase();

    return (
        <div
            aria-hidden="true"
            className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-docs-blue text-sm font-medium text-white"
        >
            {image ? (
                <img
                    src={image}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                />
            ) : (
                initial
            )}
        </div>
    );
}
