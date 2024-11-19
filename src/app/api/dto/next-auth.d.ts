import "next-auth";

declare module "next-auth" {
  interface User {
    role: string;
    token: string;
  }

  interface Session {
    user: {
      _id: string;
      name: string;
      email: string;
      role: string;
      token: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role?: string;
    token: string;
  }
}
