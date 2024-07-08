import pandas as pd
from fastapi import FastAPI, Query
from pymongo import MongoClient
from typing import List
import mlflow
import mlflow.pytorch
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to your frontend's origin
    allow_credentials=True,
    allow_methods=["*"],  # Adjust this to the allowed HTTP methods
    allow_headers=["*"],  # Adjust this to the allowed headers
)


import pandas as pd
from copy import deepcopy as dc
from sklearn.preprocessing import MinMaxScaler
import torch
import torch.nn as nn
from torch.utils.data import Dataset, DataLoader
import numpy as np
import os
from sklearn.metrics import mean_squared_error, mean_absolute_error#, r2_score
from prophet import Prophet
import torch.nn.functional as F

class UniconPytorch:

    def __init__(self, train_test_split_percentage: float, batch_size: int, device='cpu', num_epochs=25) -> None:
        self.data_frame = None
        self.lookback_values = [2, 24, 24*7]
        self.forecasting_horizon_values = [2, 24, 24*7]
        self.prepared_dataframe = None
        self.preprocessed_dataframe = None
        self.X = None
        self.y = None
        self.X_train = None
        self.X_test = None
        self.y_train = None
        self.y_test = None
        self.train_test_split_percentage = train_test_split_percentage
        self.train_dataset = None
        self.test_dataset = None
        self.batch_size = batch_size
        self.device = device
        self.predictions = {}
        self.num_epochs = num_epochs
        self.model = None
        self.prophet_model = None
        self.scaler = MinMaxScaler(feature_range=(0, 1))
        self.rnn_model = None
        self.min = 0
        self.max = 0

    def set_lookback(self, lookback_index):
        self.lookback = self.lookback_values[lookback_index]

    def set_forecasting_horizon(self, horizon_index):
        self.forecasting_horizon = self.forecasting_horizon_values[horizon_index]

    def load_dataset(self, link):
        self.data_frame = pd.read_csv(link)

    def load_datasets(self, file_paths):
        valid_paths = [path for path in file_paths if os.path.isfile(path)]
        if not valid_paths:
            raise ValueError("No valid file paths provided.")

        datasets = []
        for path in valid_paths:
            df = pd.read_csv(path)
            datasets.append(df)

        self.data_frame = pd.concat(datasets, ignore_index=True)

    def prepare_dataframe(self):
        df = dc(self.data_frame)
        #df['timestamp'] = pd.to_datetime(df['timestamp'])
        #df.sort_values(by=['timestamp'], inplace=True)  # Sort DataFrame by timestamp and campus_id
        #df.set_index(['timestamp'], inplace=True)

        # Ensure that only the 'consumption' column is selected for preparing the dataframe
        relevant_columns = ['value']  # Add any other relevant columns here
        df = df[relevant_columns]


        shifted_columns = [df['value'].shift(self.lookback + 1 - i) for i in range(1, self.lookback + 1)]
        df_shifted = pd.concat(shifted_columns, axis=1)
        df_shifted.columns = [f'value(t-{self.lookback+1 - i})' for i in range(1, self.lookback + 1)]
        df = pd.concat([df, df_shifted], axis=1)

        df.dropna(inplace=True)
        self.prepared_dataframe = df.to_numpy()

    def preprocess_dataframe(self):

        self.preprocessed_dataframe = self.scaler.fit_transform(self.prepared_dataframe)
        self.min = self.scaler.data_min_[0]
        self.max = self.scaler.data_max_[0]
        #self.preprocessed_dataframe= self.scaler.inverse_transform(self.preprocessed_dataframe)
        
    def create_X_y(self):
        self.X = self.preprocessed_dataframe[:, 1:]
        self.y = self.preprocessed_dataframe[:, 0]
        print("Length of X:", len(self.X))
        print("Length of y:", len(self.y))

    def create_train_test_sets(self):
        split_index = int(len(self.X) * self.train_test_split_percentage)
        self.X_train = self.X[:split_index]
        self.X_test = self.X[split_index:]
        self.y_train = self.y[:split_index]
        self.y_test = self.y[split_index:]

        print("Shape of X_train before reshaping:", self.X_train.shape)
        print("Shape of X_test before reshaping:", self.X_test.shape)
        print("Shape of y_train before reshaping:", self.y_train.shape)
        print("Shape of y_test before reshaping:", self.y_test.shape)

        self.X_train = self.X_train.reshape((-1, self.lookback, 1))
        self.X_test = self.X_test.reshape((-1, self.lookback, 1))
        self.y_train = self.y_train.reshape((-1, 1))
        self.y_test = self.y_test.reshape((-1, 1))

        print("Shape of X_train after reshaping:", self.X_train.shape)
        print("Shape of X_test after reshaping:", self.X_test.shape)
        print("Shape of y_train after reshaping:", self.y_train.shape)
        print("Shape of y_test after reshaping:", self.y_test.shape)

        self.X_train = torch.tensor(self.X_train).float()
        self.y_train = torch.tensor(self.y_train).float()
        self.X_test = torch.tensor(self.X_test).float()
        self.y_test = torch.tensor(self.y_test).float()

    class TimeSeriesDataset(Dataset):
        def __init__(self, X, y):
            self.X = X
            self.y = y

        def __len__(self):
            return len(self.X)

        def __getitem__(self, i):
            if i < len(self.X):
                #print(len(self.X))  # Check length of X
                #print(len(self.y))  # Check length of y
                #print(f"Index: {i}, Length of X: {len(self.X)}, Length of y: {len(self.y)}")
                return self.X[i], self.y[i]
            else:
                raise IndexError(f"Index out of bounds: {i}")

    def create_train_test_datasets(self):
        self.train_dataset = self.TimeSeriesDataset(self.X_train, self.y_train)
        self.test_dataset = self.TimeSeriesDataset(self.X_test, self.y_test)

    def create_dataloaders(self):
        self.train_loader = DataLoader(self.train_dataset, batch_size=self.batch_size, shuffle=False)
        self.test_loader = DataLoader(self.test_dataset, batch_size=self.batch_size, shuffle=False)

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

    def create_model(self):
        self.model = self.LSTM(1, 4, 2, device=self.device)
        self.model.to(self.device)

    def train_one_epoch(self, model, loss_function, optimizer, epoch):
        model.train(True)
        print(f'Epoch: {epoch + 1}')
        running_loss = 0.0

        for batch_index, batch in enumerate(self.train_loader):
            x_batch, y_batch = batch[0].to(self.device), batch[1].to(self.device)

            output = model(x_batch)
            loss = loss_function(output, y_batch)
            running_loss += loss.item()

            optimizer.zero_grad()
            loss.backward()
            optimizer.step()

            if batch_index % 100 == 99:  # print every 100 batches
                avg_loss_across_batches = running_loss / 100
                print(f'Batch {batch_index + 1}, Loss: {avg_loss_across_batches:.3f}')
                running_loss = 0.0
        print()

    def validate_one_epoch(self, model, loss_function):
        model.train(False)
        running_loss = 0.0

        for batch_index, batch in enumerate(self.test_loader):
            x_batch, y_batch = batch[0].to(self.device), batch[1].to(self.device)

            with torch.no_grad():
                output = model(x_batch)
                loss = loss_function(output, y_batch)
                running_loss += loss.item()

        avg_loss_across_batches = running_loss / len(self.test_loader)

        print(f'Val Loss: {avg_loss_across_batches:.3f}')

    def train_model(self):
        loss_function = nn.MSELoss()
        optimizer = torch.optim.Adam(self.model.parameters(), lr=0.001)

        for epoch in range(self.num_epochs):
            self.train_one_epoch(self.model, loss_function, optimizer, epoch)
            self.validate_one_epoch(self.model, loss_function)

    def train_model_horizons(self):
      loss_function = nn.MSELoss()
      # Create the model once outside the loop
      self.create_model()
      optimizer = torch.optim.Adam(self.model.parameters(), lr=0.01)

      mlflow.set_tracking_uri("http://localhost:5000")


      for lookback_value in self.lookback_values:
          self.set_lookback(self.lookback_values.index(lookback_value))
          self.set_forecasting_horizon(self.lookback_values.index(lookback_value))  # Set forecasting horizon equal to lookback
          self.prepare_dataframe()
          self.preprocess_dataframe()
          self.create_X_y()
          self.create_train_test_sets()
          self.create_train_test_datasets()
          self.create_dataloaders()

          for epoch in range(self.num_epochs):
            with mlflow.start_run():
                mlflow.log_param("lookback", lookback_value)
                mlflow.log_param("forecasting_horizon", lookback_value)

                self.train_one_epoch(self.model, loss_function, optimizer, epoch)
                self.validate_one_epoch(self.model, loss_function)
                # Calculate metrics on training set
                train_predictions = self.model(self.X_train).detach().numpy().flatten()
                train_mse = mean_squared_error(self.y_train, train_predictions)
                train_mae = mean_absolute_error(self.y_train, train_predictions)
                
                #train_r2 = r2_score(self.y_train, train_predictions)
                
                # Calculate metrics on test set
                test_predictions = self.model(self.X_test).detach().numpy().flatten()
                test_mse = mean_squared_error(self.y_test, test_predictions)
                test_mae = mean_absolute_error(self.y_test, test_predictions)
                #test_r2 = r2_score(self.y_test, test_predictions)

                print(f'Epoch {epoch + 1}/{self.num_epochs} - Lookback: {lookback_value}')
                #print(f'Train MSE: {train_mse:.4f}, Train MAE: {train_mae:.4f}, Train R-squared: {train_r2:.4f}')
                #print(f'Test MSE: {test_mse:.4f}, Test MAE: {test_mae:.4f}, Test R-squared: {test_r2:.4f}')
                print()
                mlflow.log_metric("train_mse", train_mse)
                mlflow.log_metric("train_mae", train_mae)
                mlflow.log_metric("test_mse", test_mse)
                mlflow.log_metric("test_mae", test_mae)
                mlflow.pytorch.log_model(self.model, f"model_lookback_{lookback_value}_epoch_{epoch}")

    def predict(self, forecasting_horizon):
        if not self.model:
            print("Model has not been trained yet. Please train the model before making predictions.")
            return {}

        predictions = {}
        metrics = {}

        self.set_lookback(self.forecasting_horizon_values.index(forecasting_horizon))
        self.set_forecasting_horizon(self.forecasting_horizon_values.index(forecasting_horizon))
        self.prepare_dataframe()
        self.preprocess_dataframe()
        self.create_X_y()

        # Reshape the data for prediction
        X_predict = self.X[-forecasting_horizon:]  # Use the last 'forecasting_horizon' observations for prediction
        X_predict = X_predict.reshape((-1, forecasting_horizon, 1))
        X_predict = torch.tensor(X_predict).float()

        # Set the model to evaluation mode
        self.model.eval()

        # Make predictions
        with torch.no_grad():
            scaled_predictions = self.model(X_predict).numpy().flatten()

        # Update self.predictions
        predictions[forecasting_horizon] = scaled_predictions
        self.predictions.update(predictions)

        # Calculate metrics
        actual_values = self.y[-forecasting_horizon:]
        mse = mean_squared_error(actual_values, scaled_predictions)
        mae = mean_absolute_error(actual_values, scaled_predictions)
        
        #r2 = r2_score(actual_values, scaled_predictions)

        metrics['MSE'] = mse
        metrics['MAE'] = mae
        #metrics['R2'] = r2


        return predictions, metrics

    def save_model(self, path: str, source: str):
        filename = f"trained_model_{source}.pth"
        torch.save(self.model.state_dict(), os.path.join(path, filename))


    def train_prophet_model(self):
        # Initialize Prophet model
        self.prophet_model = Prophet()

        # Prepare DataFrame for Prophet
        df_prophet = dc(self.data_frame)
        df_prophet.rename(columns={"timestamp": "ds", "value": "y"}, inplace=True)

        # Fit the Prophet model
        self.prophet_model.fit(df_prophet)

    def predict_prophet(self, forecasting_horizon):
        if not self.prophet_model:
            print("Prophet model has not been trained yet. Please train the model before making predictions.")
            return {}, {}

        predictions = {}
        metrics = {}

        # Prepare DataFrame for prediction
        future = self.prophet_model.make_future_dataframe(periods=forecasting_horizon, freq='H')

        # Make predictions
        forecast = self.prophet_model.predict(future)
        predictions[forecasting_horizon] = forecast['yhat'][-forecasting_horizon:].values

        # Calculate metrics
        actual_values = self.data_frame['value'][-forecasting_horizon:].values
        mse = mean_squared_error(actual_values, predictions[forecasting_horizon])
        mae = mean_absolute_error(actual_values, predictions[forecasting_horizon])
        #r2 = r2_score(actual_values, predictions[forecasting_horizon])

        metrics['MSE'] = mse
        metrics['MAE'] = mae
        #metrics['R2'] = r2

        return predictions, metrics

    class RNN(nn.Module):
        def __init__(self, input_size, hidden_size, num_layers, device):
            super().__init__()
            self.hidden_size = hidden_size
            self.num_layers = num_layers
            self.device = device
            self.rnn = nn.RNN(input_size, hidden_size, num_layers, batch_first=True)
            self.fc = nn.Linear(hidden_size, 1)

        def forward(self, x):
            batch_size = x.size(0)
            h0 = torch.zeros(self.num_layers, batch_size, self.hidden_size).to(self.device)
            out, _ = self.rnn(x, h0)
            out = self.fc(out[:, -1, :])
            return out

    def create_rnn_model(self):
        self.rnn_model = self.RNN(1, 4, 2, device=self.device)
        self.rnn_model.to(self.device)

    def train_rnn_model(self):
        loss_function = nn.MSELoss()
        optimizer = torch.optim.Adam(self.rnn_model.parameters(), lr=0.001)

        for epoch in range(self.num_epochs):
            self.train_one_epoch(self.rnn_model, loss_function, optimizer, epoch)
            self.validate_one_epoch(self.rnn_model, loss_function)

    def train_rnn_model_horizons(self):
      loss_function = nn.MSELoss()
      self.create_rnn_model()
      optimizer = torch.optim.Adam(self.rnn_model.parameters(), lr=0.01)

      for lookback_value in self.lookback_values:
          self.set_lookback(self.lookback_values.index(lookback_value))
          self.set_forecasting_horizon(self.lookback_values.index(lookback_value))  # Set forecasting horizon equal to lookback
          self.prepare_dataframe()
          self.preprocess_dataframe()
          self.create_X_y()
          self.create_train_test_sets()
          self.create_train_test_datasets()
          self.create_dataloaders()

          for epoch in range(self.num_epochs):
              self.train_one_epoch(self.rnn_model, loss_function, optimizer, epoch)
              self.validate_one_epoch(self.rnn_model, loss_function)
              # Calculate metrics on training set
              train_predictions = self.rnn_model(self.X_train).detach().numpy().flatten()
              train_mse = mean_squared_error(self.y_train, train_predictions)
              train_mae = mean_absolute_error(self.y_train, train_predictions)
              #train_r2 = r2_score(self.y_train, train_predictions)

              # Calculate metrics on test set
              test_predictions = self.rnn_model(self.X_test).detach().numpy().flatten()
              test_mse = mean_squared_error(self.y_test, test_predictions)
              test_mae = mean_absolute_error(self.y_test, test_predictions)
              #test_r2 = r2_score(self.y_test, test_predictions)

              print(f'Epoch {epoch + 1}/{self.num_epochs} - Lookback: {lookback_value}')
              #print(f'Train MSE: {train_mse:.4f}, Train MAE: {train_mae:.4f}, Train R-squared: {train_r2:.4f}')
              #print(f'Test MSE: {test_mse:.4f}, Test MAE: {test_mae:.4f}, Test R-squared: {test_r2:.4f}')
              print()

    def predict_rnn(self, forecasting_horizon):
        if not self.rnn_model:
            print("RNN model has not been trained yet. Please train the model before making predictions.")
            return {}, {}

        predictions = {}
        metrics = {}

        self.set_lookback(self.forecasting_horizon_values.index(forecasting_horizon))
        self.set_forecasting_horizon(self.forecasting_horizon_values.index(forecasting_horizon))
        self.prepare_dataframe()
        self.preprocess_dataframe()
        self.create_X_y()

        # Reshape the data for prediction
        X_predict = self.X[-forecasting_horizon:]  # Use the last 'forecasting_horizon' observations for prediction
        X_predict = X_predict.reshape((-1, forecasting_horizon, 1))
        X_predict = torch.tensor(X_predict).float()

        # Set the model to evaluation mode
        self.rnn_model.eval()

        # Make predictions
        with torch.no_grad():
            scaled_predictions = self.rnn_model(X_predict).numpy().flatten()

        # Update self.predictions
        predictions[forecasting_horizon] = scaled_predictions

        # Calculate metrics
        actual_values = self.y[-forecasting_horizon:]
        mse = mean_squared_error(actual_values, scaled_predictions)
        mae = mean_absolute_error(actual_values, scaled_predictions)
        #r2 = r2_score(actual_values, scaled_predictions)

        metrics['MSE'] = mse
        metrics['MAE'] = mae
        #metrics['R2'] = r2

        return predictions, metrics


    def inverse_scale_y(self, look_ahead):
      min_value = self.scaler.data_min_[0]
      max_value = self.scaler.data_max_[0]

      scaled_y = self.predictions[look_ahead].reshape(-1, 1)
      y = scaled_y * (max_value - min_value) + min_value
      return y
    
    def load_from_mongo(self, uri: str, database: str, collection: str, source: str):
        client = MongoClient(uri)
        db = client[database]
        cursor = db[collection].find({"dataType": source})
        df = pd.DataFrame(list(cursor))
        self.data_frame = df
        


# Example usage:
# Initialize UniconPytorch
source1=""
model = UniconPytorch(train_test_split_percentage=0.8, batch_size=128)
@app.get("/load_from_mongo/")
async def load_from_mongo_handler(source: str = Query(...)):
    from fastapi.responses import JSONResponse
    model.load_from_mongo("mongodb+srv://username:too_weak@cluster0.vtie42d.mongodb.net/", "test", "datas", source=source)
    source1=source
    #print(source1)
    #return JSONResponse({"source": f"{source1}"})

    model.train_model_horizons()
    
    
    predictions, metrics = model.predict(model.forecasting_horizon_values[0])
    prediction, metric = model.predict(model.forecasting_horizon_values[1])
    pred, metr = model.predict(model.forecasting_horizon_values[2])
    model.save_model("./Prediction_models",source=source1)
    
    
    import requests 

    url = "http://localhost:8000/receive-model"
    
    
    # Define the filepath of the saved model
    filename = f"trained_model_{source1}.pth"
    filepath = os.path.join("./Prediction_models", filename)

    # Open the model file
    with open(filepath, "rb") as file:
        # Send a POST request to the specified URL with the model file
        print(file)
        response = requests.post(url, files={"silem": file})

    # Check the response
    if response.status_code == 200:
        print("Model sent successfully to inference service.")
    else:
        print("Failed to send model to inference service.")
    


if __name__ == "__main__":
    import uvicorn

    # Define the host and port for the FastAPI application to listen on
    host = "0.0.0.0"  # Listen on all network interfaces
    port = 8001  # Choose any available port you prefer

    # Start the FastAPI application using Uvicorn ASGI server
    uvicorn.run(app, host=host, port=port)
