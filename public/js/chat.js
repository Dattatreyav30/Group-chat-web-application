const name = localStorage.getItem('name');
const nameNode = document.createTextNode(`${name} joined`)
const user = document.getElementById('h4');
user.appendChild(nameNode);


const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
    try {
        e.preventDefault();
        const obj = {
            message: document.getElementById('message').value
        }
        console.log(obj)
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:7000/message/addMessage', obj, { headers: { 'authorization': token } });
        form.reset();
    } catch (err) {

    }
})