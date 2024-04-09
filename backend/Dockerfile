FROM node:lts-buster

WORKDIR /app/backend

COPY package*.json ./

COPY . .

RUN npm install

RUN npx prisma generate

RUN wget -O /usr/wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh \
    && chmod +x /usr/wait-for-it.sh

RUN apk --no-cache add bash

EXPOSE 3001