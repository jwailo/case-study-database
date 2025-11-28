'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { CaseStudy, Filters, FilterOptions } from '@/types';
import CaseStudyCard from '@/components/CaseStudyCard';
import FilterBar from '@/components/FilterBar';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function Home() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState<Filters>({
    themes: [],
    brands: [],
    states: [],
    agencySizes: [],
  });
  const router = useRouter();

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const fetchCaseStudies = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/case-studies');

      if (!response.ok) {
        throw new Error('Failed to fetch case studies');
      }

      const data = await response.json();
      setCaseStudies(data);
    } catch (err) {
      setError('Failed to load case studies. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  };

  // Extract unique filter options from case studies
  const filterOptions: FilterOptions = useMemo(() => {
    const themes = new Set<string>();
    const brands = new Set<string>();
    const states = new Set<string>();
    const agencySizes = new Set<string>();

    caseStudies.forEach((cs) => {
      if (cs.brand) brands.add(cs.brand);
      if (cs.state) states.add(cs.state);
      if (cs.agencySize && cs.agencySize !== 'N/A') agencySizes.add(cs.agencySize);

      // Split themes by comma
      cs.theme.split(',').forEach((theme) => {
        const trimmed = theme.trim();
        if (trimmed) themes.add(trimmed);
      });
    });

    return {
      themes: Array.from(themes).sort(),
      brands: Array.from(brands).sort(),
      states: Array.from(states).sort(),
      agencySizes: Array.from(agencySizes).sort(),
    };
  }, [caseStudies]);

  // Filter case studies based on active filters
  const filteredCaseStudies = useMemo(() => {
    return caseStudies.filter((cs) => {
      // Theme filter (ANY match - OR logic for multiple selected themes)
      if (filters.themes.length > 0) {
        const csThemes = cs.theme.split(',').map((t) => t.trim());
        const hasMatchingTheme = filters.themes.some((filterTheme) =>
          csThemes.includes(filterTheme)
        );
        if (!hasMatchingTheme) return false;
      }

      // Brand filter (ANY match - OR logic for multiple selected brands)
      if (filters.brands.length > 0) {
        if (!filters.brands.includes(cs.brand)) {
          return false;
        }
      }

      // State filter (ANY match - OR logic for multiple selected states)
      if (filters.states.length > 0) {
        if (!filters.states.includes(cs.state)) {
          return false;
        }
      }

      // Agency size filter (ANY match - OR logic for multiple selected sizes)
      if (filters.agencySizes.length > 0) {
        if (!filters.agencySizes.includes(cs.agencySize)) {
          return false;
        }
      }

      return true;
    });
  }, [caseStudies, filters]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold" style={{ color: '#EE0B4F' }}>
              Ailo Case Study Database
            </h1>
          </div>
        </header>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
          <div className="text-center">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Error</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={fetchCaseStudies}
              className="px-4 py-2 rounded-lg text-white font-semibold"
              style={{ backgroundColor: '#EE0B4F' }}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold" style={{ color: '#EE0B4F' }}>
            Ailo Case Study Database
          </h1>
          <button
            onClick={handleLogout}
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Filter Bar */}
      <FilterBar
        filters={filters}
        filterOptions={filterOptions}
        onFilterChange={setFilters}
        totalCount={caseStudies.length}
        filteredCount={filteredCaseStudies.length}
      />

      {/* Case Studies Grid */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {filteredCaseStudies.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No case studies found
            </h2>
            <p className="text-gray-600 mb-6">
              Try adjusting your filters to see more results.
            </p>
            <button
              onClick={() =>
                setFilters({
                  themes: [],
                  brands: [],
                  states: [],
                  agencySizes: [],
                })
              }
              className="px-4 py-2 rounded-lg text-white font-semibold"
              style={{ backgroundColor: '#EE0B4F' }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCaseStudies.map((caseStudy, index) => (
              <CaseStudyCard key={index} caseStudy={caseStudy} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
