FROM node:18-alpine

LABEL authors="pratik"

EXPOSE 80/tcp

COPY package.json package.json

RUN npm install -g npm@10.5.0

RUN npm install

COPY . .

RUN npm run build

ENTRYPOINT ["npm", "start", "--", "-p", "80"]