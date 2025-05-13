import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ProfileDashboard from '../components/ProfileDashboard';
import { FiAward, FiCheck, FiX, FiX as FiClose, FiDollarSign } from 'react-icons/fi';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFeed, setShowFeed] = useState(false);
  const [lastVerificationDate, setLastVerificationDate] = useState(null);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [tokens, setTokens] = useState(0);
  const [achievements, setAchievements] = useState([
    {
      title: 'First Verification',
      description: 'Complete your first news verification',
      completed: false,
      progress: 0
    },
    {
      title: '10 Streak',
      description: 'Verify news for 10 days in a row',
      completed: false,
      progress: 0,
      streak: 0
    },
    {
      title: 'Accuracy Expert',
      description: 'Maintain 90% accuracy for a month',
      completed: false,
      progress: 0
    },
    {
      title: 'Community Leader',
      description: 'Help 50 users with verifications',
      completed: false,
      progress: 0
    }
  ]);

  // Sample news data
  const [feedNews, setFeedNews] = useState([
    {
      id: 1,
      title: "Tech Giant Announces Revolutionary AI Breakthrough",
      source: "Tech Daily",
      author: "Sarah Johnson",
      publishDate: "2024-03-15",
      lastUpdated: "2024-03-15 14:30",
      content: "A leading technology company has unveiled a groundbreaking AI system that can process and analyze complex data patterns in real-time, potentially revolutionizing multiple industries from healthcare to finance. The system, developed after five years of research, has shown unprecedented accuracy in predicting market trends and medical diagnoses.",
      category: "Technology",
      aiVerified: true,
      userVerified: false,
      factualRating: 95,
      biasRating: 15,
      tags: ["AI", "Technology", "Innovation", "Healthcare", "Finance", "Research"],
      tradingInsights: {
        sentiment: "negative",
        explanation: "The overall sentiment of the articles is negative, as experts question the administration's ability to achieve its ambitious goal and highlight the significant challenges involved in managing multiple trade negotiations simultaneously.",
        recommendations: [
          {
            symbol: "EUFX",
            direction: "up",
            reason: "The European Union's strong trade position and the potential for a resolution to the trade war could lead to a strengthening of the euro against the US dollar."
          },
          {
            symbol: "US Steel (X)",
            direction: "down",
            reason: "The uncertainty and potential escalation of the trade war could lead to decreased demand for US steel exports, negatively impacting the stock price."
          }
        ]
      }
    },
    {
      id: 2,
      title: "Global Markets React to New Economic Policy",
      source: "Financial Times",
      author: "Michael Chen",
      publishDate: "2024-03-14",
      lastUpdated: "2024-03-14 16:45",
      content: "Financial markets worldwide showed significant volatility following the announcement of new economic policies aimed at curbing inflation while maintaining growth. Major indices experienced sharp movements as investors digested the implications. The policy changes, announced by the central bank, include a 0.5% interest rate adjustment and new regulatory measures for financial institutions.",
      category: "Finance",
      aiVerified: false,
      userVerified: true,
      factualRating: 60,
      biasRating: 45,
      tags: ["Economy", "Markets", "Policy", "Inflation", "Investing", "Banking"],
      tradingInsights: {
        sentiment: "negative",
        explanation: "The overall sentiment of the articles is negative, as experts question the administration's ability to achieve its ambitious goal and highlight the significant challenges involved in managing multiple trade negotiations simultaneously.",
        recommendations: [
          {
            symbol: "EUFX",
            direction: "up",
            reason: "The European Union's strong trade position and the potential for a resolution to the trade war could lead to a strengthening of the euro against the US dollar."
          },
          {
            symbol: "US Steel (X)",
            direction: "down",
            reason: "The uncertainty and potential escalation of the trade war could lead to decreased demand for US steel exports, negatively impacting the stock price."
          }
        ]
      }
    },
    {
      id: 3,
      title: "Climate Change Report Reveals Accelerating Impact",
      source: "Environmental Watch",
      author: "Dr. Emily Rodriguez",
      publishDate: "2024-03-13",
      content: "A comprehensive new study published in Nature shows that climate change effects are occurring faster than previously predicted, with significant implications for global ecosystems and human populations. The research, conducted by an international team of scientists, analyzed data from over 100 monitoring stations worldwide.",
      category: "Science",
      aiVerified: false,
      userVerified: false,
      aiFlagged: true,
      factualRating: 40,
      biasRating: 80,
      tags: ["Climate", "Environment", "Science", "Global Warming", "Research"],
      tradingInsights: {
        sentiment: "negative",
        explanation: "The overall sentiment of the articles is negative, as experts question the administration's ability to achieve its ambitious goal and highlight the significant challenges involved in managing multiple trade negotiations simultaneously.",
        recommendations: [
          {
            symbol: "EUFX",
            direction: "up",
            reason: "The European Union's strong trade position and the potential for a resolution to the trade war could lead to a strengthening of the euro against the US dollar."
          },
          {
            symbol: "US Steel (X)",
            direction: "down",
            reason: "The uncertainty and potential escalation of the trade war could lead to decreased demand for US steel exports, negatively impacting the stock price."
          }
        ]
      }
    },
    {
      id: 4,
      title: "Major Breakthrough in Quantum Computing",
      source: "Science Daily",
      author: "Prof. James Wilson",
      publishDate: "2024-03-12",
      lastUpdated: "2024-03-12 09:15",
      content: "Scientists at a leading research institute have achieved quantum supremacy with a new 128-qubit processor, solving complex calculations in minutes that would take traditional computers years to complete. This breakthrough could accelerate drug discovery and climate modeling.",
      category: "Science",
      aiVerified: true,
      userVerified: true,
      factualRating: 85,
      biasRating: 25,
      tags: ["Quantum Computing", "Technology", "Research", "Science", "Innovation"],
      tradingInsights: {
        sentiment: "negative",
        explanation: "The overall sentiment of the articles is negative, as experts question the administration's ability to achieve its ambitious goal and highlight the significant challenges involved in managing multiple trade negotiations simultaneously.",
        recommendations: [
          {
            symbol: "EUFX",
            direction: "up",
            reason: "The European Union's strong trade position and the potential for a resolution to the trade war could lead to a strengthening of the euro against the US dollar."
          },
          {
            symbol: "US Steel (X)",
            direction: "down",
            reason: "The uncertainty and potential escalation of the trade war could lead to decreased demand for US steel exports, negatively impacting the stock price."
          }
        ]
      }
    },
    {
      id: 5,
      title: "Controversial Social Media Post Goes Viral",
      source: "Social Media Watch",
      author: "Lisa Thompson",
      publishDate: "2024-03-11",
      content: "A viral social media post claiming to reveal 'secret government documents' has been flagged by our AI system for potential misinformation. The post contains several factual inaccuracies and has been shared over 100,000 times. Experts warn about the dangers of spreading unverified information.",
      category: "Social Media",
      aiVerified: false,
      userVerified: false,
      factualRating: 30,
      biasRating: 90,
      tags: ["Social Media", "Misinformation", "Viral", "Fact Check"],
      tradingInsights: {
        sentiment: "negative",
        explanation: "The overall sentiment of the articles is negative, as experts question the administration's ability to achieve its ambitious goal and highlight the significant challenges involved in managing multiple trade negotiations simultaneously.",
        recommendations: [
          {
            symbol: "EUFX",
            direction: "up",
            reason: "The European Union's strong trade position and the potential for a resolution to the trade war could lead to a strengthening of the euro against the US dollar."
          },
          {
            symbol: "US Steel (X)",
            direction: "down",
            reason: "The uncertainty and potential escalation of the trade war could lead to decreased demand for US steel exports, negatively impacting the stock price."
          }
        ]
      }
    },
    {
      id: 6,
      title: "New Study Links Diet to Longevity",
      source: "Health Journal",
      author: "Dr. Maria Garcia",
      publishDate: "2024-03-10",
      content: "A comprehensive 20-year study involving 100,000 participants has found a strong correlation between Mediterranean diet patterns and increased lifespan. The research, published in the Journal of Nutrition, shows participants following the diet had a 25% lower risk of premature death.",
      category: "Health",
      aiVerified: true,
      userVerified: true,
      aiFlagged: true,
      factualRating: 75,
      biasRating: 55,
      tags: ["Health", "Nutrition", "Research", "Longevity", "Diet"],
      tradingInsights: {
        sentiment: "negative",
        explanation: "The overall sentiment of the articles is negative, as experts question the administration's ability to achieve its ambitious goal and highlight the significant challenges involved in managing multiple trade negotiations simultaneously.",
        recommendations: [
          {
            symbol: "EUFX",
            direction: "up",
            reason: "The European Union's strong trade position and the potential for a resolution to the trade war could lead to a strengthening of the euro against the US dollar."
          },
          {
            symbol: "US Steel (X)",
            direction: "down",
            reason: "The uncertainty and potential escalation of the trade war could lead to decreased demand for US steel exports, negatively impacting the stock price."
          }
        ]
      }
    },
    {
      id: 7,
      title: "Malaysia Unlikely to Escape Trump Tariffs, Says Former US Trade Negotiator",
      source: "Free Malaysia Today",
      author: "Jason Thomas",
      publishDate: "2025-05-09",
      content: "A former US trade negotiator, Stephen Olson, states that Malaysia is unlikely to fully eliminate the 24% tariff imposed by US President Donald Trump on most Malaysian goods. Despite ongoing negotiations and Malaysia's efforts to highlight its investments in the US, Olson believes Malaysia has limited leverage and that Trump is unlikely to be swayed by threats of retaliation. The US remains Malaysia's third largest trading partner, and the tariffs, currently paused for 90 days, are part of broader US trade actions.",
      category: "World",
      aiVerified: true,
      userVerified: false,
      factualRating: 90,
      biasRating: 20,
      tags: ["Malaysia", "US", "Tariffs", "Trade", "Donald Trump"],
      tradingInsights: {
        sentiment: "negative",
        explanation: "The overall sentiment of the articles is negative, as experts question the administration's ability to achieve its ambitious goal and highlight the significant challenges involved in managing multiple trade negotiations simultaneously.",
        recommendations: [
          {
            symbol: "EUFX",
            direction: "up",
            reason: "The European Union's strong trade position and the potential for a resolution to the trade war could lead to a strengthening of the euro against the US dollar."
          },
          {
            symbol: "US Steel (X)",
            direction: "down",
            reason: "The uncertainty and potential escalation of the trade war could lead to decreased demand for US steel exports, negatively impacting the stock price."
          }
        ]
      }
    }
  ]);

  // Load streak data from localStorage on component mount
  useEffect(() => {
    const savedLastVerification = localStorage.getItem('lastVerificationDate');
    const savedStreak = localStorage.getItem('currentStreak');
    
    if (savedLastVerification) {
      setLastVerificationDate(new Date(savedLastVerification));
      setCurrentStreak(parseInt(savedStreak) || 0);
      
      // Check if streak should be reset (missed a day)
      const lastVerification = new Date(savedLastVerification);
      const today = new Date();
      const daysSinceLastVerification = Math.floor((today - lastVerification) / (1000 * 60 * 60 * 24));
      
      if (daysSinceLastVerification > 1) {
        setCurrentStreak(0);
        localStorage.setItem('currentStreak', '0');
        
        // Reset streak achievement progress
        setAchievements(prev => prev.map(achievement => 
          achievement.title === '10 Streak' 
            ? { ...achievement, progress: 0, streak: 0 }
            : achievement
        ));
      }
    }
  }, []);

  // Load tokens from localStorage on mount
  useEffect(() => {
    const savedTokens = localStorage.getItem('userTokens');
    if (savedTokens) {
      setTokens(parseInt(savedTokens));
    }
  }, []);

  const updateStreak = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to start of day

    if (lastVerificationDate) {
      const lastVerification = new Date(lastVerificationDate);
      lastVerification.setHours(0, 0, 0, 0);
      
      const daysSinceLastVerification = Math.floor((today - lastVerification) / (1000 * 60 * 60 * 24));
      
      if (daysSinceLastVerification === 1) {
        // Next consecutive day
        const newStreak = currentStreak + 1;
        setCurrentStreak(newStreak);
        localStorage.setItem('currentStreak', newStreak.toString());
        return newStreak;
      } else if (daysSinceLastVerification === 0) {
        // Same day, maintain streak
        return currentStreak;
      } else {
        // Missed a day, reset streak
        setCurrentStreak(1);
        localStorage.setItem('currentStreak', '1');
        return 1;
      }
    } else {
      // First verification ever
      setCurrentStreak(1);
      localStorage.setItem('currentStreak', '1');
      return 1;
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        router.replace('/login');
        return;
      }

      try {
        const response = await fetch('/api/protected/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Not authenticated');
        }

        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.error('Authentication error:', error);
        localStorage.removeItem('token');
        router.replace('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.replace('/login');
  };

  const handleVerify = (newsId) => {
    // Update news verification status first
    setFeedNews(prevNews => {
      const updatedNews = prevNews.map(news => {
        if (news.id === newsId) {
          const newVerifiedState = !news.userVerified;
          
          // Award tokens only when verifying (not when un-verifying)
          if (newVerifiedState) {
            const newTokens = tokens + 15;
            setTokens(newTokens);
            localStorage.setItem('userTokens', newTokens.toString());
            
            // Show token earning notification
            const notification = document.createElement('div');
            notification.className = 'fixed bottom-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded';
            notification.innerHTML = `<div class="flex items-center"><svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>Earned 15 tokens!</div>`;
            document.body.appendChild(notification);
            setTimeout(() => notification.remove(), 3000);
          }
          
          return { ...news, userVerified: newVerifiedState };
        }
        return news;
      });
      
      // After updating news, update achievements
      const verifiedCount = updatedNews.filter(news => news.userVerified).length;
      
      // Update last verification date and streak
      const today = new Date();
      setLastVerificationDate(today);
      localStorage.setItem('lastVerificationDate', today.toISOString());
      
      const updatedStreak = updateStreak();
      
      setAchievements(prevAchievements => {
        const newAchievements = [...prevAchievements];

        // First Verification Achievement
        if (verifiedCount > 0 && !newAchievements[0].completed) {
          newAchievements[0] = {
            ...newAchievements[0],
            completed: true,
            progress: 100
          };
        }

        // 10 Streak Achievement - now based on consecutive days
        const streakProgress = Math.min((updatedStreak / 10) * 100, 100);
        newAchievements[1] = {
          ...newAchievements[1],
          completed: streakProgress === 100,
          progress: streakProgress,
          streak: updatedStreak
        };

        // Accuracy Expert Achievement
        const accurateVerifications = updatedNews.filter(news => 
          news.userVerified && news.aiVerified
        ).length;
        const accuracyRate = verifiedCount > 0 
          ? (accurateVerifications / verifiedCount) * 100 
          : 0;
        const accuracyProgress = Math.min(accuracyRate, 100);
        newAchievements[2] = {
          ...newAchievements[2],
          completed: accuracyProgress >= 90,
          progress: accuracyProgress
        };

        // Community Leader Achievement
        const communityProgress = Math.min((verifiedCount / 50) * 100, 100);
        newAchievements[3] = {
          ...newAchievements[3],
          completed: communityProgress === 100,
          progress: communityProgress
        };

        return newAchievements;
      });

      return updatedNews;
    });
  };

  const handleFlag = (newsId) => {
    setFeedNews(prevNews => 
      prevNews.map(news => 
        news.id === newsId 
          ? { ...news, userFlagged: !news.userFlagged }
          : news
      )
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center px-4 py-2 rounded-lg bg-yellow-50 text-yellow-700">
                <FiDollarSign className="w-5 h-5 mr-2" />
                <span className="font-medium">{tokens} tokens</span>
              </div>
              <button 
                onClick={() => setShowFeed(true)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Your Feed
              </button>
              <Link 
                href="/profile"
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Feed Modal */}
      {showFeed && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
          <div className="min-h-screen px-4 text-center">
            <div className="inline-block w-full max-w-6xl my-8 text-left align-middle bg-white rounded-lg shadow-xl transform transition-all">
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-2xl font-bold">Your Feed</h2>
                <button
                  onClick={() => setShowFeed(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <FiClose className="w-6 h-6" />
                </button>
              </div>
              <div className="p-6 max-h-[80vh] overflow-y-auto">
                {feedNews.map(news => (
                  <div key={news.id} className="mb-8 border rounded-lg p-6">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold mb-2">{news.title}</h3>
                      <div className="flex items-center text-sm text-gray-500 space-x-2 mb-2">
                        <span>Source: {news.source}</span>
                        <span>•</span>
                        <span>By {news.author}</span>
                        <span>•</span>
                        <span>Published: {news.publishDate}</span>
                        {news.lastUpdated && (
                          <>
                            <span>•</span>
                            <span>Updated: {news.lastUpdated}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{news.content}</p>

                    <div className="flex items-center space-x-4 mb-4">
                      {news.aiVerified && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          AI Verified
                        </span>
                      )}
                      <button 
                        onClick={() => handleVerify(news.id)}
                        className={`inline-flex items-center px-3 py-1 rounded-lg border text-sm hover:bg-gray-50 ${
                          news.userVerified 
                            ? 'border-green-500 bg-green-50 text-green-700' 
                            : 'border-gray-300 text-gray-700'
                        }`}
                      >
                        {news.userVerified ? (
                          'Verified'
                        ) : (
                          <>
                            Verify
                            <span className="ml-2 flex items-center text-yellow-600">
                              <FiDollarSign className="w-4 h-4 mr-1" />
                              15
                            </span>
                          </>
                        )}
                      </button>
                      <button 
                        onClick={() => handleFlag(news.id)}
                        className={`px-3 py-1 rounded-lg border text-sm hover:bg-gray-50 ${
                          news.userFlagged 
                            ? 'border-red-500 bg-red-50 text-red-700' 
                            : 'border-gray-300 text-gray-700'
                        }`}
                      >
                        {news.userFlagged ? 'Flagged' : 'Flag'}
                      </button>
                      <span className="text-sm text-gray-500">{news.category}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <span className="text-sm text-gray-500">Factual Rating:</span>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${news.factualRating}%` }}
                          />
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Bias Rating:</span>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-yellow-500 h-2 rounded-full"
                            style={{ width: `${news.biasRating}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {news.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 rounded-full bg-gray-100 text-sm text-gray-600">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Trading Insights</h4>
                      <p className="text-sm text-gray-600 mb-4">{news.tradingInsights.explanation}</p>
                      <div className="space-y-2">
                        {news.tradingInsights.recommendations.map((rec, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <span className={`text-${rec.direction === 'up' ? 'green' : 'red'}-500`}>
                              {rec.direction === 'up' ? '↑' : '↓'}
                            </span>
                            <div>
                              <span className="font-medium">{rec.symbol}</span>
                              <p className="text-sm text-gray-600">{rec.reason}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <ProfileDashboard userData={user} />

          {/* Achievements Section */}
          <div className="bg-white shadow-sm rounded-lg overflow-hidden mt-6">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Achievements</h2>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Total Progress:</span>
                  <span className="text-sm font-semibold text-cyan-600">
                    {Math.round(achievements.reduce((acc, curr) => acc + curr.progress, 0) / achievements.length)}%
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{achievement.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
                        {achievement.title === '10 Streak' && (
                          <p className="text-sm text-cyan-600 mb-3">Current Streak: {achievement.streak} days</p>
                        )}
                      </div>
                      <div className={`rounded-full p-1 ${achievement.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                        {achievement.completed ? <FiCheck className="w-5 h-5" /> : <FiX className="w-5 h-5" />}
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${achievement.completed ? 'bg-green-500' : 'bg-cyan-500'}`}
                        style={{ width: `${achievement.progress}%` }}
                      />
                    </div>
                    <div className="mt-2 text-sm text-gray-600 text-right">
                      {achievement.progress}% Complete
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 