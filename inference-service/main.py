from fastapi import FastAPI
from fastapi.responses import JSONResponse
import influxdb_client
import time
from influxdb_client.client.write_api import SYNCHRONOUS

app = FastAPI()

# informations about database
url='http://influxdb:8086'
token='4eYvsu8wZCJ6tKuE2sxvFHkvYFwSMVK0011hEEiojvejzpSaij86vYQomN_12au6eK-2MZ6Knr-Sax201y70w=='
org='Namla'

# creating the client
client = influxdb_client.InfluxDBClient(
    url=url,
    token=token,
    org=org
)

# 
query_api = client.query_api()

write_api = client.write_api(write_options=SYNCHRONOUS)

def query_builder(dataType,serialNumber):
    query = '''
        from(bucket: "namla-smart-metering")
        |> range(start: -1h)
        |> filter(fn: (r) => r["_measurement"] == "sensor_data")
    '''
    query +=    f'\t|> filter(fn: (r) => r["dataType"] == "{dataType}")\n'
    query +=    f'\t\t|> filter(fn: (r) => r["serialNumber"] == "{serialNumber}")\n'
    query +=    f'\t\t|> filter(fn: (r) => r["_field"] == "value")\n'
    query +=    '\t\t|> yield(name: "last")\n'
    
    return query



import numpy as np
import pandas as pd

def prepare_data(queries,lookback = 2*4):
    data_array = np.array(queries)
    consumption_values = data_array[:, 1].astype(float)
    df = pd.DataFrame({'consumption': consumption_values})


    # Your code for preparing the DataFrame
    relevant_columns = ['consumption']
    df = df[relevant_columns]

    # Shift the consumption column
    # Replace this with your desired lookback value
    shifted_columns = [df['consumption'].shift(lookback + 1 - i) for i in range(1, lookback + 1)]
    df_shifted = pd.concat(shifted_columns, axis=1)
    df_shifted.columns = [f'consumption(t-{lookback + 1 - i})' for i in range(1, lookback + 1)]
    df = pd.concat([df, df_shifted], axis=1)


    # Drop rows with NaN values
    df.dropna(inplace=True)

    # Convert DataFrame to numpy array
    prepared_data = df.to_numpy()
    return prepared_data

from sklearn.preprocessing import MinMaxScaler








scaler  = MinMaxScaler(feature_range=(0, 1))
import torch
import torch.nn as nn
"""
lookback_values = [2*4, 24*4, 24*7*4]
forecasting_horizon_values = [2*4, 24*4, 24*7*4]
"""

class LSTM(nn.Module):
        def __init__(self, input_size, hidden_size, num_stacked_layers, device):
            super().__init__()
            self.hidden_size = hidden_size
            self.num_stacked_layers = num_stacked_layers
            self.device = device
            self.lstm = nn.LSTM(input_size, hidden_size, num_stacked_layers, batch_first=True)
            self.fc = nn.Linear(hidden_size, 1)

        def forward(self, x):
            batch_size = x.size(0)
            h0 = torch.zeros(self.num_stacked_layers, batch_size, self.hidden_size).to(self.device)
            c0 = torch.zeros(self.num_stacked_layers, batch_size, self.hidden_size).to(self.device)
            out, _ = self.lstm(x, (h0, c0))
            out = self.fc(out[:, -1, :])
            return out


class Inference:
    def __init__(self,previous_data) -> None:
        self.previous_data = previous_data
        self.lookback_values = [2*4, 24*4, 24*7*4]
        self.forecasting_horizon_values = [2*4, 24*4, 24*7*4]
        self.lookback = None
        self.forecasting_horizon = None
        self.X = None
        self.y = None
        self.prepared_data = None
        self.model = None
        self.preprocessed_dataframe=None
        self.min=None
        self.max=None
        self.scaler = MinMaxScaler(feature_range=(0, 1))
        self.predictions = {}



    def prepare_data(self):
        data_array = np.array(self.previous_data)
        consumption_values = data_array[:, 1].astype(float)
        df = pd.DataFrame({'consumption': consumption_values})
        # Your code for preparing the DataFrame
        relevant_columns = ['consumption']
        df = df[relevant_columns]
        # Shift the consumption column
        # Replace this with your desired lookback value
        shifted_columns = [df['consumption'].shift(self.lookback + 1 - i) for i in range(1, self.lookback + 1)]
        df_shifted = pd.concat(shifted_columns, axis=1)
        df_shifted.columns = [f'consumption(t-{self.lookback + 1 - i})' for i in range(1, self.lookback + 1)]
        df = pd.concat([df, df_shifted], axis=1)
        # Drop rows with NaN values
        df.dropna(inplace=True)
        # Convert DataFrame to numpy array
        prepared_data = df.to_numpy()
        self.prepared_data = prepared_data
    

    def scale_data(self):
        self.preprocessed_dataframe = self.scaler.fit_transform(self.prepared_data)
        self.min = self.scaler.data_min_[0]
        self.max = self.scaler.data_max_[0]
    


    def create_X_y(self):
        self.X = self.preprocessed_dataframe[:, 1:]
        self.y = self.preprocessed_dataframe[:, 0]

    def set_lookback(self,lookback_index):
        self.lookback = self.lookback_values[lookback_index]

    def set_forecasting_horizon(self,horizon_index):
        self.forecasting_horizon = self.forecasting_horizon_values[horizon_index]

    
    
    def inverse_scale_y(self, look_ahead):
        min_value = self.scaler.data_min_[0]
        max_value = self.scaler.data_max_[0]
        scaled_y = self.predictions[look_ahead].reshape(-1, 1)
        y = scaled_y * (max_value - min_value) + min_value
        return y

    def load_model(self,model):
        self.model = model

    def perform_inference(self,lookback_index,horizon_index):
        if not self.model:
            print ('no model loaded')
            return
        
        


        self.set_lookback(lookback_index)
        self.set_forecasting_horizon(lookback_index)
        self.prepare_data()
        self.scale_data()
        self.create_X_y()

        X_predict = self.X[-self.forecasting_horizon:]
        X_predict = X_predict.reshape((-1, self.forecasting_horizon, 1))
        X_predict = torch.tensor(X_predict).float()
        
        self.model.eval()
        with torch.no_grad():
            scaled_predictions = self.model(X_predict).numpy().flatten()

        self.predictions[self.forecasting_horizon] = scaled_predictions
        self.predictions.update(self.predictions)
        
        
        y = self.inverse_scale_y(look_ahead=horizon_index)
        y = y.tolist()
        
        return y, {}



from data import data_array



from fastapi import Query



@app.get('/{forecast_horizon}')
def root(forecast_horizon: int, datatype: str = Query(...), serialnumber: str = Query(...)):
    print(f"Forecast Horizon: {forecast_horizon}, Datatype: {datatype}, Serialnumber: {serialnumber}")
    query_results = []
    
    result = query_api.query(org=org, query=query_builder(dataType=datatype, serialNumber=serialnumber))
    for table in result:
        for record in table.records:
            query_results.append((record.get_field(), record.get_value()))
    
    #query_results = data_array
    
    # Convert numpy array to list of lists
    response_content = {"query_results": query_results}
    #return JSONResponse(content= response_content)
    
    inferencer = Inference(query_results)
    model = LSTM(1, 4, 2, device='cpu')
    model.load_state_dict(torch.load(f"./Prediction_models/trained_model_{datatype}.pth"))

    #load the model to the inferencer
    inferencer.load_model(model=model)
    index = None
    fh = None
    if (datatype=="GAS"):
        if forecast_horizon  <= 2:
            index = 0
            fh=2
        elif forecast_horizon<=24:
            index = 1
            fh=24
        else:
            index = 2
            fh=7*24
    else:
        if forecast_horizon  <= 8:
            index = 0
            fh=8
        elif forecast_horizon<=96:
            index = 1
            fh=96
        else:
            index = 2
            fh=7*24*4
    
    predictions, metrics = inferencer.perform_inference(index, fh)
    
    
    response_content = {
        "predictions": predictions,
        "metrics": metrics
    }

    
    for p in response_content["predictions"]:
        point = influxdb_client.Point('sensor_data') \
        .tag('serialNumber', serialnumber + "pred") \
        .tag('dateType', 'DATE') \
        .tag('dataType', datatype) \
        .tag('dataUnit', 'METER') \
        .field('value', float(p[0])) \
        .time(time.time_ns()+3600000000000)  
        write_api.write(bucket='namla-smart-metering',org='Namla',record=point)
    
    
    return JSONResponse(content=response_content)
    
    


from fastapi import File, UploadFile

import os
import shutil

@app.post("/receive-model")
async def receive_model(silem: UploadFile = File(...)):
    print("I am here normalement")
    # Check if the file is a PyTorch model file (.pth)
    if not silem.filename.endswith(".pth"):
        return {"error": "Invalid file format. Please upload a PyTorch model file (.pth)"}

    # Specify the directory to save the model file
    save_directory = "./Prediction_models"
    
    # Delete the existing file if it exists
    existing_file_path = os.path.join(save_directory, silem.filename)
    if os.path.exists(existing_file_path):
        os.remove(existing_file_path)

    # Save the uploaded model file to the specified directory
    with open(existing_file_path, "wb") as buffer:
        shutil.copyfileobj(silem.file, buffer)

    return {"message": f"Model file '{silem.filename}' received and saved successfully."}


import schedule

# Function to execute the code block every 24 hours
def execute_code_block():
    query_results = []

    result = query_api.query(org=org, query=query_builder())
    for table in result:
        for record in table.records:
            query_results.append((record.get_field(), record.get_value()))
    
    #query_results = data_array
    
    # Convert numpy array to list of lists
    inferencer = Inference(query_results)
    model = LSTM(1, 4, 2, device='cpu')
    model.load_state_dict(torch.load("./Prediction_models/trained_model.pth"))

    #load the model to the inferencer
    inferencer.load_model(model=model)

    #perform the inference based on the forecasting horizon
    predictions,metrics= inferencer.perform_inference(0,0)
    
    response_content = {
        "predictions": predictions,
        "metrics": metrics
    }

    # You can print or log the response content here if needed
    
# Schedule the code execution every 24 hours
schedule.every(24).hours.do(execute_code_block)

# Run the scheduler loop
#while True:
#    schedule.run_pending()
#    time.sleep(1)
if __name__ == "__main__":
    import uvicorn

    # Define the host and port for the FastAPI application to listen on
    host = "0.0.0.0"  # Listen on all network interfaces
    port = 8000  # Choose any available port you prefer

    # Start the FastAPI application using Uvicorn ASGI server
    uvicorn.run(app, host=host, port=port)
