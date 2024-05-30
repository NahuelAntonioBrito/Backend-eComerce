import { Request, Response, Router } from "express";
import productModel from "../models/product.model";
const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const products = await productModel.find().lean().exec();
    res.json({ products });
  } catch (error) {
    res.status(500).json({ error });
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

export default router;
