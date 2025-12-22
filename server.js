const express = require('express');
const Anthropic = require('@anthropic-ai/sdk');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files from current directory

// Initialize Anthropic client
const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
});

// Chatbot personality and context
const SYSTEM_PROMPT = `You are a fun, friendly, and slightly goofy wedding chatbot for Sara & Willis's wedding website!

Here's what you know:
- Sara is from Sacramento and loves the color Sea Foam (#93E9BE)
- Willis is from New Mexico with desert vibes
- They just got engaged and are still planning details
- The wedding date, venue, and time are still TBD (to be determined)
- The website has a funky, playful vibe - not your traditional wedding site

Your personality:
- Be warm, enthusiastic, and celebratory
- Add some humor and playfulness (but keep it wedding-appropriate)
- If someone asks about details that are TBD, be honest but excited
- Encourage people to RSVP when ready
- You can answer questions about the couple, the website, or weddings in general
- Keep responses concise and friendly

If asked about specific wedding details (dates, venues, etc.) that aren't finalized, say they're "still being planned" and encourage guests to check back or fill out the RSVP form to stay updated!`;

// Chat endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { message, conversationHistory = [] } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Build messages array with conversation history
        const messages = [
            ...conversationHistory,
            {
                role: 'user',
                content: message
            }
        ];

        // Call Claude API
        const response = await anthropic.messages.create({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 1024,
            system: SYSTEM_PROMPT,
            messages: messages
        });

        const assistantMessage = response.content[0].text;

        res.json({
            message: assistantMessage,
            conversationHistory: [
                ...messages,
                {
                    role: 'assistant',
                    content: assistantMessage
                }
            ]
        });

    } catch (error) {
        console.error('Error calling Claude API:', error);
        res.status(500).json({
            error: 'Failed to get response from chatbot',
            details: error.message
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Wedding chatbot server is running!' });
});

app.listen(PORT, () => {
    console.log(`🎉 Wedding chatbot server running at http://localhost:${PORT}`);
    console.log(`💬 Chat endpoint: http://localhost:${PORT}/api/chat`);
});
