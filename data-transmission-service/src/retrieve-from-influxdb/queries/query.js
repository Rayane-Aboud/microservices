const fluxQuery = `from(bucket: "${bucketName}")
                  |> range(start: ${startTime})
                  |> filter(fn: (r) => r._measurement == "temperature")`;


export default fluxQuery;