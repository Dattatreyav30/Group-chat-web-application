const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
    try {
        e.preventDefault();
        const obj = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            password: document.getElementById('password').value
        }
        const response = await axios.post('http://localhost:7000/user/signup', obj);
        alert(response.data.message);
        location.reload();
    }catch(err){
        alert(err.response.data.message);
    }
  
})