function initLogin() {
  const loginBtn = document.getElementById('login-btn');
  const loginPopup = document.getElementById('login-popup');
  const closeLogin = document.getElementById('close-login');
  const loginSubmit = document.getElementById('login-submit');
  const loginError = document.getElementById('login-error');

  loginBtn.addEventListener('click', () => {
    loginPopup.classList.remove('hidden');
  });

  closeLogin.addEventListener('click', () => {
    loginPopup.classList.add('hidden');
    loginError.textContent = '';
  });

  loginSubmit.addEventListener('click', () => {
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value.trim();

    if (username === 'luca' && password === 'lucaboss21!') {
      loginPopup.classList.add('hidden');
      loginBtn.textContent = 'Welcome, Luca!';
      loginBtn.disabled = true;
      loginError.textContent = '';
    } else {
      loginError.textContent = 'Incorrect username or password.';
    }
  });
}