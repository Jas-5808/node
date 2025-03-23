const express = require('express');
const { pool, initDb } = require('./db');
const { bot, CALL_ADMIN_ID } = require('./bot');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

(async () => {
    await initDb();

    // Обработка кликов (для статистики)
    app.post('/api/click', async (req, res) => {
        const { link, userId } = req.body;

        if (!link || !userId) {
            return res.status(400).json({ error: 'Не указаны link или userId' });
        }

        try {
            await pool.query(
                'INSERT INTO clicks (link) VALUES ($1)',
                [link]
            );

            const totalClicks = await pool.query(
                'SELECT COUNT(*) AS total FROM clicks WHERE link = $1',
                [link]
            );
            const totalCount = totalClicks.rows[0].total;

            await bot.telegram.sendMessage(process.env.USER_ID, `Клик по ссылке "${link}": всего ${totalCount} раз`);
            res.json({ success: true, data: { link, total_count: totalCount } });
        } catch (err) {
            console.error('Ошибка при обработке клика:', err);
            res.status(500).json({ error: 'Ошибка сервера' });
        }
    });

    // Обработка запросов на звонки
    app.post('/api/call', async (req, res) => {
        const { name, phone } = req.body;

        if (!name || !phone) {
            return res.status(400).json({ error: 'Не указаны name или phone' });
        }

        try {
            // Сохраняем запрос в базу данных
            await pool.query(
                'INSERT INTO call_requests (name, phone) VALUES ($1, $2)',
                [name, phone]
            );
            // Отправляем запрос администратору звонков
            await bot.telegram.sendMessage(
                CALL_ADMIN_ID,
                `Новый запрос на звонок:\nИмя: ${name}\nТелефон: ${phone}`
            );
            res.json({ success: true, data: { name, phone } });
        } catch (err) {
            console.error('Ошибка при обработке запроса на звонок:', err);
            res.status(500).json({ error: 'Ошибка сервера' });
        }
    });

    app.listen(PORT, () => {
        console.log(`Сервер запущен на порту ${PORT}`);
    });
})();