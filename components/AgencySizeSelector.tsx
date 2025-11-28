'use client';

interface AgencySizeSelectorProps {
  selectedSizes: string[];
  onSizeToggle: (size: string) => void;
  onSelectAll: () => void;
  onClearAll: () => void;
}

// Agency size options with their display info
const agencySizes = [
  {
    value: 'Less than 400 PUM',
    label: 'Less than 400 PUM',
    shortLabel: '<400 PUM',
    iconSize: 32, // smallest
  },
  {
    value: '400 - 1000 PUM',
    label: '400 - 1000 PUM',
    shortLabel: '400-1000 PUM',
    iconSize: 48, // medium
  },
  {
    value: '1000+ PUM',
    label: '1000+ PUM',
    shortLabel: '1000+ PUM',
    iconSize: 64, // largest
  },
];

export default function AgencySizeSelector({
  selectedSizes,
  onSizeToggle,
  onSelectAll,
  onClearAll,
}: AgencySizeSelectorProps) {
  const allSelected = selectedSizes.length === 0 || selectedSizes.length === agencySizes.length;
  const isSelected = (size: string) => selectedSizes.includes(size);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      {/* Toggle buttons */}
      <div className="flex gap-2 mb-2">
        <button
          onClick={onSelectAll}
          className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
            allSelected
              ? 'bg-[#EE0B4F] text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Sizes
        </button>
        <button
          onClick={onClearAll}
          className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
            selectedSizes.length > 0 && selectedSizes.length < agencySizes.length
              ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              : 'bg-gray-100 text-gray-400'
          }`}
          disabled={selectedSizes.length === 0}
        >
          Clear
        </button>
      </div>

      {/* Size buttons - aligned at bottom */}
      <div className="flex items-end justify-center gap-2">
        {agencySizes.map((size) => {
          // When nothing selected (all), show all as highlighted
          const showSelected = selectedSizes.length === 0 || isSelected(size.value);
          return (
            <button
              key={size.value}
              onClick={() => onSizeToggle(size.value)}
              className={`flex flex-col items-center p-2 rounded-xl border-2 transition-all ${
                showSelected
                  ? 'border-[#EE0B4F] bg-pink-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
              }`}
              title={size.label}
            >
              {/* Icon with graduated sizes */}
              <div className="flex items-center justify-center mb-1">
                <img
                  src="/agency-size-icon.png"
                  alt={size.label}
                  style={{
                    width: size.iconSize,
                    height: size.iconSize,
                    filter: showSelected ? 'none' : 'grayscale(30%)',
                    opacity: showSelected ? 1 : 0.7,
                  }}
                  className="object-contain transition-all"
                />
              </div>

              {/* Label */}
              <span
                className={`text-[10px] font-medium text-center whitespace-nowrap transition-colors ${
                  showSelected ? 'text-[#EE0B4F]' : 'text-gray-500'
                }`}
              >
                {size.shortLabel}
              </span>
            </button>
          );
        })}
      </div>

    </div>
  );
}
