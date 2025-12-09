# Exam Prep Assistant

An AI-powered exam preparation platform for university students that transforms study materials into comprehensive learning experiences with mind maps, organized sections, detailed explanations, and practice quizzes.

## Features

- **Smart Document Analysis**: Upload PDF, DOCX, PPTX, or TXT files and let AI analyze and organize the content
- **PowerPoint Support**: Extract text from your presentation slides automatically
- **Mind Mapping**: Visual representation of topics and their relationships
- **Study Flow**: AI-recommended optimal learning order
- **Organized Sections**: Content broken down into digestible, well-structured sections
- **Detailed Explanations**: Comprehensive notes with examples and visual aid suggestions
- **Practice Quizzes**: MCQ tests for each section based on your uploaded materials
- **Final Exam**: Comprehensive assessment covering all sections
- **Progress Tracking**: Monitor your learning journey
- **100% FREE AI**: Uses OpenRouter with completely free AI models

## Tech Stack

### Backend
- Node.js with Express
- **OpenRouter API** with FREE AI models (Mistral 7B, Llama 3.1, Gemma, Qwen)
- PDF/DOCX/PPTX parsing with pdf-parse, mammoth, and pptx2json
- File upload handling with Multer

### Frontend
- React with React Router for navigation
- TailwindCSS for styling
- ReactFlow for mind map visualization
- Axios for API communication

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- npm or yarn
- **OpenRouter API key** ([Get one FREE here](https://openrouter.ai/)) - No credit card required!

## Installation

### 1. Clone or navigate to the project directory

```bash
cd c:\Users\sanad\Desktop\jojo
```

### 2. Install backend dependencies

```bash
npm install
```

### 3. Install frontend dependencies

```bash
cd client
npm install
cd ..
```

### 4. Get Your FREE OpenRouter API Key

1. Go to [OpenRouter.ai](https://openrouter.ai/)
2. Click "Sign In" or "Get Started"
3. Sign up with Google, GitHub, or email (FREE - no credit card required)
4. Go to [API Keys](https://openrouter.ai/keys)
5. Click "Create Key"
6. Copy your API key

### 5. Configure environment variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit the `.env` file and add your OpenRouter API key:

```env
# OpenRouter API Key (Get one free at https://openrouter.ai/)
OPENROUTER_API_KEY=your_openrouter_api_key_here

# AI Model to use (optional - defaults to free Mistral 7B)
AI_MODEL=mistralai/mistral-7b-instruct:free

# App URL (for OpenRouter referrer)
APP_URL=http://localhost:3000

# Server Configuration
PORT=5000
NODE_ENV=development
```

## Available FREE AI Models

You can choose any of these FREE models by changing the `AI_MODEL` in your `.env` file:

| Model | ID | Best For |
|-------|-----|----------|
| **Mistral 7B** (Default) | `mistralai/mistral-7b-instruct:free` | Balanced performance, great for general use |
| **Llama 3.1 8B** | `meta-llama/llama-3.1-8b-instruct:free` | Meta's latest, excellent reasoning |
| **Gemma 7B** | `google/gemma-7b-it:free` | Google's model, good for educational content |
| **Nous Capybara 7B** | `nousresearch/nous-capybara-7b:free` | Creative responses |
| **Qwen 2 7B** | `qwen/qwen-2-7b-instruct:free` | Alibaba's model, multilingual |

**Recommendation**: Start with **Mistral 7B** (default) - it provides the best balance of speed, quality, and reliability for this application.

## Running the Application

### Development Mode

Run both backend and frontend concurrently:

```bash
npm run dev
```

Or run them separately:

**Backend** (Terminal 1):
```bash
npm run server
```

**Frontend** (Terminal 2):
```bash
npm run client
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Usage Guide

### 1. Upload Study Materials

1. Open the app at http://localhost:3000
2. Enter your subject/exam name (e.g., "Human Anatomy")
3. Upload your study materials (PDF, DOCX, PPTX, or TXT files)
4. Click "Start Learning"

### 2. Explore Your Study Plan

After analysis, you'll see:
- **Overview**: Statistics and quick start options
- **Mind Map**: Visual topic organization
- **Study Flow**: Recommended study order with explanations
- **All Sections**: Browse all sections

### 3. Study Each Section

Click on any section to:
- Read the overview
- Learn key concepts with detailed explanations
- See suggested visual aids (diagrams, images, videos)
- Review the summary

### 4. Test Your Knowledge

- Take section quizzes (5 MCQs per section)
- Review answers with explanations
- Retake quizzes to improve

### 5. Final Exam

- Comprehensive exam covering all sections
- 20+ questions from all topics
- Detailed results and explanations

## Project Structure

```
jojo/
├── server/                 # Backend
│   ├── config/            # Configuration files
│   │   └── openrouter.js  # OpenRouter API setup
│   ├── middleware/        # Express middleware
│   │   └── upload.js      # File upload handler
│   ├── routes/            # API routes
│   │   ├── analyze.js     # Document analysis endpoints
│   │   └── study.js       # Study content endpoints
│   ├── services/          # Business logic
│   │   └── aiAnalyzer.js  # AI analysis service
│   ├── utils/             # Utility functions
│   │   └── documentParser.js # Document parsing
│   └── index.js           # Server entry point
├── client/                # Frontend
│   ├── public/            # Static files
│   ├── src/
│   │   ├── api/           # API client
│   │   ├── components/    # React components
│   │   │   └── MindMap.js # Mind map visualization
│   │   ├── pages/         # Page components
│   │   │   ├── HomePage.js
│   │   │   ├── DashboardPage.js
│   │   │   ├── SectionPage.js
│   │   │   ├── QuizPage.js
│   │   │   └── FinalExamPage.js
│   │   ├── App.js         # Main app component
│   │   └── index.js       # App entry point
│   └── package.json
├── uploads/               # Uploaded files (created on first upload)
├── .env                   # Environment variables (create this)
├── .env.example           # Environment template
├── package.json           # Backend dependencies
└── README.md             # This file
```

## API Endpoints

### Analysis Endpoints

- `POST /api/analyze/upload` - Upload and analyze documents
- `GET /api/analyze/session/:sessionId` - Get session data

### Study Endpoints

- `GET /api/study/section/:sessionId/:sectionId` - Get section content
- `GET /api/study/quiz/:sessionId/:sectionId` - Get section quiz
- `GET /api/study/final-exam/:sessionId` - Get final exam

## Key Features Explained

### AI-Powered Analysis

The app uses OpenRouter's FREE AI models to:
1. Extract and understand content from your documents
2. Create hierarchical topic structures (mind maps)
3. Determine optimal study order
4. Generate detailed explanations based only on your notes
5. Create relevant MCQ questions
6. Suggest helpful visual aids

### Mind Maps

Interactive visual representations showing:
- Central topic
- Main branches (major topics)
- Sub-branches (subtopics)
- Hierarchical relationships

### Study Flow

AI recommends the best order to study topics based on:
- Prerequisite knowledge
- Difficulty progression
- Logical topic flow

### Section Content

Each section includes:
- Overview introduction
- Key concepts with detailed explanations
- Examples from your materials
- Visual aid suggestions
- Summary of key takeaways

### Quizzes

- 5 MCQs per section
- Questions based on your uploaded content
- Immediate feedback
- Detailed explanations
- Retake option

### Final Exam

- 20+ comprehensive questions
- Covers all sections
- Question navigation
- Detailed results breakdown
- Performance analysis

## Troubleshooting

### Backend Issues

**Server won't start:**
- Check if port 5000 is available
- Verify .env file exists with valid OpenRouter API key
- Run `npm install` to ensure dependencies are installed

**"API Error" messages:**
- Check your OpenRouter API key is correct
- Verify you're using a free model (ends with `:free`)
- Check OpenRouter dashboard for any usage limits

**Upload fails:**
- Check file size (max 50MB per file)
- Verify file type (PDF, DOCX, DOC, PPTX, PPT, TXT only)
- Ensure uploads directory has write permissions
- For PowerPoint files, ensure they're not password-protected

### Frontend Issues

**App won't load:**
- Verify backend is running on port 5000
- Check browser console for errors
- Try clearing browser cache

**Styling issues:**
- Run `npm install` in client directory
- Restart development server

### AI Analysis Issues

**Analysis takes too long:**
- Free models may be slower during peak times
- Large documents require more processing time
- Try using a different free model

**Analysis produces invalid JSON:**
- This is rare but can happen with free models
- Try regenerating or using a different model
- Mistral 7B (default) is most reliable

**Rate limiting:**
- OpenRouter free tier has reasonable limits
- Wait a moment and try again
- Check [OpenRouter dashboard](https://openrouter.ai/) for details

## Why OpenRouter?

✅ **100% FREE** - No credit card required
✅ **Multiple AI Models** - Choose what works best
✅ **No Vendor Lock-in** - Switch models anytime
✅ **Generous Free Tier** - Perfect for students
✅ **Easy to Use** - Simple REST API
✅ **Latest Models** - Access to newest AI releases

## Cost Comparison

| Provider | Free Tier | This App |
|----------|-----------|----------|
| OpenAI GPT-4 | ❌ No free tier | ❌ |
| Anthropic Claude | ❌ No free tier | ❌ |
| **OpenRouter** | ✅ FREE forever | ✅ **YES!** |

## Production Deployment

### Environment Setup

1. Set environment variables:
```env
NODE_ENV=production
OPENROUTER_API_KEY=your_api_key
PORT=5000
APP_URL=https://yourdomain.com
```

2. Build frontend:
```bash
cd client
npm run build
```

3. Serve static files from backend (add to server/index.js):
```javascript
app.use(express.static(path.join(__dirname, '../client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
```

### Database Integration

For production, consider replacing in-memory storage with a database:
- MongoDB for session data
- PostgreSQL for structured data
- Redis for caching

## Future Enhancements

Potential features to add:
- User authentication and accounts
- Save and resume study sessions
- Share study plans with classmates
- Progress tracking over time
- Spaced repetition scheduling
- Flashcard generation
- Study time analytics
- Export notes as PDF
- Mobile app version
- Collaborative study groups

## License

MIT License - Feel free to use and modify for your needs

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review [OpenRouter documentation](https://openrouter.ai/docs)
3. Check console logs for errors

## Credits

Built with:
- [OpenRouter](https://openrouter.ai/) - FREE AI API access
- [Mistral AI](https://mistral.ai/) - Default AI model
- [React](https://react.dev/) - Frontend framework
- [Express](https://expressjs.com/) - Backend framework
- [ReactFlow](https://reactflow.dev/) - Mind map visualization
- [TailwindCSS](https://tailwindcss.com/) - Styling

---

Happy studying! 🎓 All powered by FREE AI!
