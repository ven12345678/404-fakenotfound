import React, { useState } from 'react';
import NewsCard from '../components/NewsCard';
import SearchFilter from '../components/SearchFilter';

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
    userVerified: true,
    aiFlagged: false,
    factualRating: 95,
    biasRating: 15,
    stockSymbol: "TECH",
    stockPrice: 245.67,
    stockChange: 5.2,
    stockMovement: "up",
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
    aiVerified: true,
    userVerified: false,
    aiFlagged: false,
    factualRating: 92,
    biasRating: 25,
    stockSymbol: "MKT",
    stockPrice: 1850.75,
    stockChange: -2.8,
    stockMovement: "down",
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
    aiVerified: true,
    userVerified: false,
    aiFlagged: false,
    factualRating: 98,
    biasRating: 10,
    stockSymbol: "ECO",
    stockPrice: 78.45,
    stockChange: 3.5,
    stockMovement: "up",
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
    factualRating: 96,
    biasRating: 20,
    stockSymbol: "QC",
    stockPrice: 156.78,
    stockChange: 8.3,
    stockMovement: "up",
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
    aiFlagged: true,
    aiFlagReason: "Potential Misinformation",
    factualRating: 35,
    biasRating: 85,
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
    aiFlagged: false,
    factualRating: 94,
    biasRating: 15,
    stockSymbol: "HLTH",
    stockPrice: 45.67,
    stockChange: 2.1,
    stockMovement: "up",
    tags: ["Health", "Nutrition", "Research", "Longevity", "Diet"]
  }
];

export default function NewsFeed() {
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
      prevNews.map(item => 
        item.id === newsId 
          ? { ...item, userVerified: isVerified }
          : item
      )
    );
  };

  const handleFlag = (newsId, isFlagged) => {
    // Implement flagging logic here
    console.log(`News ${newsId} ${isFlagged ? 'flagged' : 'unflagged'}`);
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
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-center text-gray-800">
            Your News Feed
          </h1>
          <p className="text-center text-gray-600 mt-2">
            Stay informed with verified news from our community
          </p>
        </div>
      </header>

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