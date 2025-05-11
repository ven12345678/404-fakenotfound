import React from 'react';
import { FiSearch } from 'react-icons/fi';

export default function SearchFilter({ onSearch, onFilterChange }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
        {/* Search Input */}
        <div className="flex-grow mb-4 md:mb-0">
          <div className="relative">
            <input
              type="text"
              placeholder="Search news articles..."
              onChange={(e) => onSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <select
            onChange={(e) => onFilterChange('verification', e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white"
          >
            <option value="all">All Verification</option>
            <option value="ai">AI Verified</option>
            <option value="user">User Verified</option>
          </select>

          <select
            onChange={(e) => onFilterChange('factual', e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white"
          >
            <option value="all">All Factual Ratings</option>
            <option value="high">High Factual (80%+)</option>
            <option value="medium">Medium Factual (50-79%)</option>
            <option value="low">Low Factual (&lt;50%)</option>
          </select>

          <select
            onChange={(e) => onFilterChange('bias', e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white"
          >
            <option value="all">All Bias Levels</option>
            <option value="low">Low Bias (&lt;30%)</option>
            <option value="medium">Medium Bias (30-60%)</option>
            <option value="high">High Bias (&gt;60%)</option>
          </select>
        </div>
      </div>
    </div>
  );
} 