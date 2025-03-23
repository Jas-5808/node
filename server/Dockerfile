FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY src ./src

COPY client/package*.json ./client/
RUN cd client && npm install
COPY client ./client
RUN cd client && npm run build

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]