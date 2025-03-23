const express = require('express');
const path = require('path');
const cors = require('cors');
const { initDb } = require('./services/dbService');
const clickRoutes = require('./routes/clickRoutes');
const callRoutes = require('./routes/callRoutes');
const errorHandler = require('./middleware/errorHandler');
const { port } = require('./utils/config');
require('./bot/bot'); // Инициализация бота

const app = express();

// Настройка CORS
app.use(cors({
    origin: 'http://localhost:3000', // Разрешаем запросы с фронтенда (на том же порту)
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

// Раздача статических файлов из папки dist
app.use(express.static(path.join(__dirname, '../../dist')));

// Маршруты API
app.use('/api/click', clickRoutes);
app.use('/api/call', callRoutes);

// Все остальные запросы направляем на index.html (для поддержки SPA)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../dist', 'index.html'));
});

// Инициализация базы данных
(async () => {
    await initDb();

    // Обработка ошибок
    app.use(errorHandler);

    // Запуск сервера
    app.listen(port, () => {
        console.log(`Сервер запущен на порту ${port}`);
    });
})();