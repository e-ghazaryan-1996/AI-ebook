import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      email: string;
      image: string;
      id: string;
    };
  }

  interface Profile {
    email: string;
    name: string;
    picture: string;
  }
}
