from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional
from proxy import create_or_update_dashboard
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to your frontend's origin
    allow_credentials=True,
    allow_methods=["*"],  # Adjust this to the allowed HTTP methods
    allow_headers=["*"],  # Adjust this to the allowed headers
)



class DeviceID(BaseModel):
    device_id: str

@app.post("/dashboard/")
async def create_dashboard(device:DeviceID):
    print(device)
    result = create_or_update_dashboard(device.device_id)
    return result


if __name__=="__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=53222)
