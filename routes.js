const controllers = require('./controllers/')
const router = require('express').Router();



router.post('/register', controllers.user.post.register);


module.exports = router;