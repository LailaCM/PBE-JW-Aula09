document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const response = await fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user: document.getElementById('email').value,
      psw: document.getElementById('password').value
    })
  });

  if (response.ok) {
    const { token } = await response.json();
    localStorage.setItem('token', token);
    window.location.href = 'home.html';
  } else {
    alert('Login falhou!');
  }
});