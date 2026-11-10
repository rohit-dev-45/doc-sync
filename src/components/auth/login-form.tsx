"use client";

import { AuthFormState, login } from "@/lib/actions/auth";
import { useActionState } from "react";
import { AuthField } from "./auth-field";
import Link from "next/link";

const initialState: AuthFormState = { error: "" };

export function LoginForm() {
    const [state, formAction, pending] = useActionState(login, initialState);

    return (
        <form action={formAction} className="flex flex-col gap-3.5">
            <AuthField
                label="Email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
            />
            <AuthField
                label="Password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter Your Password"
                required
            />
            {state.error ? (
                <p
                    className="rounded-lg bg-[#fce8e6] px-3 py-2 text-sm text-[#c5221f]"
                    role="alert"
                >
                    {state.error}
                </p>
            ) : null}
            <button
                type="submit"
                disabled={pending}
                className="mt-1.5 h-11 rounded-lg bg-docs-blue text-sm font-medium text-white transition hover:bg-docs-blue-hover hover:shadow-[0_1px_3px_rgba(26,115,232,0.4)] active:translate-y-px disabled:cursor-not-allowed disabled:opacity-70"
            >
                {pending ? "Signing In..." : "Sign In"}
            </button>
            <p className="pt-2 text-center text-sm text-docs-muted">
                Don&apos;t Have An Account?{" "}
                <Link
                    href="/register"
                    className="font-medium text-docs-blue hover:underline"
                >
                    Create One
                </Link>
            </p>
        </form>
    );
}
