from fastapi import FastAPI, HTTPException
from influxdb_client import InfluxDBClient
from influxdb_client.client.query_api import QueryApi
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import os
from pymongo import MongoClient

app = FastAPI()

# Define environment variables or configure them directly
INFLUXDB_URL = "http://172.31.0.7:8086"#os.getenv("INFLUXDB_URL")
INFLUXDB_TOKEN = "4eYvsu8wZCJ6tKuE2sxvFHkvYFwSMVK0011hEEiojvejzpSaij86vYQomN_12au6eK-2MZ6Knr-Sax201y70w==" #os.getenv("INFLUXDB_TOKEN")
INFLUXDB_ORG = "Namla"#os.getenv("INFLUXDB_ORG")
INFLUXDB_BUCKET = "namla-smart-metering"#os.getenv("INFLUXDB_BUCKET")

# Create an InfluxDB client
client = InfluxDBClient(url=INFLUXDB_URL, token=INFLUXDB_TOKEN, org=INFLUXDB_ORG)
query_api = client.query_api()

def query_builder(dataType,serialNumber):
    query = '''
        from(bucket: "namla-smart-metering")
        |> range(start: -1h)
        |> filter(fn: (r) => r["_measurement"] == "sensor_data")
    '''
    query +=    f'\t|> filter(fn: (r) => r["dataType"] == "{dataType}")\n'
    query +=    f'\t\t|> filter(fn: (r) => r["serialNumber"] == "{serialNumber}")\n'
    query +=    f'\t\t|> filter(fn: (r) => r["_field"] == "value")\n'
    query +=    '\t\t|> yield(name: "last")\n'
    
    return query



class Device(BaseModel):
    serialNumber: str
    dataType: str
    codeSnippet:str

def serialize_document(doc):
    """Convert MongoDB document to a JSON-serializable format with only serialNumber and dataType."""
    return {
        "serialNumber": doc.get("serialNumber"),
        "dataType": doc.get("dataUnit")
    }

def iot_forcaster():
    client = MongoClient("mongodb://admin:password@172.31.0.6:27017/")  
    db = client["test"]
    collection = db["devices"]
    # Retrieve all documents from the collection
    all_documents = collection.find()
    arr_doc = [serialize_document(doc) for doc in all_documents]
    # Close the MongoDB connection
    client.close()
    return arr_doc



criterion_code = """
def criterion(deviation_mean):
    if deviation_mean > 0.5:
        return "excess in consumption"
    else:
        return "everything is ok"

result = criterion(deviation_mean)
"""

@app.get("/")
async def check_deviation():

    iot_devices=iot_forcaster()
    for iot_device in iot_devices:
        print("this is the data type :",iot_device["dataType"])
        result = query_builder(dataType=iot_device["dataType"], serialNumber=iot_device["serialNumber"])
        query_real_results = []

        real_result = query_api.query(org=INFLUXDB_ORG, query=query_builder(dataType=iot_device["dataType"], serialNumber=iot_device["serialNumber"]))
        for table in real_result:
            for record in table.records:
                query_real_results.append((record.get_field(), record.get_value()))
        
        response_content = {"query_results": query_real_results}

        
        
        query_predicted_results = []
        predicted_result = query_api.query(org=INFLUXDB_ORG, query=query_builder(dataType=iot_device["dataType"], serialNumber=iot_device["serialNumber"]+"_pred"))
        for table in predicted_result:
            for record in table.records:
                query_predicted_results.append((record.get_field(), record.get_value()))
        
        #print(query_builder(dataType=iot_device["dataType"], serialNumber=iot_device["serialNumber"]+"_pred"))
        
        real_value = [item[1] for item in list(query_real_results)]
        predicted_value=[item[1] for item in list(query_predicted_results)]

        if predicted_value:
            mean_predicted = sum(predicted_value) / len(predicted_value)
        else:
            mean_predicted = 0
        
        while len(predicted_value) < len(real_value):
            predicted_value.append(mean_predicted)

        print(predicted_value)
        deviation = [abs(rv - pv) / (pv+0.01) for rv, pv in zip(real_value, predicted_value)]
        deviation_mean = sum(deviation) / len(deviation)

        local_vars = {'deviation_mean': deviation_mean}
        exec(criterion_code, {}, local_vars)
        criterion_result = local_vars['result']


        return JSONResponse(content={"deviation_mean": deviation_mean, "criterion_result": criterion_result})
        """


        real_value = list(query_real_results)[0].records[0].get_value()
        predicted_value = list(query_predicted_results)[0].records[0].get_value()

        

        return JSONResponse(content={"deviation":deviation})
    """
"""
    real_query = query_builder()
    predicted_query = query_builder()

    try:
        real_result = query_api.query(org=INFLUXDB_ORG, query=real_query)
        predicted_result = query_api.query(org=INFLUXDB_ORG, query=predicted_query)
        
        if not real_result or not predicted_result:
            raise HTTPException(status_code=404, detail="Data not found")

        real_value = list(real_result)[0].records[0].get_value()
        predicted_value = list(predicted_result)[0].records[0].get_value()

        deviation = abs(real_value - predicted_value) / predicted_value


        return
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    """

if __name__ == "__main__":
    import uvicorn
    # Define the host and port for the FastAPI application to listen on
    host = "0.0.0.0"  # Listen on all network interfaces
    port = 53221  # Choose any available port you prefer

    # Start the FastAPI application using Uvicorn ASGI server
    uvicorn.run(app, host=host, port=port)