# Changelog

All notable changes to this project will be documented in this file.

## [2.1.0] - 2024 - PowerPoint Support Added

### 🎉 New Features

#### ✅ PowerPoint File Support
- **Added**: Support for PowerPoint presentations (PPT and PPTX)
- **Feature**: Automatic text extraction from all slides
- **Capability**: Extracts titles, bullet points, text boxes, and notes
- **Integration**: Seamlessly combines with PDF, DOCX, and TXT files

### Added

#### Backend
- `pptx2json` library for PowerPoint parsing
- `parsePPTX()` method in document parser
- Support for `.ppt` and `.pptx` file extensions
- MIME type handling for PowerPoint files
  - `application/vnd.openxmlformats-officedocument.presentationml.presentation`
  - `application/vnd.ms-powerpoint`

#### Frontend
- Updated file upload to accept `.ppt` and `.pptx`
- UI shows "PPT, PPTX" in accepted file types
- File input now accepts PowerPoint MIME types

#### Documentation
- `POWERPOINT_SUPPORT.md` - Complete PowerPoint usage guide
- Updated `README.md` with PowerPoint support
- Updated `QUICKSTART.md` with PPT file types

### Changed
- File upload middleware now accepts PowerPoint MIME types
- Document parser handles both PPT and PPTX formats
- Error messages updated to include PowerPoint files
- Upload page description updated

### Technical Details
- Slide-by-slide text extraction
- Preserves slide order
- Handles text from shapes, text boxes, and notes
- Graceful fallback for corrupted files
- Maximum file size: 50MB (same as other files)

---

## [2.0.0] - 2024 - OpenRouter Migration (100% FREE AI!)

### 🎉 Major Changes

#### ✅ Switched to FREE AI Models
- **Removed**: Anthropic Claude API (paid)
- **Added**: OpenRouter API with FREE models
- **Result**: App is now 100% FREE to use!

#### 🆓 Available FREE Models
Added support for 5 free AI models:
1. **Mistral 7B** (default) - Best balance
2. **Llama 3.1 8B** - Highest quality
3. **Gemma 7B** - Google's model for education
4. **Nous Capybara 7B** - Creative responses
5. **Qwen 2 7B** - Multilingual support

### Added

#### Backend
- `server/config/openrouter.js` - New OpenRouter API client
- Support for multiple free AI models
- Model selection via environment variable
- Improved JSON parsing for free models

#### Environment Configuration
- `OPENROUTER_API_KEY` - Free API key (replaces ANTHROPIC_API_KEY)
- `AI_MODEL` - Choose which free model to use
- `APP_URL` - For OpenRouter referrer tracking

#### Documentation
- `FREE_AI_MODELS.md` - Complete guide to available free models
- `OPENROUTER_MIGRATION.md` - Migration guide from paid to free
- Updated `README.md` - Full OpenRouter setup instructions
- Updated `QUICKSTART.md` - 5-minute FREE setup guide
- `CHANGELOG.md` - This file!

### Changed

#### Backend Updates
- `server/services/aiAnalyzer.js` - Now uses OpenRouter instead of Anthropic
- `package.json` - Removed `@anthropic-ai/sdk`, added `axios`
- All AI prompts - Added "Return ONLY JSON" for better compatibility

#### Documentation Updates
- Complete rewrite of setup instructions for OpenRouter
- Added troubleshooting for free models
- Added model comparison tables
- Added cost comparison (FREE vs paid)

### Removed
- `@anthropic-ai/sdk` dependency (paid service)
- `server/config/anthropic.js` (old configuration)
- References to paid API keys in documentation

### Benefits
- ✅ **$0 cost** - No more paying for AI API
- ✅ **No credit card** - Sign up is completely free
- ✅ **Perfect for students** - Unlimited learning at no cost
- ✅ **Multiple models** - Choose what works best
- ✅ **Easy switching** - Try different models instantly

### Migration Guide
See [OPENROUTER_MIGRATION.md](OPENROUTER_MIGRATION.md) for detailed migration instructions.

---

## [1.0.0] - Initial Release

### Added
- Complete exam preparation platform
- Document upload and analysis
- Mind map visualization
- Study flow recommendations
- Section-based content organization
- Detailed explanations from uploaded notes
- MCQ quizzes for each section
- Comprehensive final exam
- React frontend with TailwindCSS
- Express backend with document parsing
- PDF, DOCX, and TXT support

### Tech Stack (Initial)
- Backend: Node.js, Express, Anthropic Claude API
- Frontend: React, TailwindCSS, ReactFlow
- Document Processing: pdf-parse, mammoth
- File Handling: Multer

---

## Version Comparison

| Feature | v1.0.0 (Paid) | v2.0.0 (FREE) |
|---------|---------------|---------------|
| **Cost** | $3-15 per M tokens | ✅ $0 - FREE! |
| **Credit Card** | Required | ✅ Not needed! |
| **AI Quality** | Excellent (Claude) | Very Good (7B-8B models) |
| **Model Options** | 1 model | ✅ 5+ FREE models! |
| **Best For** | Professional use | ✅ Students! |
| **Recommendation** | - | ✅ **Use v2.0.0!** |

---

## Upgrade Instructions

### From v1.0.0 to v2.0.0

1. **Update dependencies:**
   ```bash
   npm uninstall @anthropic-ai/sdk
   npm install axios
   ```

2. **Update .env file:**
   ```bash
   # Remove this:
   # ANTHROPIC_API_KEY=...

   # Add these:
   OPENROUTER_API_KEY=your_free_key_here
   AI_MODEL=mistralai/mistral-7b-instruct:free
   APP_URL=http://localhost:3000
   ```

3. **Get FREE OpenRouter key:**
   - Visit [OpenRouter.ai](https://openrouter.ai/)
   - Sign up (FREE, no credit card)
   - Get your API key
   - Add to `.env`

4. **Restart server:**
   ```bash
   npm run dev
   ```

5. **Done!** You're now using FREE AI! 🎉

---

## Roadmap

### Planned Features
- [ ] User authentication and accounts
- [ ] Save and resume study sessions
- [ ] Share study plans with classmates
- [ ] Progress tracking over time
- [ ] Spaced repetition scheduling
- [ ] Flashcard generation
- [ ] Study time analytics
- [ ] Export notes as PDF
- [ ] Mobile responsive improvements
- [ ] Dark mode
- [ ] Collaborative study groups

### Under Consideration
- [ ] Voice narration of explanations
- [ ] Image upload and analysis
- [ ] YouTube video integration
- [ ] Calendar integration
- [ ] Study reminders
- [ ] Gamification (points, badges)

---

## Support

### Get Help
- 📖 Read [README.md](README.md) for full documentation
- 🚀 Check [QUICKSTART.md](QUICKSTART.md) for setup
- 🆓 See [FREE_AI_MODELS.md](FREE_AI_MODELS.md) for model info
- 🔄 Read [OPENROUTER_MIGRATION.md](OPENROUTER_MIGRATION.md) for migration

### Report Issues
- Check existing documentation first
- Review troubleshooting sections
- Test with different free models
- Check OpenRouter status

---

## Credits

### v2.0.0
- OpenRouter for FREE AI API access
- Mistral AI for the default model
- Meta for Llama 3.1
- Google for Gemma
- Nous Research for Capybara
- Alibaba for Qwen

### v1.0.0
- Anthropic for Claude API
- React team for React
- Vercel for design inspiration

---

**Last Updated**: 2024
**Current Version**: 2.0.0 (FREE AI!)
**Status**: ✅ Stable and FREE! 🎉
