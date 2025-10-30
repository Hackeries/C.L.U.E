# Database Migration Guide: MySQL to PostgreSQL

This guide will help you migrate from MySQL to PostgreSQL and set up your database on Supabase or Neon.

## Prerequisites

- Python 3.8+
- PostgreSQL installed locally (for development) or Supabase/Neon account (for production)
- Existing MySQL database backup

## Option 1: Supabase (Recommended)

### Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up
2. Create a new project
3. Wait for the project to be provisioned (~2 minutes)
4. Go to **Settings** → **Database** to find your connection string

### Step 2: Get Database Connection String

Your connection string will look like:
```
postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
```

### Step 3: Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update `.env` with your Supabase credentials:
   ```env
   DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
   SECRET_KEY=your-random-secret-key-here
   DEBUG=False
   ```

### Step 4: Export Data from MySQL

```bash
# Dump data from MySQL (adjust credentials as needed)
python manage.py dumpdata --natural-foreign --natural-primary \
  --exclude contenttypes --exclude auth.permission \
  --indent 2 > data_backup.json
```

### Step 5: Apply Migrations to PostgreSQL

```bash
# Install dependencies
pip install -r requirements.txt

# Run migrations on new PostgreSQL database
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Load data
python manage.py loaddata data_backup.json
```

## Option 2: Neon

### Step 1: Create Neon Project

1. Go to [neon.tech](https://neon.tech) and sign up
2. Create a new project
3. Copy the connection string from the dashboard

### Step 2: Configure Environment

Connection string format:
```
postgresql://[user]:[password]@[endpoint-id].us-east-2.aws.neon.tech/[dbname]?sslmode=require
```

Update `.env`:
```env
DATABASE_URL=postgresql://[user]:[password]@[endpoint-id].us-east-2.aws.neon.tech/[dbname]?sslmode=require
```

Follow Steps 4-5 from Supabase instructions above.

## Option 3: Local PostgreSQL Development

### Step 1: Install PostgreSQL

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
```

**MacOS:**
```bash
brew install postgresql
brew services start postgresql
```

### Step 2: Create Database and User

```bash
# Access PostgreSQL shell
sudo -u postgres psql

# Create database and user
CREATE DATABASE clue_db;
CREATE USER clue_user WITH PASSWORD 'secure_password';
ALTER ROLE clue_user SET client_encoding TO 'utf8';
ALTER ROLE clue_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE clue_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE clue_db TO clue_user;
\q
```

### Step 3: Configure Environment

Update `.env`:
```env
DATABASE_URL=postgresql://clue_user:secure_password@localhost:5432/clue_db
```

Follow Steps 4-5 from Supabase instructions above.

## Data Migration Tips

### Handling Common Issues

1. **Foreign Key Constraints:**
   ```bash
   # If loaddata fails, try loading in specific order
   python manage.py loaddata auth.json
   python manage.py loaddata users.json
   python manage.py loaddata events.json
   ```

2. **Content Types:**
   ```bash
   # Regenerate content types
   python manage.py migrate --run-syncdb
   ```

3. **Sequences Reset:**
   ```bash
   # Reset PostgreSQL sequences
   python manage.py sqlsequencereset app_name | python manage.py dbshell
   ```

### Verification

```bash
# Test database connection
python manage.py check --database default

# Verify data
python manage.py shell
>>> from django.contrib.auth.models import User
>>> User.objects.count()
```

## Cloud Storage Setup (Optional)

### Supabase Storage

1. Go to **Storage** in Supabase dashboard
2. Create a new bucket named `media-files`
3. Update `.env`:
   ```env
   USE_SUPABASE_STORAGE=True
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_KEY=your-anon-public-key
   SUPABASE_BUCKET=media-files
   ```

### AWS S3

1. Create S3 bucket in AWS Console
2. Create IAM user with S3 permissions
3. Update `.env`:
   ```env
   USE_S3=True
   AWS_ACCESS_KEY_ID=your-access-key
   AWS_SECRET_ACCESS_KEY=your-secret-key
   AWS_STORAGE_BUCKET_NAME=your-bucket-name
   AWS_S3_REGION_NAME=us-east-1
   ```

## Production Deployment Checklist

- [ ] Database backed up
- [ ] PostgreSQL database created (Supabase/Neon)
- [ ] Environment variables configured
- [ ] Migrations run successfully
- [ ] Data imported and verified
- [ ] Static files collected: `python manage.py collectstatic --noinput`
- [ ] Cloud storage configured (if using)
- [ ] Security settings enabled (DEBUG=False, SECRET_KEY set)
- [ ] ALLOWED_HOSTS and CSRF_TRUSTED_ORIGINS configured

## Rollback Plan

If migration fails:

1. Keep MySQL database backup
2. Revert `settings.py` changes
3. Restore `.env` with MySQL credentials
4. Run: `python manage.py migrate --database default`

## Support

For issues:
- Check Django logs: `python manage.py runserver` output
- Verify connection: `pg_isready -h your-host -p 5432`
- Supabase: Check project health in dashboard
- Neon: Check connection pooling settings

## Performance Optimization

### Connection Pooling

For production, consider using connection pooling:

```python
# In settings.py
DATABASES['default']['OPTIONS'] = {
    'connect_timeout': 10,
    'options': '-c statement_timeout=30000'
}
```

### Supabase-specific

Enable connection pooler for better performance:
```
postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:6543/postgres?pgbouncer=true
```

---

**Note:** Always test migrations in a staging environment before production deployment!
