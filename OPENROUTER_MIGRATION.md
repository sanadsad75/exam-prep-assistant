# Migration to OpenRouter - FREE AI Models

This document explains the changes made to use OpenRouter with FREE AI models instead of paid APIs.

## What Changed?

### ✅ Benefits of This Change

1. **100% FREE** - No credit card required, ever
2. **Multiple AI Models** - Choose from Mistral, Llama, Gemma, Qwen, and more
3. **Better for Students** - No costs means unlimited learning
4. **Easy to Switch** - Change models anytime via `.env` file
5. **No Vendor Lock-in** - Use different models for different tasks

## Files Modified

### 1. Backend Configuration
- **Removed**: `server/config/anthropic.js`
- **Added**: [server/config/openrouter.js](server/config/openrouter.js)
  - New OpenRouter API client
  - Support for multiple free models
  - Simple text generation function

### 2. AI Analyzer Service
- **Modified**: [server/services/aiAnalyzer.js](server/services/aiAnalyzer.js)
  - Changed from Anthropic SDK to OpenRouter REST API
  - All AI analysis functions now use `generateText()` helper
  - Added "IMPORTANT: Return ONLY JSON" to prompts for better compatibility

### 3. Package Dependencies
- **Modified**: [package.json](package.json)
  - Removed: `@anthropic-ai/sdk`
  - Added: `axios` (for HTTP requests to OpenRouter)

### 4. Environment Configuration
- **Modified**: [.env.example](.env.example)
  - New: `OPENROUTER_API_KEY` (replaces ANTHROPIC_API_KEY)
  - New: `AI_MODEL` (choose which free model to use)
  - New: `APP_URL` (for OpenRouter referrer tracking)

### 5. Documentation
- **Updated**: [README.md](README.md)
  - Complete guide for OpenRouter setup
  - List of available FREE models
  - Troubleshooting for OpenRouter-specific issues
  - Cost comparison table

- **Updated**: [QUICKSTART.md](QUICKSTART.md)
  - 5-minute setup guide with OpenRouter
  - Step-by-step API key instructions

## Available FREE Models

All these models are **100% FREE** on OpenRouter:

| Model | Performance | Speed | Best For |
|-------|-------------|-------|----------|
| **Mistral 7B** ⭐ | ⭐⭐⭐⭐ | Fast | Default choice, best balance |
| **Llama 3.1 8B** | ⭐⭐⭐⭐⭐ | Medium | Best quality, slower |
| **Gemma 7B** | ⭐⭐⭐ | Fast | Educational content |
| **Nous Capybara** | ⭐⭐⭐ | Fast | Creative responses |
| **Qwen 2 7B** | ⭐⭐⭐⭐ | Fast | Multilingual support |

**Recommended**: Start with **Mistral 7B** (the default) for best results.

## How to Use

### Option 1: Use Default Model (Mistral 7B)

Just set your OpenRouter API key in `.env`:
```env
OPENROUTER_API_KEY=sk-or-v1-your_key_here
```

### Option 2: Choose a Different Model

Set both the API key and model in `.env`:
```env
OPENROUTER_API_KEY=sk-or-v1-your_key_here
AI_MODEL=meta-llama/llama-3.1-8b-instruct:free
```

### Option 3: Switch Models Anytime

You can change `AI_MODEL` in `.env` and restart the server to try different models!

## Getting Your FREE API Key

1. Visit [OpenRouter.ai](https://openrouter.ai/)
2. Click "Sign In"
3. Sign up with Google, GitHub, or Email (FREE!)
4. Go to [API Keys](https://openrouter.ai/keys)
5. Click "Create Key"
6. Copy and paste into your `.env` file

**No credit card required!**

## Installation Steps

If you already installed the old version:

```bash
# 1. Remove old Anthropic SDK
npm uninstall @anthropic-ai/sdk

# 2. Install axios
npm install axios

# 3. Update your .env file
# Remove: ANTHROPIC_API_KEY
# Add: OPENROUTER_API_KEY, AI_MODEL

# 4. Restart the server
npm run dev
```

For fresh installations, just follow the [QUICKSTART.md](QUICKSTART.md) guide!

## Technical Details

### API Endpoint
- **Base URL**: `https://openrouter.ai/api/v1`
- **Endpoint**: `/chat/completions`
- **Format**: OpenAI-compatible chat completions

### Request Format
```javascript
{
  model: "mistralai/mistral-7b-instruct:free",
  messages: [
    { role: "user", content: "Your prompt here" }
  ],
  max_tokens: 8000,
  temperature: 0.7
}
```

### Response Parsing
The code extracts JSON from AI responses using regex:
```javascript
const jsonMatch = responseText.match(/\{[\s\S]*\}/);
```

This handles cases where the AI includes extra text before/after the JSON.

## Comparison: Before vs After

### Before (Anthropic Claude)
- ❌ Requires paid API credits
- ❌ $3-15 per million tokens
- ✅ Very high quality
- ❌ Single provider

### After (OpenRouter)
- ✅ 100% FREE models available
- ✅ $0 cost
- ✅ Good quality (7B-8B models)
- ✅ Multiple providers and models

## Performance Notes

### Free Models Performance
- **Mistral 7B**: Fast, reliable, great for educational content
- **Llama 3.1 8B**: Slightly slower but higher quality
- **Response Time**: 2-10 seconds depending on prompt size
- **Rate Limits**: Generous for free tier (check OpenRouter dashboard)

### Tips for Best Results
1. Keep prompts clear and specific
2. Use "Return ONLY JSON" in prompts for structured output
3. Stick with Mistral 7B for most reliable results
4. Try Llama 3.1 if you need better reasoning

## Troubleshooting

### "Invalid API Key"
- Make sure your key starts with `sk-or-v1-`
- Copy the full key from OpenRouter dashboard
- No quotes around the key in `.env`

### "Model not found"
- Ensure model ID ends with `:free`
- Check available models at [OpenRouter Models](https://openrouter.ai/models?q=free)

### "Rate limit exceeded"
- Free tier has limits (generous but exist)
- Wait a few minutes and try again
- Check your [OpenRouter dashboard](https://openrouter.ai/)

### Poor Quality Responses
- Try switching to `meta-llama/llama-3.1-8b-instruct:free`
- Ensure your prompts are clear
- Check that uploaded documents are readable

## Future Options

### Upgrade to Paid Models (Optional)
If you want even better quality, OpenRouter also offers paid models:
- `anthropic/claude-3.5-sonnet` ($3 per million tokens)
- `openai/gpt-4-turbo` ($10 per million tokens)

Just add credits to your OpenRouter account and change `AI_MODEL` in `.env`.

But for students, the **FREE models work great!**

## Why OpenRouter?

1. **Student-Friendly**: No costs = unlimited learning
2. **Flexible**: Try different models easily
3. **Reliable**: Professional infrastructure
4. **Transparent**: Clear pricing, usage tracking
5. **Future-Proof**: New free models added regularly

## Questions?

- Check [README.md](README.md) for full documentation
- See [QUICKSTART.md](QUICKSTART.md) for setup
- Visit [OpenRouter Docs](https://openrouter.ai/docs)
- Check [OpenRouter Discord](https://discord.gg/openrouter) for community support

---

**You're all set! Enjoy FREE AI-powered exam prep! 🎓**
