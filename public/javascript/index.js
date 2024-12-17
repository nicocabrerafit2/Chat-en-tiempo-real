const title = document.querySelector("#title-welcome");
const chatBox = document.querySelector("#send");
const sendButton = document.querySelector("#send-button");
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

// Función para enviar mensaje
function sendMessage() {
  const message = chatBox.value.trim();
  if (message && user) {
    socket.emit("mensaje", { user, mensaje: message });
    chatBox.value = "";
  }
}

// Evento para tecla Enter
chatBox.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    sendMessage();
  }
});

// Evento para botón de enviar
sendButton.addEventListener("click", () => {
  sendMessage();
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

// Maneja la desconexión del usuario
function handleDisconnection() {
  if (user) {
    socket.emit('userDisconnected', { user });
  }
}

// Para navegadores de escritorio
window.addEventListener('beforeunload', handleDisconnection);

// Para dispositivos móviles
window.addEventListener('pagehide', handleDisconnection);

// Cuando el socket se desconecta
socket.on('disconnect', handleDisconnection);

// Cuando la app vuelve a estar activa
window.addEventListener('pageshow', (event) => {
  if (user) {
    // Si es una restauración desde caché, reconectar
    if (event.persisted) {
      socket.connect();
    }
    socket.emit('nuevoUsuario', { user });
  }
});

// Cuando el socket se reconecta
socket.on('connect', () => {
  if (user) {
    socket.emit('nuevoUsuario', { user });
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
