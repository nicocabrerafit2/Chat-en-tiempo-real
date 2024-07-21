const socket = io();

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
