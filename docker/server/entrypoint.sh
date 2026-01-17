#!/bin/sh
set -e

wait-for-it.sh "$DATABASE_HOST:$DATABASE_PORT"
npm run typeorm:run-migrations

npm run start:prod
exec "$@"
