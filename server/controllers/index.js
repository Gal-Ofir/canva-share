/** controllers/index.js
 *  Controllers routing logic, define handlers to handle requests
 */

const router = require('express').Router();
const handlers = require('./handlers');

//shapes related
router.post('/shape', handlers.addShape);
router.get('/:board_id/shapes', handlers.getShapesByBoardId);

//user related
router.post('/user', handlers.createUser);
router.get('/user/:ip', handlers.getUserByIdentifier);
router.get('/manager', handlers.isUserManager);
router.get(`/user/:ip/limit`, handlers.getUserLimits);

//boards related
router.get('/boards', handlers.getAllBoards);
router.delete('/:board_id', handlers.deleteBoardByBoardId);


module.exports = router;
