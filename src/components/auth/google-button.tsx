import { loginWithGoogle } from "@/lib/actions/auth";

type GoogleButtonProps = {
    label?: string;
};

export function GoogleButton({
    label = "Continue With Google",
}: GoogleButtonProps) {
    return (
        <form action={loginWithGoogle}>
            <button
                type="submit"
                className="flex h-11 w-full items-center justify-center gap-3 rounded-lg border border-[#dadce0] bg-white text-sm font-medium text-[#3c4043] transition hover:bg-[#f8f9fa] hover:shadow-[0_1px_2px_rgba(60,64,67,0.15)]"
            >
                <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    aria-hidden="true"
                >
                    <path
                        fill="#4285F4"
                        d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615Z"
                    />
                    <path
                        fill="#34A853"
                        d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18Z"
                    />
                    <path
                        fill="#FBBC05"
                        d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332Z"
                    />
                    <path
                        fill="#EA4335"
                        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58Z"
                    />
                </svg>
                {label}
            </button>
        </form>
    );
}

export function AuthDivider() {
    return (
        <div className="flex items-center gap-3 py-1">
            <span className="h-px flex-1 bg-[#dadce0]" />
            <span className="text-xs font-medium tracking-wide text-docs-muted uppercase">
                Or
            </span>
            <span className="h-px flex-1 bg-[#dadce0]" />
        </div>
    );
}
