#!/bin/sh
set -e

/usr/bin/minio server --console-address :9001 /data &

wait-for-it.sh "$MINIO_HOST_INNER:$MINIO_PORT_INNER"

/usr/bin/mc alias set docker-minio "http://$MINIO_HOST_INNER:$MINIO_PORT_INNER" $MINIO_ROOT_USER $MINIO_ROOT_PASSWORD
/usr/bin/mc mb docker-minio/$MINIO_BUCKET_NAME

wait
