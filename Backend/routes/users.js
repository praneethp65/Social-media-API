/**
 * A module to route users to the correct comment rescource
 * @module routes/comments
 * @author Praneeth Prasanna
 */
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const users = require('../models/users')
const auth = require('../controllers/auth');
const {validateUser} = require('../controllers/validation')
const {validateUserUpdate} = require('../controllers/validation')
const can = require('../permissions/users');

const router = Router({prefix: '/api/v1/users'});

router.get('/', auth, getAllUsers);
router.post('/', bodyParser(), validateUser, createUser)
router.get('/:id([0-9]{1,})', auth, getUserById); 
router.put('/:id([0-9]{1,})', bodyParser(), auth, validateUserUpdate, updateUser); 
router.del('/:id([0-9]{1,})', auth, deleteUser);

async function getAllUsers(ctx){
    const allowed = can.readAllUsers(ctx.state.user);
    if (!allowed.granted) {
        ctx.status = 403;
    } else {
        let user = await users.getAllUsers();
        if (user.length) {
            ctx.status = 200;
            ctx.body = user;
        } else {
            ctx.status = 404;
            ctx.body = {status: ctx.status, message: "Users not found"}
        }
    }
}

async function getUserById(ctx){
    let id = ctx.params.id;
    let user = await users.getUserById(id);
    if (user.length) {
        const data = user[0];
        const allowed = can.readUser(ctx.state.user, data);
        if (!allowed.granted) {
            ctx.status = 403;
        }else {
            ctx.status= 200
            ctx.body = user[0];
        }
    }else {
        ctx.status = 404;
        ctx.body = {status: ctx.status, message: "User not found"}
    }
}

async function createUser(ctx){
    const body = ctx.request.body;
    let user = await users.createUser(body);
    if (user){
        ctx.status=201;
        ctx.body = {ID: user.insertId, created : true}
    }else {
        ctx.status = 500;
        ctx.body = {status: ctx.status, message: "Error creating user"}
    }
}

async function updateUser(ctx){
    let id = ctx.params.id;
    const body = ctx.request.body;
    let user = await users.getUserById(id);
    if (user.length){
        let data = user[0];
        const allowed = can.updateUser(ctx.state.user, data);
        if (!allowed.granted){
            ctx.status = 403;
            
        }else {
            let result = await users.updateUser(body, id)
            if (result.affectedRows) {
                ctx.status = 200;
                ctx.body = {updated: true, ID: id};
            }
        } 
    }else {
        ctx.status = 404;
        ctx.body = {status: ctx.status, message: "User not found"}
    }
}

async function deleteUser(ctx){
    let id = ctx.params.id;
    let user = await users.getUserById(id);
    if (user.length){
        const data = user[0];
        console.log("Attempting to delete", data);
        const allowed = can.deleteUser(ctx.state.user, data);
        if (!allowed.granted) {
            ctx.status = 403;
        }else{
            result = await user.deleteUser(id);
            if (result.affectedRows) {
                ctx.body = {ID: id, deleted : true}
            }
        }
    }else {
        ctx.status = 404;
        ctx.body = {status: ctx.status, message: "User not found"}
    }
}

module.exports = router;
