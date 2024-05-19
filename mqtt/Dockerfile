# Use a lightweight base image
FROM alpine:latest

# Install required packages
RUN apk add --no-cache mosquitto-clients bash

# Set the working directory
WORKDIR /app

# Copy the script to the container
COPY publishers/ ./publishers/
COPY simulation_files/ ./simulation_files/
COPY mqtt_publisher.sh .

# Make the script executable
RUN chmod +x mqtt_publisher.sh
RUN chmod +x publishers/*/*.sh

# Command to run the script
CMD ["./mqtt_publisher.sh"]