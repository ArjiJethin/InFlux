# InFlux Backend

FastAPI-based backend for the InFlux time series forecasting platform.

## Tech Stack

- **Framework**: FastAPI
- **Language**: Python 3.11+
- **Database**: PostgreSQL / SQLite
- **ORM**: SQLAlchemy
- **ML Libraries**: pandas, numpy, scikit-learn, statsmodels, Prophet, PyTorch, TensorFlow

## Getting Started

### Installation

```bash
# Create virtual environment
python -m venv venv

# Activate (Windows)
venv\Scripts\activate

# Activate (macOS/Linux)
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### Configuration

Copy `.env.example` to `.env` and update values:

```bash
copy .env.example .env
```

### Database Setup

```bash
# Run migrations
alembic upgrade head

# Create new migration (if needed)
alembic revision --autogenerate -m "description"
```

### Run Server

```bash
# Development
python main.py

# Production
uvicorn main:app --host 0.0.0.0 --port 8000
```

API will be available at `http://localhost:8000`

## API Documentation

Once running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Project Structure

```
backend/
├── app/
│   ├── api/
│   │   ├── endpoints/
│   │   │   ├── predict.py    # Prediction endpoints
│   │   │   ├── upload.py     # Data upload endpoints
│   │   │   └── models.py     # Model info endpoints
│   │   └── v1/
│   │       └── __init__.py   # API router
│   ├── core/
│   │   ├── config.py         # Configuration
│   │   └── database.py       # Database setup
│   ├── models/
│   │   └── models.py         # SQLAlchemy models
│   ├── schemas/
│   │   └── schemas.py        # Pydantic schemas
│   └── services/
│       └── ml_service.py     # ML models
├── alembic/                   # Database migrations
├── models/                    # Saved ML models
├── uploads/                   # Uploaded data files
├── main.py                    # FastAPI application
└── requirements.txt
```

## ML Models

### Available Models

1. **Linear Regression**
   - Simple trend-based forecasting
   - Fast and interpretable

2. **ARIMA**
   - AutoRegressive Integrated Moving Average
   - Good for stationary time series

3. **Prophet**
   - Facebook's forecasting tool
   - Handles seasonality and holidays

4. **LSTM** (Coming Soon)
   - Deep learning approach
   - Captures complex patterns

### Usage Example

```python
from app.services.ml_service import get_model

# Get model
model = get_model('prophet')

# Train
model.train(data_values, data_dates)

# Predict
predictions, dates = model.predict(steps=30)
```

## API Endpoints

### POST /api/predict/

Make time series predictions.

**Request:**
```json
{
  "data": {
    "dates": ["2024-01-01", "2024-01-02"],
    "values": [100, 105]
  },
  "model_type": "prophet",
  "forecast_steps": 30
}
```

**Response:**
```json
{
  "predictions": [110, 112, 115],
  "dates": ["2024-01-03", "2024-01-04", "2024-01-05"],
  "model_type": "prophet",
  "metrics": {
    "mse": 2.5,
    "mae": 1.3,
    "rmse": 1.58
  }
}
```

### POST /api/upload/

Upload CSV or JSON data file.

### GET /api/models/

Get list of available models.

## Database Models

### Prediction

Stores prediction results.

```python
class Prediction(Base):
    id: int
    user_id: str
    model_type: str
    input_data: dict
    predictions: dict
    metrics: dict
    created_at: datetime
```

### UserData

Stores user uploaded datasets.

```python
class UserData(Base):
    id: int
    user_id: str
    dataset_name: str
    data: dict
    metadata: dict
    created_at: datetime
```

## Testing

```bash
# Install test dependencies
pip install pytest pytest-cov

# Run tests
pytest

# With coverage
pytest --cov=app tests/
```

## Deployment

### Render

1. Create new Web Service
2. Connect GitHub repository
3. Set build command: `pip install -r requirements.txt`
4. Set start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Add environment variables

### Railway

```bash
railway init
railway up
```

### Docker

```bash
docker build -t influx-backend .
docker run -p 8000:8000 influx-backend
```

## Environment Variables

```env
ENVIRONMENT=production
DATABASE_URL=postgresql://user:pass@host:5432/db
SECRET_KEY=your-secret-key
CORS_ORIGINS=["https://your-frontend.vercel.app"]
```

## Contributing

1. Follow PEP 8 style guide
2. Add type hints
3. Write tests for new features
4. Update documentation

## License

MIT License
