const commands = require('./commands');
const currentUser = require('./currentUser');

module.exports = (lang, isModerator) => {
    const user = currentUser.get();

    if (user.moderator || isModerator) {
        return moderatorKeyBoard(lang);
    } else if (user.admin) {
        return adminKeyBoard(lang);
    }

    return userKeyBoard(lang);
}

const moderatorKeyBoard = (lang) => {
    return {
        default: {
            keyboard: [[commands.getMeme[lang], commands.addMeme[lang]]],
            resize_keyboard: true
        },
        addingMeme: {
            keyboard: [[commands.done[lang]]],
            resize_keyboard: true
        },
        moderateImg: {
            inline_keyboard: [
                [{ text: commands.delete[lang], callback_data: commands.delete[lang] }]
            ]
        }
    }
}

const userKeyBoard = (lang) => {
    return {
        default: {
            keyboard: [[commands.getMeme[lang], commands.addMeme[lang]]],
            resize_keyboard: true
        },
        addingMeme: {
            keyboard: [[commands.done[lang]]],
            resize_keyboard: true
        },
        getMeme: {
            keyboard: [[commands.getMeme[lang], commands.addMeme[lang]]],
            resize_keyboard: true
        }
    }
}

const adminKeyBoard = (lang) => {
    return {
        default: {
            keyboard: [[commands.getMeme[lang], commands.addMeme[lang]]],
            resize_keyboard: true
        },
        addingMeme: {
            keyboard: [[commands.done[lang]]],
            resize_keyboard: true
        },
        getMeme: {
            inline_keyboard: [
                [{ text: commands.delete[lang], callback_data: commands.delete[lang] }],
                [{ text: commands.block[lang], callback_data: commands.block[lang] }]
            ]
        },
        moderateImg: {
            inline_keyboard: [
                [{ text: commands.delete[lang], callback_data: commands.delete[lang] }],
                [{ text: commands.block[lang], callback_data: commands.block[lang] }]
            ]
        }
    }
}