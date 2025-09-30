import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null; // Fail early if email or password are missing
        }

        try {
          // Fetch the user by email from the database
          const user = await prisma.auth_User.findUnique({
            where: { email: credentials.email },
          });

          if (user && user.password) {
            // Compare the hashed password with the provided password
            const isValid = await bcrypt.compare(credentials.password, user.password);

            if (isValid) {
              // User authentication successful, return user details
              return {
                id: user.id.toString(), // Ensure the ID is a string
                email: user.email,
                name: user.name || "User", // Optional: You can return more details if needed
                role: user.role || "user", // Assuming the role is stored in the user table
              };
            }
          }

          return null; // Authentication failed
        } catch (error) {
          console.error("Error during authorization:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt", // JWT-based sessions
    maxAge: 60 * 60, // Session expiration time in seconds (1 hour here)
    updateAge: 60 * 60, // Update session age every hour
  },
  secret: process.env.NEXTAUTH_SECRET, // Ensure this is set in your .env file
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role; // Adding 'role' to the JWT token
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.id = token.id as string;
        session.email = token.email as string;
        session.name = token.name as string;
        session.role = token.role as string; // Adding 'role' to the session
      }
      return session;
    },
  },
  pages: {
    signIn: '/admin/login', // Customize the login page path if needed
  },
});
