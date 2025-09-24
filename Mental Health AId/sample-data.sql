-- Sample data for testing the Wellness Media Hub
-- Run these INSERT statements in your Supabase SQL editor

INSERT INTO media_content (title, description, thumbnail_url, content_type, source_url, tags) VALUES
(
  '5-Minute Guided Meditation for Stress',
  'A short and effective guided meditation to help you find calm during a busy day.',
  'https://img.youtube.com/vi/inpok4MKVLM/maxresdefault.jpg',
  'YOUTUBE',
  'https://www.youtube.com/watch?v=inpok4MKVLM',
  ARRAY['meditation', 'stress', 'anxiety']
),
(
  'Breathing Exercise for Anxiety Relief',
  'Learn a simple breathing technique to help manage anxiety and panic attacks.',
  'https://img.youtube.com/vi/LiUnFJ8P4gM/maxresdefault.jpg',
  'YOUTUBE',
  'https://www.youtube.com/watch?v=LiUnFJ8P4gM',
  ARRAY['breathing', 'anxiety', 'calm']
),
(
  'Progressive Muscle Relaxation',
  'A guided session to help you relax your body and mind through progressive muscle relaxation.',
  'https://img.youtube.com/vi/SNqYG95j_UQ/maxresdefault.jpg',
  'YOUTUBE',
  'https://www.youtube.com/watch?v=SNqYG95j_UQ',
  ARRAY['relaxation', 'stress', 'sleep']
),
(
  'Mindfulness for Beginners',
  'Introduction to mindfulness practices for students new to meditation.',
  'https://img.youtube.com/vi/6p_yaNFSYao/maxresdefault.jpg',
  'YOUTUBE',
  'https://www.youtube.com/watch?v=6p_yaNFSYao',
  ARRAY['mindfulness', 'meditation', 'beginner']
),
(
  'Sleep Stories for Insomnia',
  'Calming bedtime stories designed to help you fall asleep faster.',
  'https://img.youtube.com/vi/5mGifCwig8I/maxresdefault.jpg',
  'YOUTUBE',
  'https://www.youtube.com/watch?v=5mGifCwig8I',
  ARRAY['sleep', 'insomnia', 'bedtime']
),
(
  'Yoga for Stress Relief',
  'Gentle yoga poses and stretches to release tension and stress.',
  'https://img.youtube.com/vi/hJbRpHZr_d0/maxresdefault.jpg',
  'YOUTUBE',
  'https://www.youtube.com/watch?v=hJbRpHZr_d0',
  ARRAY['yoga', 'stress', 'exercise']
),
(
  'Gratitude Journaling Guide',
  'Learn how to start a gratitude practice to improve your mental wellbeing.',
  'https://img.youtube.com/vi/WPPPFqsECz0/maxresdefault.jpg',
  'YOUTUBE',
  'https://www.youtube.com/watch?v=WPPPFqsECz0',
  ARRAY['gratitude', 'journaling', 'wellbeing']
),
(
  'Study Break Meditation',
  'Quick 3-minute meditation perfect for study breaks.',
  'https://img.youtube.com/vi/1vx8iUvfyCY/maxresdefault.jpg',
  'YOUTUBE',
  'https://www.youtube.com/watch?v=1vx8iUvfyCY',
  ARRAY['meditation', 'study', 'break']
);
