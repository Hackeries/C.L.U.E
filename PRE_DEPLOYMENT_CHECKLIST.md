# ✅ Pre-Deployment Checklist

Use this checklist before deploying to production to ensure everything is configured correctly.

---

## 🔐 Security

- [ ] **SECRET_KEY** is set to a strong, random value (not the default)
- [ ] **DEBUG** is set to `False` in production
- [ ] **ALLOWED_HOSTS** includes your production domain(s)
- [ ] **CSRF_TRUSTED_ORIGINS** includes your production domain(s)
- [ ] **SECURE_SSL_REDIRECT** is set to `True`
- [ ] **SECURE_HSTS_SECONDS** is set to a reasonable value (e.g., 3600)
- [ ] Database password is strong and unique
- [ ] `.env` file is in `.gitignore` (never commit secrets!)
- [ ] Environment variables are set in production platform

---

## 💾 Database

- [ ] PostgreSQL database is created (Supabase/Neon/Local)
- [ ] **DATABASE_URL** is correctly configured
- [ ] Database credentials are stored securely
- [ ] Migrations have been run successfully
- [ ] Superuser account is created
- [ ] Test database connectivity
- [ ] Backup strategy is in place
- [ ] Old MySQL data has been exported (if migrating)
- [ ] Data has been imported to PostgreSQL
- [ ] Data integrity verified after migration

---

## 📁 Static & Media Files

- [ ] `STATIC_ROOT` is configured correctly
- [ ] `STATIC_URL` is set properly
- [ ] `python manage.py collectstatic` runs without errors
- [ ] Static files are accessible in production
- [ ] Media storage is configured (S3/Supabase/Local)
- [ ] **USE_S3** environment variable is set (if using S3)
- [ ] AWS credentials are configured (if using S3)
- [ ] Media uploads are tested and working
- [ ] Image optimization is considered

---

## 📧 Email Configuration

- [ ] **EMAIL_BACKEND** is configured
- [ ] **EMAIL_HOST** is set (e.g., smtp.gmail.com)
- [ ] **EMAIL_PORT** is correct (usually 587 for TLS)
- [ ] **EMAIL_HOST_USER** is set
- [ ] **EMAIL_HOST_PASSWORD** is set (use app password for Gmail)
- [ ] **EMAIL_USE_TLS** is True
- [ ] **DEFAULT_FROM_EMAIL** is set
- [ ] Test email sending works
- [ ] Password reset emails work
- [ ] Verification emails work (if applicable)

---

## 🎨 Frontend

- [ ] All pages load correctly
- [ ] No console errors in browser
- [ ] Mobile responsiveness tested
- [ ] Navigation works on all screen sizes
- [ ] Forms validate properly
- [ ] Error pages (404, 500) are styled
- [ ] Favicon is added
- [ ] Meta tags are set for SEO
- [ ] Open Graph tags for social sharing
- [ ] Analytics tracking added (if needed)
- [ ] Performance optimizations applied
- [ ] Images are optimized
- [ ] Fonts load correctly
- [ ] Icons render properly

---

## 🧪 Testing

### Authentication
- [ ] User registration works
- [ ] Email validation works (@banasthali.in domain check)
- [ ] Login works
- [ ] Logout works
- [ ] Password reset works
- [ ] Coordinator login works
- [ ] Admin login works
- [ ] Session management works

### Features
- [ ] Events can be created
- [ ] Events display correctly
- [ ] Clubs display correctly
- [ ] Department pages work
- [ ] Calendar view works
- [ ] Search functionality works (if applicable)
- [ ] Notices can be posted
- [ ] Dashboard displays correct data
- [ ] Admin panel is accessible
- [ ] Coordinator dashboard works

### Cross-Browser
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile browsers

### Devices
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)

---

## 🚀 Performance

- [ ] Page load times are acceptable (< 3 seconds)
- [ ] Images are compressed
- [ ] CSS/JS is minified (in production)
- [ ] Database queries are optimized
- [ ] No N+1 query problems
- [ ] Caching is implemented where needed
- [ ] CDN is configured (if using)
- [ ] GZIP compression enabled
- [ ] Browser caching headers set

---

## 📊 Monitoring & Logging

- [ ] Error logging is configured
- [ ] Production logs are accessible
- [ ] Database monitoring is set up
- [ ] Uptime monitoring configured
- [ ] Performance monitoring added
- [ ] Error tracking service integrated (Sentry, etc.)
- [ ] Analytics dashboard set up

---

## 🔄 Deployment Platform

### Vercel
- [ ] `vercel.json` is configured
- [ ] Environment variables set in dashboard
- [ ] Domain is connected
- [ ] SSL certificate is active
- [ ] Build succeeds

### Heroku
- [ ] `Procfile` is present
- [ ] `runtime.txt` specifies Python version
- [ ] Heroku PostgreSQL addon added
- [ ] Environment variables configured
- [ ] Dyno type selected
- [ ] SSL enabled

### Railway
- [ ] GitHub repo connected
- [ ] PostgreSQL database provisioned
- [ ] Environment variables set
- [ ] Domain configured
- [ ] Build succeeds

### AWS/DigitalOcean
- [ ] Server provisioned
- [ ] Nginx/Apache configured
- [ ] SSL certificate installed
- [ ] Firewall rules set
- [ ] Database server configured
- [ ] Automatic backups enabled

---

## 📝 Documentation

- [ ] README.md is updated
- [ ] Deployment instructions documented
- [ ] Environment variables documented
- [ ] API documentation (if applicable)
- [ ] User guide created (if needed)
- [ ] Admin guide created
- [ ] Coordinator guide created

---

## 🔐 Backup & Recovery

- [ ] Database backup strategy defined
- [ ] Automated backups scheduled
- [ ] Backup restoration tested
- [ ] Media files backup configured
- [ ] Disaster recovery plan documented
- [ ] Rollback procedure defined

---

## 🌐 Domain & DNS

- [ ] Domain purchased (if needed)
- [ ] DNS records configured
- [ ] A/CNAME records point to server
- [ ] SSL certificate issued
- [ ] HTTPS redirect enabled
- [ ] www redirect configured (if needed)
- [ ] DNS propagation complete

---

## 👥 Team Access

- [ ] Team members have necessary access
- [ ] Admin accounts created
- [ ] Coordinator accounts created
- [ ] Permissions are properly configured
- [ ] Access logs are enabled

---

## 🎯 Post-Deployment

- [ ] Smoke test all critical features
- [ ] Monitor error logs for 24 hours
- [ ] Check performance metrics
- [ ] Verify email sending
- [ ] Test user registration flow
- [ ] Verify all forms work
- [ ] Check mobile experience
- [ ] Monitor database performance
- [ ] Review server resource usage

---

## 📋 Final Checks

- [ ] All previous MySQL references removed
- [ ] No hardcoded credentials in code
- [ ] `.gitignore` includes sensitive files
- [ ] Git history doesn't contain secrets
- [ ] Dependencies are up to date
- [ ] Security headers are configured
- [ ] CORS is configured correctly (if needed)
- [ ] Rate limiting implemented (if needed)
- [ ] Terms of Service page added (if needed)
- [ ] Privacy Policy page added (if needed)

---

## 🎊 Launch Day

### Before Launch
1. [ ] Create production database backup
2. [ ] Notify team of deployment time
3. [ ] Prepare rollback plan
4. [ ] Double-check all environment variables

### During Launch
1. [ ] Deploy to production
2. [ ] Run migrations
3. [ ] Collect static files
4. [ ] Verify deployment success
5. [ ] Smoke test critical features

### After Launch
1. [ ] Monitor error logs
2. [ ] Check analytics
3. [ ] Respond to any issues quickly
4. [ ] Gather user feedback
5. [ ] Document any post-deployment issues

---

## 🆘 Rollback Plan

If something goes wrong:

1. **Keep the old system running** until fully tested
2. **Have database backups** ready to restore
3. **Document rollback steps**:
   ```bash
   # Restore database
   pg_restore -d clue_db backup.dump
   
   # Revert to previous deployment
   git revert [commit-hash]
   git push origin main
   
   # Or rollback on platform
   heroku rollback  # Heroku
   vercel rollback  # Vercel
   ```

4. **Notify users** of any issues
5. **Fix issues** and redeploy

---

## ✅ Sign-Off

Before going live, get approval from:

- [ ] Technical Lead / Developer
- [ ] Project Manager
- [ ] Quality Assurance
- [ ] Stakeholders
- [ ] Database Administrator (if separate)

---

## 📞 Emergency Contacts

Document emergency contacts:
- Developer: _______________
- System Admin: _______________
- Database Admin: _______________
- Hosting Support: _______________

---

**Once all items are checked, you're ready to deploy! 🚀**

Good luck with your launch! 🎉
