document.addEventListener("DOMContentLoaded", () => {
    const messagesDiv = document.getElementById('all-chat');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');

    
    sendButton.addEventListener('click', () => {
        const userMessage = messageInput.value.trim();
        if (userMessage) {
            displayMessage(userMessage, 'user');
            sendMessage(userMessage);
            messageInput.value = '';  
        }
    });

    
    messageInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); 
            const userMessage = messageInput.value.trim();
            if (userMessage) {
                displayMessage(userMessage, 'user');
                sendMessage(userMessage);
                messageInput.value = ''; 
            }
        }
    });

   
    function displayMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message-item ${sender === 'user' ? 'my-message' : ''}`;
        
        const img = document.createElement('img');
        img.src = sender === 'user' ? '/static/img/user2.png' : '/static/img/gui.gif'; 
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        const header = document.createElement('h4');
        header.textContent = sender === 'user' ? 'User' : 'GUI';
        
        const span = document.createElement('span');
        span.textContent = '* 0s'; 
        
        const messageText = document.createElement('p');
        contentDiv.appendChild(header);
        contentDiv.appendChild(messageText);
        messageDiv.appendChild(img);
        messageDiv.appendChild(contentDiv);
        
        messagesDiv.appendChild(messageDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;  
        
      
        let index = 0;
        messageText.textContent = '';
        const typingSpeed = 40; 
        
        function typeWriter() {
            if (index < text.length) {
                messageText.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, typingSpeed);
            }
        }

        typeWriter();
    }

    async function sendMessage(message) {
        try {
            const response = await fetch('https://gui.up.railway.app/send-message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            });
            const data = await response.json();
            displayMessage(data.response, 'bot');
        } catch (error) {
            displayMessage("Erro ao enviar a mensagem", 'bot');
        }
    }
});
