const { getStats } = require('./dbService');

const fetchStats = async (period) => {
    const stats = await getStats(period);
    if (stats.length === 0) {
        return `Нет кликов за ${getPeriodName(period)}.`;
    }
    return stats.map(row => `${row.link}: ${row.period_count} кликов (всего: ${row.total_count})`).join('\n');
};

const fetchAllStats = async () => {
    const stats = await getStats('all');
    if (stats.length === 0) {
        return 'Нет кликов за всё время.';
    }
    return stats.map(row => `${row.link}: ${row.total_count} кликов`).join('\n');
};

const getPeriodName = (period) => {
    const periods = {
        hour: 'последний час',
        day: 'последний день',
        week: 'последнюю неделю',
        month: 'последний месяц',
        all: 'всё время'
    };
    return periods[period] || 'всё время';
};

module.exports = { fetchStats, fetchAllStats };