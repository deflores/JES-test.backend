import { config } from "./dbConfig.js";
import tedious from "tedious";
var connection = new tedious.Connection(config);
connection.on("error", function (err) {
  if (err) {
    console.log(err);
    connection.reset(function (err) {
      console.log("error on reset", err);
    });
  }
  console.log("connected");
});
export { connection };
