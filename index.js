import { routes } from "./routes.js";
import express from "express";
import cors from "cors";
var app = express();
app.use(express.json());
app.use(routes);
app.use(cors());

app.listen(4000, () => {
  console.log("server is running");
});
