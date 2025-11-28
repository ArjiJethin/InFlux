from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional
from datetime import datetime

class TimeSeriesData(BaseModel):
    dates: List[str]
    values: List[float]

class PredictionRequest(BaseModel):
    data: TimeSeriesData
    model_type: str = Field(..., description="Model type: lstm, prophet, arima, or linear")
    forecast_steps: int = Field(default=10, ge=1, le=365)
    
class PredictionResponse(BaseModel):
    predictions: List[float]
    dates: List[str]
    model_type: str
    metrics: Optional[Dict[str, float]] = None

class UploadResponse(BaseModel):
    message: str
    filename: str
    rows: int
    columns: List[str]

class ModelInfo(BaseModel):
    name: str
    description: str
    type: str
    parameters: Dict[str, Any]
