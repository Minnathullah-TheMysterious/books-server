import express, { Request, Response } from "express";
import dotenv from "dotenv";
import dbConnect from "./db/mongo";
import bookRoute from "./routes/bookRoute";
import cors from "cors";
import path from "path";

const app: express.Application = express();
dotenv.config();

const port = process.env.PORT;

//Connect to database
dbConnect();

app.use(cors());
app.use(express.json());
app.use(express.static("build"));

//Routes
app.use("/api/v1/book", bookRoute);

const rootDir = path.join(__dirname, '..')

// serve static files
app.use("*", function (req: Request, res: Response) {
  res.sendFile(path.join(rootDir, "build/index.html"));
});

app.listen(port, () => {
  console.log("App listening on port " + port);
});
