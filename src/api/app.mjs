import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.route.mjs";
import { HttpError } from "./helpers/Error.mjs";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: "https://localhost:3000" }));

// Routes
app.use("/", authRouter);

app.use((err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.code).json({
      message: err.message,
      code: err.status,
    });
  } else {
    res.status(500).json({
      message: err.message,
      code: 500,
    });
  }
});

export default app;
