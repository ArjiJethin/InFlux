from fastapi import APIRouter, UploadFile, File, HTTPException
from app.schemas.schemas import UploadResponse
import pandas as pd
import json
from io import StringIO

router = APIRouter()

@router.post("/", response_model=UploadResponse)
async def upload_data(file: UploadFile = File(...)):
    """
    Upload time series data (CSV or JSON format)
    """
    try:
        content = await file.read()
        
        # Parse based on file extension
        if file.filename.endswith('.csv'):
            df = pd.read_csv(StringIO(content.decode('utf-8')))
        elif file.filename.endswith('.json'):
            data = json.loads(content.decode('utf-8'))
            df = pd.DataFrame(data)
        else:
            raise HTTPException(
                status_code=400, 
                detail="Unsupported file format. Please upload CSV or JSON"
            )
        
        # Basic validation
        if df.empty:
            raise HTTPException(status_code=400, detail="File is empty")
        
        return UploadResponse(
            message="File uploaded successfully",
            filename=file.filename,
            rows=len(df),
            columns=df.columns.tolist()
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/templates")
async def get_data_templates():
    """
    Get sample data templates
    """
    return {
        "csv_template": {
            "format": "date,value",
            "example": "2024-01-01,100\n2024-01-02,105\n2024-01-03,110"
        },
        "json_template": {
            "format": '{"dates": ["2024-01-01", "2024-01-02"], "values": [100, 105]}'
        }
    }
