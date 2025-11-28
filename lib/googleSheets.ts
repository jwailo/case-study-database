import { google } from 'googleapis';
import { CaseStudy } from '@/types';

const SPREADSHEET_ID = '1VZwRXjokYMSpFtsXSfgPi0rq_BFxxeCwuBDjkRYAPZo';
const SHEET_NAME = 'PUBLISHED - Customer Stories';

export async function getCaseStudies(): Promise<CaseStudy[]> {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:M`, // Columns A through M
    });

    const rows = response.data.values;

    if (!rows || rows.length === 0) {
      return [];
    }

    // Skip header row and map data
    // Column mapping:
    // A (0): w (skip)
    // B (1): Agency
    // C (2): Brand
    // D (3): Blog
    // E (4): Video Link
    // F (5): Notes (skip)
    // G (6): State
    // H (7): Key Theme (skip)
    // I (8): Theme
    // J (9): Legacy system
    // K (10): Lead Voice
    // L (11): Year Published
    // M (12): Agency Size
    const caseStudies: CaseStudy[] = rows.slice(1).map((row) => ({
      agency: row[1] || '',
      brand: row[2] || '',
      blog: row[3] || '',
      videoLink: row[4] || '',
      state: row[6] || '',
      theme: row[8] || '',
      legacySystem: row[9] || '',
      leadVoice: row[10] || '',
      yearPublished: row[11] || '',
      agencySize: row[12] || '',
    }));

    return caseStudies;
  } catch (error) {
    console.error('Error fetching case studies from Google Sheets:', error);
    throw new Error('Failed to fetch case studies');
  }
}
