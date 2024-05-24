import axios from 'axios';



const axiosInstance = axios.create({
    baseURL:'http://localhost:3000'
});


export const createOrUpdateDevice = async () => {
    //query: string
    try {
      const response = await axiosInstance.post('/api/dashboards/db', 
        {
            "dashboard": {
            "id": null,
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
                "gridPos": {
                    "h": 9,
                    "w": 12,
                    "x": 0,
                    "y": 0
                },
                "type": "timeseries",
                "title": "Panel Title",
                "fieldConfig": {
                    "defaults": {
                    "color": {
                        "mode": "palette-classic"
                    },
                    "custom": {
                        "axisLabel": "",
                        "axisPlacement": "auto",
                        "barAlignment": 0,
                        "drawStyle": "line",
                        "fillOpacity": 0,
                        "gradientMode": "none",
                        "hideFrom": {
                        "legend": false,
                        "tooltip": false,
                        "viz": false
                        },
                        "lineInterpolation": "linear",
                        "lineWidth": 1,
                        "pointSize": 5,
                        "scaleDistribution": {
                        "type": "linear"
                        },
                        "showPoints": "auto",
                        "spanNulls": false,
                        "stacking": {
                        "group": "A",
                        "mode": "none"
                        },
                        "thresholdsStyle": {
                        "mode": "off"
                        }
                    },
                    "thresholds": {
                        "mode": "absolute",
                        "steps": [
                        {
                            "color": "green"
                        },
                        {
                            "color": "red",
                            "value": 80
                        }
                        ]
                    }
                    },
                    "overrides": []
                },
                "options": {
                    "legend": {
                    "calcs": [],
                    "displayMode": "list",
                    "placement": "bottom"
                    },
                    "tooltip": {
                    "mode": "single",
                    "sort": "none"
                    }
                },
                "targets": [
                    {
                    "datasource": {
                        "type": "influxdb",
                        "uid": "Q9iz3vESk"
                    },
                    "query": "from(bucket: \"namla-smart-metering\")\n  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)\n  |> filter(fn: (r) => r[\"_measurement\"] == \"sensor_data\")\n  |> aggregateWindow(every: v.windowPeriod, fn: mean, createEmpty: false)\n  |> yield(name: \"mean\")",
                    "refId": "A"
                    }
                ]
                }
            ],
            "time": {
                "from": "now-6h",
                "to": "now"
            },
            "annotations": {
                "list": [
                {
                    "builtIn": 1,
                    "datasource": "-- Grafana --",
                    "enable": true,
                    "hide": true,
                    "iconColor": "rgba(0, 211, 255, 1)",
                    "name": "Annotations & Alerts",
                    "type": "dashboard",
                    "target": {
                    "limit": 100,
                    "matchAny": false,
                    "tags": [],
                    "type": "dashboard"
                    }
                }
                ]
            },
            "editable": true
            },
            "folderId": 0,
            "overwrite": true
        }
      );
      console.log("response is :",response.data)
      return response.data; // Return the created or updated device
    } catch (error) {
      console.error('Error in createOrUpdateDevice:', error);
      throw error; // Optionally, rethrow to be handled by the component
    }
  };