# 🚀 InFlux Backend Deployment Guide - Render

## Prerequisites
- GitHub account (your code should be on GitHub)
- Render account (free tier works great!)

## 📋 Deployment Steps

### Step 1: Prepare Your Repository
Make sure all these files are committed to your GitHub repo:
```
backend/
├── api.py
├── requirements.txt
├── render.yaml
├── smart_home_energy_sample.csv
└── BACKEND_README.md
```

### Step 2: Sign Up for Render
1. Go to [render.com](https://render.com)
2. Sign up with GitHub (easiest way)
3. Authorize Render to access your repositories

### Step 3: Create New Web Service

#### Option A: Using render.yaml (Recommended - Infrastructure as Code)
1. Go to Render Dashboard
2. Click "New +" → "Blueprint"
3. Connect your GitHub repository
4. Select the `InFlux` repository
5. Render will detect `backend/render.yaml`
6. Click "Apply" - Render will automatically:
   - Create the web service
   - Set up environment variables
   - Start the build

#### Option B: Manual Setup
1. Go to Render Dashboard
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `influx-backend`
   - **Root Directory**: `backend`
   - **Runtime**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn api:app --host 0.0.0.0 --port $PORT`
   - **Plan**: Free

### Step 4: Environment Variables (if needed)
No environment variables are required for basic deployment, but you can add:
- `PORT` - Automatically set by Render
- `PYTHON_VERSION` - Set to `3.11.0`

### Step 5: Deploy!
1. Click "Create Web Service"
2. Render will:
   - Clone your repository
   - Install dependencies from requirements.txt
   - Train all 10 ML models (takes 2-3 minutes)
   - Start the FastAPI server
3. Wait for "Live" status (usually 3-5 minutes for first deploy)

### Step 6: Test Your Deployment
Your backend will be available at:
```
https://influx-backend-[your-render-name].onrender.com
```

Test endpoints:
```bash
# Root endpoint
https://influx-backend.onrender.com/

# Dashboard data
https://influx-backend.onrender.com/api/dashboard

# Forecast data
https://influx-backend.onrender.com/api/forecast

# Appliances data
https://influx-backend.onrender.com/api/appliances
```

## 🔧 Configuration Details

### Build Command
```bash
pip install -r requirements.txt
```
This will:
- Install FastAPI, Uvicorn, and all dependencies
- Install scikit-learn for ML models
- Install pandas/numpy for data processing

### Start Command
```bash
uvicorn api:app --host 0.0.0.0 --port $PORT
```
- `api:app` - Points to the FastAPI app in api.py
- `--host 0.0.0.0` - Listen on all interfaces
- `--port $PORT` - Use Render's assigned port

## 📦 Dependencies Installed
- **FastAPI 0.109.0** - Web framework
- **Uvicorn 0.27.0** - ASGI server
- **Gunicorn 21.2.0** - Production server
- **scikit-learn 1.4.0** - ML models (10 models trained)
- **pandas 2.2.0** - Data processing
- **numpy 1.26.3** - Numerical computing

## ⚡ Performance Notes

### Free Tier Limitations
- **Cold starts**: Service spins down after 15 min of inactivity
- **First request**: Takes 30-60 seconds to wake up
- **Build time**: ~3 minutes (includes ML model training)
- **Memory**: 512 MB
- **CPU**: Shared

### Production Tips
1. **Keep it warm**: Use a free uptime monitor (UptimeRobot) to ping every 14 minutes
2. **Upgrade if needed**: Paid plans ($7/month) have no cold starts
3. **Monitor logs**: Check Render dashboard for errors

## 🎯 Next Steps After Deployment

### 1. Get Your Backend URL
Copy the URL from Render dashboard:
```
https://influx-backend-xyz.onrender.com
```

### 2. Update Frontend Environment Variable
In your frontend, update the API URL:
```bash
# In frontend/.env.local
NEXT_PUBLIC_API_URL=https://influx-backend-xyz.onrender.com
```

### 3. Test All Endpoints
```bash
curl https://your-backend-url.onrender.com/api/dashboard
curl https://your-backend-url.onrender.com/api/forecast
curl https://your-backend-url.onrender.com/api/appliances
```

## 🐛 Troubleshooting

### Build Fails
- Check `requirements.txt` for incompatible versions
- View build logs in Render dashboard
- Ensure Python 3.11 is specified

### Service Won't Start
- Check start command is correct: `uvicorn api:app --host 0.0.0.0 --port $PORT`
- View runtime logs in Render dashboard
- Ensure `api.py` has no syntax errors

### 502 Bad Gateway
- Service is starting (ML models training) - wait 2-3 minutes
- Cold start after inactivity - wait 30-60 seconds
- Check logs for Python errors

### CORS Errors
The API already has CORS configured to allow all origins:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 📊 ML Models Trained on Startup
Your backend trains 10 ML models on startup:
1. GradientBoosting (24h prediction)
2. RandomForest (24h prediction)
3. SVR (24h prediction)
4. LinearRegression (weekly prediction)
5. Ridge (weekly prediction)
6. ElasticNet (monthly prediction)
7. PolynomialFeatures + Ridge (appliances)
8. KMeans (clustering)
9. IsolationForest (anomaly detection)
10. ARIMA (time series forecasting)

Training takes ~2-3 minutes on first deploy.

## 🎉 Success Indicators
✅ Build completed successfully
✅ Service status shows "Live" (green)
✅ Logs show "ML Backend API running on port 10000"
✅ GET requests to `/` return welcome message
✅ GET `/api/dashboard` returns JSON with predictions

## 💰 Cost
- **Free Tier**: $0/month
  - 750 hours/month
  - Spins down after inactivity
  - Perfect for demo/testing

- **Starter Plan**: $7/month
  - Always on (no cold starts)
  - More resources
  - Recommended for production

## 🔗 Useful Links
- [Render Dashboard](https://dashboard.render.com/)
- [Render Docs - FastAPI](https://render.com/docs/deploy-fastapi)
- [Backend Logs](https://dashboard.render.com/web/[your-service-id]/logs)
- [Environment Variables](https://dashboard.render.com/web/[your-service-id]/env-vars)

---

**Ready to deploy your frontend?** Check out `FRONTEND_DEPLOYMENT.md` next!
