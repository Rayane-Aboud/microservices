# Use the official Python image as the base image
FROM python



# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container at /app
COPY requirements.txt /app/

# Install any dependencies specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the container at /app
COPY . /app/

# Expose port 8000 to the outside world
EXPOSE 53222

# Command to run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "53222"]
