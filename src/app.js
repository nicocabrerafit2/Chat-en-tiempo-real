import express from "express";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import { Server } from "socket.io";
const app = express();
const PORT = 8080;

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));

const serverExpress = app.listen(PORT, () => {
  console.log("Servidor corriendo en: http://localhost:" + PORT);
});

const serverSocket = new Server(serverExpress);
serverSocket.on("connection", (socket) => {
  console.log("Nuevo dispositivo conectado");
  socket.on("saludo", (data) => {
    if (data) {
      console.log("Mensaje del cliente:" + data);
      socket.emit("respuesta", "ok si estamos conectados");
    }
  });
});
app.get("/", (req, res) => {
  res.render("saludo");
});
