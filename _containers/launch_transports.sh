#!/bin/bash

# Start containers
docker-compose -f influx-db/docker-compose.yml up -d
docker-compose -f kafka/zk-single-kafka-single.yml up -d
docker-compose -f mqtt/docker-compose.yml up -d
docker-compose -f nats/docker-compose.yml up -d



echo "All containers started successfully."
