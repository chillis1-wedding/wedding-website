# Claude.md - Wedding Website Project Notes

## 🎉 Project Overview
Wedding website for **Sara & Willis** - newly engaged couple!

**Design Philosophy:** Funky, goofy, and cool - not your traditional wedding website

## 👫 About the Couple
- **Willis:** From New Mexico, desert vibes
- **Sara:** From Sacramento, loves Sea Foam color (#93E9BE)
- **Status:** Just got engaged, still planning details

## 🎨 Current Design Features

### Color Scheme (Desert Palette)
- **Desert Cream:** #F5E6D3
- **Desert Ochre:** #C4A86C
- **Desert Peach:** #DBA07A
- **Desert Terracotta:** #C17A5E
- **Desert Sage:** #7A8B6A
- **Title Green:** #3D5A4C

### Goofy/Fun Elements
1. **Sara's Name Animation:**
   - Crazy bouncing Pacifico font
   - Rainbow text shadows
   - Rotates and bounces continuously
   - Way bigger than Willis's name (6rem vs 5rem)

2. **Floating Photo:**
   - Sara.jpg floats around the hero section
   - Circular frame with desert-themed border and glow
   - Spins and moves all over the screen (15-second loop)
   - Scales up and down as it moves

### Sections
1. **Hero Section** - Names with animations, "Together Forever" tagline, "Coming Soon" date
2. **Our Special Day** - Ceremony and Reception details (currently TBD placeholders)
3. **RSVP Form** - Fully functional with validation, ready for Google Sheets integration
4. **Footer** - Simple copyright

## 📋 RSVP Form Features
Collects:
- Full Name
- Email Address
- Phone Number (optional)
- Number of Guests (1-10)
- Attendance (Joyfully Accepts / Regretfully Declines)
- Dietary Restrictions
- Message to the Couple

**Integration:** Set up to send to Google Sheets (needs configuration - see README.md)

## 📁 File Structure
```
Sara/
├── index.html          # Main website structure
├── styles.css          # All styling, animations, and responsive design
├── script.js           # Form handling and Google Sheets integration
├── Sara.jpg            # Sara's photo (floating around hero section)
├── README.md           # Full setup instructions, deployment guide
└── Claude.md           # This file - project notes for future sessions
```

## 🚀 Development & Deployment Workflow

**Goal:** Build locally → Push to GitHub → Deploy to Vercel

### Local Development
```bash
cd /Users/willis/Desktop/Sara
python3 -m http.server 8000
# Then open http://localhost:8000
```

### GitHub Repository
- **Repo:** https://github.com/chillis1-wedding/wedding-website
- **Branch:** main
- **Auth:** SSH key set up, logged in as `chillis1-wedding`

### Push to GitHub
```bash
git add .
git commit -m "Your commit message"
git push
```

### Vercel (Live Site)
- **Live URL:** https://wedding-website-nine-pink.vercel.app/
- Auto-deploys on every push to GitHub main branch
- Can add custom domain later in Vercel dashboard

### Known Issues
- Large image pushes can fail with "inflate" errors (push images individually or in small batches)
- Photos folder not yet pushed to GitHub - add later when finalized

## ✅ Completed
- [x] Basic HTML structure with hero, details, RSVP, footer
- [x] Responsive CSS design (mobile-friendly)
- [x] Sea Foam color scheme integration
- [x] Crazy animated Sara name with bouncing text
- [x] Floating Sara photo with spin animation
- [x] RSVP form with validation
- [x] Google Sheets integration code (needs URL config)
- [x] README with full deployment instructions

## 📝 To Do / Future Ideas
- [ ] Update wedding date, time, venue details (waiting on planning)
- [ ] Configure Google Sheets Web App URL for RSVP submissions
- [ ] Add "Our Story" section (Willis from NM desert, Sara from Sacramento)
- [ ] Add photos/gallery section
- [ ] Add travel & accommodations info
- [ ] Add registry information
- [ ] Consider desert + Sacramento theme elements
- [ ] Maybe add New Mexico/desert imagery or motifs?
- [ ] Maybe add Sacramento/Northern California elements?
- [ ] Custom domain setup when ready
- [ ] Add more goofy animations or easter eggs?

## 🎯 Next Steps for Sara & Willis
1. **Gather Content:**
   - Wedding date, time, venues
   - Your story/how you met
   - Photos for gallery
   - Travel/hotel recommendations
   - Registry links

2. **Google Sheets Setup:**
   - Follow instructions in README.md (takes ~5 minutes)
   - Update `script.js` with your Web App URL
   - Test RSVP form

3. **Customization Ideas:**
   - Add more desert/New Mexico vibes (cacti, desert colors)?
   - Add Sacramento elements?
   - More goofy animations?
   - Background patterns or textures?
   - Music/playlist section?

4. **Deploy:**
   - Choose hosting (GitHub Pages, Netlify, or Vercel - all free)
   - Get custom domain if desired
   - Share with guests!

## 💡 Design Notes
- Keep the funky, playful vibe throughout
- Don't be afraid to add more weird animations or fun elements
- Desert color palette should be used consistently
- Balance goofy elements with readability/usability
- Mobile responsiveness is already handled

## 🛠️ Technical Notes
- Pure HTML/CSS/JS - no frameworks needed
- Google Sheets used as free database for RSVPs
- Responsive design works on all screen sizes
- Font: Pacifico (Google Fonts) for Sara's name, Georgia for body
- All animations use CSS keyframes

---

**Last Updated:** December 22, 2025
**Created By:** Claude (with Willis)

Congrats on the engagement! 🎊💍
