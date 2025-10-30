# Supabase Setup Guide for C.L.U.E

This guide will help you set up Supabase for the C.L.U.E event management system, including PostgreSQL database, authentication, storage, and realtime features.

## Prerequisites

- A Supabase account (sign up at https://supabase.com)
- PostgreSQL database access
- Node.js and npm installed
- Python 3.8+ installed

## Step 1: Create a Supabase Project

1. Go to https://app.supabase.com
2. Click "New Project"
3. Enter project details:
   - Name: `clue-events` (or your preferred name)
   - Database Password: Choose a strong password
   - Region: Select closest to your users
4. Click "Create new project"
5. Wait for the project to be provisioned (2-3 minutes)

## Step 2: Database Migration

### Option A: Using Django Migrations (Recommended)

1. **Update your environment variables:**

```bash
# .env file in Django root
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=[YOUR-SUPABASE-DB-PASSWORD]
DB_HOST=db.[YOUR-PROJECT-REF].supabase.co
DB_PORT=5432
```

2. **Run Django migrations:**

```bash
python manage.py migrate
```

3. **Create a superuser:**

```bash
python manage.py createsuperuser
```

4. **Load existing data (if migrating from SQLite):**

```bash
# Export from SQLite
python manage.py dumpdata --natural-foreign --natural-primary -e contenttypes -e auth.Permission --indent 2 > data.json

# Import to Supabase
python manage.py loaddata data.json
```

### Option B: Direct SQL Migration

If you have existing data in MySQL/SQLite, use the migration script:

```bash
python manage.py migrate --database=default
```

## Step 3: Configure Supabase Storage

### Create Storage Buckets

1. Go to Storage in Supabase dashboard
2. Create the following buckets:

#### Bucket: `event-posters`
- Public bucket: Yes
- Allowed MIME types: `image/*`
- Max file size: 5MB

#### Bucket: `event-gallery`
- Public bucket: Yes
- Allowed MIME types: `image/*`
- Max file size: 10MB

#### Bucket: `department-posters`
- Public bucket: Yes
- Allowed MIME types: `image/*`
- Max file size: 5MB

#### Bucket: `reports`
- Public bucket: No (authenticated users only)
- Allowed MIME types: `application/pdf`, `application/vnd.ms-excel`, `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`
- Max file size: 20MB

### Set Bucket Policies

For each public bucket, add this RLS policy:

```sql
-- Allow public read access
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'event-posters');

-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'event-posters' AND auth.role() = 'authenticated');
```

## Step 4: Configure Authentication

### Enable Email Authentication

1. Go to Authentication > Providers
2. Enable "Email" provider
3. Configure email templates (optional)

### Set up User Roles

Run this SQL in the SQL Editor:

```sql
-- Add role column to user metadata
ALTER TABLE auth.users 
ADD COLUMN IF NOT EXISTS raw_user_meta_data JSONB DEFAULT '{}';

-- Function to set user role
CREATE OR REPLACE FUNCTION set_user_role(user_id UUID, role TEXT)
RETURNS void AS $$
BEGIN
  UPDATE auth.users
  SET raw_user_meta_data = raw_user_meta_data || jsonb_build_object('role', role)
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION set_user_role TO authenticated;
```

### Create Admin User

```sql
-- Set admin role for a user (replace with actual user email)
UPDATE auth.users
SET raw_user_meta_data = raw_user_meta_data || '{"role": "admin"}'::jsonb
WHERE email = 'admin@example.com';
```

## Step 5: Enable Realtime

### Enable Realtime for Tables

1. Go to Database > Replication
2. Enable replication for these tables:
   - `event_event`
   - `event_notice`
   - `event_department`
   - `event_club`
   - `department_fest`
   - `department_devent`

### Create Realtime Policies

```sql
-- Enable realtime for events
ALTER PUBLICATION supabase_realtime ADD TABLE event_event;
ALTER PUBLICATION supabase_realtime ADD TABLE event_notice;
ALTER PUBLICATION supabase_realtime ADD TABLE event_department;
ALTER PUBLICATION supabase_realtime ADD TABLE event_club;
```

## Step 6: Configure Frontend

1. **Copy environment variables:**

```bash
cd frontend
cp .env.example .env
```

2. **Update `.env` with your Supabase credentials:**

```bash
VITE_SUPABASE_URL=https://[YOUR-PROJECT-REF].supabase.co
VITE_SUPABASE_ANON_KEY=[YOUR-ANON-KEY]
VITE_API_URL=http://localhost:8000/api
```

3. **Get your credentials from Supabase:**
   - Go to Settings > API
   - Copy "Project URL" → `VITE_SUPABASE_URL`
   - Copy "anon public" key → `VITE_SUPABASE_ANON_KEY`

## Step 7: Django Configuration

Update `settings.py` to use Supabase:

```python
# Use Supabase Storage instead of local storage
USE_S3 = True  # We'll use Supabase Storage which is S3-compatible

# Supabase Storage Configuration
SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_KEY')
SUPABASE_BUCKET = os.getenv('SUPABASE_BUCKET', 'event-posters')
```

## Step 8: Test the Setup

### Test Database Connection

```bash
python manage.py dbshell
```

### Test API Endpoints

```bash
# Install httpie or use curl
http GET http://localhost:8000/api/departments/
http GET http://localhost:8000/api/events/
```

### Test Frontend

```bash
cd frontend
npm install
npm run dev
```

Visit http://localhost:5173 and test:
- Authentication
- Event creation
- Image upload to gallery
- Realtime notifications

## Step 9: Production Deployment

### Deploy Django Backend (Railway/Render)

1. **Set environment variables:**

```bash
DATABASE_URL=your_supabase_connection_string
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
SECRET_KEY=your_django_secret_key
DEBUG=False
ALLOWED_HOSTS=your-domain.com
```

2. **Deploy:**

```bash
# For Railway
railway up

# For Render
# Connect your GitHub repo and deploy
```

### Deploy React Frontend (Vercel)

1. **Install Vercel CLI:**

```bash
npm i -g vercel
```

2. **Deploy:**

```bash
cd frontend
vercel --prod
```

3. **Set environment variables in Vercel dashboard:**
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_API_URL` (your Django backend URL)

## Troubleshooting

### Database Connection Issues

- Verify your database password
- Check if IP is whitelisted (Supabase allows all by default)
- Ensure SSL is enabled in connection string

### Storage Upload Failures

- Check bucket policies
- Verify CORS settings in Supabase dashboard
- Ensure file size limits are appropriate

### Realtime Not Working

- Verify replication is enabled for tables
- Check if publication includes the tables
- Ensure client is subscribed to correct channel

### Authentication Errors

- Verify JWT secret matches between Django and Supabase
- Check if email confirmation is required
- Ensure user has correct role in metadata

## Security Best Practices

1. **Never commit `.env` files**
2. **Use Row Level Security (RLS) policies**
3. **Rotate API keys regularly**
4. **Enable HTTPS in production**
5. **Set up CORS properly**
6. **Use service role key only on backend**
7. **Implement rate limiting**

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [React Query](https://tanstack.com/query/latest)
- [TailwindCSS](https://tailwindcss.com/)

## Support

For issues or questions:
1. Check the documentation
2. Review error logs
3. Check Supabase dashboard for insights
4. Consult the Django logs

---

**Note:** This setup guide assumes you're starting fresh. If you're migrating from an existing system, additional steps may be required for data migration.
