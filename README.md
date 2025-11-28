# Ailo Case Study Database

An internal, searchable case study database for Ailo's sales team. This tool helps Account Executives quickly find the right customer story for any sales conversation.

## Features

- **Google Sheets Integration**: Automatically syncs with your Google Sheets data
- **Advanced Filtering**: Filter by themes (multi-select), brand, state, and agency size
- **Password Protection**: Simple authentication for internal use
- **Responsive Design**: Works on desktop and mobile
- **Real-time Search**: Filter results instantly as you type
- **Professional UI**: Clean design with Ailo branding (#EE0B4F pink)

## Prerequisites

Before you begin, make sure you have:
- A Google Cloud Platform account
- Node.js 18+ installed on your computer
- A Vercel account (free tier is fine)

## Setup Instructions

### Step 1: Google Sheets API Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select an existing one)
3. Enable the Google Sheets API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click "Enable"

4. Create a Service Account:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "Service Account"
   - Give it a name (e.g., "case-study-database")
   - Click "Create and Continue"
   - Skip the optional steps and click "Done"

5. Generate a Key:
   - Click on the service account you just created
   - Go to the "Keys" tab
   - Click "Add Key" > "Create new key"
   - Choose "JSON" format
   - Download the file (keep it safe!)

6. Share your Google Sheet with the service account:
   - Open the JSON file you downloaded
   - Copy the email address (looks like: `your-service-account@your-project.iam.gserviceaccount.com`)
   - Open your Google Sheet
   - Click "Share" and paste the email address
   - Give it "Viewer" access

### Step 2: Local Development Setup

1. Open Terminal and navigate to the project folder:
   ```bash
   cd "/Users/justinwatts/Desktop/Coding projects/Content Library/case-study-database"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create your environment variables file:
   ```bash
   cp .env.example .env
   ```

4. Open the `.env` file and fill in your credentials:
   - Open the JSON file you downloaded from Google Cloud
   - Copy the `client_email` value to `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - Copy the `private_key` value to `GOOGLE_PRIVATE_KEY` (keep the quotes and newlines as-is)

5. Generate a password hash:
   ```bash
   node scripts/generate-password-hash.js
   ```
   - Enter your desired password when prompted
   - Copy the generated hash to `APP_PASSWORD_HASH` in your `.env` file

6. Update the sheet name if needed:
   - Open `lib/googleSheets.ts`
   - Change `SHEET_NAME` from `'Sheet1'` to match your actual sheet name

### Step 3: Test Locally

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser to [http://localhost:3000](http://localhost:3000)

3. You should see the login page. Enter your password to access the database.

### Step 4: Deploy to Vercel

1. Install Vercel CLI (if you haven't already):
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy the project:
   ```bash
   vercel
   ```
   - Follow the prompts (accept defaults)
   - When asked about environment variables, say "No" (we'll add them in the dashboard)

4. Add Environment Variables in Vercel:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Select your project
   - Go to "Settings" > "Environment Variables"
   - Add these three variables:
     - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
     - `GOOGLE_PRIVATE_KEY`
     - `APP_PASSWORD_HASH`
   - Make sure to select "Production", "Preview", and "Development" for each

5. Redeploy to apply environment variables:
   ```bash
   vercel --prod
   ```

Your case study database is now live!

## Usage

### For Sales Team Members

1. Visit the deployed URL
2. Enter the password (ask your admin)
3. Use the filters to find relevant case studies:
   - **Themes**: Hold Ctrl (Windows) or Cmd (Mac) to select multiple
   - **Brand**: Select a specific franchise network
   - **State**: Filter by Australian state
   - **Agency Size**: Filter by property count
4. Click "View Blog" or "Watch Video" to access the case study content

### For Administrators

#### Updating Case Studies

Simply update your Google Sheet! The app will automatically fetch the latest data (updates may take up to 1 hour due to caching).

#### Changing the Password

1. Run the password hash generator:
   ```bash
   node scripts/generate-password-hash.js
   ```

2. Update the `APP_PASSWORD_HASH` environment variable in Vercel:
   - Go to Vercel Dashboard > Settings > Environment Variables
   - Edit `APP_PASSWORD_HASH`
   - Paste the new hash
   - Redeploy the site

#### Updating the Sheet Structure

If you change column order in your Google Sheet, update `lib/googleSheets.ts`:
- The array indices in the `map` function correspond to column positions (A=0, B=1, C=2, etc.)

## Troubleshooting

### "Failed to fetch case studies" error

- Check that your Google Sheet is shared with the service account email
- Verify that `GOOGLE_SERVICE_ACCOUNT_EMAIL` and `GOOGLE_PRIVATE_KEY` are set correctly in Vercel
- Make sure the Google Sheets API is enabled in your Google Cloud project

### "Invalid password" error

- Verify that `APP_PASSWORD_HASH` is set in Vercel
- Make sure you're using the correct password
- Try generating a new password hash

### Filters not working

- Check that your sheet data matches the expected column structure
- Verify that themes are comma-separated in the "Theme" column

## Support

For technical issues or questions, contact your development team.

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: bcryptjs with HTTP-only cookies
- **API Integration**: Google Sheets API (googleapis)
- **Deployment**: Vercel
