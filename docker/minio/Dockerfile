FROM ubuntu:resolute-20260404 AS builder
RUN apt-get update && apt-get install -y dos2unix

FROM quay.io/minio/minio:RELEASE.2025-09-07T16-13-09Z.hotfix.7aa24e772

COPY --from=builder /usr/bin/dos2unix /usr/bin/dos2unix

COPY docker/scripts/wait-for-it.sh /usr/local/bin/wait-for-it.sh
RUN dos2unix /usr/local/bin/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh

COPY docker/minio/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN dos2unix /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh
