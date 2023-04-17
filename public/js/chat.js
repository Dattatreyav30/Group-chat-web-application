
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
    setInterval(async () => {
        const response = await axios.get('http://localhost:7000/message/getAllMessages', { headers: { 'authorization': token } });
        const mappedData = await response.data.messages.map((data) => {
            return {
                name: data.name,
                messages: data.messages
            };
        });
        const messageContainer = document.getElementById('userMessage');
        messageContainer.innerHTML = ''
        mappedData.forEach(async (obj) => {
            await addtoFrontEnd(obj.name, obj.messages)
        })
    }, 1000)

})

const addtoFrontEnd = async (name, message) => {
    const messageContainer = document.getElementById('userMessage');
    const messageHtml = `
      <p><b>${name}: </b>${message}</p>
    `;
    messageContainer.insertAdjacentHTML('beforeend', messageHtml);
}
