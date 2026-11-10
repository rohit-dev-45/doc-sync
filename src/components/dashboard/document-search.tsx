type DocumentSearchProps = {
    value: string;
    onChange: (value: string) => void;
};

export function DocumentSearch({ value, onChange }: DocumentSearchProps) {
    return (
        <label className="relative block w-full">
            <span className="sr-only">Search Documents</span>
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-[#5f6368]">
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                >
                    <circle
                        cx="11"
                        cy="11"
                        r="6.5"
                        stroke="currentColor"
                        strokeWidth="2"
                    />
                    <path
                        d="M16.5 16.5L20 20"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                </svg>
            </span>
            <input
                type="search"
                value={value}
                placeholder="Search"
                autoComplete="off"
                onChange={(event) => onChange(event.target.value)}
                className="document-search-input h-12 w-full rounded-full bg-[#e9eef6] pl-12 pr-5 text-base text-[#202124] outline-none placeholder:text-[#5f6368]"
            />
        </label>
    );
}
