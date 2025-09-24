# CampusCare-Digital-Mental-Health-Support

### [Visit the Website](https://campuscare-mentalhealth.vercel.app/)
---
## Introduction
**CampusCare** is a comprehensive digital mental health and psychological support system designed specifically for students in higher education. By leveraging AI-driven conversational agents, peer-networking capabilities, wellness resources, and proactive risk detection mechanisms, CampusCare provides 24/7 mental health support in a stigma-free, accessible, and cost-effective way. The platform combines cutting-edge technology with human oversight to address rising stress, anxiety, and isolation among students while providing institutions with actionable insights to improve student well-being.
---
<img src="images/campuscare-homepage.png" alt="CampusCare Homepage" />
---
## Key Features
### 1. **AI-Driven Mental Health Support**
🤖 *24/7 Intelligent Chatbot & Voice Assistant powered by Fine-tuned LLMs.*
- Provides therapy-like conversations, coping strategies, and guided exercises
- Multilingual support for accessibility across diverse student populations
- Private chat option - conversations can be kept confidential and won't be shared with counselors
- Escalates to human counselors for severe mental health concerns
---
<img src="images/ai-chatbot-interface.png" alt="AI Chatbot Interface" />
---
<img src="images/voice-assistant-demo.png" alt="Voice Assistant Demo" />
---
### 2. **Peer Socialization & Networking**
👥 *AI-Powered Peer Matching for Community Building.*
- Intelligent matching algorithm connects students based on interests, strengths, and emotional compatibility
- Creates mentor-peer dynamics by pairing students with similar challenges
- Facilitates group study sessions and community support networks
- Reduces isolation, especially beneficial for students away from home
---
<img src="images/peer-networking-dashboard.png" alt="Peer Networking Dashboard" />
---
### 3. **Wellness Media Hub**
📺 *Curated Mental Health Resources & AI-Generated Content.*
- Comprehensive library of wellness videos, tutorials, and expert-led content
- Personalized recommendations based on emotional profiles
- Topics include panic attack management, meditation, breathing techniques, and exam stress
- Multilingual video subtitles for enhanced accessibility
---
<img src="images/wellness-media-hub.png" alt="Wellness Media Hub" />
---
### 4. **Early Risk Detection**
⚠️ *Proactive AI Monitoring for Student Safety.*
- Continuous sentiment analysis and behavioral pattern detection
- Auto-books counselor appointments for at-risk students
- Sends anonymous emergency alerts to mental health helplines
- Prevents late intervention by catching warning signs early
---
<img src="images/risk-detection-dashboard.png" alt="Risk Detection System" />
---
### 5. **Institutional Insights Dashboard**
📊 *Data-Driven Mental Health Analytics for Institutions.*
- Aggregated, anonymized insights for colleges and administrators
- Tracks mental health trends, stress patterns, and common concerns
- Guides curriculum reforms, awareness campaigns, and wellness workshops
- Individual reports for counselors (with student consent)
---
<img src="images/institutional-dashboard.png" alt="Institutional Analytics Dashboard" />
---
## Technologies Used
### Frontend
- **React.js** - Dynamic user interface
- **Next.js** - Full-stack React framework
- **Tailwind CSS** - Modern styling framework
### Backend & APIs
- **FastAPI/Flask** - Backend API integration
- **Vapi Voice Assistant** - Speech-to-speech conversations
- **YouTube API** - Wellness content curation
### AI & Machine Learning
- **Fine-tuned LLaMA/Mistral** - Mental health chatbot
- **BERT/RoBERTa/DistilBERT** - Sentiment analysis
- **PyTorch/scikit-learn** - Recommendation engine
- **Vector Database (Pinecone)** - Mental health FAQs storage
### Database & Storage
- **Supabase** - User profiles and insights storage
- **AWS S3** - Media hub hosting
### Automation & Integration
- **n8n/Make** - Workflow automation
- **Google Calendar/Outlook API** - Appointment booking
- **WebSockets** - Real-time peer connections
---
### Tech Stack Overview
<img src="images/campuscare-tech-stack.png" alt="CampusCare Tech Stack" />
---
## How to Run the Project Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/campuscare.git
   ```
2. Navigate to the project directory:
   ```bash
   cd campuscare
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables:
   ```bash
   cp .env.example .env.local
   # Add your API keys and database URLs
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```
6. Open [http://localhost:3000](http://localhost:3000) in your browser
---
## Project Structure
```
campuscare/
├── components/          # Reusable React components
├── pages/              # Next.js pages
├── styles/             # CSS and styling files
├── lib/                # Utility functions and API calls
├── public/             # Static assets and images
├── api/                # API routes and backend logic
└── database/           # Database schemas and migrations
```
---
## Environment Variables
Create a `.env.local` file in the root directory with the following variables:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
VAPI_API_KEY=your_vapi_api_key
YOUTUBE_API_KEY=your_youtube_api_key
PINECONE_API_KEY=your_pinecone_api_key
OPENAI_API_KEY=your_openai_api_key
```
---
## Contributing
We welcome contributions from developers, mental health professionals, and students! Here's how you can help:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please read our [Contributing Guidelines](CONTRIBUTING.md) for more details.
---
## License
This project is licensed under the [MIT License](LICENSE) - see the LICENSE file for details.
---
## Support & Contact
- 📧 Email: support@campuscare.com
- 💬 Discord: [Join our community](https://discord.gg/campuscare)
- 🐛 Issues: [Report bugs here](https://github.com/your-username/campuscare/issues)
---
## Acknowledgments
- Mental health professionals who provided guidance on therapeutic approaches
- Students who participated in user testing and feedback sessions
- Open source community for the amazing tools and libraries
---
### [🎯 Start Your Mental Health Journey Today](https://campuscare-mentalhealth.vercel.app/) 🧠✨
