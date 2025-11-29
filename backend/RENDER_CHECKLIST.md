# ✅ Render Deployment Checklist

## Before You Deploy
- [ ] Code pushed to GitHub
- [ ] `requirements.txt` includes all dependencies
- [ ] `render.yaml` is in the backend folder
- [ ] `api.py` uses `PORT` environment variable
- [ ] All files committed and pushed

## Render Setup
- [ ] Create Render account (render.com)
- [ ] Connect GitHub account
- [ ] Select InFlux repository

## Deployment
- [ ] Create new Web Service (or use Blueprint)
- [ ] Set Root Directory to `backend`
- [ ] Set Build Command: `pip install -r requirements.txt`
- [ ] Set Start Command: `uvicorn api:app --host 0.0.0.0 --port $PORT`
- [ ] Select Free plan
- [ ] Click "Create Web Service"

## After Deployment
- [ ] Wait for "Live" status (3-5 minutes)
- [ ] Copy your backend URL
- [ ] Test root endpoint: `https://your-app.onrender.com/`
- [ ] Test dashboard: `https://your-app.onrender.com/api/dashboard`
- [ ] Update frontend `.env.local` with backend URL

## Your Backend URL
```
https://influx-backend-[your-name].onrender.com
```

Write it here: _______________________________________________

## Test Commands
```bash
# Test root
curl https://your-backend-url.onrender.com/

# Test dashboard
curl https://your-backend-url.onrender.com/api/dashboard

# Test forecast
curl https://your-backend-url.onrender.com/api/forecast
```

## Common Issues
- **502 Error**: Wait 2-3 minutes for ML models to train
- **Cold Start**: First request after inactivity takes 30-60s
- **Build Failed**: Check logs in Render dashboard
