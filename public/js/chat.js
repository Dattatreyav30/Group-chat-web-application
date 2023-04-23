
const form = document.querySelector('form');
form.addEventListener('submit', async (e) => {
  try {
    const groupId = localStorage.getItem('groupId')
    e.preventDefault();
    const obj = {
      message: document.getElementById('message').value
    }
    const token = localStorage.getItem('token');
    const response = await axios.post('http://localhost:7000/message/addMessage', obj, { headers: { 'authorization': token, groupId: groupId } });
    form.reset();
  } catch (err) {

  }
})

window.addEventListener('DOMContentLoaded', async (e) => {
  const token = localStorage.getItem('token');
  const groupId = localStorage.getItem('groupId')
  e.preventDefault();

  let messageFromStorage = [];
  const messages = localStorage.getItem(`messages-${groupId}`);
  if (messages) {
    messageFromStorage = JSON.parse(messages);
    messageFromStorage.slice(-10).forEach(async (obj) => {
      await addtoFrontEnd(obj.name, obj.message);
    });
  } else {
    const response = await axios.get(`http://localhost:7000/message/getAllMessages`, { headers: { 'authorization': token, 'groupId': groupId } });
    const newMessages = response.data.messages;
    newMessages.forEach(async (obj) => {
      messageFromStorage.push({ name: obj.name, message: obj.messages, createdAt: obj.createdAt });
      localStorage.setItem(`messages-${groupId}`, JSON.stringify(messageFromStorage));
    });
  }
  setInterval(async () => {
    let lastMessageDate = null;
    if (messageFromStorage.length > 0) {
      lastMessageDate = messageFromStorage[messageFromStorage.length - 1].createdAt;
      const response = await axios.get(`http://localhost:7000/message/getAllMessages?lastMessageDate=${lastMessageDate}`, { headers: { 'authorization': token, 'groupId': groupId } });
      const newMessages = response.data.messages;
      newMessages.forEach(async (obj) => {
        if (messageFromStorage.length >= 10) {
          messageFromStorage = messageFromStorage.slice(-10);
          localStorage.setItem(`messages-${groupId}`, JSON.stringify(messageFromStorage));
        }
        messageFromStorage.push({ name: obj.name, message: obj.messages, createdAt: obj.createdAt });
        localStorage.setItem(`messages-${groupId}`, JSON.stringify(messageFromStorage));
        await addtoFrontEnd(obj.name, obj.messages);
      });
    }
  }, 1000);
});

const addtoFrontEnd = async (name, message) => {
  const messageContainer = document.getElementById('userMessage');
  const messageHtml = `
      <p><b>${name}: </b>${message}</p>
    `;
  messageContainer.insertAdjacentHTML('beforeend', messageHtml);
};

