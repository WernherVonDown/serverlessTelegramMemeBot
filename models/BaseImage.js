module.exports = ({ file_id, file_unique_id, userId, userName }) => {
    return {
        ID: file_unique_id,
        file: file_id,
        userName,
        userId,
        creationDate: Date.now()
    }
};