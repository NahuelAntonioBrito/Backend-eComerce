import { IUser } from "../models/user.model";

export interface SessionUser {
  userName: string;
  role: string;
  email: string;
  age: number;
  _id: Types.ObjectId; // Cambia a Types.ObjectId
}

declare module "express-session" {
  interface SessionData {
    user: SessionUser; // Asegúrate de que el tipo sea `SessionUser` con todas las propiedades
  }
}
