const userService = require('../../db/users');
const assert = require('assert');

const TEST_USER = {
    ip: '127.0.0.1',
    boards_owned: {boards: ['board1']},
    shapes_created: 0
};
const TEST_USER_2 = {
    ip: '127.0.0.2',
    boards_owned: {boards: ['board2']},
    shapes_created: 0
};

describe("users service test", function () {
    it('Attempt to insert a user', function (done) {
        userService.insertUser(TEST_USER)
            .then(() => done())
            .catch(err => {
                console.log(err);
                done(new Error(err))
            });

    });
    it('Attempt to get the user', function (done) {
        userService.getUserByIp(TEST_USER.ip)
            .then((userFromDb) => {
                assert.strictEqual(userFromDb.shapes_created, TEST_USER.shapes_created);
                assert.notStrictEqual(userFromDb.boards_owned.boards, TEST_USER.boards_owned.boards);
                done()
            })
            .catch(err => {
                console.log(err);
                done(new Error(err))
            });
    });
    it('Attempt to update user boards', function (done) {
        userService.updateBoardByIp(TEST_USER.ip, 'board2')
            .then(([rowsAffected, boardsOwnedFromDb]) => {
                assert.strictEqual(boardsOwnedFromDb[0].dataValues.boards_owned.boards.length, 2);
                done();
            })
            .catch(err => {
                done(new Error(err))
            });
    });
    it('Attempt to increment shapes created', function (done) {
        userService.incrementShapesCreatedByIp(TEST_USER.ip)
            .then(([rowsAffected, numOfShapesFromDb]) => {
                assert.strictEqual(numOfShapesFromDb[0].dataValues.shapes_created, 1);
                done();
            })
            .catch(err => {
                console.log(err);
                done(new Error(err))
            });
    });
    it('Reset all users shapes created', async function () {
        await userService.insertUser(TEST_USER_2);
        await userService.resetShapesCreatedForAllUsers();
        const user1 = await userService.getUserByIp(TEST_USER.ip);
        const user2 = await userService.getUserByIp(TEST_USER_2.ip);
        assert.strictEqual(user1.shapes_created, 0);
        assert.strictEqual(user2.shapes_created, 0);
    });

});

after(function () {
    userService.deleteUserByIp(TEST_USER.ip);
    userService.deleteUserByIp(TEST_USER_2.ip);
});