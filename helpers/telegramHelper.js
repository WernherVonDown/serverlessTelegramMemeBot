const { TEXT, PHOTO } = require('../helpers/responseTypes');
const telegram = require('../common/telegram');
const keyboards = require('../helpers/keyboards');

const sendMessage = async (chatId, type, reply) => {
    if (type === PHOTO) {
        await telegram.sendPhoto({
            chat_id: chatId,
            ...reply
        });
    } else if (type === TEXT) {
        await telegram.sendMessage({
            chat_id: chatId,
            ...reply
        });
    }
}

const sendModerateMessage = (chatId, photo, userName, lang = 'en') => {
    const reply = {
        photo,
        caption: `author: ${userName}`,
        reply_markup: keyboards(lang, true).moderateImg
    }

    return sendMessage(chatId, PHOTO, reply)
}

const sendUserIsBlockedMessage = (chaId) => {
    return sendMessage(chaId, TEXT, { text: 'You are blocked.' })
}

module.exports = {
    sendMessage,
    sendUserIsBlockedMessage,
    sendModerateMessage
}