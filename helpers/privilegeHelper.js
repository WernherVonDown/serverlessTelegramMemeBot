const commands = require("./commands");

const moderator = {
    [commands.delete]: true
};
const admin = {
    [commands.delete]: true,
    [commands.block]: true
}

module.exports.hasRight = (user, command) => {
    if (user.admin) {
        return admin[command];
    }
    if (user.moderator) {
        return moderator[command];
    }
    return false;
}