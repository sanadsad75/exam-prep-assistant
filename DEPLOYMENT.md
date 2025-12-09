# Free 24/7 Deployment Guide

Deploy your Exam Prep Assistant for **FREE** with 24/7 uptime!

## 🎯 Deployment Strategy

- **Frontend**: Vercel (Free Forever)
- **Backend**: Render.com (Free 750 hours/month)
- **Total Cost**: $0/month ✅

## 📋 Prerequisites

1. GitHub account (free)
2. OpenRouter API key (free - [get it here](https://openrouter.ai/))
3. Git installed on your computer

---

## 🚀 Step-by-Step Deployment

### Step 1: Push Code to GitHub

```bash
# Initialize git (if not already done)
cd c:\Users\sanad\Desktop\jojo
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit - Exam Prep Assistant"

# Create a new repository on GitHub
# Go to https://github.com/new
# Name it: exam-prep-assistant
# Don't initialize with README (we already have code)

# Link to GitHub (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/exam-prep-assistant.git

# Push code
git branch -M main
git push -u origin main
```

---

### Step 2: Deploy Backend to Render.com

#### A. Sign Up for Render
1. Go to [Render.com](https://render.com/)
2. Click **"Get Started for Free"**
3. Sign up with **GitHub** (easiest method)

#### B. Create New Web Service
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository: `exam-prep-assistant`
3. Configure the service:

   **Name**: `exam-prep-backend`

   **Region**: Oregon (or closest to you)

   **Branch**: `main`

   **Root Directory**: (leave empty)

   **Environment**: `Node`

   **Build Command**:
   ```
   npm install
   ```

   **Start Command**:
   ```
   node server/index.js
   ```

   **Plan**: **Free** ✅

#### C. Add Environment Variables
Click **"Advanced"** → **"Add Environment Variable"**

Add these:
```
OPENROUTER_API_KEY = your_openrouter_api_key_here
AI_MODEL = mistralai/mistral-7b-instruct:free
NODE_ENV = production
APP_URL = https://your-frontend-url.vercel.app
```

*Note: You'll update `APP_URL` after deploying the frontend*

#### D. Deploy
1. Click **"Create Web Service"**
2. Wait 2-3 minutes for deployment
3. Copy your backend URL: `https://exam-prep-backend.onrender.com`

---

### Step 3: Deploy Frontend to Vercel

#### A. Update Frontend API URL
Before deploying, update the API URL in your frontend:

**File**: `client/src/api/api.js`

Change:
```javascript
const API_URL = 'http://localhost:5000/api';
```

To:
```javascript
const API_URL = process.env.REACT_APP_API_URL || 'https://exam-prep-backend.onrender.com/api';
```

Commit this change:
```bash
git add client/src/api/api.js
git commit -m "Update API URL for production"
git push
```

#### B. Sign Up for Vercel
1. Go to [Vercel.com](https://vercel.com/)
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"**

#### C. Deploy Frontend
1. Click **"Add New..."** → **"Project"**
2. Import your repository: `exam-prep-assistant`
3. Configure:

   **Framework Preset**: `Create React App`

   **Root Directory**: `client`

   **Build Command**:
   ```
   npm run build
   ```

   **Output Directory**:
   ```
   build
   ```

4. Add Environment Variable:
   ```
   REACT_APP_API_URL = https://exam-prep-backend.onrender.com/api
   ```

5. Click **"Deploy"**

6. Wait 2-3 minutes

7. Your app will be live at: `https://exam-prep-assistant.vercel.app`

#### D. Update Backend APP_URL
1. Go back to Render.com
2. Find your backend service
3. Go to **"Environment"**
4. Update `APP_URL` to your Vercel URL:
   ```
   APP_URL = https://exam-prep-assistant.vercel.app
   ```
5. Save changes (service will auto-redeploy)

---

## ✅ Verification

### Test Backend
Visit: `https://exam-prep-backend.onrender.com/`

Should see:
```json
{
  "status": "ok",
  "message": "Exam Prep Assistant API is running"
}
```

### Test Frontend
Visit: `https://exam-prep-assistant.vercel.app`

Should see the upload page!

### Test Full Flow
1. Upload a PDF file
2. Check if analysis works
3. View dashboard
4. Open a section
5. Take a quiz

---

## 🎉 You're Live!

Your app is now:
- ✅ Hosted 24/7
- ✅ 100% FREE
- ✅ Auto-deploys on git push
- ✅ HTTPS enabled
- ✅ Global CDN

Share your app URL with friends!

---

## 📊 Free Tier Limits

### Render.com (Backend)
- **750 hours/month** (enough for 24/7 if it's your only service)
- Spins down after 15 minutes of inactivity
- Takes ~30 seconds to wake up on first request
- **Workaround**: Use a free uptime monitor (see below)

### Vercel (Frontend)
- **Unlimited bandwidth** for personal use
- **100 GB** bandwidth for commercial
- No sleep/spin-down
- Always instant

---

## 🔄 Keep Backend Awake (Optional)

Render free tier spins down after 15 min inactivity. To keep it awake:

### Option 1: UptimeRobot (Recommended)
1. Go to [UptimeRobot.com](https://uptimerobot.com/)
2. Sign up (free)
3. Add new monitor:
   - **Type**: HTTP(s)
   - **URL**: `https://exam-prep-backend.onrender.com/api/health`
   - **Interval**: 5 minutes
4. Save

Now your backend will be pinged every 5 minutes and stay awake!

### Option 2: Cron-Job.org
1. Go to [Cron-Job.org](https://cron-job.org/)
2. Sign up (free)
3. Create new cron job:
   - **URL**: `https://exam-prep-backend.onrender.com/api/health`
   - **Interval**: Every 5 minutes
4. Enable

---

## 🔧 Future Updates

To update your deployed app:

```bash
# Make your changes
# Commit them
git add .
git commit -m "Description of changes"

# Push to GitHub
git push

# Both Vercel and Render will auto-deploy! 🚀
```

---

## 🐛 Troubleshooting

### Backend Deploy Failed
**Check**:
- Environment variables are set correctly
- `OPENROUTER_API_KEY` is valid
- Build command is `npm install`
- Start command is `node server/index.js`

### Frontend Can't Connect to Backend
**Check**:
- `REACT_APP_API_URL` in Vercel environment variables
- Backend URL is correct (no trailing slash)
- Backend is actually running (visit the URL)

### CORS Errors
**Check**:
- `APP_URL` in Render matches your Vercel URL
- Both URLs use `https://` (not `http://`)

### Files Not Uploading
**Issue**: Render free tier has limited disk space

**Solution**: Files are stored temporarily and deleted on restart. This is fine for a study app - users can re-upload.

**Alternative**: Use cloud storage (Cloudinary, AWS S3) for persistent storage

---

## 💰 Cost Breakdown

| Service | Free Tier | Cost |
|---------|-----------|------|
| Render (Backend) | 750 hours/month | $0 |
| Vercel (Frontend) | Unlimited deploys | $0 |
| OpenRouter API | Free models | $0 |
| GitHub | Unlimited repos | $0 |
| UptimeRobot | 50 monitors | $0 |
| **TOTAL** | | **$0/month** ✅ |

---

## 🌟 Custom Domain (Optional)

Want your own domain like `studybuddy.com`?

### Buy Domain (~$12/year)
- Namecheap
- Google Domains
- GoDaddy

### Connect to Vercel
1. Go to Vercel project settings
2. Click **"Domains"**
3. Add your custom domain
4. Follow DNS configuration steps

**Cost**: ~$12/year (optional)

---

## 📱 Share Your App

Your app URLs:
- **Frontend**: `https://exam-prep-assistant.vercel.app`
- **Backend API**: `https://exam-prep-backend.onrender.com`

Share the frontend URL with:
- Classmates
- Study groups
- Social media
- University forums

---

## 🔐 Security Notes

1. **Never commit `.env`** - Already in `.gitignore` ✅
2. **Keep OpenRouter key secret** - Use environment variables ✅
3. **HTTPS enabled** - Automatic on Vercel and Render ✅
4. **File upload limits** - 50MB max per file ✅

---

## 📈 Scaling (If Needed)

If your app gets popular and needs more resources:

### Render Paid Plans
- **Starter**: $7/month (no sleep, more resources)
- **Standard**: $25/month (even more resources)

### Vercel Paid Plans
- Usually not needed for student projects
- Free tier is very generous

But for now, **FREE is perfect**! 🎉

---

## 🎓 For Students

This setup is perfect for:
- Personal use
- Class projects
- Hackathons
- Portfolio projects
- Sharing with study groups

All **100% FREE** with professional-grade hosting!

---

## Need Help?

1. Check [README.md](README.md) for app documentation
2. Check [QUICKSTART.md](QUICKSTART.md) for local setup
3. Check Render/Vercel documentation
4. Check OpenRouter status

---

**Congratulations!** 🎉

Your Exam Prep Assistant is now live 24/7 for FREE!

Share it with your classmates and help them study smarter! 🚀
