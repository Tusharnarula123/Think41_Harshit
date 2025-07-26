
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
COPY data/ ./data/
RUN npm run build
EXPOSE 8000
CMD ["npm", "run", "start:prod"]
