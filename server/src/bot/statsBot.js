const { Markup } = require('telegraf');
const { statsAdminId } = require('../utils/config');
const { fetchStats, fetchAllStats } = require('../services/statsService');

// Клавиатура для статистики
const statsKeyboard = Markup.keyboard([
    ['Час', 'День'],
    ['Неделя', 'Месяц'],
    ['Всё время']
]).resize();

// Middleware для ограничения доступа
const restrictStatsAccess = (ctx, next) => {
    if (ctx.from.id !== statsAdminId) {
        return;
    }
    return next();
};

// Инициализация бота статистики
const setupStatsBot = (bot) => {
    bot.hears('Час', restrictStatsAccess, async (ctx) => {
        try {
            const message = await fetchStats('hour');
            ctx.reply(`Статистика за час:\n${message}`);
        } catch (err) {
            console.error('Ошибка при получении статистики:', err);
            ctx.reply('Произошла ошибка.');
        }
    });

    bot.hears('День', restrictStatsAccess, async (ctx) => {
        try {
            const message = await fetchStats('day');
            ctx.reply(`Статистика за день:\n${message}`);
        } catch (err) {
            console.error('Ошибка при получении статистики:', err);
            ctx.reply('Произошла ошибка.');
        }
    });

    bot.hears('Неделя', restrictStatsAccess, async (ctx) => {
        try {
            const message = await fetchStats('week');
            ctx.reply(`Статистика за неделю:\n${message}`);
        } catch (err) {
            console.error('Ошибка при получении статистики:', err);
            ctx.reply('Произошла ошибка.');
        }
    });

    bot.hears('Месяц', restrictStatsAccess, async (ctx) => {
        try {
            const message = await fetchStats('month');
            ctx.reply(`Статистика за месяц:\n${message}`);
        } catch (err) {
            console.error('Ошибка при получении статистики:', err);
            ctx.reply('Произошла ошибка.');
        }
    });

    bot.hears('Всё время', restrictStatsAccess, async (ctx) => {
        try {
            const message = await fetchAllStats();
            ctx.reply(`Статистика за всё время:\n${message}`);
        } catch (err) {
            console.error('Ошибка при получении статистики:', err);
            ctx.reply('Произошла ошибка.');
        }
    });
};

module.exports = { setupStatsBot, statsKeyboard, restrictStatsAccess };