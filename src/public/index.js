const socket = io();

socket.emit("saludo", "estamos conectados");

socket.on("newUser", (data) => {
  
});
