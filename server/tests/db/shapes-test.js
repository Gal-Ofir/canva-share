const shapeService = require('../../db/shapes');
const assert = require('assert');

const TEST_SHAPE = {
    x: 100,
    y: 50,
    color: '#fff',
    type: 'RECT',
    board_id: 'board1'
};
const TEST_SHAPE_2 = {
    x: 200,
    y: 100,
    color: '#000',
    type: 'TRIANGLE',
    board_id: 'board1'
};

describe("shapes service test", function () {
    it('Attempt to insert a shape', function (done) {
        shapeService.insertShape(TEST_SHAPE)
            .then(() => done())
            .catch(err => {
                console.log(err);
                done(new Error(err))
            });

    });
    it('Attempt to get the shape', function (done) {
        shapeService.getShapesByBoardId(TEST_SHAPE.board_id)
            .then(([shapeFromDb]) => {
                assert.strictEqual(shapeFromDb.x, TEST_SHAPE.x);
                assert.strictEqual(shapeFromDb.y, TEST_SHAPE.y);
                assert.strictEqual(shapeFromDb.color, TEST_SHAPE.color);
                assert.strictEqual(shapeFromDb.type, TEST_SHAPE.type);
                done()
            })
            .catch(err => {
                console.log(err);
                done(new Error(err))
            });
    });
    it('Attempt to get all shapes for a board', async function () {
        await shapeService.insertShape(TEST_SHAPE_2);
        const shapesFromDb = await shapeService.getShapesByBoardId(TEST_SHAPE_2.board_id);
        assert.strictEqual(shapesFromDb.length, 2);
    });


});

after(function () {
    shapeService.deleteShapesByBoardId(TEST_SHAPE_2.board_id);
});