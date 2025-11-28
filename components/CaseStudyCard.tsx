import { CaseStudy } from '@/types';

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
}

// Map brand names to logo filenames
const brandLogoMap: Record<string, string> = {
  'Belle': '/logos/belle.png',
  'Belle Property': '/logos/belle.png',
  'Harcourts': '/logos/harcourts.png',
  'LJ Hooker': '/logos/lj-hooker.png',
  'McGrath': '/logos/mcgrath.png',
  'PRD': '/logos/prd.png',
  'Raine & Horne': '/logos/raine-and-horne.png',
  'Raine and Horne': '/logos/raine-and-horne.png',
  'Ray White': '/logos/ray-white.png',
  'Stone': '/logos/stone.png',
  'Stone Real Estate': '/logos/stone.png',
};

function getBrandLogo(brand: string): string | null {
  // Check for exact match first
  if (brandLogoMap[brand]) {
    return brandLogoMap[brand];
  }
  // Check for partial match
  for (const [key, value] of Object.entries(brandLogoMap)) {
    if (brand.toLowerCase().includes(key.toLowerCase()) ||
        key.toLowerCase().includes(brand.toLowerCase())) {
      return value;
    }
  }
  return null;
}

export default function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  const themes = caseStudy.theme
    .split(',')
    .map((t) => t.trim())
    .filter((t) => t.length > 0);

  const hasBlog = caseStudy.blog && caseStudy.blog.trim().length > 0;
  const hasVideo = caseStudy.videoLink && caseStudy.videoLink.trim().length > 0;
  const brandLogo = caseStudy.brand ? getBrandLogo(caseStudy.brand) : null;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 p-6 flex flex-col h-full">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-900 flex-1">
            {caseStudy.agency}
          </h3>
          {/* Brand Logo or Text Badge */}
          {brandLogo ? (
            <img
              src={brandLogo}
              alt={`${caseStudy.brand} logo`}
              className="ml-2 object-contain h-8 max-w-[80px] flex-shrink-0"
            />
          ) : caseStudy.brand ? (
            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 flex-shrink-0">
              {caseStudy.brand}
            </span>
          ) : null}
        </div>

        {caseStudy.leadVoice && (
          <p className="text-sm text-gray-600 italic">
            {caseStudy.leadVoice}
          </p>
        )}
      </div>

      {/* Details */}
      <div className="space-y-2 mb-4 flex-1">
        {caseStudy.state && (
          <div className="flex items-start">
            <span className="text-sm font-medium text-gray-500 w-24 flex-shrink-0">
              State:
            </span>
            <span className="text-sm text-gray-900">{caseStudy.state}</span>
          </div>
        )}

        {caseStudy.yearPublished && (
          <div className="flex items-start">
            <span className="text-sm font-medium text-gray-500 w-24 flex-shrink-0">
              Published:
            </span>
            <span className="text-sm text-gray-900">{caseStudy.yearPublished}</span>
          </div>
        )}

        {caseStudy.agencySize && caseStudy.agencySize !== 'N/A' && (
          <div className="flex items-start">
            <span className="text-sm font-medium text-gray-500 w-24 flex-shrink-0">
              Size:
            </span>
            <span className="text-sm text-gray-900">{caseStudy.agencySize}</span>
          </div>
        )}

        {caseStudy.legacySystem && (
          <div className="flex items-start">
            <span className="text-sm font-medium text-gray-500 w-24 flex-shrink-0">
              From:
            </span>
            <span className="text-sm text-gray-900">{caseStudy.legacySystem}</span>
          </div>
        )}
      </div>

      {/* Theme Tags */}
      {themes.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-1.5">
            {themes.map((theme, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded text-xs font-medium text-white"
                style={{ backgroundColor: '#EE0B4F' }}
              >
                {theme}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 mt-auto pt-4 border-t border-gray-100">
        <a
          href={hasBlog ? caseStudy.blog : '#'}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex-1 text-center px-4 py-2 rounded-lg font-medium transition ${
            hasBlog
              ? 'text-white hover:opacity-90'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
          style={hasBlog ? { backgroundColor: '#EE0B4F' } : {}}
          onClick={(e) => {
            if (!hasBlog) e.preventDefault();
          }}
        >
          View Blog
        </a>

        <a
          href={hasVideo ? caseStudy.videoLink : '#'}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex-1 text-center px-4 py-2 rounded-lg font-medium transition ${
            hasVideo
              ? 'text-white hover:opacity-90'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
          style={hasVideo ? { backgroundColor: '#EE0B4F' } : {}}
          onClick={(e) => {
            if (!hasVideo) e.preventDefault();
          }}
        >
          Watch Video
        </a>
      </div>
    </div>
  );
}
