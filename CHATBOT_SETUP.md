# Wedding Chatbot Setup Guide

Your wedding website now has a fun AI-powered chatbot using the Claude SDK!

## What You Need

1. **Anthropic API Key** - Get one from https://console.anthropic.com/settings/keys
2. **Node.js** - Already installed on your system

## Quick Setup (3 Steps)

### Step 1: Add Your API Key

Open the `.env` file and replace `your_api_key_here` with your actual Anthropic API key:

```
ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxx
```

### Step 2: Start the Server

In your terminal, run:

```bash
cd /Users/willis/Desktop/Sara
npm start
```

You should see:
```
🎉 Wedding chatbot server running at http://localhost:3000
💬 Chat endpoint: http://localhost:3000/api/chat
```

### Step 3: Open the Website

While the server is running, open `index.html` in your browser:

```bash
open index.html
```

Or just double-click `index.html`

**Important:** The server must keep running in the background for the chatbot to work!

## How It Works

1. **Backend** (`server.js`) - Node.js server that handles chat requests and talks to Claude
2. **Frontend** (`chatbot.js`) - JavaScript that manages the chat UI and sends messages to the backend
3. **UI** - Floating chat button in the lower right corner of your website

## Chatbot Personality

The chatbot is configured to:
- Be fun, friendly, and slightly goofy (matching your website vibe!)
- Answer questions about Sara & Willis
- Provide wedding information
- Encourage guests to RSVP
- Be honest when details are still TBD

You can customize the personality in `server.js` by editing the `SYSTEM_PROMPT` variable.

## Customization Ideas

### Change the Chatbot's Personality

Edit the `SYSTEM_PROMPT` in `server.js`:

```javascript
const SYSTEM_PROMPT = `You are a fun wedding chatbot...`;
```

### Change the Greeting Message

Edit the initial message in `index.html` (lines 116-118):

```html
<div class="message-bubble">
    Hi there! 👋 I'm here to help answer any questions about Sara & Willis's wedding. Ask me anything!
</div>
```

### Styling

All chatbot styles are in `styles.css` under the "Chatbot Styles" section. You can:
- Change colors (uses your Sea Foam `--primary-color` by default)
- Adjust size and position
- Modify animations

## Troubleshooting

**"Failed to get response from server"**
- Make sure the server is running (`npm start`)
- Check that you've added your API key to `.env`
- Make sure you're on the right port (3000)

**Server won't start**
- Make sure you've run `npm install` first
- Check that port 3000 isn't already in use

**Chatbot button doesn't appear**
- Make sure you've included both `<script>` tags in `index.html`
- Check browser console for errors (F12)

**API key errors**
- Verify your API key is correct in `.env`
- Make sure you have credits in your Anthropic account
- Check that there are no extra spaces in the `.env` file

## Deployment

When you deploy your website, you'll need to:

1. **Deploy the backend** (server.js) to a service like:
   - Heroku
   - Railway
   - Render
   - Vercel (with serverless functions)

2. **Update the API_URL** in `chatbot.js`:
   ```javascript
   const API_URL = 'https://your-backend-url.com/api/chat';
   ```

3. **Deploy the frontend** as usual (GitHub Pages, Netlify, etc.)

## Cost

The Claude API has usage-based pricing:
- Model: Claude 3.5 Sonnet
- You're billed per token (input + output)
- Check current pricing at https://anthropic.com/pricing

For a wedding website with moderate traffic, costs are typically very low (a few dollars at most).

## Files Added

- `server.js` - Backend Express server with Claude SDK
- `chatbot.js` - Frontend JavaScript for chat functionality
- `.env` - Your API key (DO NOT commit this to Git!)
- `CHATBOT_SETUP.md` - This file
- Updated `index.html` - Added chatbot HTML structure
- Updated `styles.css` - Added chatbot styles
- Updated `package.json` - Added dependencies and start script

## Learning the Claude SDK

Great resources:
- Official docs: https://docs.anthropic.com/
- API reference: https://docs.anthropic.com/en/api/
- SDK GitHub: https://github.com/anthropics/anthropic-sdk-typescript

## Next Steps

1. Get your API key from Anthropic
2. Add it to `.env`
3. Run `npm start`
4. Test the chatbot!
5. Customize the personality and responses
6. When ready, deploy both frontend and backend

Have fun learning the Claude SDK! 🎉

---

Made with Claude for Sara & Willis's wedding 💍
