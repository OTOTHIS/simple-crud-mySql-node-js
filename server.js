import express from "express";
import morgan from "morgan";
import { configDotenv } from "dotenv";
import cors from "cors";
import UserRouter from "./routes/user.route.js";
const app = express();

configDotenv();

app.use(cors("*"));
app.use(express.json());
if (process.env.ENV === "dev") {
  app.use(morgan("dev"));
}

app.use("/user", UserRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
