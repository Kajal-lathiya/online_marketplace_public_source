import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import usersRouter from "./apis/users/index.js";
import adminsRouter from "./apis/admin/index.js";

import {
  badRequestHandler,
  forbiddenHandler,
  genericErrorHAndler,
  unauthorizedHandler,
  notFoundHandler,
} from "./errorHandlers.js";
import listEndpoints from "express-list-endpoints";
import booksRouter from "./apis/users/booksRoutes.js";
import cartRouter from "./apis/users/cartRouter.js";

const server = express();

const port = process.env.PORT || 3001;

//MIDDLEWARES

server.use(cors());
server.use(express.json());

//ENDPOINTS

server.use("/users", usersRouter);
server.use("/admin", adminsRouter);
server.use("/books", booksRouter);
server.use("/cart", cartRouter);


//ERROR HANDLERS
server.use(badRequestHandler);
server.use(unauthorizedHandler);
server.use(forbiddenHandler);
server.use(notFoundHandler);  
server.use(genericErrorHAndler);

mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGO_URL);

mongoose.connection.on("connected", () => {
  console.log("Connected to Mongo!");
  server.listen(port, () => {
    console.table(listEndpoints(server));
    console.log(`Server is running on port: ${port}`);
  });
});
