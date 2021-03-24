module.exports = ({ ID, userName, lang }) => {
    return {
        ID,
        userName,
        isAddingMeme: false,
        admin: false,
        moderator: false,
        blocked: false,
        lang,
        seenImg: [],
        creationDate: Date.now()
    }
};