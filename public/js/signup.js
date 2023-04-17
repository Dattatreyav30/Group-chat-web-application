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
      window.location.href = 'http://127.0.0.1:5500/public/Views/login.html'
    }catch(err){
        alert(err.response.data.message);
    }
  
})