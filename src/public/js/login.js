document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    window.location.href = `/chat?username=${encodeURIComponent(username)}`;
});