import api from './api.js';

const setUserHeader = user => {
  document.getElementById('user-name').textContent = user.name || user.email || 'Usuário';
  document.getElementById('user-photo').src = user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'U')}`;
};

const jwtDecode = () => {
  const token = localStorage.getItem('token').split('.')[1];
  const user = JSON.parse(atob(token));
  setUserHeader(user);
  console.log(user);
}

if (window.location.pathname.includes('home.html')) {
  jwtDecode();
}

if (window.location.pathname.includes('index.html')) {
  const form = document.getElementById('loginForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      api
        .post('/login', {
          user: email,
          psw: password
        })
        .then(res => {
          localStorage.setItem('token', res.data.token);
          window.location.href = './home.html';
        })
        .catch(err => {
          alert('Login inválido!');
        });
    });
  }
}

const getPosts = () =>{
  api
  .get ('posts',{
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
    })
  .then (res =>{
    console.log(res);
  })
  .catch(err => {
    console.log(err)
  })
}
