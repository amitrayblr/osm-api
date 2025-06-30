#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
  CREATE EXTENSION IF NOT EXISTS postgis;
  CREATE EXTENSION IF NOT EXISTS hstore;
  -- Index for fast snapping
  CREATE INDEX IF NOT EXISTS idx_planet_osm_line_geom
    ON planet_osm_line USING GIST (way);
  CREATE INDEX IF NOT EXISTS idx_planet_osm_line_maxspeed
    ON planet_osm_line ((tags->'maxspeed'));
EOSQL
