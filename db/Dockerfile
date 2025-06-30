FROM postgis/postgis

# Install the OSM loader
RUN apt-get update \
 && apt-get install -y osm2pgsql \
 && rm -rf /var/lib/apt/lists/*

