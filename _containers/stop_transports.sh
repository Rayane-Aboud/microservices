#!/bin/bash

# Stop all containers
docker-compose -f influx-db/docker-compose.yml down
docker-compose -f kafka/zk-single-kafka-single.yml down
docker-compose -f mqtt/docker-compose.yml down
docker-compose -f nats/docker-compose.yml down

echo "All containers stopped successfully."
