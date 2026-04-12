#!/bin/sh
set -e

/usr/bin/minio server --console-address :9001 /data &

wait-for-it.sh "$MINIO_HOST_INNER:$MINIO_PORT_INNER"

/usr/bin/mc alias set docker-minio "http://$MINIO_HOST_INNER:$MINIO_PORT_INNER" $MINIO_ROOT_USER $MINIO_ROOT_PASSWORD

if /usr/bin/mc ls docker-minio/$MINIO_BUCKET_NAME > /dev/null 2>&1; then
  echo "Bucket $MINIO_BUCKET_NAME already exists"
else
  echo "Bucket $MINIO_BUCKET_NAME does not exist, creating..."
  /usr/bin/mc mb docker-minio/$MINIO_BUCKET_NAME
fi

wait
