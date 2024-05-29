import express, { Request, Response } from "express";
import mongoose from "mongoose";
import productRouter from "./routers/products.router";

const app = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

app.use("/products", productRouter);
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
