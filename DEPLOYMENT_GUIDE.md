# Chatbot Deployment Guide

## 🌟 Features

- **Name-First Interaction**: Users must enter their name before chatting
- **Personalized Responses**: AI greets users by name in every response  
- **Profile Focus**: Only answers questions about Saw Bhone Htet's professional details
- **Clean Interface**: Profile image and intuitive layout
- **Voice Replies**: Optional text-to-speech for AI responses
- **Secure Deployment**: API keys safely stored in backend environment

## Overview
This guide will help you deploy your personal chatbot safely:
- **Frontend**: Netlify (no API keys exposed)
- **Backend**: Render (API keys secure in environment variables)

## 🚀 Step 1: Deploy Backend to Render

### 1.1 Prepare Backend
1. Navigate to the `backend` folder
2. Copy `.env.example` to `.env` and add your OpenRouter API key:
   ```
   OPENROUTER_API_KEY=sk-or-v1-your-actual-key-here
   PORT=3000
   ```

### 1.2 Create Render Account & Deploy
1. Go to [render.com](https://render.com) and sign up
2. Click "New +" → "Web Service"
3. Connect your GitHub repository (push your code to GitHub first)
4. Configure:
   - **Name**: `chatbot-backend` (or your choice)
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

### 1.3 Set Environment Variables
In Render dashboard:
1. Go to your service → "Environment"
2. Add environment variable:
   - **Key**: `OPENROUTER_API_KEY`
   - **Value**: `sk-or-v1-your-actual-key-here`
3. Save changes

### 1.4 Get Your Backend URL
After deployment, copy your Render URL (e.g., `https://chatbot-backend-xyz.onrender.com`)

## 🌐 Step 2: Update Frontend Configuration

### 2.1 Update Backend URL
In `app.js`, replace the BACKEND_URL:
```javascript
const BACKEND_URL = "https://your-actual-render-url.onrender.com";
```

### 2.2 Update CORS Configuration
In your backend `server.js`, update the CORS origin with your Netlify URL:
```javascript
app.use(cors({
  origin: ['http://localhost:3000', 'https://your-netlify-app.netlify.app'],
  credentials: true
}));
```

## 📱 Step 3: Deploy Frontend to Netlify

### 3.1 Create Netlify Account
1. Go to [netlify.com](https://netlify.com) and sign up
2. Connect your GitHub repository

### 3.2 Deploy Settings
1. Click "New site from Git"
2. Choose your repository
3. Configure build settings:
   - **Build command**: Leave empty (static site)
   - **Publish directory**: `.` (root directory)
4. Deploy!

### 3.3 Get Your Netlify URL
After deployment, copy your Netlify URL (e.g., `https://amazing-chatbot-xyz.netlify.app`)

## 🔄 Step 4: Final Configuration Update

### 4.1 Update Backend CORS
Go back to your backend `server.js` and update CORS with your actual Netlify URL:
```javascript
app.use(cors({
  origin: ['http://localhost:3000', 'https://your-actual-netlify-url.netlify.app'],
  credentials: true
}));
```

### 4.2 Redeploy Backend
Commit and push changes to trigger Render redeploy.

## ✅ Step 5: Test Your Deployment

1. Visit your Netlify URL
2. Test the chatbot functionality
3. Check browser console for any errors
4. Verify the backend is responding at `/` endpoint

## 🛠️ Troubleshooting

### Common Issues:

**CORS Errors:**
- Ensure your Netlify URL is added to backend CORS origins
- Check that URLs don't have trailing slashes

**API Key Errors:**
- Verify `OPENROUTER_API_KEY` is set in Render environment variables
- Check the key is valid and has sufficient credits

**Network Errors:**
- Ensure backend URL in frontend matches your Render deployment
- Check Render service is running (not sleeping)

**Rate Limiting:**
- The free DeepSeek model has rate limits
- The app includes retry logic with backoff

### Debug URLs:
- Backend health check: `https://your-render-url.onrender.com/`
- Should return: `{"status":"Backend is running","timestamp":"..."}`

## 🔒 Security Features

✅ **API keys are secure**: Only stored in Render environment variables  
✅ **No secrets in frontend**: Frontend code is clean  
✅ **CORS protection**: Backend only accepts requests from your domain  
✅ **Rate limiting**: Built-in retry logic for API limits  

## 📝 Notes

- **Free Tier Limitations**: 
  - Render free tier may sleep after 15 minutes of inactivity
  - DeepSeek free model has usage limits
  
- **Future Improvements**:
  - Add user authentication
  - Implement conversation persistence
  - Add custom domain

## 🎉 Your chatbot is now live and secure!

Frontend: `https://your-netlify-url.netlify.app`  
Backend: `https://your-render-url.onrender.com`