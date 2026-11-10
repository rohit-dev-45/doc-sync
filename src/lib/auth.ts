import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/password";

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    trustHost: true,
    pages: {
        signIn: "/login",
    },
    providers: [
        Google({
            allowDangerousEmailAccountLinking: true,
        }),
        Credentials({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const email = credentials?.email;
                const password = credentials?.password;

                if (typeof email !== "string" || typeof password !== "string") {
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: { email: email.trim().toLowerCase() },
                });

                if (!user?.password) {
                    return null;
                }

                const isValid = await verifyPassword(password, user.password);

                if (!isValid) {
                    return null;
                }

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    image: user.image,
                };
            },
        }),
    ],
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.picture = user.image;
                token.name = user.name;
                token.email = user.email;
            }
            return token;
        },
        session({ session, token }) {
            if (session.user) {
                session.user.id = token.sub ?? "";
                session.user.image = token.picture;
                session.user.name = token.name;
                session.user.email = token.email ?? "";
            }
            return session;
        },
    },
});
