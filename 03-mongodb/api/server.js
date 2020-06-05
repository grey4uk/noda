import express from "express";
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.join(__dirname, "../.env") });
import mongoose from "mongoose";
import usersRouter from "./users/user.router";

const PORT = Number(process.env.PORT) || 3010;

export class Server {
  constructor() {
    this.app = null;
  }

  async start() {
    this.initServer();
    this.initMiddleware();
    await this.initDatabase();
    this.initRoutes();
    this.initErrorHandling();
    this.startListening();
  }

  initServer() {
    this.app = express();
  }

  initMiddleware() {
    this.app.use(express.json());
  }

  initRoutes() {
    this.app.use("/api", usersRouter);
  }

  async initDatabase() {
    mongoose.set("useCreateIndex", true);
    await mongoose.connect(process.env.MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
  }

  initErrorHandling() {
    this.app.use((err, req, res, next) => {
      if (err) {
        return res.status(err.status || 500).send(err.message);
      }
    });
  }

  startListening() {
    this.app.listen(PORT, () => {
      console.log("Server started listening on port", PORT);
    });
  }
}
