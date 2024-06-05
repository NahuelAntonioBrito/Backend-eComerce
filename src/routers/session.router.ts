import { Request, Response, Router } from "express";
import { auth } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const user = {
      userName: "Nahuel Brito",
      role: "admin",
    };
    req.session.user = user;
    res.status(201).json({
      message: "User created successfully",
      user: user,
    });
  } catch (error) {
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
