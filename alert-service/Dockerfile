FROM python:3.9-slim

WORKDIR /app

COPY . .
#--no-cache-dir
RUN pip install   -r requirements.txt

# Define environment variables
#ENV INFLUXDB_URL=http://localhost:8086
#ENV INFLUXDB_TOKEN=4eYvsu8wZCJ6tKuE2sxvFHkvYFwSMVK0011hEEiojvejzpSaij86vYQomN_12au6eK-2MZ6Knr-Sax201y70w==
#ENV INFLUXDB_ORG=Namla
#ENV INFLUXDB_BUCKET=namla-smart-metering

EXPOSE 53221

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8003"]