from fastapi import FastAPI, Query
from fastapi.responses import JSONResponse
from model_inference import Inference, LSTM
from db import query_api, query_builder, write_to_influx
import torch
from model_upload import router as upload_model_router

app = FastAPI()
app.include_router(upload_model_router)
@app.get('/{forecast_horizon}')
def root(forecast_horizon: int, datatype: str = Query(...), serialnumber: str = Query(...)):
    query_results = []

    result = query_api.query(org='Namla', query=query_builder(dataType=datatype, serialNumber=serialnumber))
    for table in result:
        for record in table.records:
            query_results.append((record.get_field(), record.get_value()))

    inferencer = Inference(query_results)
    model = LSTM(1, 4, 2, device='cpu')
    model.load_state_dict(torch.load(f"./Prediction_models/trained_model_{datatype}.pth"))

    inferencer.load_model(model=model)
    index, fh = inferencer.get_indices(datatype, forecast_horizon)

    predictions, metrics = inferencer.perform_inference(index, fh)

    response_content = {
        "predictions": predictions,
        "metrics": metrics
    }

    write_to_influx(predictions, serialnumber, datatype)
    
    return JSONResponse(content=response_content)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
