const express = require('express');
const { addClick } = require('../services/dbService');
const bot = require('../bot/bot');
const { statsAdminId } = require('../utils/config');

const router = express.Router();

router.post('/', async (req, res) => {
    const { link, userId } = req.body;

    if (!link || !userId) {
        return res.status(400).json({ error: 'Не указаны link или userId' });
    }

    try {
        await addClick(link);
        const totalClicks = await pool.query(
            'SELECT COUNT(*) AS total FROM clicks WHERE link = $1',
            [link]
        );
        const totalCount = totalClicks.rows[0].total;

        await bot.telegram.sendMessage(statsAdminId, `Клик по ссылке "${link}": всего ${totalCount} раз`);
        res.json({ success: true, data: { link, total_count: totalCount } });
    } catch (err) {
        console.error('Ошибка при обработке клика:', err);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

module.exports = router;