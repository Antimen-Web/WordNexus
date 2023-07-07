import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import User from "@models/user";
import { connectToDB } from "@utils/database";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    async signIn({ profile }) {
      try {
        await connectToDB();

        const userExist = await User.findOne({
          email: profile.email,
        });

        if (!userExist) {
          await User.create({
            email: profile.email,
            username: profile.name,
            image: profile.picture,
            allWords: [],
          });
        }

        return true;
      } catch (error) {
        console.log(error.message);
        return false;
      }
    },
    async session({ session }) {
      try {
        const sessionUser = await User.findOne({ email: session.user.email });
        session.user.id = sessionUser._id.toString();
        session.user.allWords = sessionUser.allWords;

        return session;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

