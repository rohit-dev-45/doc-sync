type LogoProps = {
    size?: "sm" | "md";
    showWordmark?: boolean;
    tone?: "light" | "dark";
};

export function Logo({
    size = "md",
    showWordmark = true,
    tone = "light",
}: LogoProps) {
    const iconSize = size === "sm" ? 28 : 34;
    const wordmarkClass = tone === "dark" ? "text-white" : "text-[#3c4043]";

    return (
        <div className="flex items-center gap-2.5">
            <svg
                width={iconSize}
                height={iconSize}
                viewBox="0 0 36 36"
                fill="none"
                aria-hidden="true"
            >
                <rect width="36" height="36" rx="8" fill="#1a73e8" />
                <path
                    d="M11 8.5h9.2L25 13.3V27.5H11V8.5Z"
                    fill="white"
                    fillOpacity="0.96"
                />
                <path d="M20.2 8.5V13.3H25" fill="#d2e3fc" />
                <path
                    d="M14 18h8M14 21.5h8M14 25h5"
                    stroke="#1a73e8"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                />
            </svg>
            {showWordmark ? (
                <span
                    className={`tracking-tight ${
                        size === "sm"
                            ? "text-lg font-medium"
                            : "text-[22px] font-medium"
                    } ${wordmarkClass}`}
                >
                    DocSync
                </span>
            ) : null}
        </div>
    );
}
