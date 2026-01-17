FROM node:24

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

RUN apt-get update && apt-get install -y dos2unix
COPY docker/scripts/wait-for-it.sh /usr/local/bin/wait-for-it.sh
RUN dos2unix /usr/local/bin/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh

COPY docker/server/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN dos2unix /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh
