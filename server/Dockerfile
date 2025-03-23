FROM node:18

WORKDIR /app

# Установка зависимостей для бэкенда
COPY package*.json ./
RUN npm install

# Копируем исходный код бэкенда и папку dist
COPY src ./src
COPY dist ./dist

EXPOSE 3000

CMD ["npm", "run", "start"]