# osm-api
A simple API to query given a set of GPS coordinates. This repo contains
- A **PostGIS** container (with `osm2pgsql` installed).
- A NodeJS service to get closest GPS points and return OSM `maxspeed` if it exists

## Installation
- Clone the repository with
```
git clone https://github.com/amitrayblr/osm-api.git
```
- Switch to repository directory

## Download & Add Data File
- Create a data directory under db -> db/data
- Download data file from [GeoFabrik](https://download.geofabrik.de/)
- For testing I used the US West datafile (.osm.pbf) from [US West](https://download.geofabrik.de/north-america/us-west.html)
- Place the data file in db/data

## Setup Environtment
- Copy .env.example to .env within server/

## Build & Start Everything
- In the terminal to build the environtment
```
docker-compose up --build -d
```

- Import the data using
```
docker-compose exec db osm2pgsql --hstore --slim --cache 2048 --number-processes 4 -d osm_db -U osm_user /data/name_of_data_file.osm.pbf
```

- Hit the endpoint with
```
GET http://localhost:3000/maxspeed?lat=X.XXXX&lon=-X.XXXX
```