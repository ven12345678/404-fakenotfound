import React, { useState } from 'react';
import NewsCard from '../components/NewsCard';
import SearchFilter from '../components/SearchFilter';

// Sample news data (replace with actual API data)
const sampleNews = [
  {
    id: 1,
    title: "Tech Giant Announces Revolutionary AI Breakthrough",
    source: "Tech Daily",
    aiVerified: true,
    userVerified: true,
    factualRating: 85,
    biasRating: 20,
    stockSymbol: "TECH",
    stockMovement: "up",
    tags: ["AI", "Technology", "Innovation"]
  },
  {
    id: 2,
    title: "Global Markets React to New Economic Policy",
    source: "Financial Times",
    aiVerified: true,
    userVerified: false,
    factualRating: 90,
    biasRating: 30,
    stockSymbol: "MKT",
    stockMovement: "down",
    tags: ["Economy", "Markets", "Policy"]
  },
  // Add more sample news items as needed
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

  const filterNews = (query, currentFilters) => {
    let filteredNews = sampleNews;

    // Apply search filter
    if (query) {
      filteredNews = filteredNews.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
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
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">News Feed</h1>
        
        <SearchFilter
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
        />

        <div className="space-y-4">
          {news.map(item => (
            <NewsCard
              key={item.id}
              title={item.title}
              source={item.source}
              aiVerified={item.aiVerified}
              userVerified={item.userVerified}
              factualRating={item.factualRating}
              biasRating={item.biasRating}
              stockSymbol={item.stockSymbol}
              stockMovement={item.stockMovement}
              tags={item.tags}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 