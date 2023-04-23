// create group button

const createGroupBtn = document.getElementById('createGroup');
const createGroup1 = document.getElementById('createGroup1');
const groupName = document.getElementById('groupName');
createGroupBtn.onclick = async () => {
    const token = localStorage.getItem('token')
    const response = await axios.get('http://localhost:7000/group/getUsers', { headers: { authorization: token } });
    await createDropdown(response.data);
    createGroup1.style.display = 'block';
    groupName.style.display = 'block'
}

const createDropdown = async (data) => {
    data.forEach((data) => {
        const namesContainer = document.getElementById('namesContainer');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = data.id;
        checkbox.value = data.name;
        checkbox.className = 'form-check-input'
        const label = document.createElement('label');
        label.setAttribute('for', data.id);
        label.innerHTML = data.name;
        const div = document.createElement('div');
        div.className = 'form-check mb-3';
        div.appendChild(checkbox);
        div.appendChild(label);
        namesContainer.appendChild(div)
    })
}

createGroup1.onclick = async (e) => {
    try {
        const token = localStorage.getItem('token')
        e.preventDefault();
        var selectedNames = {};
        var groupname = {}
        var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
        groupname['groupName'] = groupName.value
        checkboxes.forEach(async (checkbox) => {
            selectedNames[checkbox.value] = checkbox.id
        });
        const array = [groupname, selectedNames]
        const response = await axios.post('http://localhost:7000/group/postGroupUser', array, { headers: { authorization: token } })
        alert(response.data.message);
        location.reload();
    } catch (err) {
        alert(err.response.data.message)
    }
}

window.addEventListener('DOMContentLoaded', async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:7000/group/getGroups', { headers: { authorization: token } })

    response.data.forEach(async (data) => {
        const group_Btn = document.getElementById('group_Btn');
        const button = document.createElement('button');
        button.className = 'btn btn-primary ms-5 mb-2';
        button.innerHTML = data.groupName;
        button.id = data.groupId;
        button.onclick = getGroupMessages;
        const div = document.createElement('div');
        div.appendChild(button);
        group_Btn.appendChild(div);
    })
})

const getGroupMessages = async (e) => {
    const groupId = e.target.id;
    localStorage.setItem('groupId',groupId)
    window.location.href = 'http://127.0.0.1:5500/public/Views/chat.html'
}