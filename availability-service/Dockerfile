FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

RUN npm run build

RUN npm prune --omit=dev

EXPOSE 3004

CMD ["node", "dist/main"]
