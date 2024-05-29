import express, { Request, Response, Router } from "express";
import { products } from "../data/products";
const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json(products);
});

export default router;
