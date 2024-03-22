FROM node:20-alpine

WORKDIR /app/backend

COPY package*.json ./

COPY . .

RUN npm install

RUN npx prisma generate

EXPOSE 3001

CMD [ "npm", "run", "start:dev" ]