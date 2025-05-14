import React, { useState } from 'react';
import NewsCard from '../components/NewsCard';
import SearchFilter from '../components/SearchFilter';
import { useRouter } from 'next/router';
import { FiArrowLeft } from 'react-icons/fi';

// Sample news data (replace with actual API data)
const sampleNews = [
  {
    id: 1,
    title: "Tech Giant Announces Revolutionary AI Breakthrough",
    summary: "A leading technology company has unveiled a groundbreaking AI system that can process and analyze complex data patterns in real-time, potentially revolutionizing multiple industries from healthcare to finance. The system, developed after five years of research, has shown unprecedented accuracy in predicting market trends and medical diagnoses.",
    source: "Tech Daily",
    author: "Sarah Johnson",
    publishDate: "2024-03-15",
    lastUpdated: "2024-03-15 14:30",
    category: "Technology",
    aiVerified: true,
    userVerified: false,
    aiFlagged: false,
    userFlagged: false,
    factualRating: 95,
    biasRating: 15,
    tags: ["AI", "Technology", "Innovation", "Healthcare", "Finance", "Research"]
  },
  {
    id: 2,
    title: "Global Markets React to New Economic Policy",
    summary: "Financial markets worldwide showed significant volatility following the announcement of new economic policies aimed at curbing inflation while maintaining growth. Major indices experienced sharp movements as investors digested the implications. The policy changes, announced by the central bank, include a 0.5% interest rate adjustment and new regulatory measures for financial institutions.",
    source: "Financial Times",
    author: "Michael Chen",
    publishDate: "2024-03-14",
    lastUpdated: "2024-03-14 16:45",
    category: "Finance",
    aiVerified: false,
    userVerified: true,
    aiFlagged: false,
    userFlagged: false,
    factualRating: 60,
    biasRating: 45,
    tags: ["Economy", "Markets", "Policy", "Inflation", "Investing", "Banking"]
  },
  {
    id: 3,
    title: "Climate Change Report Reveals Accelerating Impact",
    summary: "A comprehensive new study published in Nature shows that climate change effects are occurring faster than previously predicted, with significant implications for global ecosystems and human populations. The research, conducted by an international team of scientists, analyzed data from over 100 monitoring stations worldwide.",
    source: "Environmental Watch",
    author: "Dr. Emily Rodriguez",
    publishDate: "2024-03-13",
    category: "Science",
    aiVerified: false,
    userVerified: false,
    aiFlagged: true,
    userFlagged: false,
    factualRating: 40,
    biasRating: 80,
    tags: ["Climate", "Environment", "Science", "Global Warming", "Research"]
  },
  {
    id: 4,
    title: "Major Breakthrough in Quantum Computing",
    summary: "Scientists at a leading research institute have achieved quantum supremacy with a new 128-qubit processor, solving complex calculations in minutes that would take traditional computers years to complete. This breakthrough could accelerate drug discovery and climate modeling.",
    source: "Science Daily",
    author: "Prof. James Wilson",
    publishDate: "2024-03-12",
    lastUpdated: "2024-03-12 09:15",
    category: "Science",
    aiVerified: true,
    userVerified: true,
    aiFlagged: false,
    userFlagged: false,
    factualRating: 85,
    biasRating: 25,
    tags: ["Quantum Computing", "Technology", "Research", "Science", "Innovation"]
  },
  {
    id: 5,
    title: "Controversial Social Media Post Goes Viral",
    summary: "A viral social media post claiming to reveal 'secret government documents' has been flagged by our AI system for potential misinformation. The post contains several factual inaccuracies and has been shared over 100,000 times. Experts warn about the dangers of spreading unverified information.",
    source: "Social Media Watch",
    author: "Lisa Thompson",
    publishDate: "2024-03-11",
    category: "Social Media",
    aiVerified: false,
    userVerified: false,
    aiFlagged: false,
    userFlagged: true,
    factualRating: 30,
    biasRating: 90,
    tags: ["Social Media", "Misinformation", "Viral", "Fact Check"]
  },
  {
    id: 6,
    title: "New Study Links Diet to Longevity",
    summary: "A comprehensive 20-year study involving 100,000 participants has found a strong correlation between Mediterranean diet patterns and increased lifespan. The research, published in the Journal of Nutrition, shows participants following the diet had a 25% lower risk of premature death.",
    source: "Health Journal",
    author: "Dr. Maria Garcia",
    publishDate: "2024-03-10",
    category: "Health",
    aiVerified: true,
    userVerified: true,
    aiFlagged: true,
    userFlagged: true,
    factualRating: 75,
    biasRating: 55,
    tags: ["Health", "Nutrition", "Research", "Longevity", "Diet"]
  },
  {
    id: 7,
    title: "Malaysia Unlikely to Escape Trump Tariffs, Says Former US Trade Negotiator",
    summary: "A former US trade negotiator, Stephen Olson, states that Malaysia is unlikely to fully eliminate the 24% tariff imposed by US President Donald Trump on most Malaysian goods. Despite ongoing negotiations and Malaysia's efforts to highlight its investments in the US, Olson believes Malaysia has limited leverage and that Trump is unlikely to be swayed by threats of retaliation. The US remains Malaysia's third largest trading partner, and the tariffs, currently paused for 90 days, are part of broader US trade actions. Read more at the source.",
    source: "Free Malaysia Today",
    author: "Jason Thomas",
    publishDate: "2025-05-09",
    category: "World",
    aiVerified: true,
    userVerified: false,
    aiFlagged: false,
    factualRating: 90,
    biasRating: 20,
    tags: ["Malaysia", "US", "Tariffs", "Trade", "Donald Trump"],
    link: "https://www.freemalaysiatoday.com/category/nation/2025/05/09/malaysia-unlikely-to-escape-trump-tariffs-says-former-us-trade-negotiator"
  }
];

export default function NewsFeed() {
  const router = useRouter();
  const [news, setNews] = useState(sampleNews);
  const [filters, setFilters] = useState({
    verification: 'all',
    factual: 'all',
    bias: 'all'
  });
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
    filterNews(query, filters);
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    filterNews(searchQuery, newFilters);
  };

  const handleVerify = (newsId, isVerified) => {
    setNews(prevNews => 
      prevNews.map(item => {
        if (item.id === newsId) {
          let newFactualRating = item.factualRating;
          let newBiasRating = item.biasRating;

          if (isVerified) {
            if (item.aiFlagged || item.userFlagged) {
              // If article is flagged (by AI or user) and being verified,
              // decrease both factual and bias ratings
              newFactualRating = Math.max(item.factualRating - 15, 0);
              newBiasRating = Math.max(item.biasRating - 20, 0);
            } else {
              // Normal verification without flags
              newFactualRating = Math.min(item.factualRating + 10, 100);
            }
          } else {
            // Unverifying always decreases factual rating
            newFactualRating = Math.max(item.factualRating - 10, 0);
          }
          
          return {
            ...item,
            userVerified: isVerified,
            factualRating: newFactualRating,
            biasRating: newBiasRating
          };
        }
        return item;
      })
    );
  };

  const handleFlag = (newsId, isFlagged) => {
    setNews(prevNews => 
      prevNews.map(item => {
        if (item.id === newsId) {
          // Decrease factual rating by 15 points when flagging, increase when unflagging
          const ratingChange = isFlagged ? -15 : 15;
          const newRating = Math.min(Math.max(item.factualRating + ratingChange, 0), 100);
          
          return {
            ...item,
            userFlagged: isFlagged,
            factualRating: newRating
          };
        }
        return item;
      })
    );
  };

  const filterNews = (query, currentFilters) => {
    let filteredNews = sampleNews;

    // Apply search filter
    if (query) {
      filteredNews = filteredNews.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.summary.toLowerCase().includes(query.toLowerCase()) ||
        item.source.toLowerCase().includes(query.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
    }

    // Apply verification filter
    if (currentFilters.verification !== 'all') {
      filteredNews = filteredNews.filter(item =>
        currentFilters.verification === 'ai' ? item.aiVerified :
        currentFilters.verification === 'user' ? item.userVerified : true
      );
    }

    // Apply factual rating filter
    if (currentFilters.factual !== 'all') {
      filteredNews = filteredNews.filter(item => {
        const rating = item.factualRating;
        return currentFilters.factual === 'high' ? rating >= 80 :
               currentFilters.factual === 'medium' ? rating >= 50 && rating < 80 :
               rating < 50;
      });
    }

    // Apply bias rating filter
    if (currentFilters.bias !== 'all') {
      filteredNews = filteredNews.filter(item => {
        const rating = item.biasRating;
        return currentFilters.bias === 'low' ? rating < 30 :
               currentFilters.bias === 'medium' ? rating >= 30 && rating < 60 :
               rating >= 60;
      });
    }

    setNews(filteredNews);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm mb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
            <button
                  onClick={() => router.push('/')}
                  className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M15 19l-7-7 7-7" /></svg>
                  Back to Home
                </button>
            </div>
          </div>
        </div>
      </nav>
      <div className="container mx-auto px-4 py-8">
        <SearchFilter
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
        />

        <div className="space-y-4">
          {news.map(item => (
            <NewsCard
              key={item.id}
              title={item.title}
              summary={item.summary}
              source={item.source}
              author={item.author}
              publishDate={item.publishDate}
              lastUpdated={item.lastUpdated}
              category={item.category}
              aiVerified={item.aiVerified}
              userVerified={item.userVerified}
              aiFlagged={item.aiFlagged}
              aiFlagReason={item.aiFlagReason}
              factualRating={item.factualRating}
              biasRating={item.biasRating}
              stockSymbol={item.stockSymbol}
              stockPrice={item.stockPrice}
              stockChange={item.stockChange}
              stockMovement={item.stockMovement}
              tags={item.tags}
              onVerify={(isVerified) => handleVerify(item.id, isVerified)}
              onFlag={(isFlagged) => handleFlag(item.id, isFlagged)}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 