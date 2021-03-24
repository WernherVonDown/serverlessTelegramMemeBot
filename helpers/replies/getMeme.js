const { PHOTO } = require('../responseTypes');
const storageHelper = require('../storageHelper');
const tmpPhoto = 'AgACAgIAAxkBAAINvmBVsaHLq2mztfzwyR1iEPvuA45LAAJTsjEbCfCoSsB3RAUv9tKGAk3Goi4AAwEAAwIAA20AA9oVAAIeBA';
const keyboards = require('../keyboards');
const currentUser = require('../currentUser');

module.exports.getMeme = async (lang) => {
    let { file: photo, userName } = await storageHelper.getMeme();
    const defaultKeyboard = keyboards(lang).default;
    const user = currentUser.get();
    if (!photo) photo = tmpPhoto;
    const reply = {
        photo,
        reply_markup: keyboards(lang).getMeme || defaultKeyboard
    }
    if (user.admin || user.moderator) {
        reply.caption = `author: ${userName}`;
    }
    return { type: PHOTO, reply }
}