FROM node:12.22.5

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .