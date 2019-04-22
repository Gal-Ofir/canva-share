const router = require('express').Router();
const handlers = require('./handlers');

router.post('/shape', handlers.addShape);
router.get('/:board_id/shapes', handlers.getShapesByBoardId);
router.post('/user', handlers.createUser);
router.get('/user/:ip', handlers.getUserByIdentifier);
router.get('/boards', handlers.getAllBoards);
router.get('/manager', handlers.isUserManager);
router.delete('/:board_id', handlers.deleteBoardByBoardId);
module.exports = router;
