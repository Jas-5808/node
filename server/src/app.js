const express = require('express');
const { initDb } = require('./services/dbService');
const clickRoutes = require('./routes/clickRoutes');
const callRoutes = require('./routes/callRoutes');
const errorHandler = require('./middleware/errorHandler');
const { port } = require('./utils/config');
require('./bot/bot'); 

const app = express();

app.use(express.json());

(async () => {
    await initDb();

    app.use('/api/click', clickRoutes);
    app.use('/api/call', callRoutes);

    app.use(errorHandler);

    app.listen(port, () => {
        console.log(`Сервер запущен на порту ${port}`);
    });
})();