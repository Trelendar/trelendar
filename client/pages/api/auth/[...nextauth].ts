import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import NextAuth, { NextAuthOptions } from 'next-auth';

import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import clientPromise, { connectDB } from '../../../lib/mongodb';
import CredentialsProvider from 'next-auth/providers/credentials';
import Users from '../../../models/userModel';
import bcrypt from 'bcrypt';
import { unstable_getServerSession } from 'next-auth/next';
// clientPromise();
connectDB();
export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXT_PUBLIC_SECRET,
    // The maximum age of the NextAuth.js issued JWT in seconds.
    // Defaults to `session.maxAge`.
    maxAge: 60 * 60 * 24 * 30,
    // You can define your own encode/decode functions for signing and encryption
    // async encode({ secret, token, maxAge }) {},
    // async decode({ secret, token }) {},
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/login',
  },
  debug: true,
  // secret: process.env.NEXT_PUBLIC_SECRET,
  providers: [
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      // type: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'Email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req: { query: { email: string; password: string } }) {
        // console.log(email, password);
        const { email, password } = req.query;
        const user = await Users.findOne({ email });
        if (user) return loginUser({ password, user });
        throw Error('Email or password is not valid');
      },
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      session.userId = token.sub;

      return session;
    },
  },
};

const loginUser = async ({ password, user }) => {
  if (!user.password) {
    throw new Error('Accounts have to login with OAuth or Email.');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Password Incorrect.');
  }

  // if (!user.emailVerified) {
  //   throw new Error('Success! Check your email.');
  // }

  return user;
};

const registerUser = async ({ email, password }) => {
  const hashPass = await bcrypt.hash(password, 12);
  const newUser = new Users({ email, password: hashPass });
  await newUser.save();
  throw new Error('Success! Check your email.');
};
export default NextAuth(authOptions);
