import React from 'react';

const FilterBar = ({ mediaItems, activeFilter, onFilterChange }) => {
  // Extract all unique tags from media items
  const getAllTags = () => {
    const allTags = new Set();
    mediaItems.forEach(item => {
      if (item.tags && Array.isArray(item.tags)) {
        item.tags.forEach(tag => allTags.add(tag));
      }
    });
    return Array.from(allTags).sort();
  };

  const uniqueTags = getAllTags();

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Filter by Category</h2>
      <div className="flex flex-wrap gap-3">
        {/* All filter button */}
        <button
          onClick={() => onFilterChange('All')}
          className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
            activeFilter === 'All'
              ? 'bg-wellness-dark-blue text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-wellness-blue hover:text-wellness-dark-blue border border-gray-200'
          }`}
        >
          All
        </button>
        
        {/* Tag filter buttons */}
        {uniqueTags.map((tag) => (
          <button
            key={tag}
            onClick={() => onFilterChange(tag)}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
              activeFilter === tag
                ? 'bg-wellness-dark-blue text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-wellness-blue hover:text-wellness-dark-blue border border-gray-200'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
