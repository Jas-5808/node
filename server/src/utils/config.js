require('dotenv').config();

module.exports = {
    botToken: process.env.BOT_TOKEN,
    statsAdminId: Number(process.env.USER_ID),
    callAdminId: Number(process.env.CALL_ADMIN_ID),
    dbConfig: {
        user: process.env.DB_USER || 'user',
        host: process.env.DB_HOST || 'localhost',
        database: process.env.DB_NAME || 'click_counter',
        password: process.env.DB_PASSWORD || 'password',
        port: process.env.DB_PORT || 5432,
    },
    port: process.env.PORT || 3000,
};