from fastapi import APIRouter
from app.api.endpoints import predict, upload, models

api_router = APIRouter()

api_router.include_router(predict.router, prefix="/predict", tags=["predictions"])
api_router.include_router(upload.router, prefix="/upload", tags=["data"])
api_router.include_router(models.router, prefix="/models", tags=["models"])
