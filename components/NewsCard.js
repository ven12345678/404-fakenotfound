import React from 'react';
import { FaCheckCircle, FaUserCheck } from 'react-icons/fa';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const NewsCard = ({ 
  title, 
  source, 
  aiVerified, 
  userVerified, 
  factualRating, 
  biasRating,
  stockSymbol,
  stockMovement,
  tags = []
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-2">{title}</h2>
          <p className="text-gray-600 mb-3">{source}</p>
          
          {/* Verification Badges */}
          <div className="flex gap-2 mb-3">
            {aiVerified && (
              <span className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                <FaCheckCircle /> AI Verified
              </span>
            )}
            {userVerified && (
              <span className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                <FaUserCheck /> User Verified
              </span>
            )}
          </div>

          {/* Ratings */}
          <div className="flex gap-4 mb-3">
            <div>
              <span className="text-sm text-gray-600">Factual Rating:</span>
              <div className="w-24 h-2 bg-gray-200 rounded-full mt-1">
                <div 
                  className="h-full bg-green-500 rounded-full" 
                  style={{ width: `${factualRating}%` }}
                />
              </div>
            </div>
            <div>
              <span className="text-sm text-gray-600">Bias Rating:</span>
              <div className="w-24 h-2 bg-gray-200 rounded-full mt-1">
                <div 
                  className="h-full bg-yellow-500 rounded-full" 
                  style={{ width: `${biasRating}%` }}
                />
              </div>
            </div>
          </div>

          {/* Stock Movement */}
          {stockSymbol && (
            <div className="flex items-center gap-2 mb-3">
              <span className="font-medium">{stockSymbol}</span>
              {stockMovement === 'up' ? (
                <FaArrowUp className="text-green-500" />
              ) : (
                <FaArrowDown className="text-red-500" />
              )}
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span 
                key={index}
                className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard; 