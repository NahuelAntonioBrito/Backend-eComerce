import cors from "cors";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import productRouter from "./routers/products.router";

const app = express();
const port = 3000;

app.use(cors()); // Habilitar CORS para todas las rutas
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

app.use("/products", productRouter);

async function startServer() {
  try {
    await mongoose.connect(
      "mongodb+srv://britonahuelantonio:code123@cluster0.a1kecug.mongodb.net/",
      {
        dbName: "e-comerce",
      }
    );
    console.log("Connected to MongoDB");

    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error(err);
  }
}

startServer();
