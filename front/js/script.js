import api from './api.js';

const setUserHeader = user => {
  document.getElementById('nome').textContent = user.name || user.email || 'Usuário';
  document.getElementById('foto').src = user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'U')}`;
};

const jwtDecode = () => {
  const token = localStorage.getItem('token').split('.')[1];
  const user = JSON.parse(atob(token));
  setUserHeader(user);
  console.log(user);
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

const renderPosts = posts => {
  const container = document.getElementById('posts');
  if (!container) return;
  container.innerHTML = '';
  posts.forEach(post => {
    const div = document.createElement('div');
    div.className = 'post';
    div.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.summary}</p>
      <span>♡ ${post.likes} | 𓂀 ${post.views}</span>
    `;
    container.appendChild(div);
  });
};

const getPosts = () => {
  api
    .get('/posts')
    .then(res => {
      renderPosts(res.data);
    })
    .catch(err => {
      console.log(err);
    });
};

if (window.location.pathname.includes('home.html')) {
  jwtDecode();
  getPosts();
  setTimeout(() => {
    localStorage.removeItem('token');
    const postsContainer = document.getElementById('posts');
    if (postsContainer) postsContainer.innerHTML = '';
    alert('Sessão expirada! Faça login novamente.');
    window.location.href = './index.html';
  }, 120000);
}