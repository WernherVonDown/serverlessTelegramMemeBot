const Responses = require('./common/API_Responses');
const { handleMessage, handleCallback } = require('./handlers');

module.exports.processTelegramWebhook = async event => {
    const body = JSON.parse(event.body);
    
    console.log('body=', body);
    
    if (body && body.callback_query) {
        const res = await handleCallback(body.callback_query);
        return res;
    }
    if (body && body.message) {
        const res = await handleMessage(body);
        return res;
    }

    return Responses._400({ message: 'no message found' });
};