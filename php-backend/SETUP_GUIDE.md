# 🚀 PHP Backend Deployment Guide for Shared Hosting
## Step-by-Step Instructions for Beginners

---

## 📋 What You Have

Your website package includes:
```
📁 Your Website Files
├── 📁 frontend/build/     ← Static website files
├── 📁 php-backend/        ← PHP Admin Dashboard
│   ├── 📁 api/            ← API endpoints
│   ├── 📁 admin/          ← Admin dashboard pages
│   ├── config.php         ← Configuration file
│   ├── database.php       ← Database connection
│   └── database.sql       ← Database setup script
```

---

## 🔧 Step 1: Prepare Your Hosting

### Requirements:
- Any shared hosting with cPanel (Bluehost, HostGator, GoDaddy, SiteGround, etc.)
- PHP 7.4 or higher (almost all hosts have this)
- MySQL database

### Login to cPanel:
1. Go to your hosting provider's website
2. Login to your account
3. Find and click "cPanel" or "Control Panel"

---

## 🗄️ Step 2: Create MySQL Database

### In cPanel:
1. Find **"MySQL Databases"** or **"MySQL Database Wizard"**
2. Click on it

### Create Database:
1. **Database Name:** Type `santa_wieners` (or any name you prefer)
2. Click **"Create Database"**

### Create Database User:
1. **Username:** Type a username (e.g., `admin`)
2. **Password:** Create a strong password
3. Click **"Create User"**

### Add User to Database:
1. Select your database and user
2. Check **"ALL PRIVILEGES"**
3. Click **"Add"** or **"Make Changes"**

### 📝 Write Down These Details:
```
Database Name: your_cpanel_username_santa_wieners
Database User: your_cpanel_username_admin
Database Password: your_password
Database Host: localhost
```

---

## 📊 Step 3: Import Database Tables

### In cPanel:
1. Find and click **"phpMyAdmin"**
2. Select your database from the left sidebar
3. Click the **"Import"** tab at the top

### Import the SQL File:
1. Click **"Choose File"**
2. Select the `database.sql` file from `php-backend/database.sql`
3. Click **"Go"** or **"Import"**

This creates all the tables and sample data automatically!

---

## 📁 Step 4: Upload Website Files

### Using cPanel File Manager:

1. In cPanel, find and click **"File Manager"**
2. Navigate to **`public_html`** folder
3. **Delete** any existing files (backup first if needed)

### Upload Frontend Files:
1. Open the `frontend/build/` folder on your computer
2. Upload **ALL contents** (not the folder itself) to `public_html`
   - index.html
   - static/ folder
   - etc.

### Upload PHP Backend:
1. Create a folder called `api` inside `public_html`
2. Upload contents of `php-backend/api/` to `public_html/api/`
3. Create a folder called `admin` inside `public_html`
4. Upload contents of `php-backend/admin/` to `public_html/admin/`
5. Upload `config.php` and `database.php` to `public_html/`

### Final Structure in `public_html`:
```
public_html/
├── index.html
├── static/
│   ├── css/
│   └── js/
├── config.php          ← Configuration
├── database.php        ← Database connection
├── api/
│   ├── puppies.php
│   ├── testimonials.php
│   └── contact.php
└── admin/
    ├── index.php
    ├── login.php
    ├── puppies.php
    ├── testimonials.php
    ├── inquiries.php
    └── settings.php
```

---

## ⚙️ Step 5: Configure Database Connection

### Edit `config.php`:

1. In File Manager, navigate to `public_html`
2. Right-click on `config.php` → **"Edit"**
3. Update these lines with YOUR database details:

```php
// Database credentials - UPDATE THESE!
define('DB_HOST', 'localhost');
define('DB_NAME', 'your_cpanel_username_santa_wieners');
define('DB_USER', 'your_cpanel_username_admin');
define('DB_PASS', 'your_database_password');

// Admin credentials - CHANGE THESE!
define('ADMIN_USERNAME', 'admin');
define('ADMIN_PASSWORD', 'YourSecurePassword123');

// Site URL (update with your domain)
define('SITE_URL', 'https://yourdomain.com');
```

4. Click **"Save Changes"**

---

## 🔗 Step 6: Create .htaccess File

### In `public_html`:
1. Click **"+ File"** to create a new file
2. Name it `.htaccess` (with the dot)
3. Add this content:

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    
    # Handle React Router
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_URI} !^/api/
    RewriteCond %{REQUEST_URI} !^/admin/
    RewriteRule . /index.html [L]
</IfModule>

# Protect config files
<Files "config.php">
    Order Allow,Deny
    Deny from all
</Files>

<Files "database.php">
    Order Allow,Deny
    Deny from all
</Files>
```

4. Click **"Save"**

---

## 🌐 Step 7: Connect Your Domain (If Not Already Done)

### In Your Domain Registrar:
1. Login to where you bought your domain (GoDaddy, Namecheap, etc.)
2. Go to **DNS Settings** or **Nameservers**

### Option A - Use Hosting Nameservers:
Point your domain to your hosting's nameservers:
- ns1.yourhostingprovider.com
- ns2.yourhostingprovider.com

### Option B - Use A Records:
| Type | Name | Value |
|------|------|-------|
| A | @ | Your hosting IP |
| A | www | Your hosting IP |

Find your hosting IP in cPanel under **"Server Information"**

---

## 🔒 Step 8: Enable SSL (HTTPS)

### In cPanel:
1. Find **"SSL/TLS"** or **"Let's Encrypt"**
2. Select your domain
3. Click **"Issue"** or **"Install"**

This gives you free HTTPS!

---

## ✅ Step 9: Test Everything

### Test Public Website:
1. Go to `https://yourdomain.com`
2. Check that all pages load correctly

### Test Admin Dashboard:
1. Go to `https://yourdomain.com/admin`
2. Login with your admin credentials
3. Try adding a puppy
4. Try adding a testimonial

### Test Contact Form:
1. Go to your website's contact page
2. Submit a test inquiry
3. Check admin dashboard for the new inquiry

---

## 🔑 Default Admin Credentials

```
URL: https://yourdomain.com/admin
Username: admin
Password: santapuppies2025
```

**⚠️ IMPORTANT:** Change these in `config.php` immediately!

---

## 🆘 Troubleshooting

### "Database connection failed"
- Double-check your database credentials in `config.php`
- Make sure the database user has all privileges
- Check that the database name includes your cPanel username prefix

### "Page not found" on subpages
- Make sure `.htaccess` file exists and has correct content
- Check that mod_rewrite is enabled (contact your host if needed)

### Admin login not working
- Check `config.php` for correct admin credentials
- Clear browser cookies and try again

### Images not loading
- Check that image URLs are correct and accessible
- Use absolute URLs for images (https://...)

### Contact form not working
- Check that `api/contact.php` was uploaded correctly
- Check browser console for errors (F12)

---

## 📞 Need Help?

### Check These First:
1. Error logs in cPanel → "Error Logs"
2. Browser console (F12 → Console tab)
3. phpMyAdmin to verify database tables exist

### Common Hosting Support:
- Bluehost: 1-888-401-4678
- HostGator: 1-866-964-2867
- GoDaddy: 1-480-505-8877
- SiteGround: Live Chat

---

## 🎉 You're Done!

Your website should now be live with:
- ✅ Public website at `https://yourdomain.com`
- ✅ Admin dashboard at `https://yourdomain.com/admin`
- ✅ Working contact form
- ✅ Ability to manage puppies and testimonials

---

## 📝 Quick Reference Card

| What | URL |
|------|-----|
| Website | https://yourdomain.com |
| Admin Login | https://yourdomain.com/admin |
| Puppies API | https://yourdomain.com/api/puppies.php |
| Testimonials API | https://yourdomain.com/api/testimonials.php |

| File | Purpose |
|------|---------|
| config.php | Database & admin settings |
| database.sql | Database structure |
| .htaccess | URL routing rules |

Good luck! 🐕🎄
