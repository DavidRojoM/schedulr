import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { environment } from "./config/environment";

// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: environment.GOOGLE_CLIENT_ID,
      clientSecret: environment.GOOGLE_CLIENT_SECRET,
    }),
  ],
  // callbacks: {
  //   async signIn({ user, account, profile, email, credentials }) {
  //     // Save user data to the database
  //     await prisma.user.upsert({
  //       where: { email: user.email },
  //       update: {
  //         name: user.name,
  //         image: user.image,
  //       },
  //       create: {
  //         email: user.email,
  //         name: user.name,
  //         image: user.image,
  //       },
  //     });
  //     return true; // Continue the sign-in process
  //   },
  //   async session({ session, token, user }) {
  //     // Add user id to session
  //     const dbUser = await prisma.user.findUnique({
  //       where: { email: session.user.email },
  //     });
  //     session.user.id = dbUser.id;
  //     return session;
  //   },
  // },
});
