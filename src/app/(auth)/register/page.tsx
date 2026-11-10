import { AuthCard } from "@/components/auth/auth-card";
import { AuthDivider, GoogleButton } from "@/components/auth/google-button";
import { RegisterForm } from "@/components/auth/register-form";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Create Account",
};

const RegisterPage = () => {
    return (
        <AuthCard
            title="Create Your Account"
            subtitle="Start Writing With Your Team In a Few Seconds."
        >
            <div className="flex flex-col gap-3.5">
                <GoogleButton label="Sign Up With Google" />
                <AuthDivider />
                <RegisterForm />
            </div>
        </AuthCard>
    );
};

export default RegisterPage;
