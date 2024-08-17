const title = document.querySelector("#title-welcome");
const chatBox = document.querySelector("#send");
const socket = io();
let user = "";

Swal.fire({
  title: "Ingresa tu nombre de usuario",
  input: "text",
  allowOutsideClick: false,
  inputValidator: (value) => {

    return !value && "Se debe identificar primero";
  },
}).then((result) => {
  user = result.value;
  title.innerText = "Bienvenido al chat " + user;
  socket.emit("nuevoUsuario", { user });

});

chatBox.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    socket.emit("mensaje", { user, mensaje: event.target.value });
    chatBox.value = "";
  }
});

socket.on("conversacion", (data) => {
  const contenedorChat = document.querySelector("#contenedor-chat");
  contenedorChat.innerHTML = "";
  data.forEach((chat) => {
    const div = document.createElement("div");
    const nombre = document.createElement("b");
    const mensaje = document.createElement("span");
    nombre.innerText = chat.user === user ? "Yo: " : chat.user + ": ";
    mensaje.innerText = chat.mensaje;
    div.appendChild(nombre);
    div.appendChild(mensaje);
    contenedorChat.appendChild(div);
  });
});

socket.on("conectados", (listaUsuarios) => {
  const conectadosContainer = document.querySelector("#conectados");
  conectadosContainer.innerHTML = "";
  listaUsuarios.forEach((usuario) => {
    const li = document.createElement("li");
    li.innerText = usuario.user === user ? user + " - (Yo)" : usuario.user;
    conectadosContainer.appendChild(li);
  });
  const count = document.querySelector("#conectados__titulo");
  count.innerHTML = "Usuarios: "+listaUsuarios.length;

});

 window.addEventListener('beforeunload',() => {
     socket.emit('disconect', user)
} )
