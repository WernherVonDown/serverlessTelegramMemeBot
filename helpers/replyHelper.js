const { getMeme, prepareToPutMeme, defaultReply, addingMemeIsEnded, memeDeleted, userBlocked } = require('./replies');
const commands = require('./commands');
const languageHelper = require('./langs');

const getMessage = async (text, lang = 'en') => {
    const langCode = languageHelper(lang);
    switch (text) {
        case commands.getMeme[langCode]:
            return getMeme(langCode);
        case commands.addMeme[langCode]:
            return prepareToPutMeme(langCode);
        case commands.done[langCode]:
            return addingMemeIsEnded(langCode);
        case commands.delete[langCode]:
            return memeDeleted(langCode);
        case commands.block[langCode]:
            return userBlocked(langCode);
        default:
            return defaultReply(langCode);
    }
}

module.exports = {
    getMessage
}