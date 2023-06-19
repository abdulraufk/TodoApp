const express = require('express');
const router = express.Router();
const loginController = require('../controller/auth');
const middleware = require('../middlware/middleware')



router.post('/loginUser', loginController.loginApi);
router.post('/signupUser', loginController.signupUser);
router.get('/searchfilter', loginController.filterRecord);
router.get('/getTodos', middleware.isLoggedIn, loginController.getTodos);
router.post('/createTodos', middleware.isLoggedIn, loginController.createTodos);
router.post('/updateTodos/:id', middleware.isLoggedIn, loginController.updateTodos);
router.delete('/deleteTodos/:id', middleware.isLoggedIn, loginController.deleteTodos)




module.exports = router;