import numpy as np
import pandas as pd
import torch
import torch.nn as nn
from sklearn.preprocessing import MinMaxScaler

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
    def __init__(self, previous_data):
        self.previous_data = previous_data
        self.lookback_values = [2*4, 24*4, 24*7*4]
        self.forecasting_horizon_values = [2*4, 24*4, 24*7*4]
        self.lookback = None
        self.forecasting_horizon = None
        self.X = None
        self.y = None
        self.prepared_data = None
        self.model = None
        self.preprocessed_dataframe = None
        self.min = None
        self.max = None
        self.scaler = MinMaxScaler(feature_range=(0, 1))
        self.predictions = {}

    def get_indices(self, datatype, forecast_horizon):
        if datatype == "GAS":
            if forecast_horizon <= 2:
                return 0, 2
            elif forecast_horizon <= 24:
                return 1, 24
            else:
                return 2, 7*24
        else:
            if forecast_horizon <= 8:
                return 0, 8
            elif forecast_horizon <= 96:
                return 1, 96
            else:
                return 2, 7*24*4

    def prepare_data(self):
        data_array = np.array(self.previous_data)
        consumption_values = data_array[:, 1].astype(float)
        df = pd.DataFrame({'consumption': consumption_values})
        relevant_columns = ['consumption']
        df = df[relevant_columns]
        shifted_columns = [df['consumption'].shift(self.lookback + 1 - i) for i in range(1, self.lookback + 1)]
        df_shifted = pd.concat(shifted_columns, axis=1)
        df_shifted.columns = [f'consumption(t-{self.lookback + 1 - i})' for i in range(1, self.lookback + 1)]
        df = pd.concat([df, df_shifted], axis=1)
        df.dropna(inplace=True)
        self.prepared_data = df.to_numpy()

    def scale_data(self):
        self.preprocessed_dataframe = self.scaler.fit_transform(self.prepared_data)
        self.min = self.scaler.data_min_[0]
        self.max = self.scaler.data_max_[0]

    def create_X_y(self):
        self.X = self.preprocessed_dataframe[:, 1:]
        self.y = self.preprocessed_dataframe[:, 0]

    def set_lookback(self, lookback_index):
        self.lookback = self.lookback_values[lookback_index]

    def set_forecasting_horizon(self, horizon_index):
        self.forecasting_horizon = self.forecasting_horizon_values[horizon_index]

    def inverse_scale_y(self, look_ahead):
        min_value = self.scaler.data_min_[0]
        max_value = self.scaler.data_max_[0]
        scaled_y = self.predictions[look_ahead].reshape(-1, 1)
        y = scaled_y * (max_value - min_value) + min_value
        return y

    def load_model(self, model):
        self.model = model

    def perform_inference(self, lookback_index, horizon_index):
        if not self.model:
            print('No model loaded')
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
