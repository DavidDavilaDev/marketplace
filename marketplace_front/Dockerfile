# Dockerfile

FROM node:20-alpine
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps
COPY src/ ./src
COPY public/ ./public
EXPOSE 3000 
CMD [ "npm", "start"]