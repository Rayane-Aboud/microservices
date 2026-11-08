# Edge-to-cloud smart metering

**IoT energy data (gas, water, electricity) collected at the edge, forecast by models trained in the cloud and
deployed back to the edge.** Built during my end-of-studies internship at Namla, an edge cloud platform.
The work led to a paper:
[Edge AI System for Optimizing Energy Consumption for Smart Buildings](https://www.researchgate.net/publication/392071334_Edge_AI_system_for_optimizing_energy_consumption_for_smart_buildings), MedCCAI 2025.

![Data pipeline](data%20pipeline.png)

## Data flow

1. **Sensors → edge**: meters publish readings over **MQTT** (Mosquitto). The *transport service* bridges them
   into **Kafka**.
2. **Edge storage**: the *data acquisition service* consumes the Kafka topic and writes the time series to a local
   **InfluxDB**, which the dashboard reads directly.
3. **Edge → cloud**: the *data transmission service* encrypts the data and sends it over **NATS** to the cloud,
   where the *cloud acquisition service* decrypts and stores it.
4. **Training (cloud)**: the *training service* compares forecasting models (Prophet and PyTorch recurrent
   networks) and tracks runs and model versions in **MLflow**.
5. **Inference (edge)**: the chosen model is deployed to the *inference service*, which forecasts consumption
   next to the data instead of sending everything to the cloud.
6. **Operations**: an *alert service* watches the readings, a *device management service* registers meters
   (MongoDB), and a *proxy* creates a **Grafana** dashboard per device.

## Services

| Service | Role | Stack |
|---|---|---|
| `data-transport-service` | MQTT → Kafka bridge | NestJS (TypeScript) |
| `data-aquisition-service` | Kafka → edge InfluxDB | NestJS |
| `data-transmission-service` | edge → cloud, encrypted, over NATS | NestJS |
| `data-aquisition-cloud-service` | receives and decrypts in the cloud | NestJS |
| `device-management-service` | meter registry | NestJS, MongoDB |
| `training_service` | model training and comparison | Python, PyTorch, Prophet, MLflow |
| `inference-service` | forecasts at the edge | Python, FastAPI, PyTorch |
| `alert-service` | consumption alerts | Python, FastAPI |
| `proxy` | Grafana dashboard per device | Python, FastAPI |
| `smart-metering-front-end-ts` | user dashboard | React, TypeScript |
| `_containers/`, `mqtt/` | Kafka, MQTT, NATS, InfluxDB setups and a sensor data simulator | Docker Compose, shell |

## Run it

```bash
docker compose up -d                        # brokers, databases, Grafana, MLflow and the services
./_data-generators/publish_sensor_data.sh   # simulate meters publishing readings
```

## Results

Compared with a fully centralised cloud design, the edge-to-cloud architecture cut latency by **68%** and the
data sent to the cloud by **90%**. The best forecasting model (LSTM) reached an R² of 0.93 to 0.99 depending on
the meter.
