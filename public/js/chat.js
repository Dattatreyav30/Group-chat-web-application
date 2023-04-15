const name = localStorage.getItem('name');
const nameNode = document.createTextNode(`${name} joined`)
const user = document.getElementById('h4');
user.appendChild(nameNode)