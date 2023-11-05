import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/database/conn";
import User from "@/models/userModel";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      async authorize({ email, password }, req) {
        dbConnect().catch((err) => {
          return { status: "fail", message: err.message };
        });

        // check user exists
        const user = await User.findOne({ email });
        console.log(user);

        if (!user || !(await user.checkPassword(password))) {
          throw new Error("Invalid email or password!");
        }
        user.password = undefined;
        return user;
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.uid;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: "D94A523A5C796528368F823AE226F",
});
