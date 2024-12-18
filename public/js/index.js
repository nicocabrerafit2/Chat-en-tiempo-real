const title = document.querySelector("#title-welcome");
const chatBox = document.querySelector("#send");
const sendButton = document.querySelector("#send-button");
const socket = io();
let user = "";

Swal.fire({
  title: "Ingresa tu nombre de usuario",
  input: "text",
  allowOutsideClick: false,
  inputAttributes: {
    maxlength: 20  // Límite de caracteres para username
  },
  didOpen: () => {
    // Obtener el input del SweetAlert
    const input = Swal.getInput();
    
    // Agregar evento para mostrar advertencia
    input.addEventListener('input', function() {
      if (this.value.length >= 20) {
        Swal.showValidationMessage('Has alcanzado el límite de caracteres');
      } else {
        Swal.resetValidationMessage();
      }
    });
  },
  inputValidator: (value) => {
    if (!value) {
      return "Se debe identificar primero";
    }
    
    if (value.length >= 20) {
      return "El nombre no puede tener más de 20 caracteres";
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
  chatBox.value = "";
  chatBox.focus();
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
    socket.disconnect();
    user = ""; // Limpiamos el usuario
  }
}

// Eventos de desconexión
window.addEventListener('beforeunload', handleDisconnection);
window.addEventListener('pagehide', handleDisconnection);
window.addEventListener('unload', handleDisconnection);

// Cuando el socket se desconecta
socket.on('disconnect', () => {
  if (user) {
    handleDisconnection();
  }
});

// Cuando la app vuelve a estar activa
window.addEventListener('pageshow', (event) => {
  if (!socket.connected && user) {
    socket.connect();
    setTimeout(() => {
      socket.emit('nuevoUsuario', { user });
    }, 500);
  }
});

// Cuando el socket se reconecta
socket.on('connect', () => {
  if (user) {
    socket.emit('nuevoUsuario', { user });
  }
});

// Ping periódico para mantener la conexión activa
setInterval(() => {
  if (socket.connected && user) {
    socket.emit('ping');
  }
}, 5000);

socket.on('pong', () => {
  // Conexión sigue activa
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
  
  if (!data.keepText) {
    chatBox.value = "";
  }
  chatBox.focus();
});

chatBox.addEventListener('input', function() {
  if (this.value.length >= 500) {
    Swal.fire({
      icon: 'warning',
      title: 'Límite alcanzado',
      text: 'Has alcanzado el límite de 500 caracteres',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1000
    });
  }
});
