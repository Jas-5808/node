const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
    logger.error({
        message: err.message,
        stack: err.stack,
        method: req.method,
        url: req.url,
        body: req.body,
    });
    res.status(500).json({ error: 'Ошибка сервера' });
};

module.exports = errorHandler;