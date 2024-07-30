import { Request, Response, NextFunction } from "express";
import {
  bindBroadcastAndStream,
  isTokenValid,
  refreshAccessToken,
  youtubeLiveBroadCast,
  youtubeLiveStream,
} from "../services/youtubeServices";
import Platform from "../models/Platform";

export const youtubeLiveHandler = async (req: Request, res: Response) => {
  try {
    const { accessToken, refreshToken, title, description, platformId } =
      req.body;

    const isValid = await isTokenValid(accessToken);
    let newToken = accessToken;

    if (!isValid) {
      const tokenResponse = await refreshAccessToken(refreshToken);
      newToken = tokenResponse.access_token;
      await Platform.findOneAndUpdate(
        { _id: platformId },
        {
          accessToken: newToken,
          refreshToken: tokenResponse.refresh_token,
          expiresAt: new Date(Date.now() + tokenResponse.expires_in * 1000),
        },
        { new: true, upsert: true }
      );
    }

    const broadcast = await youtubeLiveBroadCast(newToken, title, description);
    const livestream = await youtubeLiveStream(newToken, title);

    await bindBroadcastAndStream(newToken, broadcast.id, livestream.id);

    res.status(200).json({
      data: {
        broadcast,
        livestream,
      },
    });
  } catch (err:any) {
    res.status(500).json({ error: err.message });
  }
};
