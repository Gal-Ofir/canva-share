const userService = require('./server/db/users');

const resetShapes = () => {
    userService.resetShapesCreatedForAllUsers()
        .then(() => {
            console.log(`Reset shapes count for all users. Executed at ${new Date()}`);
        })
        .catch(err => {
            console.error(`Failed to reset shape count for users! Reason: ${err.message}`);
        })
};

module.exports = resetShapes;