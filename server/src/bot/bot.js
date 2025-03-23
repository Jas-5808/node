const { Telegraf } = require('telegraf');
const { botToken, statsAdminId, callAdminId } = require('../utils/config');
const { setupStatsBot, statsKeyboard, restrictStatsAccess } = require('./statsBot');
const { setupCallBot } = require('./callBot');

const bot = new Telegraf(botToken);

// Обработчик /start для всех случаев
bot.start((ctx) => {
    if (ctx.from.id === statsAdminId) {
        ctx.reply('Привет! Я бот для подсчета кликов. Выбери период для статистики:', statsKeyboard);
    } else if (ctx.from.id === callAdminId) {
        ctx.reply('Привет! Я бот для обработки запросов на звонки. Ожидаю входящие заявки.');
    } else {
        ctx.reply('Извините, этот бот доступен только определенным пользователям.');
    }
});

// Инициализация ботов
setupStatsBot(bot);
setupCallBot(bot);

// Запуск бота
bot.launch()
    .then(() => console.log('Бот запущен'))
    .catch((err) => console.error('Ошибка запуска бота:', err));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

module.exports = bot;