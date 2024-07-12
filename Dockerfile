FROM node:20-slim

WORKDIR /app

COPY package.json package-lock.json  /app/

RUN npm ci --silent

COPY . .

CMD npm run start
