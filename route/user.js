const controller = require('../controller/user');
const router = require('express').Router();

// CRUD Routes /users
router.get('/getTest', controller.getTest);
router.get('/', controller.getUsers); // /users
router.get('/:userId', controller.getUser); // /users/:userId
router.post('/', controller.createUser); // /users
router.post('/:userId', controller.updateUser); // /users/:userId
router.delete('/:userId', controller.deleteUser); // /users/:userId


module.exports = router;