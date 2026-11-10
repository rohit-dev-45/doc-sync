import Link from "next/link";

export function NewDocumentCard() {
    return (
        <Link
            href="/documents/new"
            className="group flex w-[148px] flex-col text-left"
        >
            <span className="flex h-[186px] items-center justify-center rounded-sm border border-docs-border bg-white transition group-hover:border-docs-blue group-hover:shadow-sm">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e8f0fe] text-docs-blue">
                    <svg
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                    >
                        <path
                            d="M12 5v14M5 12h14"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>
                </span>
            </span>
            <span className="mt-3 text-sm font-medium text-[#202124]">
                Blank
            </span>
            <span className="text-xs text-docs-muted">
                Create a New Document
            </span>
        </Link>
    );
}
