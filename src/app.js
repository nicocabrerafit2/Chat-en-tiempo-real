import express from "express";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import { Server } from "socket.io";
import { controllerMain } from "./controller/controllerMain.js";
import { controllerChat } from "./controller/controllerChat.js";
import mainRoutes from "./routes/mainRoutes.js"
const pathUsers = __dirname+"/data/users.json"
const pathChat = __dirname+"/data/chat.json"
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
const controllerMainNew = new controllerMain(pathUsers)
const controllerChatNew = new controllerChat(pathChat)
const serverSocket = new Server(serverExpress);

serverSocket.on("connection", async (socket) => {

  const users = await controllerMainNew.getUsers()
  socket.emit("newUser",users)


  socket.on("newUser",async (newUser)=>{
  await controllerMainNew.addUser({name:newUser})
  socket.emit("newUser",users)
  })

  
  socket.on("message",async (data)=>{
await controllerChatNew.addChat(data)
const chatActualized = await controllerChatNew.getChat()
console.log(chatActualized);
socket.emit("chatActualized",chatActualized)

  })
});
