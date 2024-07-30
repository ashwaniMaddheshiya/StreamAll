import { baseUrl } from "@/constants";
import { myFetch } from "@/utils/myFetch";
import { showToast } from "@/utils/showToast";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope:
            "openid email profile https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.force-ssl",
        },
      },
    }),
  ],
  jwt: {},
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log("SignIn Callback:");
      console.log({ user, account, profile, email, credentials });

      if (account?.provider === "google" && account.access_token) {
        try {
          console.log("Fetching YouTube data...");
          const youtubeResponse = await fetch(
            "https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&mine=true",
            {
              headers: {
                Authorization: `Bearer ${account.access_token}`,
                Accept: "application/json",
              },
              method: "GET",
            }
          );

          const youtubeData = await youtubeResponse.json();
          console.log("YouTube Response:", youtubeData);

          if (youtubeData.items) {
            console.log("Saving platform data...");

            const response = await fetch(`${baseUrl}/api/platform/create`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userId: "668da076d3522ae79f5b31bb",
                platform: "YouTube",
                accessToken: account.access_token,
                linkedEmail: profile?.email,
                emailVerified: profile?.email_verified,
                refreshToken: account.refresh_token,
                channelData: youtubeData.items,
                scope: account.scope,
                expiresAt: account.expires_at,
              }),
            });

            if (!response.ok) {
              console.error(
                "Failed to save platform data:",
                response.statusText
              );
              return false;
            }
            const data = await response.json();
            console.log("Platform Data Saved:", data);

            if(data.message === 'Account Already Linked!'){
              showToast('error',data.message);
              return false;
            }
          } else {
            console.log("No YouTube channel data found.");
          }
          return true;
        } catch (error) {
          console.error("Error fetching or sending YouTube data:", error);
          return false;
        }
      }
      return true;
    },
  },
};
