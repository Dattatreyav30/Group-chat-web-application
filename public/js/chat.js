
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

const groupName = document.getElementById('groupName');

window.addEventListener('DOMContentLoaded', async (e) => {
  groupName.innerHTML = localStorage.getItem('groupName');
  const token = localStorage.getItem('token');
  const groupId = localStorage.getItem('groupId');


  let messageFromStorage = JSON.parse(localStorage.getItem(`messages-${groupId}`)) || [];


  if (messageFromStorage.length === 0) {
    const response = await axios.get(`http://localhost:7000/message/getAllMessages`, { headers: { 'authorization': token, 'groupId': groupId } });
    messageFromStorage = response.data.messages.map(obj => ({ name: obj.name, message: obj.messages, createdAt: obj.createdAt }));
    localStorage.setItem(`messages-${groupId}`, JSON.stringify(messageFromStorage));
  }

  setInterval(async () => {
    const lastMessageDate = messageFromStorage.length > 0 ? messageFromStorage[messageFromStorage.length - 1].createdAt : null;
    const response = await axios.get(`http://localhost:7000/message/getAllMessages?lastMessageDate=${lastMessageDate}`, { headers: { 'authorization': token, 'groupId': groupId } });
    const newMessages = response.data.messages;


    if (newMessages.length > 0) {
      for (const obj of newMessages) {
        const message = { name: obj.name, message: obj.messages, createdAt: obj.createdAt };
        messageFromStorage.push(message);
        localStorage.setItem(`messages-${groupId}`, JSON.stringify(messageFromStorage));
        await addtoFrontEnd(message.name, message.message);
      }
    }
  }, 1000);

  messageFromStorage.slice(-10).forEach(async (obj) => {
    await addtoFrontEnd(obj.name, obj.message);
  });
});


const addtoFrontEnd = async (name, message) => {
  const messageContainer = document.getElementById('userMessage');
  const messageHtml = `
      <p><b>${name}: </b>${message}</p>
    `;
  messageContainer.insertAdjacentHTML('beforeend', messageHtml);
};

const showusers = document.getElementById('showusers');

showusers.onclick = async (e) => {
  e.preventDefault()
  const groupId = localStorage.getItem('groupId');
  const response = await axios.get('http://localhost:7000/group/getGroupUsers', {
    headers: { groupId: groupId }
  })
  response.data.forEach(async (names) => {
    await groupUsers(names);
  })
}

const groupUsers = async (data) => {
  const groupUsers = document.getElementById('groupUsers');
  const tr = document.createElement('tr');
  const nameTd = document.createElement('td');
  const buttonTd = document.createElement('td');
  const adminButton = document.createElement('button');
  const removeButton = document.createElement('button');

  nameTd.innerHTML = data;
  adminButton.innerHTML = 'Make admin';
  adminButton.className = 'btn btn-primary ms-2';
  removeButton.innerHTML = 'Remove';
  removeButton.className = 'btn btn-danger ms-2';
  removeButton.onclick = (e) => {
    deleteUserfromGroup(e, data);
  }

  adminButton.onclick = (e) => {
    makeAdmin(e, data)
  }

  buttonTd.appendChild(adminButton);
  buttonTd.appendChild(removeButton);

  tr.appendChild(nameTd);
  tr.appendChild(buttonTd);

  groupUsers.appendChild(tr);
}


const deleteUserfromGroup = async (e, data) => {
  try {
    e.preventDefault();
    const token = localStorage.getItem('token')
    const groupId = localStorage.getItem('groupId')
    const obj = {
      name: data
    }
    const response = await axios.post('http://localhost:7000/group/removeUser', obj, {
      headers: {
        'groupId': groupId,
        'authorization': token,
      }
    })
    alert(response.data.message)
    console.log(response.data.message)
  } catch (err) {
    alert(err.response.data.message)
    console.log(err)
  }
}

const makeAdmin = async (e, data) => {
  try {
    const token = localStorage.getItem('token')
    e.preventDefault();
    const obj = {
      name: data
    }
    const response = await axios.post('http://localhost:7000/group/makeAdmin', obj, { headers: { 'authorization': token } });
    alert(response.data.message)
  } catch (err) {
    alert(err.response.data.message);
    console.log(err)
  }

}

const logout = document.getElementById('logout');
logout.onclick = (e) => {
  e.preventDefault();
  window.location.href = 'http://127.0.0.1:5500/public/Views/signup.html'
}