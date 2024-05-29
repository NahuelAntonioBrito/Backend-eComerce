import mongoose from "mongoose";

const productsCollection = "products";

const productSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnails: { type: [String], required: true },
  status: { type: Boolean, required: true },
  code: { type: String, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
});

const productModel = mongoose.model(productsCollection, productSchema);
export default productModel;
