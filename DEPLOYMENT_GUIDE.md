# C.L.U.E Deployment Guide

Complete guide for deploying the modernized C.L.U.E (College Link Up for Events) application to production.

## Architecture Overview

```
┌─────────────────┐
│   React App     │ ← Vercel
│  (Frontend UI)  │
└────────┬────────┘
         │
         ├─────────────────┐
         │                 │
         ▼                 ▼
┌─────────────────┐ ┌──────────────────┐
│  Django API     │ │    Supabase      │
│   (Backend)     │ │  (DB + Storage)  │
│  Render/Railway │ │   (Auth + RT)    │
└─────────────────┘ └──────────────────┘
```

## Prerequisites

- [ ] Supabase account and project setup
- [ ] Vercel account
- [ ] Render or Railway account
- [ ] GitHub repository
- [ ] Domain name (optional)

## Part 1: Supabase Setup

See `SUPABASE_SETUP_GUIDE.md` for detailed instructions.

**Quick checklist:**
- [ ] Database migrated
- [ ] Storage buckets created
- [ ] Authentication enabled
- [ ] Realtime configured
- [ ] RLS policies set up

## Part 2: Deploy Django Backend

### Option A: Deploy to Render

1. **Create account at render.com**

2. **Create new Web Service:**
   - Connect your GitHub repository
   - Name: `clue-api`
   - Environment: `Python 3`
   - Build Command: `pip install -r requirements.txt && python manage.py collectstatic --noinput && python manage.py migrate`
   - Start Command: `gunicorn clue.wsgi:application`

3. **Set Environment Variables:**

```bash
PYTHON_VERSION=3.11.0
SECRET_KEY=your-secret-key-here
DEBUG=False
DATABASE_URL=your-supabase-postgres-url
ALLOWED_HOSTS=clue-api.onrender.com,your-custom-domain.com
CSRF_TRUSTED_ORIGINS=https://clue-api.onrender.com,https://your-frontend.vercel.app
CORS_ALLOWED_ORIGINS=https://your-frontend.vercel.app

# Supabase
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_KEY=your-supabase-anon-key

# Email (optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
EMAIL_USE_TLS=True

# Storage (if using S3/Supabase Storage)
USE_S3=True
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_STORAGE_BUCKET_NAME=your-bucket-name
```

4. **Deploy:**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Note your API URL: `https://clue-api.onrender.com`

### Option B: Deploy to Railway

1. **Create account at railway.app**

2. **Create new project:**

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link to project
railway link

# Add PostgreSQL (if not using Supabase)
railway add --database postgresql

# Deploy
railway up
```

3. **Set Environment Variables:**

```bash
railway variables set SECRET_KEY="your-secret-key"
railway variables set DEBUG="False"
railway variables set DATABASE_URL="your-supabase-url"
# ... (same as Render above)
```

4. **Configure Domain:**
   - Go to Railway dashboard
   - Settings > Domains
   - Generate domain or add custom domain

## Part 3: Deploy React Frontend

### Deploy to Vercel

1. **Install Vercel CLI:**

```bash
npm i -g vercel
```

2. **Build the frontend:**

```bash
cd frontend
npm install
npm run build
```

3. **Deploy:**

```bash
vercel --prod
```

4. **Configure Environment Variables:**

Go to Vercel Dashboard > Your Project > Settings > Environment Variables

```bash
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_API_URL=https://clue-api.onrender.com/api
VITE_APP_NAME=C.L.U.E
VITE_APP_ENV=production
```

5. **Redeploy with environment variables:**

```bash
vercel --prod
```

6. **Note your frontend URL:** `https://clue-events.vercel.app`

## Part 4: Configure CORS

Update Django settings to allow your frontend domain:

```python
# In settings.py
CORS_ALLOWED_ORIGINS = [
    "https://clue-events.vercel.app",
    "https://your-custom-domain.com",
]

CSRF_TRUSTED_ORIGINS = [
    "https://clue-events.vercel.app",
    "https://your-custom-domain.com",
]
```

## Part 5: Configure Custom Domains (Optional)

### For Frontend (Vercel)

1. Go to Vercel Dashboard > Your Project > Settings > Domains
2. Add your custom domain (e.g., `events.youruniversity.edu`)
3. Add DNS records as instructed
4. Wait for SSL certificate provisioning

### For Backend (Render)

1. Go to Render Dashboard > Your Service > Settings
2. Add custom domain
3. Add CNAME record pointing to Render
4. Update Django `ALLOWED_HOSTS` and `CSRF_TRUSTED_ORIGINS`

## Part 6: Post-Deployment Checklist

### Security

- [ ] Set strong `SECRET_KEY` in Django
- [ ] Set `DEBUG=False` in production
- [ ] Configure HTTPS (enabled by default on Vercel/Render)
- [ ] Set up CORS properly
- [ ] Enable Row Level Security in Supabase
- [ ] Rotate API keys regularly
- [ ] Set up rate limiting

### Performance

- [ ] Enable CDN (automatic on Vercel)
- [ ] Configure caching headers
- [ ] Optimize images
- [ ] Enable database connection pooling
- [ ] Set up monitoring

### Monitoring

- [ ] Set up error tracking (Sentry recommended)
- [ ] Configure logging
- [ ] Set up uptime monitoring
- [ ] Enable Supabase logs

### Backups

- [ ] Enable automatic database backups in Supabase
- [ ] Export environment variables
- [ ] Document deployment process
- [ ] Set up CI/CD pipeline

## Part 7: Testing Production

### Test Django API

```bash
curl https://clue-api.onrender.com/api/events/
```

### Test Frontend

1. Visit your frontend URL
2. Test authentication
3. Create a test event
4. Upload images to gallery
5. Generate a report
6. Check realtime notifications

### Load Testing

```bash
# Using Apache Bench
ab -n 1000 -c 10 https://clue-api.onrender.com/api/events/

# Using Artillery
artillery quick --count 10 --num 100 https://your-frontend.vercel.app
```

## Part 8: CI/CD Setup (Optional)

### GitHub Actions for Django

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Render

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Render
        run: |
          curl https://api.render.com/deploy/srv-xxxxx?key=xxxxx
```

### Vercel Auto-Deploy

Vercel automatically deploys on git push. Configure in `vercel.json`:

```json
{
  "builds": [
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "dist" }
    }
  ],
  "routes": [
    { "src": "/(.*)", "dest": "/frontend/$1" }
  ]
}
```

## Troubleshooting

### Build Failures

**Issue:** Build fails with module not found
- **Solution:** Check `requirements.txt` / `package.json`
- Ensure all dependencies are listed
- Check Python/Node version compatibility

### Database Connection Errors

**Issue:** Can't connect to Supabase
- **Solution:** Verify `DATABASE_URL` format
- Check IP whitelist (should be `0.0.0.0/0` for cloud hosting)
- Ensure SSL mode is enabled

### CORS Errors

**Issue:** Frontend can't access API
- **Solution:** Add frontend domain to `CORS_ALLOWED_ORIGINS`
- Update `CSRF_TRUSTED_ORIGINS`
- Redeploy backend

### Static Files Not Loading

**Issue:** CSS/JS not loading
- **Solution:** Run `python manage.py collectstatic`
- Configure `STATIC_ROOT` and `STATIC_URL`
- Check Whitenoise configuration

### Image Upload Fails

**Issue:** Can't upload to Supabase Storage
- **Solution:** Check bucket policies
- Verify CORS settings in Supabase
- Ensure file size limits
- Check authentication

## Maintenance

### Regular Tasks

- **Weekly:** Check error logs
- **Monthly:** Review analytics
- **Quarterly:** Update dependencies
- **Annually:** Rotate secrets and keys

### Updating the Application

```bash
# Update Django
git pull
railway up  # or trigger Render deployment

# Update React
cd frontend
git pull
vercel --prod
```

### Scaling

**Database:**
- Supabase offers automatic scaling
- Consider connection pooling for high traffic

**Backend:**
- Scale horizontally in Render/Railway
- Add more service instances

**Frontend:**
- Vercel handles scaling automatically
- Add custom CDN if needed

## Cost Estimates

### Free Tier (Development)

- Supabase: Free (500MB database, 1GB storage)
- Vercel: Free (100GB bandwidth)
- Render: Free (750 hours/month)
- **Total: $0/month**

### Production (Small College)

- Supabase Pro: $25/month (8GB database, 100GB storage)
- Vercel Pro: $20/month (1TB bandwidth)
- Render Starter: $7/month (512MB RAM)
- **Total: ~$52/month**

### Enterprise (Large University)

- Supabase Team: Custom pricing
- Vercel Enterprise: Custom pricing
- Render Professional: Custom pricing
- **Total: Contact for quote**

## Support Resources

- **Supabase:** https://supabase.com/docs
- **Vercel:** https://vercel.com/docs
- **Render:** https://render.com/docs
- **Django:** https://docs.djangoproject.com
- **React:** https://react.dev

## Emergency Contacts

Keep these handy for production issues:

- Database emergency: Supabase support
- Hosting issues: Render/Vercel support
- DNS issues: Domain registrar support

---

## Next Steps

After successful deployment:

1. Set up monitoring and alerts
2. Configure backup schedules
3. Document your custom configurations
4. Train admin users
5. Create user documentation
6. Plan for scaling

**Congratulations! Your C.L.U.E application is now live! 🎉**
