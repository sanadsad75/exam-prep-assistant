# Quick Start Guide - 100% FREE!

Get your Exam Prep Assistant up and running in 5 minutes with FREE AI!

## Step 1: Install Dependencies

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

## Step 2: Get Your FREE OpenRouter API Key

1. Go to [OpenRouter.ai](https://openrouter.ai/)
2. Click "Sign In" (top right)
3. Sign up with **Google, GitHub, or Email** (100% FREE - no credit card!)
4. After signing in, go to [API Keys](https://openrouter.ai/keys)
5. Click "Create Key"
6. Copy your API key

**Note**: OpenRouter gives you FREE access to multiple AI models including Mistral 7B, Llama 3.1, Gemma, and more!

## Step 3: Configure Environment

Create a `.env` file in the root directory:

```env
OPENROUTER_API_KEY=sk-or-v1-your_key_here
AI_MODEL=mistralai/mistral-7b-instruct:free
APP_URL=http://localhost:3000
PORT=5000
NODE_ENV=development
```

**Replace** `sk-or-v1-your_key_here` with your actual API key from step 2.

## Step 4: Start the Application

```bash
npm run dev
```

This will start both the backend (port 5000) and frontend (port 3000).

## Step 5: Use the App

1. Open **http://localhost:3000** in your browser
2. Enter your exam subject (e.g., "Human Anatomy")
3. Upload your study materials (PDF, DOCX, PPTX, TXT)
4. Click "Start Learning"
5. Explore the generated study plan!

## That's it! 🎉

You're ready to start studying smarter with **100% FREE AI**.

## Example Workflow

1. **Upload** → Upload your anatomy lecture notes
2. **Dashboard** → View mind map and study flow
3. **Study** → Go through each section in order
4. **Quiz** → Test yourself after each section
5. **Final Exam** → Take comprehensive test
6. **Review** → Check your results and improve

## Available FREE AI Models

You can try different models by changing `AI_MODEL` in your `.env`:

- `mistralai/mistral-7b-instruct:free` (Default - Recommended)
- `meta-llama/llama-3.1-8b-instruct:free` (Meta's latest)
- `google/gemma-7b-it:free` (Google's model)
- `nousresearch/nous-capybara-7b:free` (Creative)
- `qwen/qwen-2-7b-instruct:free` (Multilingual)

**Recommendation**: Stick with **Mistral 7B** (default) for best results!

## Troubleshooting

**"Cannot find module" error:**
```bash
npm install
cd client && npm install && cd ..
```

**Port 5000 already in use:**
Change `PORT=5001` in `.env` file

**API key error:**
- Double-check your `.env` file has `OPENROUTER_API_KEY=sk-or-v1-...`
- Make sure you copied the full key from OpenRouter
- Restart the server after changing `.env`

**Model not found:**
- Make sure your model ID ends with `:free`
- Check [OpenRouter Models](https://openrouter.ai/models?q=free) for available free models

## Need Help?

Check the full [README.md](README.md) for detailed documentation.

## Why is this FREE?

OpenRouter provides free access to several open-source AI models. Unlike OpenAI or Anthropic which require payment, OpenRouter lets you use models like Mistral, Llama, and Gemma completely free - perfect for students!

---

**Happy studying! 🎓 100% Powered by FREE AI!**
