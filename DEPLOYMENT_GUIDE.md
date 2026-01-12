# Deployment Guide: Santa's Little Wieners Clone

This guide will walk you through deploying your website to your own web hosting server and domain.

---

## Option 1: Traditional Web Hosting (cPanel/Shared Hosting)

### Step 1: Build the Production Files

First, you need to create a production build of the React app.

```bash
# Navigate to frontend directory
cd /app/frontend

# Install dependencies (if not already installed)
yarn install

# Create production build
yarn build
```

This creates a `build` folder containing optimized static files.

### Step 2: Download the Build Files

The `build` folder contains:
```
build/
├── index.html
├── static/
│   ├── css/
│   ├── js/
│   └── media/
├── favicon.ico
└── other assets...
```

### Step 3: Upload to Your Web Host

**Using cPanel File Manager:**
1. Log into your cPanel account
2. Go to **File Manager**
3. Navigate to `public_html` (or your domain's root folder)
4. Delete any existing files (backup first if needed)
5. Upload all contents from the `build` folder
6. Make sure `index.html` is in the root directory

**Using FTP (FileZilla):**
1. Connect to your server using FTP credentials
2. Navigate to `public_html` or `www` folder
3. Upload all contents from the `build` folder

### Step 4: Configure .htaccess for React Router

Create a `.htaccess` file in your `public_html` folder:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>
```

This ensures all routes work correctly (e.g., `/available-puppies`, `/contact`).

---

## Option 2: Vercel (Recommended - Free & Easy)

### Step 1: Push Code to GitHub

```bash
# Initialize git repository
git init
git add .
git commit -m "Initial commit"

# Create a GitHub repository and push
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click **"New Project"**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset:** Create React App
   - **Root Directory:** `frontend`
   - **Build Command:** `yarn build`
   - **Output Directory:** `build`
5. Click **Deploy**

### Step 3: Connect Your Domain

1. In Vercel dashboard, go to your project
2. Click **Settings** → **Domains**
3. Add your domain (e.g., `yourdomain.com`)
4. Update your domain's DNS:
   - Add an **A Record**: `76.76.19.19`
   - Or add a **CNAME**: `cname.vercel-dns.com`

---

## Option 3: Netlify (Free & Easy)

### Step 1: Build and Deploy

1. Go to [netlify.com](https://netlify.com) and sign up/login
2. Drag and drop your `build` folder to deploy
   OR connect your GitHub repository

### Step 2: Configure Redirects

Create a `_redirects` file in your `public` folder before building:

```
/*    /index.html   200
```

### Step 3: Connect Your Domain

1. Go to **Domain Settings**
2. Add your custom domain
3. Update DNS records as instructed

---

## Option 4: DigitalOcean/VPS Server

### Step 1: Set Up Server

```bash
# SSH into your server
ssh root@your_server_ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Nginx
sudo apt install nginx
```

### Step 2: Upload and Build

```bash
# Clone your repository
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO/frontend

# Install dependencies and build
npm install
npm run build
```

### Step 3: Configure Nginx

Create `/etc/nginx/sites-available/yourdomain.com`:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    root /var/www/yourdomain.com/build;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /static {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/yourdomain.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Step 4: Install SSL Certificate

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## Domain Configuration (General)

### DNS Settings for Your Domain Registrar

| Type  | Name | Value                  | TTL  |
|-------|------|------------------------|------|
| A     | @    | Your server IP         | 3600 |
| A     | www  | Your server IP         | 3600 |
| CNAME | www  | yourdomain.com         | 3600 |

### Common Domain Registrars:
- **GoDaddy:** Domains → DNS Management
- **Namecheap:** Domain List → Manage → Advanced DNS
- **Google Domains:** DNS → Custom Records
- **Cloudflare:** DNS → Records

---

## Quick Checklist

- [ ] Build production files (`yarn build`)
- [ ] Upload to hosting server
- [ ] Configure URL rewriting (.htaccess or nginx)
- [ ] Point domain DNS to server
- [ ] Install SSL certificate (HTTPS)
- [ ] Test all pages and navigation
- [ ] Test mobile responsiveness

---

## Files You Need to Download

From this project, download the entire `/app/frontend` folder which contains:
- `src/` - All React source code
- `public/` - Static assets
- `package.json` - Dependencies
- `tailwind.config.js` - Tailwind CSS config

---

## Need Help?

If you encounter issues:
1. Check browser console for errors (F12)
2. Verify all files uploaded correctly
3. Check .htaccess or nginx configuration
4. Ensure DNS has propagated (can take 24-48 hours)

For backend functionality (admin dashboard), you'll need a server that supports Node.js/Python (not basic shared hosting).
