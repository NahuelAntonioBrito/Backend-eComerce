import { Request, Response, Router } from "express";
import userModel from "../models/user.model";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await userModel.find();
    res.status(200).json({
      users: users,
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/userProfile/:userId", async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const user = await userModel.findById(userId);
    res.status(200).json({
      user: user,
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/current", (req: Request, res: Response) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  res.status(200).json({ user: req.session.user });
});

export default router;
