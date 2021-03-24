const { TEXT } = require('../responseTypes');
const replies = require('./replies');
const keyboards = require('../keyboards');

module.exports.userBlocked = (lang) => {
    const reply = {
        text: replies.user_bloked[lang],
        reply_markup: keyboards(lang).default
    }
    return { type: TEXT, reply }
}