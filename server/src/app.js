const express = require('express');
<<<<<<< Updated upstream
const path = require('path');
=======
const path = require('path'); 
>>>>>>> Stashed changes
const cors = require('cors');
const { initDb } = require('./services/dbService');
const clickRoutes = require('./routes/clickRoutes');
const callRoutes = require('./routes/callRoutes');
const errorHandler = require('./middleware/errorHandler');
const { port } = require('./utils/config');
require('./bot/bot'); 

const app = express();

// Настройка CORS
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

<<<<<<< Updated upstream
// Раздача статических файлов из папки dist
app.use(express.static(path.join(__dirname, '../../dist')));
=======
app.use(express.static(path.join(__dirname, '../../client/build')));
>>>>>>> Stashed changes

app.use('/api/click', clickRoutes);
app.use('/api/call', callRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../dist', 'index.html'));
});


(async () => {
    await initDb();

    app.use(errorHandler);

    app.listen(port, () => {
        console.log(`Сервер запущен на порту ${port}`);
    });
})();