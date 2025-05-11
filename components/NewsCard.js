import React from 'react';
import { FiCheck, FiFlag, FiAlertTriangle } from 'react-icons/fi';

export default function NewsCard({
  title,
  summary,
  source,
  author,
  publishDate,
  lastUpdated,
  category,
  aiVerified,
  userVerified,
  aiFlagged,
  aiFlagReason,
  factualRating,
  biasRating,
  stockSymbol,
  stockPrice,
  stockChange,
  stockMovement,
  tags,
  onVerify,
  onFlag
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
          <p className="text-gray-600 text-sm mb-2">
            By {author} • {source} • {publishDate}
            {lastUpdated && ` • Updated: ${lastUpdated}`}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {aiVerified && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <FiCheck className="w-3 h-3 mr-1" />
              AI Verified
            </span>
          )}
          {userVerified && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              <FiCheck className="w-3 h-3 mr-1" />
              User Verified
            </span>
          )}
          {aiFlagged && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
              <FiAlertTriangle className="w-3 h-3 mr-1" />
              AI Flagged
            </span>
          )}
        </div>
      </div>

      <p className="text-gray-700 mb-4">{summary}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-700 mr-2">Factual:</span>
            <div className="w-24 h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 rounded-full"
                style={{
                  width: `${factualRating}%`,
                  backgroundColor: factualRating >= 80 ? '#10B981' : factualRating >= 50 ? '#F59E0B' : '#EF4444'
                }}
              />
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-700 mr-2">Bias:</span>
            <div className="w-24 h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 rounded-full"
                style={{
                  width: `${biasRating}%`,
                  backgroundColor: biasRating <= 30 ? '#10B981' : biasRating <= 60 ? '#F59E0B' : '#EF4444'
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onVerify(!userVerified)}
            className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-medium ${
              userVerified
                ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            <FiCheck className="w-4 h-4 mr-1" />
            {userVerified ? 'Verified' : 'Verify'}
          </button>
          <button
            onClick={() => onFlag(true)}
            className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200"
          >
            <FiFlag className="w-4 h-4 mr-1" />
            Flag
          </button>
        </div>
      </div>
    </div>
  );
} 