import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/app/lib/prisma";
import { nextCookies } from "better-auth/next-js";
import { oAuthProxy } from "better-auth/plugins";
import { createAuthMiddleware } from "better-auth/api";


export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            redirectURI: process.env.GOOGLE_REDIRECT_URI as string,
        },
    },
    hooks: {
        after: createAuthMiddleware(async (ctx) => {
            console.log("Auth Hook Triggered:", ctx.path);
        }),
    },
    plugins: [oAuthProxy(), nextCookies()],
});
