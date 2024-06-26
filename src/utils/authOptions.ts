import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  // secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      //   authorization: {
      //     params: {
      //       prompt: "consent",
      //       access_type: "offline",
      //       response_type: "code",
      //     },
      //   },
    }),
    {
      id: "gsa",
      name: "GSA 통합 계정",
      type: "oauth",
      clientId: process.env.GSA_CLIENT_ID,
      clientSecret: process.env.GSA_CLIENT_SECRET,
      wellKnown:
        "https://api.stg.idp.gistory.me/.well-known/openid-configuration",
      authorization: { params: { scope: "openid" } },
      idToken: true,
      checks: ["state"],
      client: {
        id_token_signed_response_alg: "ES256",
      },
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    },
  ],
};
