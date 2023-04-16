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


window.addEventListener('DOMContentLoaded', async (e) => {
    const token = localStorage.getItem('token');
    e.preventDefault();
    const response = await axios.get('http://localhost:7000/message/getAllMessages', { headers: { 'authorization': token } });
    console.log(response.data)
    response.data.messages.forEach(async (data) => {
        await addtoFrontEnd(data.messages)
    })
})

const addtoFrontEnd = async (data) => {
    const messageContainer = document.getElementById('userMessage');
    const messageNode = document.createElement('p');
    const messageText = document.createTextNode(data);
    messageNode.appendChild(messageText);
    messageContainer.appendChild(messageNode);
}