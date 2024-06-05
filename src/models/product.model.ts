import mongoose, { Schema, Document } from "mongoose";

interface IProduct extends Document {
  title: string;
  description: string;
  price: number;
  thumbnails: string[];
  status: boolean;
  code: string;
  stock: number;
  category: string;
}

const ProductSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnails: { type: [String], required: true },
    status: { type: Boolean, required: true },
    code: { type: String, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
