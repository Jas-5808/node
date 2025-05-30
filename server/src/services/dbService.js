// dbService.js
const { Pool } = require('pg');
const { dbConfig } = require('../utils/config');
const logger = require('../utils/logger');

const pool = new Pool(dbConfig);

const initDb = async () => {
    const maxAttempts = 10;
    let attempts = 0;

    while (attempts < maxAttempts) {
        try {
            await pool.query('SELECT 1');
            await pool.query(`
                CREATE TABLE IF NOT EXISTS clicks (
                    id SERIAL PRIMARY KEY,
                    link VARCHAR(255) NOT NULL,
                    clicked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
                CREATE TABLE IF NOT EXISTS call_requests (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    phone VARCHAR(255) NOT NULL,
                    requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
            `);

            // Проверяем, существует ли столбец city, и добавляем его, если нет
            const columnCheck = await pool.query(`
                SELECT column_name 
                FROM information_schema.columns 
                WHERE table_name = 'call_requests' AND column_name = 'city';
            `);

            if (columnCheck.rows.length === 0) {
                await pool.query(`
                    ALTER TABLE call_requests
                    ADD COLUMN city VARCHAR(255) NOT NULL;
                `);
                logger.info('Столбец city добавлен в таблицу call_requests');
            }

            await pool.query(`
                DO $$
                BEGIN
                    IF EXISTS (
                        SELECT 1
                        FROM pg_constraint
                        WHERE conname = 'clicks_link_key'
                    ) THEN
                        ALTER TABLE clicks DROP CONSTRAINT clicks_link_key;
                    END IF;
                END
                $$;
            `);
            logger.info('База данных инициализирована');
            return;
        } catch (err) {
            attempts++;
            if (attempts === maxAttempts) {
                logger.error('Не удалось подключиться к базе данных после всех попыток:', err);
                process.exit(1);
            }
            logger.warn('Ошибка подключения, повтор через 2 секунды:', err.message);
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }
};

// Остальные методы без изменений
const addClick = async (link) => {
    await pool.query('INSERT INTO clicks (link) VALUES ($1)', [link]);
};

const getTotalClicks = async (link) => {
    const result = await pool.query('SELECT COUNT(*) AS total FROM clicks WHERE link = $1', [link]);
    return Number(result.rows[0].total);
};

const getStats = async (period) => {
    let timeFilter = '';
    switch (period) {
        case 'hour':
            timeFilter = 'WHERE clicked_at > NOW() - INTERVAL \'1 hour\'';
            break;
        case 'day':
            timeFilter = 'WHERE clicked_at > NOW() - INTERVAL \'1 day\'';
            break;
        case 'week':
            timeFilter = 'WHERE clicked_at > NOW() - INTERVAL \'1 week\'';
            break;
        case 'month':
            timeFilter = 'WHERE clicked_at > NOW() - INTERVAL \'1 month\'';
            break;
        case 'all':
        default:
            timeFilter = '';
    }

    const result = await pool.query(`
        SELECT link, COUNT(*) AS period_count,
               (SELECT COUNT(*) FROM clicks WHERE link = c.link) AS total_count
        FROM clicks c
        ${timeFilter}
        GROUP BY link
        ORDER BY total_count DESC
    `);
    return result.rows;
};

const addCallRequest = async (name, phone, city) => {
    await pool.query('INSERT INTO call_requests (name, phone, city) VALUES ($1, $2, $3)', [name, phone, city]);
};

module.exports = { initDb, addClick, getStats, addCallRequest, getTotalClicks };