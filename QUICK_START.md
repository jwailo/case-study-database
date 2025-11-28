# Quick Start Guide

This is a simplified setup guide to get you up and running quickly.

## What You Need

1. Google Cloud account (free)
2. Vercel account (free)
3. Your Google Sheet URL

## 5-Minute Setup

### 1. Google Cloud Setup (2 minutes)

1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project
3. Enable Google Sheets API
4. Create Service Account → Download JSON key
5. Share your Google Sheet with the service account email from the JSON file

### 2. Generate Password (1 minute)

```bash
cd "/Users/justinwatts/Desktop/Coding projects/Content Library/case-study-database"
npm install
node scripts/generate-password-hash.js
```

Enter your desired password and save the hash.

### 3. Deploy to Vercel (2 minutes)

```bash
npm install -g vercel
vercel login
vercel
```

Then in the Vercel dashboard:
- Add 3 environment variables:
  - `GOOGLE_SERVICE_ACCOUNT_EMAIL` (from JSON file)
  - `GOOGLE_PRIVATE_KEY` (from JSON file)
  - `APP_PASSWORD_HASH` (from step 2)

Redeploy:
```bash
vercel --prod
```

Done! Visit your Vercel URL and log in with your password.

## Common Issues

**Can't see data?**
- Make sure the sheet is shared with the service account
- Check the sheet name in `lib/googleSheets.ts` matches yours

**Can't log in?**
- Verify `APP_PASSWORD_HASH` is set in Vercel
- Check you're using the right password

Need more help? See the full [README.md](README.md)
