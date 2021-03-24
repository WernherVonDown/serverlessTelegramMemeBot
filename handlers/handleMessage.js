const { getMessage } = require('../helpers/replyHelper');
const storageHelper = require('../helpers/storageHelper');
const Responses = require('../common/API_Responses');
const currentUser = require('../helpers/currentUser');
const commands = require('../helpers/commands');
const langs = require('../helpers/langs');
const { sendMessage, sendUserIsBlockedMessage, sendModerateMessage } = require('../helpers/telegramHelper');

module.exports.handleMessage = async (body) => {
    const { chat, photo, from } = body.message;
    let { text } = body.message;
    const lang = langs(from.language_code);

    try {
        const user = await storageHelper.getOrCreateUser(from);
        if (user.blocked) {
            await sendUserIsBlockedMessage(chat.id);
            return Responses._200({ chatId: chat.id, message: 'done' })
        }
        currentUser.set(user);
        if (user.isAddingMeme && text !== commands.done[lang]) {
            if (photo) {
                const photoId = await storageHelper.uploadMeme(photo[0]);
                if (!user.admin && !user.moderator) {
                    const moderator = await storageHelper.getRandomModerator();
                    if (moderator) {
                        await sendModerateMessage(moderator.ID, photoId, user.userName, langs(moderator.lang));
                    }
                }
                return Responses._200({ chatId: chat.id, message: 'done' })
            }
            text = commands.addMeme[lang];
        }

        const { reply, type } = await getMessage(text, lang);
        await sendMessage(chat.id, type, reply)

        return Responses._200({ chatId: chat.id, message: reply })
    } catch (err) {
        const reply = `Something went wrong: ${err}`;
        await sendMessage(chat.id, TEXT, reply)
        console.log('error', err)
        return Responses._400({ message: err });
    }
}