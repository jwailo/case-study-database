# Setup Checklist

Use this checklist to track your progress setting up the case study database.

## Pre-Deployment Checklist

### Google Cloud Setup
- [ ] Created Google Cloud account
- [ ] Created new project in Google Cloud Console
- [ ] Enabled Google Sheets API
- [ ] Created service account
- [ ] Downloaded JSON key file
- [ ] Saved JSON file in a safe place
- [ ] Shared Google Sheet with service account email
- [ ] Verified service account has "Viewer" access

### Local Setup
- [ ] Opened Terminal
- [ ] Navigated to project folder
- [ ] Ran `npm install`
- [ ] Created `.env` file from `.env.example`
- [ ] Added `GOOGLE_SERVICE_ACCOUNT_EMAIL` to `.env`
- [ ] Added `GOOGLE_PRIVATE_KEY` to `.env`
- [ ] Ran `node scripts/generate-password-hash.js`
- [ ] Added `APP_PASSWORD_HASH` to `.env`
- [ ] Updated sheet name in `lib/googleSheets.ts` (if needed)

### Testing
- [ ] Ran `npm run dev`
- [ ] Opened http://localhost:3000
- [ ] Successfully logged in
- [ ] Case studies are displaying
- [ ] Filters are working
- [ ] Theme multi-select works
- [ ] Blog/Video links work

### Vercel Deployment
- [ ] Created Vercel account
- [ ] Installed Vercel CLI: `npm install -g vercel`
- [ ] Logged in: `vercel login`
- [ ] Deployed: `vercel`
- [ ] Opened Vercel dashboard
- [ ] Went to project Settings > Environment Variables
- [ ] Added `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- [ ] Added `GOOGLE_PRIVATE_KEY`
- [ ] Added `APP_PASSWORD_HASH`
- [ ] Selected all environments (Production, Preview, Development)
- [ ] Redeployed: `vercel --prod`

### Post-Deployment
- [ ] Visited production URL
- [ ] Successfully logged in on production
- [ ] Case studies are displaying
- [ ] Tested all filters
- [ ] Tested on mobile device
- [ ] Shared URL with team
- [ ] Shared password with team (securely)
- [ ] Documented password in team password manager

## Ongoing Maintenance

### When Adding New Case Studies
- [ ] Update Google Sheet
- [ ] Wait up to 1 hour for cache to refresh (or redeploy for instant update)
- [ ] Verify new case studies appear

### When Changing Password
- [ ] Run `node scripts/generate-password-hash.js`
- [ ] Update `APP_PASSWORD_HASH` in Vercel dashboard
- [ ] Redeploy site
- [ ] Notify team of new password

## Troubleshooting Reference

If you encounter issues, check:

1. **Can't see data**
   - Sheet shared with service account? ✓
   - Environment variables set in Vercel? ✓
   - Sheet name matches code? ✓

2. **Can't log in**
   - `APP_PASSWORD_HASH` set correctly? ✓
   - Using the right password? ✓

3. **Filters not working**
   - Column structure matches expected format? ✓
   - Themes separated by commas? ✓

Need more help? See [README.md](README.md) for detailed troubleshooting.
