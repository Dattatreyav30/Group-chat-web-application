const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        const obj = {
            email: document.getElementById('email').value,
            Password: document.getElementById('password').value
        }
        const response = await axios.post('http://localhost:7000/user/login', obj);
        localStorage.setItem('token', response.data.token);
        const chatUrl = `http://127.0.0.1:5500/public/Views/chat.html`;
        alert(response.data.message);
        window.location.href = chatUrl;
    } catch (err) {
        alert(err.response.data.message)
    }
})