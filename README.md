# Personal AI Chatbot - Saw Bhone Htet

A personalized AI chatbot that represents Saw Bhone Htet, featuring a secure frontend-backend architecture with name-first user interaction.

## 🌟 Features

- **Name-First Modal**: Users must enter their name before accessing chat
- **Personalized AI**: Responses always address users by name
- **Profile Focus**: AI only shares information about Saw Bhone Htet
- **Secure Architecture**: API keys protected in backend environment
- **Voice Replies**: Optional text-to-speech functionality
- **Responsive Design**: Works on desktop and mobile

## 🏗️ Architecture

- **Frontend**: Static HTML/CSS/JS hosted on Netlify
- **Backend**: Node.js/Express API hosted on Render
- **AI Service**: OpenRouter with DeepSeek V3 model
- **Storage**: Browser localStorage for user preferences

## 🚀 Live Demo

- **Frontend**: `https://your-app.netlify.app` (update after deployment)
- **Backend**: `https://your-backend.onrender.com` (update after deployment)

## 📁 Project Structure

```
my-chatbot2/
├── index.html              # Frontend interface
├── app.js                  # Frontend JavaScript
├── style.css               # Frontend styles (if separate)
├── _redirects              # Netlify configuration
├── DEPLOYMENT_GUIDE.md     # Detailed deployment instructions
└── backend/
    ├── server.js           # Express API server
    ├── package.json        # Backend dependencies
    ├── .env.example        # Environment template
    └── .gitignore          # Backend ignore rules
```

## 🛠️ Local Development

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Add your OPENROUTER_API_KEY to .env
npm start
```

### Frontend Setup
Simply open `index.html` in a browser or use a local server:
```bash
python -m http.server 8000
# or
npx serve .
```

## 🌐 Deployment

### 1. Backend (Render)
1. Push to GitHub
2. Create Render web service
3. Set Root Directory: `backend`
4. Add environment variable: `OPENROUTER_API_KEY`

### 2. Frontend (Netlify)
1. Connect GitHub repository
2. Deploy from root directory
3. Update backend URL in `app.js`

See `DEPLOYMENT_GUIDE.md` for detailed instructions.

## 🔒 Security

- ✅ API keys stored in backend environment variables
- ✅ CORS protection configured
- ✅ No sensitive data in frontend code
- ✅ Secure frontend-backend communication

## 👨‍💻 About

Created by Saw Bhone Htet - Junior UI/UX Designer

- **Age**: 20 (Born January 13, 2005)
- **Experience**: FRI Group, Manga Translation, Shwe Bank Company
- **Hobbies**: Swimming, Cycling, Watching anime and movies

## 📄 License

MIT License - Feel free to use this as a template for your own projects!