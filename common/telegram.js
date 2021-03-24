const axios = require('axios');
require('dotenv/config')


const TOKEN = process.env.TELEGRAM_TOKEN;

module.exports.sendMessage = params => {
    const baseUrl = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

    return axios
        .get(baseUrl, { params })
        .catch(e => {
            console.error('Telegram error', e.response.data);
        });
};

module.exports.sendPhoto = params => {
    const baseUrl = `https://api.telegram.org/bot${TOKEN}/sendPhoto`;

    return axios
        .get(baseUrl, { params })
        .catch(e => {
            console.error('Telegram error', e.response.data);
        });
};