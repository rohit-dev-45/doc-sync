import { AuthCard } from "@/components/auth/auth-card";
import { AuthDivider, GoogleButton } from "@/components/auth/google-button";
import { LoginForm } from "@/components/auth/login-form";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Sign In",
};

const LoginPage = () => {
    return (
        <AuthCard
            title="Welcome Back"
            subtitle="Sign In To Continue To Your Documents."
        >
            <div className="flex flex-col gap-3.5">
                <GoogleButton />
                <AuthDivider />
                <LoginForm />
            </div>
        </AuthCard>
    );
};

export default LoginPage;
