const { Telegraf, Markup } = require('telegraf');
const { pool } = require('./db');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);
const STATS_ADMIN_ID = Number(process.env.USER_ID);      // Администратор статистики
const CALL_ADMIN_ID = Number(process.env.CALL_ADMIN_ID); // Администратор звонков

// Функция для получения статистики кликов
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

// Клавиатура для статистики
const statsKeyboard = Markup.keyboard([
    ['Час', 'День'],
    ['Неделя', 'Месяц'],
    ['Всё время']
]).resize();

// Middleware для ограничения доступа к статистике
const restrictStatsAccess = (ctx, next) => {
    if (ctx.from.id !== STATS_ADMIN_ID) {
        return; // Пропускаем обработку, если не администратор статистики
    }
    return next();
};

bot.start((ctx) => {
    if (ctx.from.id === STATS_ADMIN_ID) {
        ctx.reply('Привет! Я бот для подсчета кликов. Выбери период для статистики:', statsKeyboard);
    } else if (ctx.from.id === CALL_ADMIN_ID) {
        ctx.reply('Привет! Я бот для обработки запросов на звонки. Ожидаю входящие заявки.');
    } else {
        ctx.reply('Извините, этот бот доступен только определенным пользователям.');
    }
});

bot.hears('Час', restrictStatsAccess, async (ctx) => {
    try {
        const stats = await getStats('hour');
        if (stats.length === 0) {
            ctx.reply('Нет кликов за последний час.');
            return;
        }
        const message = stats.map(row => `${row.link}: ${row.period_count} кликов (всего: ${row.total_count})`).join('\n');
        ctx.reply(`Статистика за час:\n${message}`);
    } catch (err) {
        console.error('Ошибка при получении статистики:', err);
        ctx.reply('Произошла ошибка.');
    }
});

bot.hears('День', restrictStatsAccess, async (ctx) => {
    try {
        const stats = await getStats('day');
        if (stats.length === 0) {
            ctx.reply('Нет кликов за последний день.');
            return;
        }
        const message = stats.map(row => `${row.link}: ${row.period_count} кликов (всего: ${row.total_count})`).join('\n');
        ctx.reply(`Статистика за день:\n${message}`);
    } catch (err) {
        console.error('Ошибка при получении статистики:', err);
        ctx.reply('Произошла ошибка.');
    }
});

bot.hears('Неделя', restrictStatsAccess, async (ctx) => {
    try {
        const stats = await getStats('week');
        if (stats.length === 0) {
            ctx.reply('Нет кликов за последнюю неделю.');
            return;
        }
        const message = stats.map(row => `${row.link}: ${row.period_count} кликов (всего: ${row.total_count})`).join('\n');
        ctx.reply(`Статистика за неделю:\n${message}`);
    } catch (err) {
        console.error('Ошибка при получении статистики:', err);
        ctx.reply('Произошла ошибка.');
    }
});

bot.hears('Месяц', restrictStatsAccess, async (ctx) => {
    try {
        const stats = await getStats('month');
        if (stats.length === 0) {
            ctx.reply('Нет кликов за последний месяц.');
            return;
        }
        const message = stats.map(row => `${row.link}: ${row.period_count} кликов (всего: ${row.total_count})`).join('\n');
        ctx.reply(`Статистика за месяц:\n${message}`);
    } catch (err) {
        console.error('Ошибка при получении статистики:', err);
        ctx.reply('Произошла ошибка.');
    }
});

bot.hears('Всё время', restrictStatsAccess, async (ctx) => {
    try {
        const stats = await getStats('all');
        if (stats.length === 0) {
            ctx.reply('Нет кликов за всё время.');
            return;
        }
        const message = stats.map(row => `${row.link}: ${row.total_count} кликов`).join('\n');
        ctx.reply(`Статистика за всё время:\n${message}`);
    } catch (err) {
        console.error('Ошибка при получении статистики:', err);
        ctx.reply('Произошла ошибка.');
    }
});

bot.launch()
    .then(() => console.log('Бот запущен'))
    .catch((err) => console.error('Ошибка запуска бота:', err));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

module.exports = { bot, CALL_ADMIN_ID };