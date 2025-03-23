const express = require('express');
const { processCallRequest } = require('../services/callService');
const bot = require('../bot/bot');
const { callAdminId } = require('../utils/config');

const router = express.Router();

router.post('/', async (req, res) => {
    const { name, phone } = req.body;

    if (!name || !phone) {
        return res.status(400).json({ error: 'Не указаны name или phone' });
    }

    try {
        await processCallRequest(name, phone, bot, callAdminId);
        res.json({ success: true, data: { name, phone } });
    } catch (err) {
        console.error('Ошибка при обработке запроса на звонок:', err);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

module.exports = router;