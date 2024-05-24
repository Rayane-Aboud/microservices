from fastapi import FastAPI, HTTPException
from influxdb_client import InfluxDBClient
from influxdb_client.client.query_api import QueryApi
from pydantic import BaseModel
import os

app = FastAPI()

# Define environment variables or configure them directly
INFLUXDB_URL = os.getenv("INFLUXDB_URL")
INFLUXDB_TOKEN = os.getenv("INFLUXDB_TOKEN")
INFLUXDB_ORG = os.getenv("INFLUXDB_ORG")
INFLUXDB_BUCKET = os.getenv("INFLUXDB_BUCKET")

# Create an InfluxDB client
client = InfluxDBClient(url=INFLUXDB_URL, token=INFLUXDB_TOKEN, org=INFLUXDB_ORG)
query_api = client.query_api()

# Define Pydantic models
class EnergyRequest(BaseModel):
    resource: str

class EnergyRecommendation(BaseModel):
    recommendation: str

@app.post("/check_deviation/", response_model=EnergyRecommendation)
async def check_deviation(request: EnergyRequest):
    resource = request.resource
    
    # Query real and predicted energy consumption from InfluxDB
    real_query = f'''
    from(bucket: "{INFLUXDB_BUCKET}")
      |> range(start: -1h)
      |> filter(fn: (r) => r._measurement == "energy" and r.resource == "{resource}" and r._field == "real")
      |> mean()
    '''
    predicted_query = f'''
    from(bucket: "{INFLUXDB_BUCKET}")
      |> range(start: -1h)
      |> filter(fn: (r) => r._measurement == "energy" and r.resource == "{resource}" and r._field == "predicted")
      |> mean()
    '''

    try:
        real_result = query_api.query(org=INFLUXDB_ORG, query=real_query)
        predicted_result = query_api.query(org=INFLUXDB_ORG, query=predicted_query)
        
        if not real_result or not predicted_result:
            raise HTTPException(status_code=404, detail="Data not found")

        real_value = list(real_result)[0].records[0].get_value()
        predicted_value = list(predicted_result)[0].records[0].get_value()

        deviation = abs(real_value - predicted_value) / predicted_value

        if deviation > 0.2:
            recommendation = f"Energy consumption for {resource} exceeds the predicted value by more than 20%. Consider reducing usage."
        else:
            recommendation = f"Energy consumption for {resource} is within the acceptable range."

        return EnergyRecommendation(recommendation=recommendation)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

