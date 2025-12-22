# Wedding Website Chatbot Project Summary

## What We Covered

### Understanding SDKs
- **SDK = Software Development Kit**: Pre-written code that makes it easier to use a service (like Claude) in your app
- Instead of writing hundreds of lines of code to communicate with Anthropic's servers, you install their SDK and can call Claude with just a few simple lines
- Anthropic provides SDKs for Python, TypeScript/JavaScript, and other languages

### Your Current Setup
- **Location**: `/Users/willis/Desktop/Sara/`
- **Files**: 
  - `index.html` - Your main wedding website with chatbot UI already built in
  - `styles.css` - Styling
  - `script.js` - Existing JavaScript
  - `sara.jpg` - Image
  - The chatbot interface exists (button, window, input field) but isn't connected to Claude yet

### What We've Done So Far
1. ✅ Confirmed you have Node.js installed (v22.20.0)
2. ✅ Initialized a Node.js project in your Sara folder (created package.json)
3. ✅ Installed the Anthropic SDK (`@anthropic-ai/sdk`)

### Key Concept: Why You Need a Server
You can't call the Claude API directly from your website's JavaScript because:
- It would expose your API key to anyone who visits your site
- They could steal it and rack up charges on your account

**The solution**: Create a Node.js server that:
- Keeps your API key secret
- Your website sends messages to YOUR server
- Your server uses the SDK to talk to Claude
- Your server sends Claude's response back to your website

## What Still Needs to Be Done

### To Get the Chatbot Working Locally (on your computer)
1. **Get an API key from Anthropic**
   - Go to console.anthropic.com
   - Create an account/log in
   - Generate an API key
   - Add credits to your account (you'll be charged per API call)

2. **Create the server file** (we'll call it `server.js`)
   - This will handle incoming chat messages from your website
   - Use the SDK to send messages to Claude
   - Send responses back to your website

3. **Create `chatbot.js`**
   - Frontend code that sends user messages to your server
   - Displays responses in the chat window
   - Your `index.html` already tries to load this file but it doesn't exist yet

4. **Store your API key securely**
   - Create a `.env` file (never commit this to git)
   - Put your API key in there
   - The server reads it from the environment

5. **Test locally**
   - Run your server
   - Open your website in a browser
   - Try the chatbot

### To Make It Live on the Web

#### Option 1: Host Without the Chatbot (Simple)
- Use Netlify, Vercel, or GitHub Pages (free)
- Just upload your HTML, CSS, JS, and images
- Remove or hide the chatbot UI since it won't work
- Very straightforward, no complexity

#### Option 2: Host With the Chatbot (More Complex)
You need to host TWO things:

**1. The Website Files**
- Host on Netlify, Vercel, or GitHub Pages
- Upload: `index.html`, `styles.css`, `script.js`, `chatbot.js`, images

**2. The Node.js Server**
- Host on Railway, Render, or Heroku (they have free tiers)
- Upload your `server.js` and `package.json`
- Set your API key as an environment variable (secure)
- Get the server's URL (like `https://your-server.railway.app`)

**3. Connect Them**
- Update `chatbot.js` to point to your server's URL
- Test that messages flow: website → your server → Claude → back to website

**4. Get a Custom Domain (Optional)**
- Buy a domain like saraandwillis.com ($10-15/year)
- Point it to your website hosting service
- Now people visit saraandwillis.com instead of random-words-123.netlify.app

### Important: API Costs
- Every message sent to Claude costs money (charged per token/chunk of text)
- Not expensive for low traffic, but could add up
- Set usage limits in your Anthropic console to avoid surprise bills
- Consider: do you really need the chatbot, or is it just for learning? (Both valid!)

## Next Steps When You Return

1. Decide: Do you want to actually deploy the chatbot, or just learn how it works locally?
2. If yes to deployment: Get your Anthropic API key first
3. Let me know you're ready and I'll:
   - Create `server.js` with the SDK implementation
   - Create `chatbot.js` to connect your UI to the server
   - Walk you through testing it locally
   - Then guide you through deployment if you want

## Technical Terms Glossary

- **API (Application Programming Interface)**: A way for your code to talk to someone else's service (like Claude)
- **API Key**: A secret password that proves you're allowed to use an API
- **Backend/Server**: Code that runs on a server, not in the user's browser. Keeps secrets safe.
- **Frontend**: The website that users see in their browser (HTML, CSS, JavaScript)
- **Node.js**: Software that lets you run JavaScript on a server (not just in browsers)
- **npm (Node Package Manager)**: Tool for installing code packages (like the Anthropic SDK)
- **package.json**: File that lists what packages your project uses
- **Environment Variable**: A way to store secrets (like API keys) that code can read but aren't in your files
- **Token**: Small chunks of text that APIs charge you for (roughly 4 characters = 1 token)
- **SDK**: Software Development Kit - pre-written code that makes using a service easier

## Your Project Goal
You want to learn by doing - building a chatbot gives you hands-on experience with:
- Installing and using an SDK
- Making API calls
- Setting up a backend server
- Connecting frontend to backend
- Deploying web applications

This is a great learning project!
