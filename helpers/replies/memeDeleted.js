const { TEXT } = require('../responseTypes');
const replies = require('./replies');
const keyboards = require('../keyboards');

module.exports.memeDeleted = (lang) => {
    const reply = {
        text: replies.meme_is_deleted[lang],
        reply_markup: keyboards(lang).default
    }
    return { type: TEXT, reply }
}