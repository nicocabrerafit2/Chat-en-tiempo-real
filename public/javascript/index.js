const title = document.querySelector("#title-welcome");
const chatBox = document.querySelector("#send");
const socket = io();
let user = "";

Swal.fire({
  title: "Ingresa tu nombre de usuario",
  input: "text",
  allowOutsideClick: false,
  inputValidator: (value) => {
    if (!value) {
      return "Se debe identificar primero";
    }
    
    return new Promise((resolve) => {
      socket.emit("checkUsername", value, (response) => {
        if (!response.available) {
          resolve(response.error);
        } else {
          resolve(null);
        }
      });
    });
  },
}).then((result) => {
  user = result.value;
  title.innerText = "Bienvenido al chat: " + user;
  socket.emit("nuevoUsuario", { user });
  chatBox.focus();
});

chatBox.addEventListener("keyup", (event) => {
  if (event.key === "Enter" && chatBox.value.trim()) {
    const mensaje = chatBox.value;
    chatBox.value = "";
    
    socket.emit("mensaje", { user, mensaje }, (response) => {
      if (response && response.error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: response.error,
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });
      }
    });
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
});

// Maneja la desconexión del usuario intencionada cerrando la pestaña
window.addEventListener('beforeunload', () => {
  if (user) {
    socket.emit('userDisconnected', { user });
  }
});

// Maneja la desconexión del usuario cuando el socket se desconecta por error (sin internet, etc)
socket.on('disconnect', () => {
  if (user) {
    socket.emit('userDisconnected', { user });
  }
});

socket.on("warningMessage", (data) => {
  Swal.fire({
    icon: 'warning',
    title: 'Advertencia',
    text: data.message,
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });
});

socket.on("errorMessage", (data) => {
  Swal.fire({
    icon: 'error',
    title: 'Error',
    text: data.message,
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });
});
