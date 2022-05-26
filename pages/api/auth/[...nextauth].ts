import NextAuth from "next-auth/next"
import CredentialProvider from "next-auth/providers/credentials";
import { verifyPassword } from "../../../lib/auth";
import { findCustomer, findAdmin } from "../../../lib/db";

export default NextAuth({
    session: {
        strategy: "jwt"
    },
    secret: process.env.SECRET,
    pages: {
        signIn: "/",
        signOut: "/",
        error: "/"
    },
    providers: [
        CredentialProvider({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "text", placeholder: "email"},
                password: { label: "password", type: "password"}
            },
            async authorize(credentials: Record<string, string> | undefined, req) {

                const user = await findCustomer(credentials!.email);
                const admin = await findAdmin(credentials!.email);

                if(user || !admin) {
                    if(!user) {
                        throw new Error("Admin not found.")
                    }

                    const isValid = await verifyPassword(credentials!.password, user.password);

                    if(!isValid) {
                        throw new Error("Could not log you in.");
                    }

                    return {
                        email: user.email
                    }
                }else if(admin || !user){
                    if(!admin) {
                        throw new Error("Admin not found.")
                    }
                    const isValid = await verifyPassword(credentials!.password, admin.password as string);

                    if(!isValid) {
                        throw new Error("Could not log you in.");
                    }

                    return {
                        email: admin.email
                    }

                }
                else {
                    throw new Error;
                }

            }
        })
    ]
})