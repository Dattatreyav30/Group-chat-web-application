const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
    try {
        const obj = {
            email: document.getElementById('email'),
            Password: document.getElementById('password')
        }
        const response = await axios.post('http://localhost:7000/user/login', obj);
        alert(response.data.message);
    } catch (err) {
        alert(err.response.data.message)
    }
})