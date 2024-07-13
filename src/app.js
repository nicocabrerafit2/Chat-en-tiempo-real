import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
const app = express();
const PUERTO = 8080;

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));

app.listen(PUERTO, () => {
  console.log("Servidor corriendo en: http://localhost:" + PUERTO);
});

app.get("/", (req, res) => {
  res.send("Hola mundo");
});
