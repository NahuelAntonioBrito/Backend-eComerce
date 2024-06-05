import session from "express-session";

declare module "express-session" {
  interface SessionData {
    user?: {
      userName: string;
      role: string;
    };
  }
}
