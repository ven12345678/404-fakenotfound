import React from 'react';

const SearchFilter = ({ onSearch, onFilterChange }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search news..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        {/* Filter Options */}
        <div className="flex gap-4">
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => onFilterChange('verification', e.target.value)}
          >
            <option value="all">All Verifications</option>
            <option value="ai">AI Verified</option>
            <option value="user">User Verified</option>
          </select>

          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => onFilterChange('factual', e.target.value)}
          >
            <option value="all">All Factual Ratings</option>
            <option value="high">High Factual</option>
            <option value="medium">Medium Factual</option>
            <option value="low">Low Factual</option>
          </select>

          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => onFilterChange('bias', e.target.value)}
          >
            <option value="all">All Bias Levels</option>
            <option value="low">Low Bias</option>
            <option value="medium">Medium Bias</option>
            <option value="high">High Bias</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter; 