# InFlux 📈

**ML-powered time series forecasting and analysis platform**

InFlux is a comprehensive web application that enables users to upload time series data, apply various machine learning models for forecasting, and visualize predictions through interactive charts.

## 🏗️ Architecture

```
InFlux/
├── frontend/          # Next.js React application
├── backend/           # FastAPI Python server
└── docker-compose.yml # Container orchestration
```

### Tech Stack

**Frontend:**
- Next.js 15 (App Router)
- TypeScript
- Recharts & Chart.js for visualizations
- Tailwind CSS
- Axios for API calls

**Backend:**
- FastAPI (Python)
- SQLAlchemy ORM
- PostgreSQL / SQLite

**Machine Learning:**
- pandas & numpy for data processing
- scikit-learn for traditional ML models
- statsmodels for ARIMA
- Prophet for seasonality forecasting
- PyTorch / TensorFlow for deep learning (LSTM)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Python 3.11+
- PostgreSQL (optional, SQLite works for development)
- Docker & Docker Compose (optional)

### Option 1: Local Development

#### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Copy environment file
copy .env.example .env

# Run database migrations
alembic upgrade head

# Start the server
python main.py
```

The backend API will be available at `http://localhost:8000`

#### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Copy environment file
copy .env.local.example .env.local

# Run development server
npm run dev
```

The frontend will be available at `http://localhost:3000`

### Option 2: Docker Compose

```bash
# From the project root
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 📊 Features

### Current Features

- ✅ Upload time series data (CSV, JSON)
- ✅ Multiple ML models:
  - Linear Regression
  - ARIMA
  - Facebook Prophet
- ✅ Interactive visualizations with Recharts
- ✅ RESTful API
- ✅ Database storage for predictions

### Coming Soon

- 🔄 LSTM neural networks
- 🔄 User authentication
- 🔄 Prediction history tracking
- 🔄 Model comparison
- 🔄 Custom model parameters
- 🔄 Export predictions

## 🔧 Configuration

### Backend Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Database
DATABASE_URL=sqlite:///./influx.db
# Or for PostgreSQL:
# DATABASE_URL=postgresql://user:password@localhost:5432/influx

# API
API_HOST=0.0.0.0
API_PORT=8000
CORS_ORIGINS=["http://localhost:3000"]

# Security
SECRET_KEY=your-secret-key-change-in-production
```

### Frontend Environment Variables

Create a `.env.local` file in the `frontend` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 📖 API Documentation

Once the backend is running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

### Key Endpoints

#### Upload Data
```http
POST /api/upload/
Content-Type: multipart/form-data

file: <your-csv-or-json-file>
```

#### Make Prediction
```http
POST /api/predict/
Content-Type: application/json

{
  "data": {
    "dates": ["2024-01-01", "2024-01-02", ...],
    "values": [100, 105, ...]
  },
  "model_type": "prophet",
  "forecast_steps": 30
}
```

#### Get Available Models
```http
GET /api/models/
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
pytest
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 🚢 Deployment

### Frontend (Vercel)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables:
   - `NEXT_PUBLIC_API_URL`: Your backend API URL
4. Deploy!

### Backend (Render / Railway)

#### Render

1. Connect your GitHub repository
2. Create a new Web Service
3. Use the `backend` directory
4. Set environment variables from `.env.example`
5. Deploy!

#### Railway

1. Install Railway CLI: `npm i -g @railway/cli`
2. Login: `railway login`
3. Initialize: `railway init`
4. Deploy: `railway up`

### Docker Deployment

Build and push images:

```bash
# Backend
docker build -t influx-backend ./backend
docker tag influx-backend your-registry/influx-backend
docker push your-registry/influx-backend

# Frontend
docker build -t influx-frontend ./frontend
docker tag influx-frontend your-registry/influx-frontend
docker push your-registry/influx-frontend
```

## 📁 Project Structure

```
InFlux/
├── frontend/
│   ├── src/
│   │   ├── app/              # Next.js app directory
│   │   ├── components/       # React components
│   │   └── lib/              # Utilities and API client
│   ├── package.json
│   └── tsconfig.json
│
├── backend/
│   ├── app/
│   │   ├── api/              # API endpoints
│   │   ├── core/             # Configuration & database
│   │   ├── models/           # SQLAlchemy models
│   │   ├── schemas/          # Pydantic schemas
│   │   └── services/         # ML services
│   ├── alembic/              # Database migrations
│   ├── main.py               # FastAPI application
│   └── requirements.txt
│
├── docker-compose.yml
└── README.md
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- FastAPI for the high-performance Python API
- Facebook for Prophet
- The open-source ML community

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Happy Forecasting! 🚀📊**
