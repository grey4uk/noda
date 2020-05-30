const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const express = require("express");
const userRouter = require("./user.router");
const cors = require("cors");

const PORT = process.env.PORT || 3000;
const ALLOWED_ORIGIN = "http://localhost:3010";

const server = express();
server.use(cors({ origin: ALLOWED_ORIGIN }));
server.use(express.json());
server.use("/users", userRouter);

server.use((err, req, res, next) => {
  return res.status(err.status).send(err.message);
});

server.listen(PORT, () => {
  console.log("Server started listening on port", PORT);
});
