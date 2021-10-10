import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import Providers from "next-auth/providers";

/**
 * See all Next Auth configurations options at:
 * https://next-auth.js.org/configuration
 */
const options: NextAuthOptions = {
  theme: "light",
  debug: process.env.NODE_ENV === "development",
  session: {
    // Use JWT to manage sessions since we aren't using a Database
    jwt: true,
    maxAge: 60 * 15, // 15 min
  },
  // Secure cookies will be automatically determined by NEXTAUTH_URL: true is https, false otherwise.
  //   useSecureCookies: true,
//   jwt: {
//     encryption: true,
//     // Take a look to .env.local.example to see how to generate these keys
//     encryptionKey: process.env.AUTH_JWT_ENCRYPTION_KEY,
//     secret: process.env.AUTH_JWT_SECRET,
//     signingKey: process.env.AUTH_JWT_SIGNING_KEY,
//   },
  providers: [
    Providers.Credentials({
      name: "Miami Store Account",
      credentials: {
        password: { label: "Ingrese su contraseña", type: "password" },
      },
      async authorize(credentials) {
        const response = await fetch(
          `${process.env.NEXTAUTH_URL}/api/auth/miamistore`,
          {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          }
        );
        const user = await response.json();
        return response.ok && user ? user : null;
      },
    }),
    Providers.GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    // Providers.Google({}),
  ],
};

export default NextAuth(options);
