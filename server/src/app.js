const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const { initDb } = require('./services/dbService');
const clickRoutes = require('./routes/clickRoutes');
const callRoutes = require('./routes/callRoutes');
const errorHandler = require('./middleware/errorHandler');
const { port } = require('./utils/config');
require('./bot/bot'); 

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

app.use(express.static(path.join(__dirname, '../dist')));

app.use('/api/click', clickRoutes);
app.use('/api/call', callRoutes);

app.get('*', (req, res) => {
    const indexPath = path.join(__dirname, '../dist', 'index.html');
    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        res.status(404).send('Frontend not found. Please build the frontend.');
    }
});

(async () => {
    await initDb();

    app.use(errorHandler);

    app.listen(port, () => {
        console.log(`Сервер запущен на порту ${port}`);
    });
})();