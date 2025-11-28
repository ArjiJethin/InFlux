import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, mean_absolute_error
from typing import Tuple, List

class TimeSeriesPredictor:
    """Base class for time series prediction models"""
    
    def __init__(self):
        self.model = None
        self.is_trained = False
    
    def prepare_data(self, data: List[float]) -> Tuple[np.ndarray, np.ndarray]:
        """Prepare data for training"""
        X = np.arange(len(data)).reshape(-1, 1)
        y = np.array(data)
        return X, y
    
    def calculate_metrics(self, y_true: np.ndarray, y_pred: np.ndarray) -> dict:
        """Calculate prediction metrics"""
        mse = mean_squared_error(y_true, y_pred)
        mae = mean_absolute_error(y_true, y_pred)
        rmse = np.sqrt(mse)
        return {
            "mse": float(mse),
            "mae": float(mae),
            "rmse": float(rmse)
        }

class LinearModel(TimeSeriesPredictor):
    """Simple linear regression model for time series"""
    
    def __init__(self):
        super().__init__()
        self.model = LinearRegression()
    
    def train(self, data: List[float]):
        """Train the linear model"""
        X, y = self.prepare_data(data)
        self.model.fit(X, y)
        self.is_trained = True
    
    def predict(self, steps: int) -> List[float]:
        """Make predictions for future steps"""
        if not self.is_trained:
            raise ValueError("Model must be trained before prediction")
        
        last_index = len(self.model.coef_)
        future_X = np.arange(last_index, last_index + steps).reshape(-1, 1)
        predictions = self.model.predict(future_X)
        return predictions.tolist()

class ARIMAModel(TimeSeriesPredictor):
    """ARIMA model for time series (using statsmodels)"""
    
    def __init__(self, order=(1, 1, 1)):
        super().__init__()
        self.order = order
    
    def train(self, data: List[float]):
        """Train ARIMA model"""
        try:
            from statsmodels.tsa.arima.model import ARIMA
            self.model = ARIMA(data, order=self.order)
            self.model = self.model.fit()
            self.is_trained = True
        except ImportError:
            raise ImportError("statsmodels is required for ARIMA model")
    
    def predict(self, steps: int) -> List[float]:
        """Make predictions for future steps"""
        if not self.is_trained:
            raise ValueError("Model must be trained before prediction")
        
        forecast = self.model.forecast(steps=steps)
        return forecast.tolist()

class ProphetModel(TimeSeriesPredictor):
    """Facebook Prophet model for time series"""
    
    def __init__(self):
        super().__init__()
    
    def train(self, data: List[float], dates: List[str]):
        """Train Prophet model"""
        try:
            from prophet import Prophet
            df = pd.DataFrame({
                'ds': pd.to_datetime(dates),
                'y': data
            })
            self.model = Prophet()
            self.model.fit(df)
            self.is_trained = True
        except ImportError:
            raise ImportError("prophet is required for Prophet model")
    
    def predict(self, steps: int, freq: str = 'D') -> Tuple[List[float], List[str]]:
        """Make predictions for future steps"""
        if not self.is_trained:
            raise ValueError("Model must be trained before prediction")
        
        future = self.model.make_future_dataframe(periods=steps, freq=freq)
        forecast = self.model.predict(future)
        
        predictions = forecast['yhat'].tail(steps).tolist()
        dates = forecast['ds'].tail(steps).dt.strftime('%Y-%m-%d').tolist()
        
        return predictions, dates

def get_model(model_type: str) -> TimeSeriesPredictor:
    """Factory function to get the appropriate model"""
    models = {
        'linear': LinearModel,
        'arima': ARIMAModel,
        'prophet': ProphetModel,
    }
    
    model_class = models.get(model_type.lower())
    if not model_class:
        raise ValueError(f"Unknown model type: {model_type}")
    
    return model_class()
