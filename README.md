# College Link Up for Events (C.L.U.E) 🎓

**A modern, full-stack event management system for colleges and universities**

C.L.U.E is a comprehensive web application that combines a Django REST API backend with a React frontend and Supabase cloud services to manage college clubs, events, and festivals. The platform provides real-time updates, photo galleries, analytics, and report generation capabilities.

## ✨ Key Features

### Core Functionality
- 🔐 **Authentication & Authorization** - Secure user management with Supabase Auth
- 📅 **Event Management** - Full CRUD operations for events, clubs, and departments
- 🏢 **Department Organization** - Categorize events by department
- 🎨 **Modern React UI** - Beautiful, responsive interface with dark/light mode
- 📊 **Analytics Dashboard** - Visual statistics and insights
- 🖼️ **Photo Gallery** - Event image management with Supabase Storage
- 📄 **Report Generation** - Export event reports as PDF or Excel
- 🔔 **Real-Time Notifications** - Live updates using Supabase Realtime
- 📱 **Mobile-First Design** - Fully responsive across all devices

### Modern Tech Stack
- **Frontend:** React 18 + TypeScript + Vite + TailwindCSS + ShadCN/UI + Framer Motion
- **Backend:** Django 5.1.5 + Django REST Framework
- **Database:** PostgreSQL (Supabase)
- **Cloud Services:** Supabase (Auth, Storage, Realtime)
- **Deployment:** Vercel (Frontend), Render/Railway (Backend)

## 🚀 Quick Start

### Prerequisites
- Python 3.11+
- Node.js 18+
- Supabase account (free tier available)
- Git

### Backend Setup (Django)

1. **Clone and Setup Virtual Environment:**
```bash
git clone https://github.com/AkAnK1407/Clue_Django.git
cd Clue_Django
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. **Install Dependencies:**
```bash
pip install -r requirements.txt
```

3. **Configure Environment Variables:**
```bash
# Create .env file in project root
cat > .env << EOF
SECRET_KEY=your-secret-key-here
DEBUG=True
DATABASE_URL=your-supabase-postgres-url
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_KEY=your-supabase-anon-key
EOF
```

4. **Run Migrations:**
```bash
python manage.py migrate
python manage.py createsuperuser
```

5. **Start Django Server:**
```bash
python manage.py runserver
```

Backend API available at: `http://localhost:8000/api/`

### Frontend Setup (React)

1. **Navigate to Frontend Directory:**
```bash
cd frontend
```

2. **Install Dependencies:**
```bash
npm install
```

3. **Configure Environment:**
```bash
cp .env.example .env
# Edit .env with your Supabase credentials
```

4. **Start Development Server:**
```bash
npm run dev
```

Frontend available at: `http://localhost:5173`

## 📖 Documentation

- **[Supabase Setup Guide](SUPABASE_SETUP_GUIDE.md)** - Complete Supabase configuration
- **[Deployment Guide](DEPLOYMENT_GUIDE.md)** - Production deployment instructions
- **[Frontend README](frontend/README.md)** - React app documentation
- **[Modernization Summary](MODERNIZATION_COMPLETE.md)** - Feature implementation details

## 📁 Project Structure

```
/workspace/
├── frontend/                    # React Frontend (NEW)
│   ├── src/
│   │   ├── components/          # React components
│   │   │   ├── ui/             # Base UI components
│   │   │   ├── admin/          # Admin dashboard
│   │   │   ├── gallery/        # Photo gallery
│   │   │   ├── reports/        # Report generation
│   │   │   └── notifications/  # Real-time notifications
│   │   ├── hooks/              # Custom React hooks
│   │   ├── lib/                # Utilities & Supabase client
│   │   ├── services/           # API services
│   │   └── types/              # TypeScript definitions
│   └── package.json
│
├── api/                         # Django REST API
│   ├── analytics.py            # Analytics endpoints
│   ├── gallery.py              # Gallery management
│   ├── reports.py              # Report generation
│   └── views.py                # Core API views
│
├── event/                       # Event models & views
├── department/                  # Department models
├── signup/                      # User authentication
├── admin_handling/             # Admin functionality
├── clue/                       # Django project config
│
├── SUPABASE_SETUP_GUIDE.md     # Supabase configuration
├── DEPLOYMENT_GUIDE.md         # Deployment instructions
├── MODERNIZATION_COMPLETE.md   # Implementation summary
└── requirements.txt            # Python dependencies
```

## 🎯 Usage

### For Administrators
1. Login to admin dashboard at `/admin` or through React UI
2. Create and manage events with full CRUD operations
3. Upload event posters and gallery images
4. Generate PDF or Excel reports
5. Monitor real-time event analytics
6. Manage departments and clubs

### For Students
1. Browse upcoming and past events
2. View event details and galleries
3. Register for events
4. Receive real-time notifications
5. Access event information on mobile devices

## 🌟 What's New in the Modernization

### Frontend Enhancements
✅ Modern React UI with TypeScript
✅ Dark/light theme toggle
✅ Real-time notifications
✅ Responsive mobile-first design
✅ Smooth animations with Framer Motion
✅ Photo gallery with drag-and-drop upload
✅ PDF/Excel report generation

### Backend Improvements
✅ RESTful API with Django REST Framework
✅ Analytics endpoints for statistics
✅ Gallery management API
✅ Report generation API
✅ PostgreSQL with Supabase

### Cloud Infrastructure
✅ Supabase for database (PostgreSQL)
✅ Supabase Auth for authentication
✅ Supabase Storage for media files
✅ Supabase Realtime for live updates
✅ Vercel-ready frontend deployment
✅ Render/Railway-ready backend deployment

## 🧪 Testing

### Backend Tests
```bash
python manage.py test
```

### Frontend Tests
```bash
cd frontend
npm run test
```

## 🚢 Production Deployment

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for comprehensive deployment instructions.

**Quick Deploy:**

```bash
# Deploy Frontend to Vercel
cd frontend
vercel --prod

# Deploy Backend to Render
# Connect GitHub repo in Render dashboard
```

## 🔒 Security

- Environment variables for sensitive data
- CORS configuration for API security
- Row Level Security in Supabase
- HTTPS enforced in production
- CSRF protection enabled
- SQL injection prevention with Django ORM

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Original C.L.U.E project by AkAnK1407
- Supabase for cloud infrastructure
- React and Django communities
- All contributors and testers

## 📞 Support

For issues, questions, or contributions:
- 📧 Open an issue on GitHub
- 📖 Check the documentation files
- 💬 Review the setup guides

---

**Built with ❤️ for colleges and universities**

Ready to deploy! 🚀 See [MODERNIZATION_COMPLETE.md](MODERNIZATION_COMPLETE.md) for full feature list.

