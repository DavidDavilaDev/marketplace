FROM node:20-alpine

WORKDIR /opt/app

COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 4000

# Agrega un script para reiniciar la aplicación en caso de errores
CMD ["sh", "-c", "npm start || tail -f /dev/null"]