# C.L.U.E - College Linkup of Events - Complete Setup Guide

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Project Structure](#project-structure)
3. [Environment Setup](#environment-setup)
4. [Backend Setup (Django)](#backend-setup-django)
5. [Frontend Setup (React + Vite)](#frontend-setup-react--vite)
6. [Database Configuration](#database-configuration)
7. [Running the Application](#running-the-application)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Python** 3.8 or higher
- **Node.js** 18.0 or higher
- **npm** 9.0 or higher (comes with Node.js)
- **Git**
- **VS Code** (recommended) or any code editor

---

## Project Structure

```
/workspace/
├── admin_handling/          # Django app for admin functionality
├── api/                     # Django REST API
├── clue/                    # Django project settings
├── department/              # Department management app
├── event/                   # Event management app
├── home/                    # Home page app
├── signup/                  # User signup app
├── frontend/                # React frontend (JavaScript)
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── hooks/           # Custom hooks
│   │   ├── lib/             # Utility functions
│   │   └── main.jsx         # Entry point
│   ├── public/              # Static assets
│   ├── package.json         # NPM dependencies
│   └── vite.config.js       # Vite configuration
├── static/                  # Django static files
├── template/                # Django templates
├── manage.py               # Django management script
├── requirements.txt        # Python dependencies
└── .gitignore             # Git ignore rules
```

---

## Environment Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd workspace
```

### 2. Create Environment Variables

#### Backend (.env in root directory)

Create a file named `.env` in the root directory:

```bash
# Django Settings
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Database (SQLite - Default)
DATABASE_URL=sqlite:///db.sqlite3

# OR PostgreSQL (Production)
# DATABASE_URL=postgresql://username:password@localhost:5432/clue_db

# Email Configuration (Optional)
EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password

# Supabase (Optional - for file storage and auth)
SUPABASE_URL=your-supabase-url
SUPABASE_KEY=your-supabase-anon-key

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173

# Media Files
MEDIA_URL=/media/
MEDIA_ROOT=media/
```

#### Frontend (.env in frontend/ directory)

Create a file named `.env` in the `frontend/` directory:

```bash
# API Configuration
VITE_API_URL=http://localhost:8000/api

# Supabase Configuration (Optional)
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# App Configuration
VITE_APP_NAME=C.L.U.E
VITE_APP_VERSION=1.0.0
```

---

## Backend Setup (Django)

### 1. Create Virtual Environment

```bash
# On Windows
python -m venv venv
venv\Scripts\activate

# On macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

### 2. Install Dependencies

```bash
pip install --upgrade pip
pip install -r requirements.txt
```

### 3. Database Migration

```bash
python manage.py makemigrations
python manage.py migrate
```

### 4. Create Superuser (Admin)

```bash
python manage.py createsuperuser
# Follow the prompts to create admin credentials
```

### 5. Collect Static Files

```bash
python manage.py collectstatic --noinput
```

### 6. Test Backend Server

```bash
python manage.py runserver
```

Visit `http://localhost:8000/admin` to verify the admin panel is working.

---

## Frontend Setup (React + Vite)

### 1. Navigate to Frontend Directory

```bash
cd frontend
```

### 2. Install Dependencies

```bash
npm install
```

If you encounter any errors, try:

```bash
npm install --legacy-peer-deps
```

### 3. Verify Installation

```bash
npm run dev
```

The frontend should start at `http://localhost:5173`

---

## Database Configuration

### SQLite (Development - Default)

No additional configuration needed. Django will create `db.sqlite3` automatically.

### PostgreSQL (Production - Recommended)

1. **Install PostgreSQL**

2. **Create Database**

```bash
psql -U postgres
CREATE DATABASE clue_db;
CREATE USER clue_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE clue_db TO clue_user;
\q
```

3. **Update .env**

```bash
DATABASE_URL=postgresql://clue_user:your_password@localhost:5432/clue_db
```

4. **Install psycopg2**

```bash
pip install psycopg2-binary
```

5. **Run Migrations**

```bash
python manage.py migrate
```

---

## Running the Application

### Development Mode

#### Terminal 1 - Backend Server

```bash
# Activate virtual environment
source venv/bin/activate  # or venv\Scripts\activate on Windows

# Run Django server
python manage.py runserver
```

Backend will run at: `http://localhost:8000`

#### Terminal 2 - Frontend Server

```bash
# Navigate to frontend
cd frontend

# Run development server
npm run dev
```

Frontend will run at: `http://localhost:5173`

### Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000/api
- **Admin Panel**: http://localhost:8000/admin

---

## VS Code Setup

### 1. Install Recommended Extensions

- **Python** (Microsoft)
- **Pylance** (Microsoft)
- **ES7+ React/Redux/React-Native snippets**
- **Prettier - Code formatter**
- **ESLint**
- **Tailwind CSS IntelliSense**

### 2. Create VS Code Settings

Create `.vscode/settings.json`:

```json
{
  "python.defaultInterpreterPath": "${workspaceFolder}/venv/bin/python",
  "python.linting.enabled": true,
  "python.linting.pylintEnabled": true,
  "python.formatting.provider": "black",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "[python]": {
    "editor.defaultFormatter": "ms-python.python"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

### 3. Create VS Code Launch Configuration

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Python: Django",
      "type": "python",
      "request": "launch",
      "program": "${workspaceFolder}/manage.py",
      "args": ["runserver"],
      "django": true,
      "justMyCode": true
    },
    {
      "name": "Frontend: Vite",
      "type": "node",
      "request": "launch",
      "cwd": "${workspaceFolder}/frontend",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "dev"]
    }
  ]
}
```

---

## Troubleshooting

### Common Issues

#### 1. Port Already in Use

**Backend (Port 8000):**
```bash
# Find and kill process
# Windows:
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# macOS/Linux:
lsof -ti:8000 | xargs kill -9
```

**Frontend (Port 5173):**
```bash
# Find and kill process
# Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# macOS/Linux:
lsof -ti:5173 | xargs kill -9
```

#### 2. Module Not Found Errors (Backend)

```bash
# Reinstall requirements
pip install -r requirements.txt --force-reinstall
```

#### 3. npm Install Errors (Frontend)

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

#### 4. CORS Errors

Make sure `CORS_ALLOWED_ORIGINS` in `.env` includes your frontend URL:
```
CORS_ALLOWED_ORIGINS=http://localhost:5173
```

And verify `django-cors-headers` is in `INSTALLED_APPS` in `clue/settings.py`.

#### 5. Static Files Not Loading

```bash
python manage.py collectstatic --clear --noinput
```

#### 6. Database Migration Errors

```bash
# Reset migrations (⚠️ This will delete all data)
python manage.py migrate --run-syncdb
python manage.py makemigrations
python manage.py migrate
```

---

## Production Deployment

### Build Frontend

```bash
cd frontend
npm run build
```

This creates a `dist/` folder with optimized production files.

### Django Production Settings

Update `clue/settings.py`:

```python
DEBUG = False
ALLOWED_HOSTS = ['your-domain.com', 'www.your-domain.com']

# Use environment variables
import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.environ.get('SECRET_KEY')
```

### Collect Static Files

```bash
python manage.py collectstatic --noinput
```

### Use a Production Server

Install Gunicorn:
```bash
pip install gunicorn
```

Run with:
```bash
gunicorn clue.wsgi:application --bind 0.0.0.0:8000
```

---

## Testing

### Backend Tests

```bash
python manage.py test
```

### Frontend Tests (if configured)

```bash
cd frontend
npm test
```

---

## Useful Commands

### Django

```bash
# Create new app
python manage.py startapp app_name

# Create migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Shell
python manage.py shell

# Show URLs
python manage.py show_urls
```

### Frontend

```bash
# Install new package
npm install package-name

# Remove package
npm uninstall package-name

# Update packages
npm update

# Check for outdated packages
npm outdated
```

---

## Additional Resources

- **Django Documentation**: https://docs.djangoproject.com/
- **React Documentation**: https://react.dev/
- **Vite Documentation**: https://vitejs.dev/
- **Tailwind CSS**: https://tailwindcss.com/docs

---

## Support

For issues or questions:
- Email: clue@banasthali.in
- Create an issue in the repository

---

**Happy Coding! 🚀**
