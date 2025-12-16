import { config } from "dotenv";
import express from "express";
import { createServer } from "http";
import { commentRouter, homeRouter } from "./routes/index.js";
config();

const app = express();

//#region middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
//#endregion

//#region routes
app.use("/", homeRouter);
app.use("/comments", commentRouter);
//#endregion

const server = createServer(app);

const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`server is now running on: http://localhost:${port}`);
});
