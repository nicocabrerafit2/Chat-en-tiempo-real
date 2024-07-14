const socket = io();

socket.emit("saludo", "estamos conectados");

socket.on("respuesta", (data) => {
  console.log("Mensaje del servidor:" + data);
});
