import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as any).role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).role = token.role;
            }
            return session;
        },
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isAuthPage = nextUrl.pathname.startsWith("/login");
            const isAdminPage = nextUrl.pathname.startsWith("/admin");

            if (isAdminPage && !isLoggedIn) {
                return false; // Result in redirect
            }

            if (isAuthPage && isLoggedIn) {
                return Response.redirect(new URL("/admin", nextUrl));
            }
            return true;
        },
    },
    providers: [], // Add empty providers to satisfy type, will be populated in auth.ts
} satisfies NextAuthConfig;
