const { getMessage } = require('../helpers/replyHelper');
const storageHelper = require('../helpers/storageHelper');
const Responses = require('../common/API_Responses');
const currentUser = require('../helpers/currentUser');
const commands = require('../helpers/commands');
const langs = require('../helpers/langs');
const privilegeHelper = require('../helpers/privilegeHelper');
const { sendMessage, sendUserIsBlockedMessage } = require('../helpers/telegramHelper');

module.exports.handleCallback = async ({ message, data, from }) => {
    const { photo, chat } = message;
    try {
        const user = await storageHelper.getOrCreateUser(from);
        if (user.blocked) {
            await sendUserIsBlockedMessage(chat.id);
            return Responses._200({ chatId: chat.id, message: 'done' })
        }
        currentUser.set(user);
        const lang = langs(from.language_code);

        if (data === commands.delete[lang] && privilegeHelper.hasRight(user, commands.delete)) {
            await storageHelper.deleteMeme(photo[0]);
            const { reply, type } = await getMessage(data, lang);
            await sendMessage(chat.id, type, reply);
            return Responses._200({ chatId: chat.id, message: 'done' })
        }

        if (data === commands.block[lang] && privilegeHelper.hasRight(user, commands.delete)) {
            const imgOwner = await storageHelper.getUserByImageId(photo[0]);
            if (imgOwner.ID !== user.ID) {
                await storageHelper.blockUser(imgOwner);
                const { reply, type } = await getMessage(data, lang);
                await sendMessage(chat.id, type, reply);
                return Responses._200({ chatId: chat.id, message: 'done' })
            }
        }

        const { reply, type } = await getMessage('default', lang);
        await sendMessage(chat.id, type, reply);
        return Responses._200({ chatId: chat.id, message: 'done' })

    } catch (err) {
        console.log('error handleCallback', err)
    }
}