import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
    // Konfigurasi provider, misalnya GitHub
    providers: [
        GitHubProvider({
            clientId: process.env.AUTH_GITHUB_ID as string,
            clientSecret: process.env.AUTH_GITHUB_SECRET as string,
        }),
    ],
    // Secret ini digunakan untuk mengenkripsi JWT
    secret: process.env.AUTH_SECRET,
    // Opsi session, kita menggunakan JWT
    session: {
        strategy: "jwt",
    },
};