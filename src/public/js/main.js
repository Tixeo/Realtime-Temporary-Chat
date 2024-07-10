const socket = io();
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');
document.getElementById('username').textContent = username;

const messagesContainer = document.getElementById('messagesContainer');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

function appendMessage(data, isOwnMessage) {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('messageContainer');
    if (isOwnMessage) {
        messageContainer.classList.add('yoursMessages');
    }

    const messageBox = document.createElement('div');
    messageBox.classList.add('messageBox');

    const messageUsername = document.createElement('p');
    messageUsername.classList.add('username');
    messageUsername.textContent = isOwnMessage ? 'You' : data.username;

    const messageText = document.createElement('p');
    messageText.classList.add('message');
    messageText.textContent = data.message;

    messageBox.appendChild(messageUsername);
    messageBox.appendChild(messageText);
    messageContainer.appendChild(messageBox);
    messagesContainer.appendChild(messageContainer);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function sendMessage() {
    const message = messageInput.value;
    if (message.trim()) {
        const data = { username, message };
        socket.emit('message', data);
        messageInput.value = '';
    }
}

sendButton.addEventListener('click', sendMessage);

messageInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        sendMessage();
    }
});


socket.on('message', (data) => {
    appendMessage(data, data.username === username);
});