# Frontend Deployment Guide

## 🚀 Quick Deploy to Vercel (Recommended)

### Prerequisites
- ✅ Backend deployed and running: https://influx-backend-q3zp.onrender.com
- ✅ Environment files created (.env.local, .env.production)
- ✅ GitHub repository (or local folder)

### Option 1: Deploy via Vercel Dashboard (Easiest)

1. **Go to Vercel**
   - Visit https://vercel.com
   - Sign in with GitHub/GitLab/Bitbucket

2. **Import Project**
   - Click "Add New Project"
   - Import your Git repository
   - Select the `frontend` folder as root directory

3. **Configure Build Settings**
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `frontend`
   - Build Command: `npm run build` (auto-filled)
   - Output Directory: `.next` (auto-filled)

4. **Add Environment Variables**
   - Click "Environment Variables"
   - Add: `NEXT_PUBLIC_API_URL` = `https://influx-backend-q3zp.onrender.com`
   - Apply to: Production, Preview, Development

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your app will be live at `https://your-app.vercel.app`

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to frontend folder
cd frontend

# Login to Vercel
vercel login

# Deploy (follow prompts)
vercel

# Deploy to production
vercel --prod
```

---

## 🎯 Alternative: Deploy to Netlify

### Via Netlify Dashboard

1. **Go to Netlify**
   - Visit https://app.netlify.com
   - Sign in with GitHub/GitLab/Bitbucket

2. **Add New Site**
   - Click "Add new site" → "Import an existing project"
   - Connect to Git provider
   - Select your repository

3. **Configure Build Settings**
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/.next`
   - Node version: 18 or higher

4. **Environment Variables**
   - Go to Site Settings → Build & Deploy → Environment
   - Add: `NEXT_PUBLIC_API_URL` = `https://influx-backend-q3zp.onrender.com`

5. **Deploy**
   - Click "Deploy site"
   - Your app will be live at `https://your-app.netlify.app`

---

## 🧪 Test Before Deploying

### 1. Test Locally with Production Backend

```bash
cd frontend

# Install dependencies (if not already)
npm install

# Run development server
npm run dev
```

- Open http://localhost:3000
- Check browser console (F12) for errors
- Verify data loads from backend:
  - Dashboard shows real data
  - Forecast page works
  - Appliances page loads
  - AI suggestions appear

### 2. Test Production Build Locally

```bash
# Build for production
npm run build

# Start production server
npm start
```

- Open http://localhost:3000
- Test all pages thoroughly
- Check for any build errors

---

## ✅ Post-Deployment Checklist

After deployment, verify:

- [ ] Frontend loads without errors
- [ ] Dashboard displays data from backend
- [ ] Forecast page shows predictions
- [ ] Appliances page works
- [ ] AI suggestions generate correctly
- [ ] Login/signup pages responsive
- [ ] All pages responsive on mobile
- [ ] No CORS errors in console
- [ ] Green pulsing dot appears

### Check API Connection

Open browser console (F12) on your deployed site:
```javascript
// Should show: https://influx-backend-q3zp.onrender.com
console.log(process.env.NEXT_PUBLIC_API_URL)
```

### Check Network Requests

- Open Developer Tools → Network tab
- Navigate to Dashboard
- Should see requests to: `https://influx-backend-q3zp.onrender.com/api/dashboard`
- Status should be: 200 OK

---

## 🔧 Troubleshooting

### Issue: "Failed to fetch data"
**Solution:** Check backend is running at https://influx-backend-q3zp.onrender.com
```bash
# Test backend directly
curl https://influx-backend-q3zp.onrender.com/api/dashboard
```

### Issue: CORS Errors
**Solution:** Backend already has CORS enabled. If issues persist:
- Check backend logs on Render dashboard
- Verify frontend URL in backend CORS settings
- Ensure HTTPS (not HTTP) in API_URL

### Issue: Environment Variable Not Working
**Solution:** 
- Vercel: Redeploy after adding env vars
- Netlify: Clear cache and redeploy
- Variable MUST start with `NEXT_PUBLIC_` for client-side access

### Issue: Build Fails
**Solution:**
```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run build
```

### Issue: 404 on Page Refresh
**Solution:** Next.js handles routing automatically, but if issues:
- Vercel: Auto-configured (no action needed)
- Netlify: Add `_redirects` file:
  ```
  /*    /index.html   200
  ```

---

## 📊 Performance Notes

### First Deploy
- Build time: ~2-5 minutes
- Cold start: ~10-15 seconds (first visit)
- Subsequent loads: <2 seconds

### Backend Connection
- Backend cold start: ~30-60 seconds (free tier)
- Keep backend warm: Dashboard auto-refreshes every 5 minutes
- Backend stays active: 15 minutes after last request

### Optimization Tips
1. **Backend Cold Starts:** Upgrade to paid plan ($7/month) for instant response
2. **Image Optimization:** Already using Next.js Image component
3. **Code Splitting:** Automatic with Next.js 15
4. **Caching:** API responses cached client-side

---

## 💰 Cost Breakdown

### Vercel (Recommended)
- **Hobby Plan:** FREE
  - 100 GB bandwidth/month
  - Unlimited projects
  - Automatic HTTPS
  - Global CDN
- **Pro Plan:** $20/month (if needed)
  - 1 TB bandwidth
  - Better analytics
  - Team collaboration

### Netlify
- **Starter Plan:** FREE
  - 100 GB bandwidth/month
  - 300 build minutes/month
  - Automatic HTTPS
- **Pro Plan:** $19/month (if needed)

### Total Monthly Cost
- **Current:** $0 (Render Free + Vercel Free)
- **Recommended for Production:** $7 (Render Starter)
- **Enterprise:** $27 (Render Starter + Vercel Pro)

---

## 🔄 Continuous Deployment

Both Vercel and Netlify support automatic deployments:

1. Push code to GitHub
2. Platform detects changes
3. Automatic build & deploy
4. Live in 2-3 minutes

**Branch Deployments:**
- `main` → Production
- `dev` → Preview URL
- Pull requests → Auto preview

---

## 📝 Custom Domain (Optional)

### Add Your Domain

**Vercel:**
1. Go to Project Settings → Domains
2. Add your domain (e.g., influx.app)
3. Update DNS records (provided by Vercel)

**Netlify:**
1. Go to Domain Settings
2. Add custom domain
3. Update DNS records (provided by Netlify)

**DNS Configuration:**
- A Record: Points to platform IP
- CNAME: Points to platform URL
- SSL: Automatically provisioned

---

## 🎉 You're Ready!

Your InFlux app is ready for deployment:
- ✅ Backend live: https://influx-backend-q3zp.onrender.com
- ✅ Environment configured
- ✅ Build settings ready
- ✅ Deployment guides provided

Choose Vercel (recommended) or Netlify, follow the steps above, and you'll be live in minutes! 🚀
