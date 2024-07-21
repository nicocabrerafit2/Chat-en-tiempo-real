import express from "express";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import { Server } from "socket.io";
import { controller } from "./controller/controllerMain.js";
import mainRoutes from "./routes/mainRoutes.js"
const path = __dirname+"/data/users.json"
const app = express();
const PORT = 8080;

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));
app.use("/",mainRoutes)

const serverExpress = app.listen(PORT, () => {
  console.log("Server on http://localhost:" + PORT);
});
const controllerMain = new controller(path)
const serverSocket = new Server(serverExpress);

serverSocket.on("connection", async (socket) => {
  console.log("Nuevo dispositivo conectado");
  const users = await controllerMain.getUsers()
  socket.emit("newUser",users)
});
