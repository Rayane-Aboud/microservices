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


while true; do
    while IFS=, read -r consumption; do
    #"'"$meter_id"'",
    payload='{
            "serialNumber": "wJBDi4h8",
            "dataType":"NMI",
            "dataUnit": "None",
            "value": '"$consumption"'
        }'
        
        # Publish payload to MQTT broker
        publish_payload "$payload"
        sleep 2

    done < <(tail -n +2 "simulation_files/nmi/wJBDi4h8_NMI.csv")  # Skip the header line

done