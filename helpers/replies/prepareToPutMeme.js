const { TEXT } = require('../responseTypes');
const replies = require('./replies');
const storageHelper = require('../storageHelper');
const currentUser = require('../currentUser');
const keyboards = require('../keyboards');

module.exports.prepareToPutMeme = (lang) => {
    const user = currentUser.get();
    if (!user.isAddingMeme) {
        storageHelper.updateUser(user.ID, { isAddingMeme: true });
    }
    const reply = {
        text: replies.start_uploading_images[lang],
        reply_markup: keyboards(lang).addingMeme
    }

    return { type: TEXT, reply }
}