const express = require('express');
const { body, validationResult } = require('express-validator');
const { processCallRequest } = require('../services/callService');
const bot = require('../bot/bot');
const { callAdminId } = require('../utils/config');
const logger = require('../utils/logger');

const router = express.Router();

router.post(
    '/',
    [
        body('name').notEmpty().withMessage('Поле name обязательно'),
        body('phone')
            .notEmpty()
            .withMessage('Поле phone обязательно')
            .matches(/^\+?[1-9]\d{1,14}$/)
            .withMessage('Номер телефона должен быть в формате +79991234567'),
    ],
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            logger.warn('Ошибка валидации в /api/call', { errors: errors.array() });
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, phone, city } = req.body;
       
        try {
            await processCallRequest(name, phone, city, bot, callAdminId);
            logger.info(`Запрос на звонок обработан: name=${name}, phone=${phone}`);
            res.json({ success: true, data: { name, phone } });
        } catch (err) {
            next(err);
        }
    }
);

module.exports = router;