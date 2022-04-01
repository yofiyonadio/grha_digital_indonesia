FROM node:12.22.5

WORKDIR /appSSS

COPY package.json .

RUN npm install

COPY . .