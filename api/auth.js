module.exports = async (req, res) => {
    // Handle CORS
    const allowedOrigins = [
        'https://wedding-website-nine-pink.vercel.app',
        'http://localhost:8000',
        'http://localhost:3000'
    ];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({ error: 'Password is required' });
        }

        // Password is stored securely in Vercel environment variables
        const correctPassword = (process.env.WEDDING_PASSWORD || 'kai').toLowerCase();
        const isCorrect = password.toLowerCase().trim() === correctPassword;

        res.json({ success: isCorrect });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Authentication failed' });
    }
};
