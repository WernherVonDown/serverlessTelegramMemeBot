const { TEXT } = require('../responseTypes');
const replies = require('./replies');
const keyboards = require('../keyboards');

module.exports.defaultReply = (lang) => {
    const reply = {
        text: replies.you_can_get_or_upload_meme[lang],
        reply_markup: keyboards(lang).default
    }
    return { type: TEXT, reply }
}