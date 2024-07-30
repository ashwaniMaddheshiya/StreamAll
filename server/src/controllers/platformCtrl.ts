import { Request, Response, NextFunction } from "express";
import Platform from "../models/Platform";
import HttpError from "../models/httpError";

export const checkOrInitiateSignIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { platform, userId } = req.body;
  console.log(platform, userId);

  if (!platform || !userId) {
    console.log("Platform, UserId not found");
    return res.status(400).json({ error: "Platform and userId are required" });
  }

  try {
    const platformData = await Platform.findOne({ platform, userId });

    if (platformData) {
      console.log(platformData);

      return res.status(200).json({
        data: platformData,
        message: "Platform data found",
      });
    } else {
      return res.status(200).json({
        data: { function: "signIn", args: [platform] },
        message: "Platform data not found, need to initiate sign-in",
      });
    }
  } catch (error) {
    console.error("Error checking platform data:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

export const createPlatform = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      platform,
      userId,
      accessToken,
      refreshToken,
      scope,
      expiresAt,
      channelData,
      linkedEmail,
      emailVerified,
    } = req.body;

    if (!platform || !userId || !accessToken || !refreshToken) {
      const error = new HttpError("Please send all data", 500);
      console.log(error);
      return next(error);
    }

    try {
      const existingPlatform = await Platform.findOne({ linkedEmail });
      if (existingPlatform) {
        return res.status(200).json({
          data: existingPlatform,
          message: "Account Already Linked!",
        });
      }
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }

    const newPlatform = new Platform({
      platform,
      userId,
      accessToken,
      refreshToken,
      channelData,
      scope,
      expiresAt,
      linkedEmail,
      emailVerified,
    });

    // Save platform credentials
    await newPlatform.save();

    res
      .status(201)
      .json({ data: newPlatform, message: "Platform Added Successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const getPlatformList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = "668da076d3522ae79f5b31bb";

  try {
    // This query will not execute immediately
    const query = Platform.find({ userId });

    // You can chain additional methods to the query
    // query.sort({ createdAt: -1 }).limit(10);

    // To execute the query, you can use await (which implicitly calls exec())
    const platforms = await query;

    if (!platforms) {
      return res
        .status(404)
        .json({ message: "No platforms found for the user", data: platforms });
    }

    res.status(200).json({ message: "Platforms Found", data: platforms });
  } catch (error) {
    console.error("Error fetching user platforms:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export const getPlatformDetail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { platformId } = req.params;

  try {
    const platformData = await Platform.findById(platformId);

    if (!platformData) {
      return res.status(404).json({
        message: "No Platform Found with this id",
        data: platformData,
      });
    }

    return res.status(200).json({
      message: "Platform Data fetched successfully",
      data: platformData,
    });
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};
