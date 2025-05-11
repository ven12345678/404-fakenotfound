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
  onFlag,
  link
}) => {
  const [isVerified, setIsVerified] = useState(userVerified);
  const [isFlagged, setIsFlagged] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleVerify = () => {
    if (!isFlagged) {
      setIsVerified(!isVerified);
      onVerify && onVerify(!isVerified);
    }
  };

  const handleFlag = () => {
    if (!isVerified) {
      setIsFlagged(!isFlagged);
      onFlag && onFlag(!isFlagged);
    }
  };

  // Placeholder for extended details
  const longSummary =
    title === "Malaysia Unlikely to Escape Trump Tariffs, Says Former US Trade Negotiator"
      ? `Malaysia is facing a challenging trade environment as the US, under President Donald Trump, has imposed a 24% tariff on most Malaysian goods. Despite Malaysia's efforts to negotiate and highlight its significant investments in the US, experts believe the country has limited leverage. Stephen Olson, a former US trade negotiator, suggests that even strong retaliatory measures from Malaysia are unlikely to sway the US administration.

The US remains Malaysia's third largest trading partner, and the tariffs, currently paused for 90 days, are part of a broader set of US trade actions affecting over 60 countries. Malaysian officials are focusing on emphasizing the mutual benefits of trade and exploring other pressure points, but a complete removal of tariffs appears unlikely in the near term.`
      : summary;

  const tradingInsights = {
    sentiment: `The overall sentiment of the articles is negative, as experts question the administration's ability to achieve its ambitious goal and highlight the significant challenges involved in managing multiple trade negotiations simultaneously.`,
    recommendations: [
      {
        ticker: 'EUFX',
        direction: 'up',
        description: `The European Union's strong trade position and the potential for a resolution to the trade war could lead to a strengthening of the euro against the US dollar.`
      },
      {
        ticker: 'US Steel (X)',
        direction: 'down',
        description: `The uncertainty and potential escalation of the trade war could lead to decreased demand for US steel exports, negatively impacting the stock price.`
      }
    ]
  };

  const originalSources =
  title === "Malaysia Unlikely to Escape Trump Tariffs, Says Former US Trade Negotiator"
      ? `https://www.freemalaysiatoday.com/category/nation/2025/05/09/malaysia-unlikely-to-escape-trump-tariffs-says-former-us-trade-negotiator`
      : "Original sources will appear here.";
  
  return (
    <>
      <div
        className="bg-white rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition-shadow cursor-pointer"
        onClick={() => setShowModal(true)}
      >
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
            <p className="text-gray-700">{summary} {link && (
              <a href={link} target="_blank" rel="noopener noreferrer" className="text-cyan-700 underline ml-2" onClick={e => e.stopPropagation()}>Read more</a>
            )}</p>
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
                onClick={e => { e.stopPropagation(); handleVerify(); }}
                disabled={isFlagged}
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-colors
                  ${isVerified ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                  ${isFlagged ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <FaThumbsUp /> {isVerified ? 'Verified' : 'Verify'}
              </button>
              <button
                onClick={e => { e.stopPropagation(); handleFlag(); }}
                disabled={isVerified}
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-colors
                  ${isFlagged ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}
                  ${isVerified ? 'opacity-50 cursor-not-allowed' : ''}`}
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

          {/* Trading Insights */}
          <div className="mb-4">
            <h3 className="font-semibold mb-1">Trading Insights</h3>
            <p className="mb-6">{tradingInsights.sentiment}</p>
            {tradingInsights.recommendations.length > 0 && (
              <div className="bg-gray-100 rounded-xl p-6">
                <h4 className="font-bold mb-4">Recommendations</h4>
                {tradingInsights.recommendations.map((rec, idx) => (
                  <div key={rec.ticker} className="flex items-start gap-4 mb-4 last:mb-0">
                    <div className={`w-8 h-8 flex items-center justify-center rounded-full ${rec.direction === 'up' ? 'bg-green-100' : 'bg-red-100'}`}>
                      {rec.direction === 'up' ? (
                        <span className="text-green-500 text-xl">↑</span>
                      ) : (
                        <span className="text-red-500 text-xl">↓</span>
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-base">{rec.ticker}</div>
                      <div className="text-gray-700 text-sm">{rec.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal for details */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex">
          <div className="bg-white w-full h-full overflow-y-auto relative p-0 md:p-0">
            <button
              className="fixed top-6 right-8 z-50 text-gray-500 hover:text-gray-700 text-3xl"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <div className="max-w-2xl mx-auto py-12 px-4 sm:px-8">
              <h2 className="text-2xl font-bold mb-4">{title}</h2>
              <div className="mb-4 text-gray-700">
                <p className="mb-2">{longSummary}</p>
              </div>
              <div className="mb-4">
                <h3 className="font-semibold mb-1">Trading Insights</h3>
                <p className="mb-6">{tradingInsights.sentiment}</p>
                {tradingInsights.recommendations.length > 0 && (
                  <div className="bg-gray-100 rounded-xl p-6">
                    <h4 className="font-bold mb-4">Recommendations</h4>
                    {tradingInsights.recommendations.map((rec, idx) => (
                      <div key={rec.ticker} className="flex items-start gap-4 mb-4 last:mb-0">
                        <div className={`w-8 h-8 flex items-center justify-center rounded-full ${rec.direction === 'up' ? 'bg-green-100' : 'bg-red-100'}`}>
                          {rec.direction === 'up' ? (
                            <span className="text-green-500 text-xl">↑</span>
                          ) : (
                            <span className="text-red-500 text-xl">↓</span>
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-base">{rec.ticker}</div>
                          <div className="text-gray-700 text-sm">{rec.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="mb-4">
                <h3 className="font-semibold mb-1">Original Sources</h3>
                <div className="bg-gray-100 rounded-lg p-4">
                  <a
                    href={originalSources}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-700 underline break-all text-base font-medium"
                  >
                    {originalSources}
                  </a>
                </div>
              </div>
              {link && (
                <a href={link} target="_blank" rel="noopener noreferrer" className="text-cyan-700 underline font-medium">Read the full article at the original source</a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewsCard; 