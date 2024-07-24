import { IUser } from "../models/user.model";

declare module "express-session" {
  interface SessionData {
    user: { userName: string; role: string };
  }
}
