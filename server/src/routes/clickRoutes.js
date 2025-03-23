const express = require('express');
const { body, validationResult } = require('express-validator');
const { addClick, getTotalClicks } = require('../services/dbService');
const bot = require('../bot/bot');
const { statsAdminId } = require('../utils/config');
const logger = require('../utils/logger');

const router = express.Router();

router.post(
    '/',
    [
        body('link').notEmpty().withMessage('Поле link обязательно'),
    ],
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            logger.warn('Ошибка валидации в /api/click', { errors: errors.array() });
            return res.status(400).json({ errors: errors.array() });
        }
        const {link} = req.body;

        try {
            await addClick(link);
            const totalCount = await getTotalClicks(link);
            logger.info(`Клик обработан: link=${link}, totalCount=${totalCount}`);
            res.json({ success: true, data: { link, total_count: totalCount } });
        } catch (err) {
            next(err);
        }
    }
);

module.exports = router;