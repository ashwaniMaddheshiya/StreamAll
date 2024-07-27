// controllers/UserController.ts
import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import HttpError from "../models/httpError";
import jwt from "jsonwebtoken";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      const error = new HttpError("Please fill out all the details", 500);
      return next(error);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new HttpError("User already exist", 500);
      return next(error);
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      email,
      password: hashedPassword,
      name,
    });

    res
      .status(201)
      .json({ message: "User created successfully", data: newUser });
  } catch (error) {
    return next(error);
  }
};

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new HttpError("Email and password are required", 500);
      return next(error);
    }

    const user = await User.findOne({ email }).select("-password");
    if (!user) {
      const error = new HttpError("Invalid email", 500);
      return next(error);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const error = new HttpError("Incorrect password", 500);
      return next(error);
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    res
      .status(200)
      .json({ message: "User signed in successfully", token, data:user });
  } catch (error) {
    next(error);
  }
};
