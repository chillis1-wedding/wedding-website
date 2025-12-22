# Sara & Willis Wedding Website

A beautiful, simple wedding website with RSVP functionality that saves responses to Google Sheets.

## Features

- ✨ Elegant, romantic design
- 📱 Fully responsive (mobile-friendly)
- 📝 RSVP form with validation
- 📊 Automatic Google Sheets integration for tracking RSVPs
- 💌 Guest messaging system
- 🍽️ Dietary restrictions tracking

## Files

- `index.html` - Main website structure
- `styles.css` - All styling and responsive design
- `script.js` - Form handling and Google Sheets integration
- `README.md` - This file

## Quick Start

1. **Open the website locally:**
   - Simply double-click `index.html` to open it in your browser
   - Or use a local server (see below)

2. **Update your wedding details:**
   - Edit `index.html` and update the date, time, and venue information
   - Replace "TBD" placeholders with your actual wedding details

3. **Set up Google Sheets integration** (see below)

## Google Sheets Integration Setup

To save RSVP submissions to a Google Sheet:

### Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Wedding RSVPs" or whatever you prefer
4. In the first row, add these column headers:
   ```
   Timestamp | Name | Email | Phone | Guests | Attendance | Dietary | Message
   ```

### Step 2: Create a Google Apps Script

1. In your Google Sheet, click **Extensions** > **Apps Script**
2. Delete any existing code
3. Paste this code:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);

    // Add row to sheet
    sheet.appendRow([
      data.timestamp,
      data.name,
      data.email,
      data.phone,
      data.guests,
      data.attendance,
      data.dietary,
      data.message
    ]);

    return ContentService.createTextOutput(JSON.stringify({
      'status': 'success'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Click **Save** (disk icon)
5. Click **Deploy** > **New deployment**
6. Click the gear icon next to "Select type" and choose **Web app**
7. Configure:
   - Description: "Wedding RSVP Form"
   - Execute as: **Me**
   - Who has access: **Anyone**
8. Click **Deploy**
9. **Copy the Web app URL** - you'll need this!
10. Click **Authorize access** if prompted and grant permissions

### Step 3: Update Your Website

1. Open `script.js`
2. Find this line at the top:
   ```javascript
   const GOOGLE_SHEETS_URL = 'YOUR_GOOGLE_SHEETS_WEB_APP_URL_HERE';
   ```
3. Replace `'YOUR_GOOGLE_SHEETS_WEB_APP_URL_HERE'` with your Web app URL (keep the quotes)
4. Save the file

### Step 4: Test It!

1. Open `index.html` in your browser
2. Fill out the RSVP form
3. Submit it
4. Check your Google Sheet - you should see a new row!

## Customization Ideas

### Change Colors

Edit the `:root` section in `styles.css`:

```css
:root {
    --primary-color: #d4a574;     /* Gold/tan color */
    --secondary-color: #8b7355;   /* Brown color */
    --text-dark: #333;
    --text-light: #666;
    --bg-light: #f9f7f4;
    --white: #ffffff;
}
```

### Add More Sections

You can add additional sections to `index.html` like:
- Our Story
- Wedding Party
- Photo Gallery
- Travel & Accommodations
- Registry Information
- Schedule of Events

### Change Fonts

Replace the font-family in `styles.css`. Some romantic options:
- `'Playfair Display', serif`
- `'Cormorant Garamond', serif`
- `'Libre Baskerville', serif`

To use Google Fonts, add this to the `<head>` of `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&display=swap" rel="stylesheet">
```

## Running a Local Server

For a better development experience, you can run a local server:

```bash
# Using Python 3
python3 -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## Deploying Your Website

Once you're ready to publish, you have several free hosting options:

### Option 1: GitHub Pages (Recommended)
1. Create a GitHub account if you don't have one
2. Create a new repository called "wedding-website"
3. Upload your files
4. Go to Settings > Pages
5. Select your main branch and click Save
6. Your site will be live at `https://yourusername.github.io/wedding-website`

### Option 2: Netlify
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your Sara folder
3. Your site is live!

### Option 3: Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import your project
3. Deploy!

## Troubleshooting

**RSVP form isn't working:**
- Make sure you've set up the Google Apps Script correctly
- Check that the Web app URL is correct in `script.js`
- Open browser console (F12) to see error messages
- Make sure the Web app is deployed with "Anyone" access

**Website looks broken:**
- Make sure all three files (index.html, styles.css, script.js) are in the same folder
- Check for typos in the file names

**Google Sheets not receiving data:**
- Check that your Apps Script is deployed as a Web app
- Verify the URL in `script.js` is correct
- Try re-deploying the Apps Script with a new deployment

## Support

If you need help customizing or have questions, feel free to reach out!

## Future Enhancements

Ideas for expanding the website:
- [ ] Photo gallery with engagement photos
- [ ] Countdown timer to the wedding
- [ ] Interactive map for venue location
- [ ] Guest book/messages section
- [ ] Music preferences form
- [ ] Plus-one management
- [ ] Email confirmation to guests after RSVP
- [ ] Admin dashboard to view RSVP statistics
- [ ] Password protection for certain sections

---

Made with ❤️ for Sara & Willis
