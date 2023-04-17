
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
    const mappedData = await response.data.messages.map((data) => {
        return {
            name: data.name,
            messages: data.messages
        };
    });

    mappedData.forEach(async (obj) => {
        //await showWhojoined(obj.name)
        await addtoFrontEnd(obj.name, obj.messages)
    })
})

const showWhojoined = async (name) => {
    const whojoined = document.getElementById('whojoined');
    //console.log(whojoined)
}



const addtoFrontEnd = async (name, messages) => {
    const messageContainer = document.getElementById('userMessage');
    const messageNode = document.createElement('p');
    const nameNode = document.createElement('b');
    const nameText = document.createTextNode(name + ":  " + " ");
    const messageText = document.createTextNode(messages);
    nameNode.appendChild(nameText);
    messageNode.appendChild(nameNode);
    messageNode.appendChild(messageText);
    messageContainer.appendChild(messageNode);
}
