// Chatbot functionality
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotWindow = document.getElementById('chatbot-window');
const chatbotClose = document.getElementById('chatbot-close');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotSend = document.getElementById('chatbot-send');
const chatbotMessages = document.getElementById('chatbot-messages');

// Store conversation history
let conversationHistory = [];

// API endpoint - uses relative URL for Vercel deployment
const API_URL = '/api/chat';

// Toggle chatbot window
chatbotToggle.addEventListener('click', () => {
    chatbotWindow.classList.toggle('open');
    if (chatbotWindow.classList.contains('open')) {
        chatbotInput.focus();
    }
});

// Close chatbot
chatbotClose.addEventListener('click', () => {
    chatbotWindow.classList.remove('open');
});

// Send message on button click
chatbotSend.addEventListener('click', sendMessage);

// Send message on Enter key
chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Function to send message
async function sendMessage() {
    const message = chatbotInput.value.trim();

    if (!message) return;

    // Disable input while processing
    chatbotInput.disabled = true;
    chatbotSend.disabled = true;

    // Display user message
    addMessage(message, 'user');

    // Clear input
    chatbotInput.value = '';

    // Show typing indicator
    const typingIndicator = showTypingIndicator();

    try {
        // Call API
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: message,
                conversationHistory: conversationHistory
            })
        });

        if (!response.ok) {
            throw new Error('Failed to get response from server');
        }

        const data = await response.json();

        // Remove typing indicator
        typingIndicator.remove();

        // Display bot message
        addMessage(data.message, 'bot');

        // Update conversation history
        conversationHistory = data.conversationHistory;

    } catch (error) {
        console.error('Error:', error);

        // Remove typing indicator
        typingIndicator.remove();

        // Show error message
        addMessage(
            "Oops! I'm having trouble connecting right now. Make sure the server is running! 😅",
            'bot'
        );
    } finally {
        // Re-enable input
        chatbotInput.disabled = false;
        chatbotSend.disabled = false;
        chatbotInput.focus();
    }
}

// Function to add message to chat
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `${sender}-message`;

    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    bubble.textContent = text;

    messageDiv.appendChild(bubble);
    chatbotMessages.appendChild(messageDiv);

    // Scroll to bottom
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Function to show typing indicator
function showTypingIndicator() {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'bot-message';

    const indicator = document.createElement('div');
    indicator.className = 'typing-indicator';
    indicator.innerHTML = `
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
    `;

    messageDiv.appendChild(indicator);
    chatbotMessages.appendChild(messageDiv);

    // Scroll to bottom
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

    return messageDiv;
}
