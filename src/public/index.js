const socket = io();

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
