FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY ./dist ./
COPY ./swagger.json ./swagger.json

EXPOSE 3000

CMD ["node", "index.js"]
