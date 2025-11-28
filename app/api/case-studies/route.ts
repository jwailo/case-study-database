import { NextResponse } from 'next/server';
import { getCaseStudies } from '@/lib/googleSheets';

export async function GET() {
  try {
    const caseStudies = await getCaseStudies();
    return NextResponse.json(caseStudies);
  } catch (error) {
    console.error('Error in case studies API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch case studies' },
      { status: 500 }
    );
  }
}

export const revalidate = 3600; // Revalidate every hour
