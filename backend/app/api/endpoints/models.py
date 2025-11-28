from fastapi import APIRouter
from app.schemas.schemas import ModelInfo
from typing import List

router = APIRouter()

@router.get("/", response_model=List[ModelInfo])
async def get_available_models():
    """
    Get list of available ML models for time series prediction
    """
    models = [
        ModelInfo(
            name="Linear Regression",
            description="Simple linear trend model for basic forecasting",
            type="linear",
            parameters={
                "forecast_steps": {"type": "int", "default": 10, "min": 1, "max": 365}
            }
        ),
        ModelInfo(
            name="ARIMA",
            description="AutoRegressive Integrated Moving Average model",
            type="arima",
            parameters={
                "order": {"type": "tuple", "default": "(1,1,1)", "description": "(p,d,q)"},
                "forecast_steps": {"type": "int", "default": 10, "min": 1, "max": 365}
            }
        ),
        ModelInfo(
            name="Prophet",
            description="Facebook Prophet for time series with seasonality",
            type="prophet",
            parameters={
                "forecast_steps": {"type": "int", "default": 10, "min": 1, "max": 365},
                "freq": {"type": "str", "default": "D", "options": ["D", "W", "M"]}
            }
        ),
        ModelInfo(
            name="LSTM (Coming Soon)",
            description="Long Short-Term Memory neural network",
            type="lstm",
            parameters={
                "forecast_steps": {"type": "int", "default": 10, "min": 1, "max": 365},
                "epochs": {"type": "int", "default": 100},
                "batch_size": {"type": "int", "default": 32}
            }
        )
    ]
    
    return models

@router.get("/{model_type}")
async def get_model_info(model_type: str):
    """
    Get detailed information about a specific model
    """
    models = await get_available_models()
    model = next((m for m in models if m.type == model_type), None)
    
    if not model:
        return {"error": "Model not found"}
    
    return model
