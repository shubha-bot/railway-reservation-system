// Example redirect in login.js
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // Validate login (dummy check)
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === 'admin123') {
        window.location.href = 'welcome.html';
    } else {
        document.getElementById('loginError').textContent = 'Invalid credentials';
    }
});
