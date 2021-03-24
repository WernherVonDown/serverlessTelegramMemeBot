let currentUser;

module.exports.set = (user) => {
    currentUser = user;
}

module.exports.get = () => currentUser;