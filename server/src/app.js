const express = require('express');
const { initDb } = require('./services/dbService');
const clickRoutes = require('./routes/clickRoutes');
const callRoutes = require('./routes/callRoutes');
const { port } = require('./utils/config');
require('./bot/bot'); // Инициализация бота

const app = express();

app.use(express.json());

// Инициализация базы данных
(async () => {
    await initDb();

    // Маршруты
    app.use('/api/click', clickRoutes);
    app.use('/api/call', callRoutes);

    // Запуск сервера
    app.listen(port, () => {
        console.log(`Сервер запущен на порту ${port}`);
    });
})();