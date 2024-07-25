// src/routers/session.router.ts
import { Request, Response, Router } from "express";
import userModel, { IUser } from "../models/user.model";
import Joi from "joi";
import { auth } from "../middlewares/auth.middleware";
import { createHash, isValidPassword } from "../utils";
import { SessionUser } from "../types/session";

const router = Router();

const userSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  age: Joi.number().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("user", "admin", "premium").default("user"),
});

router.post("/register", async (req: Request, res: Response) => {
  try {
    const { error, value } = userSchema.validate(req.body);
    if (error) {
      console.error("Validation error:", error.details);
      return res.status(400).json({ message: error.details[0].message });
    }

    const newUser = value;

    const existingUser = await userModel.findOne({ email: newUser.email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const user = new userModel(newUser);
    await user.save();

    res.status(201).json({
      message: "User created successfully",
      user: {
        userName: user.firstName + " " + user.lastName,
        role: user.role,
        email: user.email,
        age: user.age,
      },
    });
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ error: "Error registering user" });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user: IUser | null = await userModel.findOne({ email }).exec();
    if (!user) {
      return res.status(401).json({ message: "Error on email or password" });
    }

    const hashedPassword = user.password;
    const isMatch = await isValidPassword(hashedPassword, password);
    if (!isMatch) {
      return res.status(401).json({ message: "Error on email or password" });
    }

    const sessionUser: SessionUser = {
      userName: user.firstName + " " + user.lastName,
      role: user.role,
      email: user.email,
      age: user.age,
      _id: user._id, // Convertir a string
    };

    req.session.user = sessionUser;

    res.status(200).json({
      message: "Login successfully",
      user: sessionUser,
    });
  } catch (error) {
    console.error("Error fetching session:", error);
    res.status(500).json({ error: "Error fetching session" });
  }
});

router.get("/private", auth, async (req: Request, res: Response) => {
  res.status(201).json({
    message: "private route",
  });
});

router.get("/logout", async (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(400).json({
        message: "error logout",
      });
    }
    return res.status(201).json({
      message: "Logout successfully",
    });
  });
});

export default router;
