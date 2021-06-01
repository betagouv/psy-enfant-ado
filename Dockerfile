FROM node:lts

WORKDIR /app

RUN chown node:node /app

COPY . .

RUN npm install

USER node

EXPOSE 8080
CMD ["node", "index.js"]