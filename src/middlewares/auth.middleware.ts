import { Request, Response, NextFunction } from "express";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.user?.role === "admin") {
    next();
  } else {
    res.status(403).json({
      message: "Not allowed",
    });
  }
};
