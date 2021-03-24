require('dotenv').config({ path: __dirname + '../.env' })
const { telegramUsersTableName, telegramMemesTableName } = process.env;
const Dynamo = require('../common/Dynamo');
const BaseUser = require('../models/BaseUser');
const currentUser = require('./currentUser');
const BaseImage = require('../models/BaseImage');
const { getRandomElementOfArray } = require('../common');

const getUser = (userId) => {
    return Dynamo.get(userId, telegramUsersTableName);
}

const getUserByImageId = async ({ file_unique_id }) => {
    try {
        const image = await Dynamo.get(file_unique_id, telegramMemesTableName);
        if (image) {
            const { userId } = image;
            return getUser(userId);
        }
    } catch (error) {
        console.log('getUserByImageId error', error)
    }

}

const getOrCreateUser = async ({ id, username, language_code }) => {
    let user = await getUser(id);
    if (!user) {
        const data = BaseUser({
            ID: id,
            userName: username,
            lang: language_code
        })
        user = await Dynamo.write(data, telegramUsersTableName);
    }
    return user;
}

const getMeme = async () => {
    let { seenImg, ID } = currentUser.get();
    let res;
    if (typeof seenImg === 'string') {
        seenImg = JSON.parse(seenImg);
    }
    const images = await Dynamo.scanTable(telegramMemesTableName);
    if (!images.length) return {};
    const notSeenImages = images.filter(img => seenImg.indexOf(img.ID) === -1);
    if (notSeenImages.length === 0) {
        res = getRandomElementOfArray(images);
        await updateUser(ID, { seenImg: JSON.stringify([res.ID]) });
    } else {
        res = getRandomElementOfArray(notSeenImages);
        seenImg.push(res.ID);
        await updateUser(ID, { seenImg: JSON.stringify(seenImg) });
    }
    return res;
}

const generateUpdateQuery = (fields) => {
    let exp = {
        UpdateExpression: 'set',
        ExpressionAttributeNames: {},
        ExpressionAttributeValues: {}
    }
    Object.entries(fields).forEach(([key, item]) => {
        exp.UpdateExpression += ` #${key} = :${key},`;
        exp.ExpressionAttributeNames[`#${key}`] = key;
        exp.ExpressionAttributeValues[`:${key}`] = item
    })
    exp.UpdateExpression = exp.UpdateExpression.slice(0, -1);
    return exp
}

const updateUser = (ID, data) => {
    const expression = generateUpdateQuery(data)
    const params = {
        TableName: telegramUsersTableName,
        Key: {
            ID
        },
        ...expression
    }

    return Dynamo.update(params);
}

const deleteMeme = ({ file_unique_id }) => {
    return Dynamo.delete(file_unique_id, telegramMemesTableName)
}

const getAllUsers = () => {
    return Dynamo.scanTable(telegramUsersTableName);
}

const getRandomModerator = async () => {
    const users = await getAllUsers();
    const moderators = users.filter(u => u.moderator && !u.blocked);
    return getRandomElementOfArray(moderators);
}

const uploadMeme = async ({ file_id, file_unique_id }) => {
    try {
        const user = currentUser.get();
        const { ID: userId, userName } = user;
        const data = BaseImage({ file_id, file_unique_id, userId, userName });
        await Promise.all([Dynamo.write(data, telegramMemesTableName), updateUserSeenImg(userId, file_unique_id)]);
        return file_id;
    } catch (error) {
        console.log('error uploadMeme', error)
    }
}

const updateUserSeenImg = (ID, imgId) => {
    let { seenImg } = currentUser.get();
    if (typeof seenImg === 'string') {
        seenImg = JSON.parse(seenImg);
    }
    seenImg.push(imgId);
    const data = {
        seenImg: JSON.stringify(seenImg)
    }
    const expression = generateUpdateQuery(data);
    const params = {
        TableName: telegramUsersTableName,
        Key: {
            ID
        },
        ...expression
    }
    return Dynamo.update(params);
}

const blockUser = ({ ID }) => {
    return updateUser(ID, { blocked: true });
}

module.exports = {
    getUser,
    getOrCreateUser,
    updateUser,
    uploadMeme,
    getMeme,
    deleteMeme,
    getUserByImageId,
    blockUser,
    getRandomModerator
}