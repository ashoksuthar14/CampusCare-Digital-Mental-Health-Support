# CampusCare Wellness Media Hub

A React-based frontend for the CampusCare student mental health app's wellness media hub. This application allows students to browse and filter wellness content including meditation videos, stress relief resources, and mental health support materials.

## Features

- 🎯 **Dynamic Filtering**: Filter content by tags (meditation, stress, anxiety, etc.)
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- 🎨 **Modern UI**: Clean, calming design with Tailwind CSS
- 🔗 **Supabase Integration**: Real-time data from Supabase backend
- ⚡ **Fast Loading**: Optimized performance with loading states

## Tech Stack

- **Frontend**: React.js
- **Styling**: Tailwind CSS
- **Backend**: Supabase
- **State Management**: React Hooks (useState, useEffect)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Supabase

1. Copy the environment example file:
   ```bash
   cp .env.example .env
   ```

2. Update `.env` with your Supabase credentials:
   ```
   REACT_APP_SUPABASE_URL=your_supabase_project_url
   REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

### 3. Set up Supabase Database

Create a table called `media_content` with the following structure:

```sql
CREATE TABLE media_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  content_type TEXT NOT NULL,
  source_url TEXT NOT NULL,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 4. Run the Application

```bash
npm start
```

The app will open at `http://localhost:3000`


## Component Structure

- **`WellnessHub.js`**: Main container component that fetches data and manages state
- **`FilterBar.js`**: Dynamic filtering component with tag-based buttons
- **`MediaCard.js`**: Reusable card component for displaying media items
- **`supabaseClient.js`**: Supabase client configuration

## Data Structure

Each media item follows this structure:

```json
{
  "id": "uuid-string-1234",
  "title": "5-Minute Guided Meditation for Stress",
  "description": "A short and effective guided meditation to help you find calm during a busy day.",
  "thumbnail_url": "https://example.com/thumbnail.jpg",
  "content_type": "YOUTUBE",
  "source_url": "https://www.youtube.com/watch?v=inpok4MKVLM",
  "tags": ["meditation", "stress", "anxiety"]
}
```

## Styling

The app uses a calming color palette:
- Primary: Soft blues (#E3F2FD, #BBDEFB, #1976D2)
- Background: Light grays (#FAFAFA, #F5F5F5)
- Text: Dark grays for readability

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request
Delpoyement attempt
## License

This project is part of the CampusCare student mental health platform.