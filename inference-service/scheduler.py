import schedule
import time
from db import query_api, query_builder
from model_inference import Inference, LSTM
import torch

def execute_code_block():
    query_results = []
    result = query_api.query(org='Namla', query=query_builder())
    for table in result:
        for record in table.records:
            query_results.append((record.get_field(), record.get_value()))

    inferencer = Inference(query_results)
    model = LSTM(1, 4, 2, device='cpu')
    model.load_state_dict(torch.load("./Prediction_models/trained_model.pth"))

    inferencer.load_model(model=model)
    predictions, metrics = inferencer.perform_inference(0, 0)

    response_content = {
        "predictions": predictions,
        "metrics": metrics
    }
    # Optionally log or print response_content here
    schedule.every(24).hours.do(execute_code_block)

    if __name__ == "__main__":
        while True:
            schedule.run_pending()
            time.sleep(1)
