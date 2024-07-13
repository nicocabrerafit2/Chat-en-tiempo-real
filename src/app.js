import express from "express";
const app = express();
const PUERTO = 8080;
app.listen(PUERTO, () => {
  console.log("Servidor corriendo en: http://localhost:" + PUERTO);
});
app.get("/", (req, res) => {
  res.send("Hola mundo");
});
