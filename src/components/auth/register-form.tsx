"use client";

import { AuthFormState, register } from "@/lib/actions/auth";
import { useActionState } from "react";
import { AuthField } from "./auth-field";
import Link from "next/link";

const initialState: AuthFormState = { error: "" };

export function RegisterForm() {
    const [state, formAction, pending] = useActionState(register, initialState);

    return (
        <form action={formAction} className="flex flex-col gap-3.5">
            <AuthField
                label="Name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Your Name"
                required
            />
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
                autoComplete="new-password"
                placeholder="At Least 8 Characters"
                minLength={8}
                required
            />
            <AuthField
                label="Confirm password"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                placeholder="Repeat Your Password"
                minLength={8}
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
                {pending ? "Creating Account..." : "Create Account"}
            </button>
            <p className="pt-2 text-center text-sm text-docs-muted">
                Already Have An Account?{" "}
                <Link
                    href="/login"
                    className="font-medium text-docs-blue hover:underline"
                >
                    Sign In
                </Link>
            </p>
        </form>
    );
}
