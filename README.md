# CampusCare-Digital-Mental-Health-Support

### [Visit the Website](https://campuscarevjit.netlify.app/)
---


## 📖 Introduction  
**CampusCare** is a comprehensive **digital mental health and psychological support system** designed for students in higher education.  

By leveraging **AI-driven conversational agents, peer networking, wellness resources, and proactive risk detection**, CampusCare offers **24/7 stigma-free, accessible, and cost-effective support**.  

The platform combines **cutting-edge AI technology with human oversight** to address stress, anxiety, and isolation among students, while providing **institutions with actionable insights** to improve overall student well-being.  

---

<img src="images/campuscare-homepage.png" alt="CampusCare Homepage" />

---

## ✨ Key Features  

### 1. **AI-Driven Mental Health Support** 🤖  
*24/7 Intelligent Chatbot & Voice Assistant powered by fine-tuned LLMs*  
- Therapy-like conversations, coping strategies & guided exercises  
- Multilingual support for inclusivity  
- Confidential chat mode  
- Escalation to human counselors for severe cases  

<img src="images/ai-chatbot-interface.png" alt="AI Chatbot Interface" />  
<img src="images/voice-assistant-demo.png" alt="Voice Assistant Demo" />  

---

### 2. **Peer Socialization & Networking** 👥  
*AI-Powered Peer Matching for Community Building*  
- Connects students via intelligent matching algorithms  
- Mentor-peer dynamics for guidance  
- Group study sessions & support networks  
- Helps reduce isolation for students away from home  

<img src="images/peer-networking-dashboard.png" alt="Peer Networking Dashboard" />  

---

### 3. **Wellness Media Hub** 📺  
*Curated Mental Health Resources & AI-Generated Content*  
- Comprehensive video & tutorial library  
- Personalized content recommendations  
- Covers stress management, meditation, breathing techniques, etc.  
- Multilingual subtitles for accessibility  

<img src="images/wellness-media-hub.png" alt="Wellness Media Hub" />  

---

### 4. **Early Risk Detection** ⚠️  
*Proactive AI Monitoring for Student Safety*  
- Sentiment analysis & behavioral monitoring  
- Auto-schedules counselor appointments  
- Emergency alerts to helplines (anonymous)  
- Early intervention to prevent crises  



---

### 5. **Institutional Insights Dashboard** 📊  
*Data-Driven Mental Health Analytics*  
- Aggregated, anonymized insights for institutions  
- Tracks stress patterns & mental health trends  
- Supports curriculum reform & awareness campaigns  
- Generates individual counselor reports (with consent)  

<img src="images/institutional-dashboard.png" alt="Institutional Analytics Dashboard" />  

---

## 🛠️ Technologies Used  



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

---
## Acknowledgments
- Mental health professionals who provided guidance on therapeutic approaches
- Students who participated in user testing and feedback sessions
- Open source community for the amazing tools and libraries
---
### [🎯 Start Your Mental Health Journey Today](https://campuscare-mentalhealth.vercel.app/) 🧠✨
