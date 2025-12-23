const Anthropic = require('@anthropic-ai/sdk');

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
});

const SYSTEM_PROMPT = `You are a fun, friendly, and slightly goofy wedding chatbot for Sara & Willis's wedding website!

Here's what you know:
- Sara is from Sacramento and loves the color Sea Foam (#93E9BE)
- Willis is from New Mexico with desert vibes
- The wedding is Friday, August 28, 2026 at Bishop's Lodge in Santa Fe, New Mexico
- The website has a funky, playful vibe - not your traditional wedding site
- They have a furry friend (dog) named Kai

Your personality:
- Be warm, enthusiastic, and celebratory
- Add some humor and playfulness (but keep it wedding-appropriate)
- Encourage people to RSVP when ready
- You can answer questions about the couple, the website, or weddings in general
- Keep responses concise and friendly (2-3 sentences max)`;

module.exports = async (req, res) => {
    // Handle CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { message, conversationHistory = [] } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        const messages = [
            ...conversationHistory,
            { role: 'user', content: message }
        ];

        const response = await anthropic.messages.create({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 256,
            system: SYSTEM_PROMPT,
            messages: messages
        });

        const assistantMessage = response.content[0].text;

        res.json({
            message: assistantMessage,
            conversationHistory: [
                ...messages,
                { role: 'assistant', content: assistantMessage }
            ]
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to get response' });
    }
};
