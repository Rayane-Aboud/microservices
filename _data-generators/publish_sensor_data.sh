#!/bin/bash

MQTT_BROKER="localhost"
MQTT_PORT=1883
MQTT_TOPIC="SENSOR_DATA_TOPIC_MQTT"

while true; do
    # Generate random sensor data
    serial_number=$((1 + RANDOM % 5))
    latitude=$((RANDOM % 90))
    longitude=$((RANDOM % 90))
    date=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
    date_type="DATE_TIME"
    data_type="TEMPERATURE"
    data_unit="DEGREE_CELSIUS"
    value=$((RANDOM % 46))  # Random temperature value between 0 and 45

    # Create JSON payload using SensorDataDto
    payload='{
        "serialNumber": "'"$serial_number"'",
        "location": {
            "latitude": '"$latitude"',
            "longitude": '"$longitude"'
        },
        "date": "'"$date"'",
        "dateType": "'"$date_type"'",
        "dataType": "'"$data_type"'",
        "dataUnit": "'"$data_unit"'",
        "value": '"$value"'
    }'

    # Publish payload to MQTT broker with retry
    while true; do
        mosquitto_pub -h $MQTT_BROKER -p $MQTT_PORT -t $MQTT_TOPIC -m "$payload" && break
        sleep 1
    done

    # Sleep for 1 second
    sleep 1
done
