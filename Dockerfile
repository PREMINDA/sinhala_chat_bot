#stage 1
FROM node:alpine as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
CMD [ "npm", "start" ]  

