# Quick Start Guide - C.L.U.E Frontend

## 🚀 Get Started in 3 Steps

### Step 1: Navigate to Frontend Directory
```bash
cd /workspace/frontend
```

### Step 2: Install Dependencies (if not done)
```bash
npm install
```

### Step 3: Start Development Server
```bash
npm run dev
```

The application will be available at: **http://localhost:5173**

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🔧 Environment Setup

Create `.env` file:
```bash
cp .env.example .env
```

Configure your API URL:
```env
VITE_API_URL=http://localhost:8000/api
```

## 🌐 Accessing the Application

### Development
- **URL**: http://localhost:5173
- **Hot Reload**: Enabled (changes reflect immediately)

### Production
1. Build: `npm run build`
2. Preview: `npm run preview`
3. Deploy: `dist/` folder contains production files

## 📱 What You'll See

### Home Page
- Beautiful hero slideshow
- Latest updates from campus
- Department and club events
- FAQ section

### Navigation
- **Home** - Landing page
- **Clubs** - Browse campus clubs
- **Departments** - Department information
- **Calendar** - Event calendar view
- **Login** - Authentication

## 🎨 Design Highlights

- ✨ Smooth animations
- 📱 Fully responsive
- 🎯 Simple and intuitive
- ⚡ Lightning fast
- 🌈 Modern and clean

## 🔗 Backend Integration

To connect with your Django backend:

1. **Update API URL** in `.env`:
   ```env
   VITE_API_URL=http://your-backend-url:8000/api
   ```

2. **Configure CORS** in Django:
   ```python
   CORS_ALLOWED_ORIGINS = [
       "http://localhost:5173",
       "http://your-frontend-domain.com",
   ]
   ```

3. **Test API Connection**:
   - Start both backend and frontend
   - Open browser console
   - Check for API calls in Network tab

## 📚 Need Help?

- Check `/workspace/FRONTEND_REDESIGN_COMPLETE.md` for complete documentation
- Review `/workspace/frontend/README.md` for technical details
- Contact: clue@banasthali.in

## 💡 Pro Tips

1. **Keep both servers running**:
   - Terminal 1: Django backend (`python manage.py runserver`)
   - Terminal 2: React frontend (`npm run dev`)

2. **Hot reload works automatically** - just save your files!

3. **Check console for errors** - open browser DevTools (F12)

4. **API integration is ready** - just configure the endpoint!

---

**Enjoy building with C.L.U.E! 🎉**
