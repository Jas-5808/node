const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER || 'user',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'click_counter',
    password: process.env.DB_PASSWORD || 'password',
    port: process.env.DB_PORT || 5432,
});

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
            // Удаляем ограничение UNIQUE, если оно было создано ранее
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
            return;
        } catch (err) {
            attempts++;
            if (attempts === maxAttempts) {
                console.error('Не удалось подключиться к базе данных после всех попыток:', err);
                process.exit(1);
            }
            console.log('Ошибка подключения, повтор через 2 секунды:', err.message);
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }
};

module.exports = { pool, initDb };