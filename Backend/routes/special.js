/**
 * A module to route users to the correct comment rescource
 * @module routes/comments
 * @author Praneeth Prasanna
 */
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const auth = require('../controllers/auth')

const router = Router({prefix: '/api/v1'});


router.get('/', publicWelcomeMessage); 
router.get('/private', auth, privateWelcomeMessage)

function publicWelcomeMessage(ctx) { 
    ctx.body = { 
        message: "Welcome to Facegram, the newest social media app, you're on the home page." 
    } 
}

function privateWelcomeMessage(ctx){
    const user = ctx.state.user;
    ctx.body = {message: `Hello ${user.username}, You successfully logged in!`}
}

module.exports = router;