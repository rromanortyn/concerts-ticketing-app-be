FROM postgres:18

RUN apt-get update && apt-get install -y \
    postgis postgresql-18-postgis-3 postgresql-18-postgis-3-scripts \
    && rm -rf /var/lib/apt/lists/*
