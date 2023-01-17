import NextAuth, { NextAuthOptions} from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  secret: process.env.GOOGLE_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID  as string,
      clientSecret: process.env.GOOGLE_SECRET  as string
    }),
    // ...add more providers here
  ],
}
export default NextAuth(authOptions)