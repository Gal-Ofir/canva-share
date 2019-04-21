const router = require('express').Router();
const handlers = require('./handlers');

router.post('/shape', handlers.addShape);
router.get('/:boardId/shapes', handlers.getShapesByBoardId);
router.post('/user', handlers.createUser);
router.get('/user', handlers.getUserByIp);
router.get('/boards', handlers.getAllBoards);
router.delete('/:boardId', handlers.deleteBoardByBoardId);
module.exports = router;
