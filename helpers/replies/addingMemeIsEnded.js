const { TEXT } = require('../responseTypes');
const replies = require('./replies');
const currentUser = require('../currentUser');
const storageHelper = require('../storageHelper');
const keyboards = require('../keyboards');

module.exports.addingMemeIsEnded = (lang) => {
    const user = currentUser.get();
    storageHelper.updateUser(user.ID, { isAddingMeme: false });
    const reply = {
        text: replies.memes_were_saved[lang],
        reply_markup: keyboards(lang).default
    }
    return { type: TEXT, reply }
}