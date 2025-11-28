export interface CaseStudy {
  agency: string;
  brand: string;
  blog: string;
  videoLink: string;
  state: string;
  theme: string;
  legacySystem: string;
  leadVoice: string;
  yearPublished: string;
  agencySize: string;
}

export interface FilterOptions {
  themes: string[];
  brands: string[];
  states: string[];
  agencySizes: string[];
}

export interface Filters {
  themes: string[];
  brands: string[];
  states: string[];
  agencySizes: string[];
}

// Export agency size values for consistency
export const AGENCY_SIZE_VALUES = [
  'Less than 400 PUM',
  '400-1000 PUM',
  '1000+ PUM',
] as const;
