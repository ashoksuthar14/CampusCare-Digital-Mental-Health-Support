import React, { useState, useEffect } from 'react';
import FilterBar from './FilterBar';
import MediaCard from './MediaCard';

// Sample data for testing (replace with Supabase when ready)
const sampleData = [
  {
    id: "1",
    title: "Panic Attack Relief",
    description: "Quick guidance to help you ride out a panic attack.",
    thumbnail_url: "https://img.youtube.com/vi/WGG7MGgptxE/maxresdefault.jpg",
    content_type: "YOUTUBE",
    source_url: "https://www.youtube.com/watch?v=WGG7MGgptxE",
    tags: ["panic", "anxiety", "breathing"]
  },
  {
    id: "2",
    title: "Guided Meditation",
    description: "A calming guided meditation for everyday stress.",
    thumbnail_url: "https://img.youtube.com/vi/vj0JDwQLof4/maxresdefault.jpg",
    content_type: "YOUTUBE",
    source_url: "https://www.youtube.com/watch?v=vj0JDwQLof4",
    tags: ["meditation", "calm", "mindfulness"]
  },
  {
    id: "3",
    title: "Breathing Techniques",
    description: "Simple breathing exercises to reduce anxiety.",
    thumbnail_url: "https://img.youtube.com/vi/LiUnFJ8P4gM/maxresdefault.jpg",
    content_type: "YOUTUBE",
    source_url: "https://www.youtube.com/watch?v=LiUnFJ8P4gM",
    tags: ["breathing", "anxiety", "calm"]
  },
  {
    id: "4",
    title: "Exam Stress Management",
    description: "Tools to manage stress during exam season.",
    thumbnail_url: "https://img.youtube.com/vi/Bk2-dKH2Ta4/maxresdefault.jpg",
    content_type: "YOUTUBE",
    source_url: "https://www.youtube.com/watch?v=Bk2-dKH2Ta4",
    tags: ["stress", "study", "exam"]
  },
  {
    id: "5",
    title: "Progressive Muscle Relaxation",
    description: "Relax your body and mind with PMR.",
    thumbnail_url: "https://img.youtube.com/vi/D7QoBABZu8k/maxresdefault.jpg",
    content_type: "YOUTUBE",
    source_url: "https://www.youtube.com/watch?v=D7QoBABZu8k",
    tags: ["relaxation", "sleep", "stress"]
  },
  {
    id: "6",
    title: "Dealing with Burnout",
    description: "Recognize and recover from burnout.",
    thumbnail_url: "https://img.youtube.com/vi/YyjBKqsJqAo/maxresdefault.jpg",
    content_type: "YOUTUBE",
    source_url: "https://www.youtube.com/watch?v=YyjBKqsJqAo",
    tags: ["burnout", "wellbeing", "balance"]
  }
];

const WellnessHub = () => {
  const [mediaItems, setMediaItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState(null);

  // Simulate loading data
  useEffect(() => {
    const fetchMediaContent = async () => {
      try {
        setLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setMediaItems(sampleData);
        setFilteredItems(sampleData);
      } catch (err) {
        console.error('Error fetching media content:', err);
        setError('Failed to load wellness content. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMediaContent();
  }, []);

  // Filter media items based on active filter
  useEffect(() => {
    if (activeFilter === 'All') {
      setFilteredItems(mediaItems);
    } else {
      const filtered = mediaItems.filter(item => 
        item.tags && item.tags.includes(activeFilter)
      );
      setFilteredItems(filtered);
    }
  }, [activeFilter, mediaItems]);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const extractYouTubeId = (url) => {
    try {
      const u = new URL(url);
      if (u.hostname.includes('youtu.be')) return u.pathname.replace('/', '');
      if (u.searchParams.get('v')) return u.searchParams.get('v');
      const parts = u.pathname.split('/');
      const embedIndex = parts.indexOf('embed');
      if (embedIndex !== -1 && parts[embedIndex + 1]) return parts[embedIndex + 1];
      return null;
    } catch {
      return null;
    }
  };

  const handleMediaCardClick = (item) => {
    if (item.content_type === 'YOUTUBE' && item.source_url) {
      const id = extractYouTubeId(item.source_url);
      if (id) {
        setActiveVideoId(id);
        setIsModalOpen(true);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-wellness-light-gray flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-wellness-dark-blue mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading wellness content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-wellness-light-gray flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-wellness-dark-blue text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
    <div className="min-h-screen bg-wellness-light-gray">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Wellness Media Hub
          </h1>
          <p className="text-lg text-gray-600">
            Discover calming content to support your mental wellness journey
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Bar */}
        <FilterBar 
          mediaItems={mediaItems}
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        />

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredItems.length} of {mediaItems.length} wellness resources
            {activeFilter !== 'All' && ` for "${activeFilter}"`}
          </p>
        </div>

        {/* Media Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <MediaCard
                key={item.id}
                title={item.title}
                thumbnail_url={item.thumbnail_url}
                tags={item.tags}
                onClick={() => handleMediaCardClick(item)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No content found
            </h3>
            <p className="text-gray-500">
              {activeFilter !== 'All' 
                ? `No wellness content found for "${activeFilter}". Try a different filter.`
                : 'No wellness content available at the moment.'
              }
            </p>
          </div>
        )}
      </div>
    </div>

    {isModalOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4" onClick={() => setIsModalOpen(false)}>
        <div className="bg-black rounded-lg w-full max-w-4xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
          <div className="relative pt-[56.25%]">
            {activeVideoId && (
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&rel=0`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            )}
          </div>
          <div className="flex justify-end p-3 bg-gray-900">
            <button
              className="px-4 py-2 bg-wellness-dark-blue text-white rounded hover:bg-blue-700"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export default WellnessHub;