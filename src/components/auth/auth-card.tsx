import { ReactNode } from "react";
import { Logo } from "../logo";

type AuthCardProps = {
    title: string;
    subtitle: string;
    children: ReactNode;
};

export function AuthCard({ title, subtitle, children }: AuthCardProps) {
    return (
        <main className="auth-page flex min-h-svh items-center justify-center px-4 py-12">
            <div className="relative w-full max-w-[400px]">
                <div
                    aria-hidden="true"
                    className="absolute inset-x-5 top-3 bottom-[-10px] rounded-[20px] bg-white/50 shadow-sm"
                />
                <div
                    aria-hidden="true"
                    className="absolute inset-x-2.5 top-1.5 bottom-[-5px] rounded-[20px] border border-white/80 bg-white/75"
                />

                <section className="relative overflow-hidden rounded-[20px] border border-[#e3e6eb] bg-white shadow-[0_20px_50px_-20px_rgba(32,33,36,0.28)]">
                    <div className="h-1 bg-gradient-to-r from-[#4285f4] via-docs-blue to-[#34a853]" />
                    <div className="px-8 pt-7 pb-8">
                        <div className="mb-6 flex justify-center">
                            <Logo />
                        </div>
                        <div className="mb-6 text-center">
                            <h1 className="text-[22px] font-semibold tracking-tight text-[#202124]">
                                {title}
                            </h1>
                            <p className="mt-1.5 text-sm leading-6 text-docs-muted">
                                {subtitle}
                            </p>
                        </div>
                        {children}
                    </div>
                </section>
            </div>
        </main>
    );
}
