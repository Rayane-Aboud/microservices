FROM python:3.9-slim

WORKDIR /app

COPY . .
#--no-cache-dir
RUN pip install   -r requirements.txt

EXPOSE 8002

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8002"]