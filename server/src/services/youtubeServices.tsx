export const refreshAccessToken = async (refreshToken: string) => {
  try {
    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID as string,
        client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
        refresh_token: refreshToken,
        grant_type: "refresh_token",
      }),
    });

    const data = await response.json();
    console.log("Refresh Token Response Data:", data);

    if (!response.ok) {
      console.error("Refresh Token Response Error:", response);
      throw new Error(`Failed to refresh access token: ${response.statusText}`);
    }

    return data;
  } catch (error) {
    console.error("Refresh Token Error:", error);
    throw error;
  }
};

export const youtubeLiveBroadCast = async (
  accessToken: string,
  title: string,
  description: string
) => {
  try {
    const response = await fetch(
      "https://www.googleapis.com/youtube/v3/liveBroadcasts?part=snippet,status,contentDetails",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          snippet: {
            title: title,
            description: description,
            scheduledStartTime: new Date().toISOString(),
          },
          status: {
            privacyStatus: "public",
          },
          contentDetails: {
            monitorStream: {
              enableMonitorStream: false,
            },
          },
        }),
      }
    );

    const data = await response.json();
    console.log("YouTube Live Broadcast Response Data:", data);

    if (!response.ok) {
      console.error("YouTube Live Broadcast Response Error:", response);
      throw new Error(
        `Failed to create live broadcast: ${response.statusText}`
      );
    }

    return data;
  } catch (error) {
    console.error("YouTube Live Broadcast Error:", error);
    throw error;
  }
};

export const youtubeLiveStream = async (accessToken: string, title: string) => {
  try {
    const response = await fetch(
      "https://www.googleapis.com/youtube/v3/liveStreams?part=snippet,cdn",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          snippet: {
            title: title,
          },
          cdn: {
            resolution: "720p",
            format: "720p",
            ingestionType: "rtmp",
          },
        }),
      }
    );

    const data = await response.json();
    console.log("YouTube Live Stream Response Data:", data);

    if (!response.ok) {
      console.error("YouTube Live Stream Response Error:", response);
      throw new Error(`Failed to create live stream: ${response.statusText}`);
    }

    return data;
  } catch (error) {
    console.error("YouTube Live Stream Error:", error);
    throw error;
  }
};

export const bindBroadcastAndStream = async (
  accessToken: string,
  broadcastId: string,
  streamId: string
) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/liveBroadcasts/bind?id=${broadcastId}&part=id,contentDetails`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: broadcastId,
          streamId: streamId,
        }),
      }
    );

    const data = await response.json();
    console.log("Bind Broadcast and Stream Response Data:", data);

    if (!response.ok) {
      console.error("Bind Broadcast and Stream Response Error:", response);
      throw new Error(
        `Failed to bind broadcast to stream: ${response.statusText}`
      );
    }

    return data;
  } catch (error) {
    console.error("Error binding broadcast to stream:", error);
    throw error;
  }
};

export const isTokenValid = async (accessToken: string): Promise<boolean> => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${accessToken}`
    );

    const data = await response.json();
    console.log("Token Validation Response Data:", data);

    if (response.ok) {
      return data.exp && data.exp > Date.now() / 1000;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error validating token:", error);
    return false;
  }
};
