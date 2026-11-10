type IconProps = {
    className?: string;
};

export function UndoIcon({ className }: IconProps) {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            className={className}
            aria-hidden="true"
        >
            <path
                d="M8 8H4V4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M4 8a8 8 0 1 1 1.5 4.8"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
        </svg>
    );
}

export function RedoIcon({ className }: IconProps) {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            className={className}
            aria-hidden="true"
        >
            <path
                d="M16 8h4V4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M20 8a8 8 0 1 0-1.5 4.8"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
        </svg>
    );
}

export function BoldIcon({ className }: IconProps) {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            className={className}
            aria-hidden="true"
        >
            <path
                d="M7 5h6.2a3.3 3.3 0 0 1 0 6.6H7V5Z"
                stroke="currentColor"
                strokeWidth="1.8"
            />
            <path
                d="M7 11.6h7.2A3.5 3.5 0 0 1 14.2 19H7v-7.4Z"
                stroke="currentColor"
                strokeWidth="1.8"
            />
        </svg>
    );
}

export function ItalicIcon({ className }: IconProps) {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            className={className}
            aria-hidden="true"
        >
            <path
                d="M10 5h8M6 19h8M14.5 5 9.5 19"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
        </svg>
    );
}

export function UnderlineIcon({ className }: IconProps) {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            className={className}
            aria-hidden="true"
        >
            <path
                d="M7 5v6.5a5 5 0 0 0 10 0V5M6 19h12"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
        </svg>
    );
}

export function AlignLeftIcon({ className }: IconProps) {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            className={className}
            aria-hidden="true"
        >
            <path
                d="M4 6h16M4 10h10M4 14h16M4 18h10"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
        </svg>
    );
}

export function AlignCenterIcon({ className }: IconProps) {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            className={className}
            aria-hidden="true"
        >
            <path
                d="M4 6h16M7 10h10M4 14h16M7 18h10"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
        </svg>
    );
}

export function AlignRightIcon({ className }: IconProps) {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            className={className}
            aria-hidden="true"
        >
            <path
                d="M4 6h16M10 10h10M4 14h16M10 18h10"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
        </svg>
    );
}

export function AlignJustifyIcon({ className }: IconProps) {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            className={className}
            aria-hidden="true"
        >
            <path
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
        </svg>
    );
}

export function BulletListIcon({ className }: IconProps) {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            className={className}
            aria-hidden="true"
        >
            <circle cx="6" cy="7" r="1.4" fill="currentColor" />
            <circle cx="6" cy="12" r="1.4" fill="currentColor" />
            <circle cx="6" cy="17" r="1.4" fill="currentColor" />
            <path
                d="M10 7h10M10 12h10M10 17h10"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
        </svg>
    );
}

export function NumberedListIcon({ className }: IconProps) {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            className={className}
            aria-hidden="true"
        >
            <path
                d="M10 7h10M10 12h10M10 17h10"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
            <path
                d="M5 5.5v4M5 7.5H7M4.5 13.5h2.5L4.5 17h3"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export function TextColorIcon({
    className,
    color,
}: IconProps & { color: string }) {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            className={className}
            aria-hidden="true"
        >
            <path
                d="M5 19h14M8.2 15 12 6l3.8 9M9.4 12h5.2"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M6 21h12"
                stroke={color}
                strokeWidth="3"
                strokeLinecap="round"
            />
        </svg>
    );
}

export function ChevronIcon({ className }: IconProps) {
    return (
        <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className={className}
            aria-hidden="true"
        >
            <path
                d="M3 4.5 6 7.5 9 4.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export function StarIcon({ filled }: { filled: boolean }) {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill={filled ? "#f4b400" : "none"}
            aria-hidden="true"
        >
            <path
                d="M12 4.5 14.2 9l4.8.7-3.5 3.4.8 4.8L12 15.8 7.7 17.9l.8-4.8L5 9.7 9.8 9 12 4.5Z"
                stroke={filled ? "#f4b400" : "currentColor"}
                strokeWidth="1.6"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export function MinusIcon({ className }: IconProps) {
    return (
        <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            className={className}
            aria-hidden="true"
        >
            <path
                d="M5 12h14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
}

export function PlusIcon({ className }: IconProps) {
    return (
        <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            className={className}
            aria-hidden="true"
        >
            <path
                d="M12 5v14M5 12h14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
}
