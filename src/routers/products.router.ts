import { Request, Response, Router } from "express";
import productModel from "../models/product.model";
const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const products = await productModel.find().exec();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error fetching products" });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const prodId = req.params.id;
    const product = await productModel.findById(prodId).lean().exec();
    res.json({ product });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/category/:categoryId", async (req: Request, res: Response) => {
  try {
    const category = req.params.categoryId;
    const products = await productModel.find({ category }).lean().exec();
    res.json({ products });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/title/:title", async (req: Request, res: Response) => {
  try {
    const title = req.params.title;
    const product = await productModel.findOne({ title }).lean().exec();
    res.json({ product });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const newProduct = new productModel(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json({
      message: "Product created successfully",
      product: savedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const prodId = req.params.id;
    const updateData = req.body;
    const updatedProduct = await productModel.findByIdAndUpdate(
      prodId,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const prodId = req.params.id;
    const deletedProduct = await productModel.findByIdAndDelete(prodId);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

export default router;
