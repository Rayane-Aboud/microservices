import influxdb_client
from influxdb_client.client.write_api import SYNCHRONOUS
import time

url = 'http://influxdb:8086'
token = '4eYvsu8wZCJ6tKuE2sxvFHkvYFwSMVK0011hEEiojvejzpSaij86vYQomN_12au6eK-2MZ6Knr-Sax201y70w=='
org = 'Namla'
client = influxdb_client.InfluxDBClient(url=url, token=token, org=org)
query_api = client.query_api()
write_api = client.write_api(write_options=SYNCHRONOUS)

def query_builder(dataType, serialNumber):
    query = f'''
        from(bucket: "namla-smart-metering")
        |> range(start: -1h)
        |> filter(fn: (r) => r["_measurement"] == "sensor_data")
        |> filter(fn: (r) => r["dataType"] == "{dataType}")
        |> filter(fn: (r) => r["serialNumber"] == "{serialNumber}")
        |> filter(fn: (r) => r["_field"] == "value")
        |> yield(name: "last")
    '''
    return query

def write_to_influx(predictions, serialnumber, datatype):
    for p in predictions:
        point = influxdb_client.Point('sensor_data') \
            .tag('serialNumber', serialnumber + "pred") \
            .tag('dateType', 'DATE') \
            .tag('dataType', datatype) \
            .tag('dataUnit', 'METER') \
            .field('value', float(p[0])) \
            .time(time.time_ns() + 3600000000000)
        write_api.write(bucket='namla-smart-metering', org='Namla', record=point)
