# Frontend Deployment Checklist

## Pre-Deployment

- [ ] Backend deployed and accessible: https://influx-backend-q3zp.onrender.com
- [ ] Test backend endpoint:
  ```bash
  curl https://influx-backend-q3zp.onrender.com/api/dashboard
  ```
- [ ] Environment files created (.env.local, .env.production)
- [ ] Git repository up to date

## Local Testing

- [ ] Install dependencies: `npm install`
- [ ] Test with production backend: `npm run dev`
- [ ] Check browser console (F12) - no errors
- [ ] Test all pages:
  - [ ] Dashboard loads data
  - [ ] Forecast shows predictions
  - [ ] Appliances page works
  - [ ] AI suggestions generate
  - [ ] Login/signup responsive
- [ ] Build production: `npm run build`
- [ ] Test production build: `npm start`

## Vercel Deployment

### Option 1: Dashboard (Recommended)
- [ ] Go to https://vercel.com
- [ ] Sign in with GitHub
- [ ] Click "Add New Project"
- [ ] Import repository
- [ ] Set Root Directory: `frontend`
- [ ] Add environment variable:
  - Key: `NEXT_PUBLIC_API_URL`
  - Value: `https://influx-backend-q3zp.onrender.com`
- [ ] Click "Deploy"
- [ ] Wait ~2-3 minutes

### Option 2: CLI
```bash
npm i -g vercel
cd frontend
vercel login
vercel
vercel --prod
```

## Post-Deployment Verification

- [ ] Frontend loads without errors
- [ ] Check browser console - no errors
- [ ] Test API connection:
  - Open DevTools → Network tab
  - Should see requests to: `https://influx-backend-q3zp.onrender.com/api/*`
  - All responses: 200 OK
- [ ] Verify pages:
  - [ ] Dashboard shows real data
  - [ ] Forecast predictions load
  - [ ] Appliances data appears
  - [ ] AI suggestions work
  - [ ] Green pulsing dot visible
- [ ] Test responsive design:
  - [ ] Mobile (< 768px)
  - [ ] Tablet (768px - 1024px)
  - [ ] Desktop (> 1024px)

## Troubleshooting

### "Failed to fetch data"
- [ ] Check backend: https://influx-backend-q3zp.onrender.com/api/dashboard
- [ ] Verify environment variable set correctly
- [ ] Redeploy if env var was added after first deploy

### CORS Errors
- [ ] Verify frontend URL in backend logs
- [ ] Check HTTPS (not HTTP) in API_URL
- [ ] Backend CORS already enabled - should work

### Build Fails
```bash
cd frontend
rm -rf .next node_modules
npm install
npm run build
```

### 404 on Page Refresh
- Vercel: Auto-configured ✅
- Netlify: Add `_redirects` file

## Success Criteria

✅ Frontend live at: `https://your-app.vercel.app`  
✅ Backend responding: `https://influx-backend-q3zp.onrender.com`  
✅ All pages load correctly  
✅ Data displays from backend  
✅ No console errors  
✅ Mobile responsive  
✅ AI suggestions working  

---

**Estimated Time:** 5-10 minutes  
**Recommended Platform:** Vercel (best for Next.js)  
**Cost:** FREE (Hobby plan)
