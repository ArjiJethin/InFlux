from fastapi import APIRouter, HTTPException
from app.schemas.schemas import PredictionRequest, PredictionResponse
from app.services.ml_service import get_model
import pandas as pd

router = APIRouter()

@router.post("/", response_model=PredictionResponse)
async def make_prediction(request: PredictionRequest):
    """
    Make time series predictions using the specified model
    """
    try:
        # Get the appropriate model
        model = get_model(request.model_type)
        
        # Train the model
        if request.model_type.lower() == 'prophet':
            model.train(request.data.values, request.data.dates)
            predictions, pred_dates = model.predict(request.forecast_steps)
        else:
            model.train(request.data.values)
            predictions = model.predict(request.forecast_steps)
            
            # Generate future dates
            last_date = pd.to_datetime(request.data.dates[-1])
            pred_dates = pd.date_range(
                start=last_date, 
                periods=request.forecast_steps + 1, 
                freq='D'
            )[1:].strftime('%Y-%m-%d').tolist()
        
        # Calculate metrics on training data
        if hasattr(model, 'model') and hasattr(model.model, 'predict'):
            try:
                train_pred = model.model.predict(
                    list(range(len(request.data.values)))
                )
                metrics = model.calculate_metrics(
                    request.data.values, 
                    train_pred
                )
            except:
                metrics = None
        else:
            metrics = None
        
        return PredictionResponse(
            predictions=predictions,
            dates=pred_dates,
            model_type=request.model_type,
            metrics=metrics
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/history")
async def get_prediction_history():
    """
    Get prediction history
    """
    # TODO: Implement database query
    return {"message": "Prediction history endpoint"}
