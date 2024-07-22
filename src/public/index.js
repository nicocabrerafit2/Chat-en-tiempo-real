const socket = io();
const chatBox = document.querySelector('#chatBox');
let user = ""





Swal.fire({
    title:'Ingrese su nombre',
    input: 'text',
    allowOutsideClick: false,
    inputValidator: (value) => {
        return !value && 'Necesitas ingresar tu nombre'
    }
}).then((result)=>{
    const newUser = result.value
    socket.emit('newUser', newUser );
})

chatBox.addEventListener('keyup',(event) => {
    if(event.key === 'Enter'){
        socket.emit('message',{  user, message:event.target.value  })
        chatBox.value = ''
    }
})

socket.on("chatActualized",(data)=>{
const chatConteiner = document.querySelector("#chat")
chatConteiner.innerHTML=""
data.forEach(chat => {
    const div = document.createElement('div');
    const nombre = document.createElement('p');
    const mensaje = document.createElement('p');
    nombre.innerText = chat.user === user ? 'Yo: ' : chat.user + ': ';
    mensaje.innerText = chat.mensaje;
    div.appendChild(nombre);
    div.appendChild(mensaje);
    chatConteiner.appendChild(div);
});
})

socket.on("newUser", (users) => {
    const usersCount = document.querySelector("#usersCount")
    usersCount.innerHTML = users.length + " Usuarios"
    const userList = document.querySelector("#userList")
    userList.innerHTML = "";
    users.forEach(user => {
        const li = document.createElement("li");
        li.innerHTML = user.name;
        userList.appendChild(li);
    });
    });