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
  console.log("Server on http://localhost:" + PORT);
});
const users = await controller.getUsers()
const serverSocket = new Server(serverExpress);
serverSocket.on("connection", (socket) => {
  console.log("Nuevo dispositivo conectado");
  socket.emit("newUser",users)
});
