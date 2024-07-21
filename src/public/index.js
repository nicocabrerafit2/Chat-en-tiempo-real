const socket = io();
const chatBox = document.querySelector('#chatBox');






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
        const message = event.target.value 
        socket.emit('message',{  message })
        chatBox.value = ''
    }
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
socket.on("chatActualized",(chatActualized)=>{
const chat = document.querySelector("#chat")
chatActualized.forEach(message => {
    const li = document.createElement("li");
    li.innerHTML = message.message;
    chat.appendChild(li);
});
})