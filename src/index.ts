import cors from "cors";
import express, { Request, Response } from "express";
import session from "express-session";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import productRouter from "./routers/products.router";
import sessionRouter from "./routers/session.router";
import userRouter from "./routers/users.router";

const app = express();
const port = 3000;

// Configuración de middlewares
app.use(
  cors({
    origin: "http://localhost:5173", // Origen de tu frontend
    credentials: true, // Permitir el uso de credenciales
  })
);
app.use(express.json());

// Configuración de sesión con MongoDB
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://britonahuelantonio:code123@cluster0.a1kecug.mongodb.net/",
      dbName: "e-comerce",
      collectionName: "sessions", // Especificar el nombre de la colección para las sesiones
    }),
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Asegúrate de cambiar a `true` en producción si usas HTTPS
  })
);

// Rutas
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

app.use("/products", productRouter);
app.use("/sessions", sessionRouter);
app.use("/users", userRouter);

// Función para iniciar el servidor
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
