const { addCallRequest } = require('./dbService');

const processCallRequest = async (name, phone, city, bot, callAdminId) => {
    await addCallRequest(name, phone, city);
    await bot.telegram.sendMessage(
        callAdminId,
        `Новый запрос на звонок:\nИмя: ${name}\nТелефон: ${phone}\nГород: ${city || 'Не указан'}`
    );
    console.log(name, phone, city);
};

module.exports = { processCallRequest };