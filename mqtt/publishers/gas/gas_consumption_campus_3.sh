#!/bin/bash

MQTT_BROKER="mqtt-broker" # mqtt-broker
MQTT_PORT=1883
MQTT_TOPIC="SENSOR_DATA_TOPIC_MQTT"

publish_payload() {
    echo $payload
    local payload="$1"
    while true; do
        mosquitto_pub -h "$MQTT_BROKER" -p "$MQTT_PORT" -t "$MQTT_TOPIC" -m "$payload" && break
        echo "Failed to publish payload, retrying..."
        sleep 1
    done
}



while IFS=, read -r timestamp campus_id consumption; do

    payload='{
        "serialNumber": "'"$campus_id"'",
        "location": {
            "latitude": "2",
            "longitude": "2"
        },
        "date": "'"$timestamp"'",
        "dateType": "DATE_TIME",
        "dataType": "GAS",
        "dataUnit": "CUBIC_METERS",
        "value": '"$consumption"'
    }'
    
    # Publish payload to MQTT broker
    publish_payload "$payload"
    sleep 2

done < <(tail -n +2 "simulation_files/gas/gas_consumption_campus_3.csv")  # Skip the header line

