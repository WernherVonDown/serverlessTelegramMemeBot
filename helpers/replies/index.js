const { getMeme } = require('./getMeme');
const { prepareToPutMeme } = require('./prepareToPutMeme');
const { defaultReply } = require('./defaultReply');
const { addingMemeIsEnded } = require('./addingMemeIsEnded');
const { memeDeleted } = require('./memeDeleted');
const { userBlocked } = require('./userBlocked');

module.exports = {
    getMeme,
    prepareToPutMeme,
    defaultReply,
    addingMemeIsEnded,
    memeDeleted,
    userBlocked
}