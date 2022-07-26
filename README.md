# Performance Testing with K6

> Load testing workshop, demonstrating k6

## Getting started:
- `docker-compose up -d influxdb grafana`
- Load http://localhost:3000, and import the `grafana_dashboard.json` config to a new dashboard.
- `docker-compose run k6 run /tests/01-simple/test.js`
## To use CLI BD influxdb
- docker run -d --name influxdb -p 8086:8086 -e INFLUXDB_ADMIN_USER=admin -e INFLUXDB_ADMIN_PASSWORD=admin123 -v influxdbdata:/var/lib/influxdb influxdb:1.8
### to see the container running 
- docker ps
### to enter into the container BD
- docker exec -it influxdb bash `(container name in this case is influxdb)`
- influx `to enter to the DB`
- show databases; `to see all the databases`
- curl localhost:8086 `to see if it's up`
## To use cloud run

- Create an account with LoadImpact here to use the cloud run: [https://app.loadimpact.com/account/login](https://app.loadimpact.com/account/login)
- Replace `LI_TOKEN` in the `Dockerfile` with your account token.
- `docker-compose run k6 cloud /tests/01-simple/test.js` to run the test in the cloud