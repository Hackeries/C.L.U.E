# C.L.U.E Quick Start Guide 🚀

Get your modernized C.L.U.E application up and running in 15 minutes!

## ⚡ TL;DR - Super Quick Setup

```bash
# 1. Backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver

# 2. Frontend (new terminal)
cd frontend
npm install
cp .env.example .env  # Edit with your Supabase credentials
npm run dev

# 3. Visit http://localhost:5173
```

## 📋 Prerequisites Checklist

Before starting, make sure you have:

- [ ] Python 3.11 or higher installed
- [ ] Node.js 18 or higher installed
- [ ] Git installed
- [ ] Code editor (VS Code recommended)
- [ ] Supabase account (optional for now, required for production)

## 🎯 Step-by-Step Setup

### Step 1: Clone and Setup Backend (5 minutes)

```bash
# Clone repository
git clone https://github.com/AkAnK1407/Clue_Django.git
cd Clue_Django

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install Python dependencies
pip install -r requirements.txt

# Run database migrations
python manage.py migrate

# Create admin user
python manage.py createsuperuser
# Enter username, email, and password when prompted

# Start Django development server
python manage.py runserver
```

✅ Backend should now be running at `http://localhost:8000`

Test it: http://localhost:8000/api/events/

### Step 2: Setup Frontend (5 minutes)

Open a **new terminal** window:

```bash
# Navigate to frontend directory
cd frontend

# Install Node.js dependencies
npm install

# Create environment file
cp .env.example .env
```

**Edit the `.env` file:**

For local development without Supabase (basic testing):
```bash
VITE_SUPABASE_URL=http://localhost:8000
VITE_SUPABASE_ANON_KEY=dummy-key-for-testing
VITE_API_URL=http://localhost:8000/api
VITE_APP_NAME=C.L.U.E
```

```bash
# Start React development server
npm run dev
```

✅ Frontend should now be running at `http://localhost:5173`

### Step 3: Test the Application (2 minutes)

1. **Open browser:** http://localhost:5173

2. **Test Django Admin:**
   - Visit: http://localhost:8000/admin
   - Login with superuser credentials
   - Create a test department
   - Create a test event

3. **Test API:**
   - Visit: http://localhost:8000/api/events/
   - You should see JSON response with events

4. **Test React UI:**
   - The frontend will show the admin dashboard
   - (Note: Full auth requires Supabase setup)

## 🎨 What You Can Do Now

### Without Supabase (Local Development)
✅ Browse events via Django admin
✅ Create/edit events in Django admin
✅ Test API endpoints
✅ View React UI components
✅ Test responsive design
✅ Develop and customize

### With Supabase (Full Features)
✅ Everything above, plus:
✅ User authentication
✅ Real-time notifications
✅ Image upload to cloud storage
✅ Photo galleries
✅ Report generation
✅ Analytics dashboard

## 🌐 Setup Supabase (Optional - 10 minutes)

For full functionality, follow these steps:

### 1. Create Supabase Project

1. Go to https://supabase.com
2. Sign up and create a new project
3. Wait 2-3 minutes for provisioning
4. Note your project URL and anon key

### 2. Update Environment Variables

**Backend (.env in project root):**
```bash
DATABASE_URL=your-supabase-postgres-url
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_KEY=your-supabase-anon-key
```

**Frontend (frontend/.env):**
```bash
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_API_URL=http://localhost:8000/api
```

### 3. Run Migrations to Supabase

```bash
python manage.py migrate
```

### 4. Setup Storage Buckets

In Supabase Dashboard:
1. Go to Storage
2. Create bucket: `event-posters` (public)
3. Create bucket: `event-gallery` (public)
4. Create bucket: `department-posters` (public)

### 5. Enable Realtime

In Supabase Dashboard:
1. Go to Database > Replication
2. Enable replication for:
   - `event_event`
   - `event_notice`
   - `event_department`

### 6. Restart Servers

```bash
# Restart both backend and frontend
# They will now use Supabase!
```

## 🎉 You're All Set!

### Default URLs

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:8000/api
- **Django Admin:** http://localhost:8000/admin
- **API Documentation:** http://localhost:8000/api/ (browseable)

### Quick Tips

**🔥 Hot Reload is Enabled**
- Changes to React files auto-refresh
- Changes to Django files auto-reload

**📱 Test Mobile View**
- Open browser dev tools
- Toggle device toolbar
- Test responsive design

**🎨 Customize Theme**
- Edit `frontend/src/index.css` for colors
- Modify `frontend/tailwind.config.js` for theme

**🔧 Troubleshooting**

| Issue | Solution |
|-------|----------|
| Port already in use | Kill process: `lsof -ti:8000 \| xargs kill -9` |
| Module not found | Run `pip install -r requirements.txt` again |
| CORS errors | Check Django `CORS_ALLOWED_ORIGINS` setting |
| Can't connect to API | Verify backend is running on port 8000 |

## 📚 Next Steps

### For Development

1. **Read Documentation:**
   - [Frontend README](frontend/README.md)
   - [Supabase Setup Guide](SUPABASE_SETUP_GUIDE.md)
   - [Modernization Summary](MODERNIZATION_COMPLETE.md)

2. **Explore the Code:**
   - React components in `frontend/src/components/`
   - API endpoints in `api/`
   - Django models in `event/models.py`

3. **Customize:**
   - Add new features
   - Modify UI components
   - Create new API endpoints

### For Production

When ready to deploy:

1. **Setup Supabase** (required for production)
2. **Follow Deployment Guide:** [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
3. **Deploy Frontend to Vercel**
4. **Deploy Backend to Render/Railway**
5. **Configure custom domain**

## 🎓 Learning Resources

### React & TypeScript
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)

### Django & DRF
- [Django Documentation](https://docs.djangoproject.com)
- [Django REST Framework](https://www.django-rest-framework.org/)

### Supabase
- [Supabase Docs](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)

### UI & Styling
- [TailwindCSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [Radix UI](https://www.radix-ui.com/)

## 💡 Common Tasks

### Add a New Event

**Via Django Admin:**
1. Go to http://localhost:8000/admin
2. Click "Events" → "Add Event"
3. Fill in details and save

**Via React UI (with Supabase):**
1. Login to admin dashboard
2. Click "Events" tab
3. Click "Create Event"
4. Fill form and submit

### Upload Event Images

1. Navigate to Events in admin dashboard
2. Click "Gallery" button on any event
3. Click "Upload Images"
4. Select multiple images
5. Images upload to Supabase Storage

### Generate Report

1. Go to Events in admin dashboard
2. Click report icon on any event
3. Choose PDF or Excel
4. Report downloads automatically

### View Analytics

1. Click "Analytics" tab in admin dashboard
2. View statistics cards
3. Explore charts and graphs

## 🐛 Getting Help

If you encounter issues:

1. **Check the console** for error messages
2. **Review the documentation** files
3. **Check Django logs** in terminal
4. **Verify environment variables** are set correctly
5. **Ensure all services are running**

### Useful Commands

```bash
# Check Python version
python --version

# Check Node version
node --version

# Check npm version
npm --version

# List running processes on port 8000
lsof -ti:8000

# View Django logs
python manage.py runserver --verbosity 3

# Clear npm cache
npm cache clean --force

# Reinstall node modules
rm -rf node_modules package-lock.json && npm install
```

## ✨ Features to Try

Once you're set up, try these features:

- [ ] Create a department
- [ ] Create an event with poster
- [ ] Upload multiple images to event gallery
- [ ] Generate PDF report
- [ ] Export Excel report
- [ ] Toggle dark/light mode
- [ ] Test mobile responsiveness
- [ ] Create a notice
- [ ] View analytics dashboard
- [ ] Test real-time notifications (with Supabase)

## 🎯 Development Workflow

**Recommended workflow:**

```bash
# Morning - Start both servers
python manage.py runserver  # Terminal 1
cd frontend && npm run dev   # Terminal 2

# During development - Make changes
# - React files auto-reload
# - Django files auto-reload

# Evening - Stop servers
# Ctrl+C in both terminals
```

---

## 🎉 Congratulations!

You now have a modern, full-stack event management system running locally!

**What's included:**
✅ Django REST API backend
✅ React TypeScript frontend
✅ Modern UI with TailwindCSS
✅ Admin dashboard
✅ Event management
✅ Photo galleries (with Supabase)
✅ Report generation
✅ Real-time notifications (with Supabase)
✅ Dark/light mode

**Ready for the next step?**
- Explore the codebase
- Customize the design
- Add new features
- Deploy to production

Happy coding! 🚀

---

*For detailed information, see [MODERNIZATION_COMPLETE.md](MODERNIZATION_COMPLETE.md)*
