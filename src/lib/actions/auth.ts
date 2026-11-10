"use server";

import { AuthError } from "next-auth";
import { signIn, signOut } from "../auth";
import { prisma } from "../prisma";
import { hashPassword } from "../password";

export type AuthFormState = {
    error: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readString(formData: FormData, key: string, trim = true) {
    const value = formData.get(key);
    if (typeof value !== "string") {
        return "";
    }
    return trim ? value.trim() : value;
}

export async function login(
    _prevState: AuthFormState,
    formData: FormData,
): Promise<AuthFormState> {
    const email = readString(formData, "email").toLowerCase();
    const password = readString(formData, "password", false);

    if (!email || !password) {
        return { error: "Email And Password Are Required." };
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: "/",
        });
    } catch (error) {
        if (error instanceof AuthError) {
            return { error: "Invalid Email Or Password." };
        }

        throw error;
    }

    return { error: "" };
}

export async function register(
    _prevState: AuthFormState,
    formData: FormData,
): Promise<AuthFormState> {
    const name = readString(formData, "name");
    const email = readString(formData, "email").toLowerCase();
    const password = readString(formData, "password", false);
    const confirmPassword = readString(formData, "confirmPassword", false);

    if (name.length < 2) {
        return { error: "Please Enter Your Name." };
    }

    if (!EMAIL_PATTERN.test(email)) {
        return { error: "Please Enter a Valid Email Address." };
    }

    if (password.length < 8) {
        return { error: "Password Must Be At Least 8 Characters." };
    }

    if (password !== confirmPassword) {
        return { error: "Passwords Do Not Match." };
    }

    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        return { error: "An Account With This Email Already Exists." };
    }

    await prisma.user.create({
        data: {
            name,
            email,
            password: await hashPassword(password),
        },
    });

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: "/",
        });
    } catch (error) {
        if (error instanceof AuthError) {
            return {
                error: "Account Created, But Sign-In Failed. Please Try Logging In.",
            };
        }

        throw error;
    }

    return { error: "" };
}

export async function logout() {
    await signOut({ redirectTo: "/login" });
}

export async function loginWithGoogle() {
    await signIn("google", { redirectTo: "/" });
}
