import express from "express";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import { Server } from "socket.io";
import { router } from "./routes/viewsRouters.js";

const app = express();
const PORT = 8080;

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));
app.use("/", router);

const serverExpress = app.listen(PORT, () => {
  console.log("Server on http://localhost:" + PORT);
});

const serverSocket = new Server(serverExpress);
const conversacion = [];
const usuarios = [];

serverSocket.on("connection", (socket) => {
  socket.on("mensaje", (data) => {
    conversacion.unshift(data);
    serverSocket.emit("conversacion", conversacion);
  });

  socket.on("nuevoUsuario", (nuevoUsuario) => {
    usuarios.push(nuevoUsuario);
    socket.emit("conversacion", conversacion);
    serverSocket.emit("conectados", usuarios);
  });

  socket.on("disconect", (userToDelete) => {
    const index = usuarios.findIndex((eachUser) => eachUser.user === userToDelete);
    usuarios.splice(index, 1)    
    serverSocket.emit("conectados", usuarios);
  
    
  });
});
