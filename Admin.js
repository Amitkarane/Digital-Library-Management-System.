const API_URL = 'http://localhost:8080/Admin';

    // Check if already logged in on page load
    window.onload = function () {
      if (localStorage.getItem('token')) {
        document.getElementById('forms').style.display = 'none';
        document.getElementById('logged-in').style.display = 'block';
      }
    };

    // Toggle between login and register forms
    function toggleForm(form) {
      const loginForm = document.getElementById('login-form-card');
      const registerForm = document.getElementById('register-form-card');

      if (form === 'register') {
        loginForm.classList.add('hidden');
        setTimeout(() => {
          loginForm.style.display = 'none';
          registerForm.style.display = 'block';
          registerForm.classList.remove('hidden');
        }, 300);
      } else {
        registerForm.classList.add('hidden');
        setTimeout(() => {
          registerForm.style.display = 'none';
          loginForm.style.display = 'block';
          loginForm.classList.remove('hidden');
        }, 300);
      }
    }

    // Handle registration
    document.getElementById('register-form').addEventListener('submit', async (e) => {
      e.preventDefault();

      const adminName = document.getElementById('register-AdminName').value;
      const mailId = document.getElementById('register-email').value;
      const password = document.getElementById('register-password').value;

      try {
        const response = await fetch(`${API_URL}/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ adminName, mailId, password })
        });

        if (!response.ok) {
          const error = await response.text();
          alert(error || 'Registration failed. Email may already exist.');
          toggleForm('login');
          return;
        }

        alert('Registration successful! Please login.');
        toggleForm('login');
      } catch (error) {
        alert('Error connecting to backend during registration.');
      }
    });

    // Handle login
    document.getElementById('login-form').addEventListener('submit', async (e) => {
      e.preventDefault();

      const mailId = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
        const response = await fetch(`${API_URL}/Login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mailId, password })
        });

        const data = await response.json();

        if (data.success) {
          alert(data.message);
          localStorage.setItem('userId', data.userId);
          localStorage.setItem('mailId', data.mailId);

          // // it is used to redirect to page if login success
          window.location.href = 'index.html';
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error('Error during login:', error);
        alert('Something went wrong. Please try again.');
      }
    });

    // Logout function
    function logout() {
      localStorage.removeItem('token');
      document.getElementById('logged-in').style.display = 'none';
      document.getElementById('forms').style.display = 'block';
      toggleForm('login');
    }