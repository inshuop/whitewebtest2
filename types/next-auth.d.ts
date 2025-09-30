// types/next-auth.d.ts
import { DefaultSession, DefaultUser, JWT as NextAuthJWT } from "next-auth";

// Extending the default Session type to include custom fields
declare module "next-auth" {
  interface Session extends DefaultSession {
    id: string;
    email: string;
    name: string;
    role: string;
  }

  interface User extends DefaultUser {
    id: string;
    email: string;
    name: string;
    role: string;
  }

  interface JWT extends NextAuthJWT {
    id: string;
    email: string;
    name: string;
    role: string;
  }
}
