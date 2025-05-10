import React, { useState } from 'react';
import { FaCheckCircle, FaUserCheck, FaFlag, FaThumbsUp, FaThumbsDown, FaRobot } from 'react-icons/fa';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const NewsCard = ({ 
  title, 
  summary,
  source, 
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
  publishDate,
  lastUpdated,
  author,
  category,
  tags = [],
  onVerify,
  onFlag
}) => {
  const [isVerified, setIsVerified] = useState(userVerified);
  const [isFlagged, setIsFlagged] = useState(false);

  const handleVerify = () => {
    setIsVerified(!isVerified);
    onVerify && onVerify(!isVerified);
  };

  const handleFlag = () => {
    setIsFlagged(!isFlagged);
    onFlag && onFlag(!isFlagged);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition-shadow">
      <div className="flex flex-col">
        {/* Title and Source */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <div className="flex items-center gap-4 text-gray-600">
            <p>Source: {source}</p>
            <p>•</p>
            <p>By {author}</p>
            <p>•</p>
            <p>Published: {publishDate}</p>
            {lastUpdated && (
              <>
                <p>•</p>
                <p>Updated: {lastUpdated}</p>
              </>
            )}
          </div>
        </div>

        {/* Summary */}
        <div className="mb-4">
          <p className="text-gray-700">{summary}</p>
        </div>

        {/* Verification and Flagging */}
        <div className="flex gap-4 mb-4">
          <div className="flex gap-2">
            {aiVerified && (
              <span className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                <FaCheckCircle /> AI Verified
              </span>
            )}
            {isVerified && (
              <span className="flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                <FaUserCheck /> User Verified
              </span>
            )}
            {aiFlagged && (
              <span className="flex items-center gap-1 bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                <FaRobot /> AI Flagged: {aiFlagReason}
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleVerify}
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                isVerified 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <FaThumbsUp /> {isVerified ? 'Verified' : 'Verify'}
            </button>
            <button
              onClick={handleFlag}
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                isFlagged 
                  ? 'bg-red-100 text-red-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <FaFlag /> {isFlagged ? 'Flagged' : 'Flag'}
            </button>
          </div>
        </div>

        {/* Category */}
        <div className="mb-4">
          <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
            {category}
          </span>
        </div>

        {/* Ratings */}
        <div className="flex gap-6 mb-4">
          <div>
            <span className="text-sm text-gray-600">Factual Rating:</span>
            <div className="w-32 h-2 bg-gray-200 rounded-full mt-1">
              <div 
                className="h-full bg-green-500 rounded-full" 
                style={{ width: `${factualRating}%` }}
              />
            </div>
          </div>
          <div>
            <span className="text-sm text-gray-600">Bias Rating:</span>
            <div className="w-32 h-2 bg-gray-200 rounded-full mt-1">
              <div 
                className="h-full bg-yellow-500 rounded-full" 
                style={{ width: `${biasRating}%` }}
              />
            </div>
          </div>
        </div>

        {/* Stock Information */}
        {stockSymbol && (
          <div className="bg-gray-50 p-3 rounded-lg mb-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium text-lg">{stockSymbol}</span>
                <span className="ml-2 text-gray-600">${stockPrice}</span>
              </div>
              <div className="flex items-center gap-2">
                {stockMovement === 'up' ? (
                  <FaArrowUp className="text-green-500" />
                ) : (
                  <FaArrowDown className="text-red-500" />
                )}
                <span className={stockMovement === 'up' ? 'text-green-500' : 'text-red-500'}>
                  {stockChange}%
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span 
              key={index}
              className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsCard; 