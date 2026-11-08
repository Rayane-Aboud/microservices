# Edge-to-cloud smart metering

This is the platform I built during my end-of-studies internship at Namla, a company working on edge
cloud. IoT meters measure gas, water and electricity consumption. The data is collected at the edge,
forecasting models are trained in the cloud, and the trained models are sent back to run at the edge.

This work led to a paper that I co-authored:
[Edge AI System for Optimizing Energy Consumption for Smart Buildings](https://www.researchgate.net/publication/392071334_Edge_AI_system_for_optimizing_energy_consumption_for_smart_buildings), MedCCAI 2025.

![Data pipeline](data%20pipeline.png)

## How the data flows

1. The meters publish their readings over MQTT (Mosquitto). The transport service takes them and puts
   them into Kafka.
2. The data acquisition service reads from Kafka and stores the time series in a local InfluxDB at the
   edge. The dashboard reads from there directly.
3. The data transmission service encrypts the data and sends it to the cloud over NATS. On the cloud
   side, another service decrypts it and stores it.
4. In the cloud, the training service compares several forecasting models (Prophet and recurrent
   networks in PyTorch) and keeps track of the runs and model versions with MLflow.
5. The best model is deployed to the inference service at the edge, so forecasts are made next to the
   data instead of sending everything to the cloud.
6. Around this, there is an alert service that watches the readings, a device management service that
   keeps the list of meters (MongoDB), and a small proxy that creates a Grafana dashboard for each device.

## The services

| Service | What it does | Built with |
|---|---|---|
| `data-transport-service` | moves readings from MQTT to Kafka | NestJS (TypeScript) |
| `data-aquisition-service` | stores readings from Kafka in the edge InfluxDB | NestJS |
| `data-transmission-service` | sends encrypted data from the edge to the cloud over NATS | NestJS |
| `data-aquisition-cloud-service` | receives and decrypts the data in the cloud | NestJS |
| `device-management-service` | keeps the list of meters | NestJS, MongoDB |
| `training_service` | trains and compares the models | Python, PyTorch, Prophet, MLflow |
| `inference-service` | makes forecasts at the edge | Python, FastAPI, PyTorch |
| `alert-service` | sends consumption alerts | Python, FastAPI |
| `proxy` | creates a Grafana dashboard per device | Python, FastAPI |
| `smart-metering-front-end-ts` | the user dashboard | React, TypeScript |
| `_containers/`, `mqtt/` | setups for Kafka, MQTT, NATS and InfluxDB, and a script that simulates meters | Docker Compose, shell |

## Running it

```bash
docker compose up -d                        # starts the brokers, databases, Grafana, MLflow and the services
./_data-generators/publish_sensor_data.sh   # simulates meters sending readings
```

## Results

We compared this edge-to-cloud design with a version where everything runs in the cloud. Latency went
down by 68%, and the amount of data sent to the cloud went down by 90%. The best forecasting model, an
LSTM, reached an R² between 0.93 and 0.99 depending on the meter.
