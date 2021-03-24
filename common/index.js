module.exports.getRandomElementOfArray = (array) => {
    return array[Math.floor(Math.random() * array.length)];
}