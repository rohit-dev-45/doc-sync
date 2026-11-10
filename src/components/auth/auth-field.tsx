"use client";

import { useState, type InputHTMLAttributes } from "react";

type AuthFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    name: string;
};

export function AuthField({
    label,
    name,
    type = "text",
    className,
    ...props
}: AuthFieldProps) {
    const [visible, setVisible] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword && visible ? "text" : type;

    return (
        <label className="flex flex-col gap-1.5 text-[13px] font-medium text-[#3c4043]">
            {label}
            <span className="relative">
                <input
                    name={name}
                    type={inputType}
                    className={`h-11 w-full rounded-lg border border-[#dadce0] bg-white px-3.5 text-[15px] text-[#202124] outline-none transition placeholder:text-[#80868b] hover:border-[#bdc1c6] focus:border-docs-blue focus:shadow-[0_0_0_3px_rgba(26,115,232,0.16)] ${
                        isPassword ? "pr-11" : ""
                    } ${className ?? ""}`}
                    {...props}
                />
                {isPassword ? (
                    <button
                        type="button"
                        onClick={() => setVisible((value) => !value)}
                        className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-[#80868b] transition hover:text-[#3c4043]"
                        aria-label={visible ? "Hide password" : "Show password"}
                    >
                        {visible ? (
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                aria-hidden="true"
                            >
                                <path
                                    d="M3 3l18 18M10.5 10.7a2.5 2.5 0 0 0 3.8 3.2M9.9 5.1A10.8 10.8 0 0 1 12 5c6 0 10 7 10 7a18.4 18.4 0 0 1-3.2 3.8M6.1 6.5C3.7 8.2 2 12 2 12s4 7 10 7c1.7 0 3.2-.4 4.6-1.1"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        ) : (
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                aria-hidden="true"
                            >
                                <path
                                    d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinejoin="round"
                                />
                                <circle
                                    cx="12"
                                    cy="12"
                                    r="3"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                />
                            </svg>
                        )}
                    </button>
                ) : null}
            </span>
        </label>
    );
}
