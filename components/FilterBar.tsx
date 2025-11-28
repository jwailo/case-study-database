'use client';

import { Filters, FilterOptions } from '@/types';
import AustraliaMap from './AustraliaMap';
import AgencySizeSelector from './AgencySizeSelector';

interface FilterBarProps {
  filters: Filters;
  filterOptions: FilterOptions;
  onFilterChange: (filters: Filters) => void;
  totalCount: number;
  filteredCount: number;
}

// Map brand names to logo filenames for filter buttons
const brandLogoMap: Record<string, string> = {
  'Barry Plant': '/logos/barry-plant.png',
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
  'Independent': '/logos/independents.png',
};

// Brands to exclude from the filter buttons
const excludedBrands = ['Other Network', 'Consumer'];

function getBrandLogo(brand: string): string | null {
  if (brandLogoMap[brand] !== undefined) {
    return brandLogoMap[brand];
  }
  // Check for partial match
  for (const [key, value] of Object.entries(brandLogoMap)) {
    if (key && brand.toLowerCase().includes(key.toLowerCase())) {
      return value;
    }
  }
  return null;
}

export default function FilterBar({
  filters,
  filterOptions,
  onFilterChange,
  totalCount,
  filteredCount,
}: FilterBarProps) {
  const handleThemeChange = (theme: string) => {
    const newThemes = filters.themes.includes(theme)
      ? filters.themes.filter((t) => t !== theme)
      : [...filters.themes, theme];

    onFilterChange({ ...filters, themes: newThemes });
  };

  const handleBrandChange = (brand: string) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand];

    onFilterChange({ ...filters, brands: newBrands });
  };

  const handleStateToggle = (state: string) => {
    const newStates = filters.states.includes(state)
      ? filters.states.filter((s) => s !== state)
      : [...filters.states, state];

    onFilterChange({ ...filters, states: newStates });
  };

  const handleSelectAllStates = () => {
    onFilterChange({ ...filters, states: [] });
  };

  const handleClearStates = () => {
    onFilterChange({ ...filters, states: [] });
  };

  const handleAgencySizeToggle = (size: string) => {
    const newSizes = filters.agencySizes.includes(size)
      ? filters.agencySizes.filter((s) => s !== size)
      : [...filters.agencySizes, size];

    onFilterChange({ ...filters, agencySizes: newSizes });
  };

  const handleSelectAllAgencySizes = () => {
    onFilterChange({ ...filters, agencySizes: [] });
  };

  const handleClearAgencySizes = () => {
    onFilterChange({ ...filters, agencySizes: [] });
  };

  const handleClearFilters = () => {
    onFilterChange({
      themes: [],
      brands: [],
      states: [],
      agencySizes: [],
    });
  };

  const hasActiveFilters =
    filters.themes.length > 0 ||
    filters.brands.length > 0 ||
    filters.states.length > 0 ||
    filters.agencySizes.length > 0;

  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Theme Bubble Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Filter by Theme
          </label>
          <div className="flex flex-wrap gap-2">
            {filterOptions.themes.map((theme) => {
              const isSelected = filters.themes.includes(theme);
              return (
                <button
                  key={theme}
                  onClick={() => handleThemeChange(theme)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                    isSelected
                      ? 'text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  style={isSelected ? { backgroundColor: '#EE0B4F' } : {}}
                >
                  {theme}
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter Controls - 3 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          {/* Brand Logo Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Brand {filters.brands.length > 0 && `(${filters.brands.length} selected)`}
            </label>
            {/* Toggle buttons */}
            <div className="flex gap-2 mb-3">
              <button
                onClick={() => onFilterChange({ ...filters, brands: [] })}
                className={`px-3 py-1 text-xs font-medium rounded-full transition-all cursor-pointer ${
                  filters.brands.length === 0
                    ? 'bg-[#EE0B4F] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Brands
              </button>
              <button
                onClick={() => onFilterChange({ ...filters, brands: [] })}
                className={`px-3 py-1 text-xs font-medium rounded-full transition-all cursor-pointer ${
                  filters.brands.length > 0
                    ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    : 'bg-gray-100 text-gray-400'
                }`}
                disabled={filters.brands.length === 0}
              >
                Clear
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              {filterOptions.brands
                .filter((brand) => !excludedBrands.includes(brand))
                .map((brand) => {
                  const logo = getBrandLogo(brand);
                  const isSelected = filters.brands.includes(brand);
                  return (
                    <button
                      key={brand}
                      onClick={() => handleBrandChange(brand)}
                      className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#EE0B4F] bg-pink-50 shadow-md'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                      title={brand}
                    >
                      {logo ? (
                        <img
                          src={logo}
                          alt={brand}
                          className="h-[72px] w-[72px] object-contain"
                        />
                      ) : (
                        <span className="px-2 text-sm font-medium text-gray-700">{brand}</span>
                      )}
                    </button>
                  );
                })}
            </div>
          </div>

          {/* State Map Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              State {filters.states.length > 0 && `(${filters.states.length} selected)`}
            </label>
            <AustraliaMap
              selectedStates={filters.states}
              onStateToggle={handleStateToggle}
              onSelectAll={handleSelectAllStates}
              onClearAll={handleClearStates}
            />
          </div>

          {/* Agency Size Selector */}
          <div className="flex flex-col flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Agency Size
            </label>
            <AgencySizeSelector
              selectedSizes={filters.agencySizes}
              onSizeToggle={handleAgencySizeToggle}
              onSelectAll={handleSelectAllAgencySizes}
              onClearAll={handleClearAgencySizes}
            />
          </div>
        </div>

        {/* Results Count and Clear Button */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold">{filteredCount}</span> of{' '}
            <span className="font-semibold">{totalCount}</span> case studies
          </p>

          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="text-sm font-medium hover:underline"
              style={{ color: '#EE0B4F' }}
            >
              Clear all filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
