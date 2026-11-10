import { logout } from "@/lib/actions/auth";

export function SignOutButton() {
    return (
        <form action={logout}>
            <button
                type="submit"
                className="h-9 rounded px-3 text-sm font-medium text-docs-muted transition hover:bg-black/[0.04] hover:text-foreground"
            >
                Sign Out
            </button>
        </form>
    );
}
