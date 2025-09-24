import React from 'react';

const MediaCard = ({ title, thumbnail_url, tags, onClick }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      {/* Thumbnail */}
      <div className="aspect-video w-full overflow-hidden">
        <img 
          src={thumbnail_url} 
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x225/E3F2FD/1976D2?text=Wellness+Content';
          }}
        />
      </div>
      
      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2">
          {title}
        </h3>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags && tags.map((tag, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-wellness-blue text-wellness-dark-blue text-xs rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MediaCard;
