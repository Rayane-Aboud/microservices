import requests

def create_or_update_dashboard(device_id):
    

    query = f"""
        from(bucket: "namla-smart-metering")
        |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
        |> filter(fn: (r) => r["_measurement"] == "sensor_data")
        |> filter(fn: (r) => r["serialNumber"] == "{device_id}" or r["serialNumber"] == "{device_id}_pred")
        |> filter(fn: (r) => r["_field"] == "value")
        |> aggregateWindow(every: v.windowPeriod, fn: mean, createEmpty: false)
        |> yield(name: "mean")
    """
    print(device_id)
    dashboard_data = {
        "dashboard": {
            "uid": "tu95axESz",
            "title": "Namla Dashboard",
            "tags": [],
            "timezone": "",
            "schemaVersion": 35,
            "version": 1,
            "refresh": "",
            "style": "dark",
            "panels": [
                {
                    "id": 2,
                    "gridPos": {"h": 9, "w": 12, "x": 0, "y": 0},
                    "type": "timeseries",
                    "title": "Panel Title",
                    "fieldConfig": {
                        "defaults": {
                            "color": {"mode": "palette-classic"},
                            "custom": {
                                "axisLabel": "",
                                "axisPlacement": "auto",
                                "barAlignment": 0,
                                "drawStyle": "line",
                                "fillOpacity": 0,
                                "gradientMode": "none",
                                "hideFrom": {"legend": False, "tooltip": False, "viz": False},
                                "lineInterpolation": "linear",
                                "lineWidth": 1,
                                "pointSize": 5,
                                "scaleDistribution": {"type": "linear"},
                                "showPoints": "auto",
                                "spanNulls": False,
                                "stacking": {"group": "A", "mode": "none"},
                                "thresholdsStyle": {"mode": "off"}
                            },
                            "thresholds": {
                                "mode": "absolute",
                                "steps": [{"color": "green"}, {"color": "red", "value": 80}]
                            }
                        },
                        "overrides": []
                    },
                    "options": {"legend": {"calcs": [], "displayMode": "list", "placement": "bottom"}, "tooltip": {"mode": "single", "sort": "none"}},
                    "targets": [
                        {
                            "datasource": {"type": "influxdb", "uid": "Q9iz3vESk"},
                            "query": query,
                            "refId": "A"
                        }
                    ]
                }
            ],
            "time": {"from": "now-6h", "to": "now"},
            "annotations": {
                "list": [
                    {
                        "builtIn": 1,
                        "datasource": "-- Grafana --",
                        "enable": True,
                        "hide": True,
                        "iconColor": "rgba(0, 211, 255, 1)",
                        "name": "Annotations & Alerts",
                        "type": "dashboard",
                        "target": {"limit": 100, "matchAny": False, "tags": [], "type": "dashboard"}
                    }
                ]
            },
            "editable": True
        },
        "folderId": 0,
        "overwrite": True
    }

    url = 'http://grafana:3000/api/dashboards/db'
    headers = {'Content-Type': 'application/json'}

    try:
        response = requests.post(url, json=dashboard_data, headers=headers)
        response.raise_for_status()  # Raise an exception for HTTP errors
        print('Dashboard creation/update successful:', response.json())
        return {'success': True}
    except requests.exceptions.RequestException as e:
        print('Error creating/updating dashboard:', e)
        raise

# Example usage
#create_or_update_dashboard("your_device_id_here")
