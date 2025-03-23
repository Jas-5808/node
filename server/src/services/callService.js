const { addCallRequest } = require('./dbService');

const processCallRequest = async (name, phone, bot, callAdminId) => {
    await addCallRequest(name, phone);
    await bot.telegram.sendMessage(
        callAdminId,
        `Новый запрос на звонок:\nИмя: ${name}\nТелефон: ${phone}`
    );
};

module.exports = { processCallRequest };