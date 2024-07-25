import mongoose, { Schema, Document, Model } from "mongoose";
import argon2 from "argon2";

interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  password: string;
  cart: mongoose.Types.ObjectId;
  role: string;
}

const userSchema: Schema<IUser> = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  password: { type: String, required: true },
  cart: { type: mongoose.Schema.Types.ObjectId, ref: "carts" },
  role: { type: String, enum: ["user", "admin", "premium"], default: "user" },
});

// Middleware para encriptar la contraseña antes de guardar
userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    this.password = await argon2.hash(this.password);
    next();
  } catch (err) {
    next(err as mongoose.CallbackError);
  }
});

mongoose.set("strictQuery", false);
const userModel: Model<IUser> = mongoose.model<IUser>("User", userSchema);
export { IUser };
export default userModel;
