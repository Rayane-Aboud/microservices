#!/bin/bash

# Function to handle Ctrl+C
function ctrl_c() {
    echo "Stopping execution..."
    # Kill all child processes
    pkill -P $$  # Kills all child processes of the current script
    exit 1
}

# Trap SIGINT (Ctrl+C) and call ctrl_c function
trap ctrl_c SIGINT

# Loop through all .sh files in ./publishers/ and its subdirectories
for file in ./publishers/*/*.sh; do
    bash "$file" &
done

# Wait for all background processes to finish
wait
