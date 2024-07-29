/**
 * A module to route users to the correct comment rescource
 * @module routes/comments
 * @author Praneeth Prasanna
 */
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const posts = require('../models/posts');
const comments = require('../models/comments');
const likes = require('../models/likes');
const {validatePost, validatePostUpdate, validateComment, validateLike} = require('../controllers/validation');
const { validate } = require('jsonschema');
const auth = require('../controllers/auth');
const can = require('../permissions/posts');

/**Base URL structure for posts */
const prefix = '/api/v1/posts';
const router = Router({prefix: prefix});

//define the 
//type of request 
//and/or parameters
//and url structuere
//needed to then run each of the functions below

/**Routes for posts */
router.get('/', getAllPosts);
router.post('/', bodyParser(),auth, validatePost, createPost)
router.get('/:id([0-9]{1,})', getPostById); 
router.put('/:id([0-9]{1,})', bodyParser(), auth, validatePostUpdate ,updatePost); 
router.del('/:id([0-9]{1,})', auth, deletePost);

/**Routes for likes */
router.get('/:id([0-9]{1,})/likes', getLikes);
router.post('/:id([0-9]{1,})/likes', auth, validateLike,  addLike);
router.del('/:id([0-9]{1,})/likes', auth, validateLike,  removeLike);

/**Routes for comments
 * Update and Delete are defined in routes/comments
 */
router.post('/:id([0-9]{1,})/comments', bodyParser(), auth, validateComment, createComment)
router.get('/:id([0-9]{1,})/comments', getComments); 


/**
 * Routing function to retrive all posts
 * @param {object} ctx Koa requets/response context object
 * @returns {} returns the posts and status message
 */
async function getAllPosts(ctx){
    let post = await posts.getAllPosts();
    if (post.length) {
        const postBody = post.map(post =>{
		
            const {ID, title, allText, imageURL, authorID} = post;
            const links = {
                comments: `${ctx.protocol}://${ctx.host}${prefix}/${post.ID}/comments`,
                likes: `${ctx.protocol}://${ctx.host}${prefix}/${post.ID}/likes`,
                self: `${ctx.protocol}://${ctx.host}${prefix}/${post.ID}`
            }
            return {ID, title, allText, imageURL, authorID, links};
        });
        ctx.body = postBody;
        ctx.status = 200;
    }else {
        ctx.status = 404;
        ctx.body = {status: ctx.status, message: "Posts not found"}
    }
}

/**
 * Routing function to retrive a post by its id
 * @param {object} ctx Koa requets/response context object
 */
async function getPostById(ctx){
    let id = ctx.params.id;
    let post = await posts.getPostById(id);
    if (post.length) {
        ctx.status = 200;
        ctx.body = post[0];
    }else {
        ctx.status = 404;
        ctx.body = {status: ctx.status, message: "Posts not found, id out of range"}
    }
}

/**
 * Routing function to create a post
 * @param {object} ctx Koa requets/response context object
 */
async function createPost(ctx){
    let userId = ctx.state.user.ID;
    const postBody = ctx.request.body;
    let post = await posts.createPost(userId, postBody);
    if (post){
        ctx.status=201;
        ctx.body = {message: "Post Created",
                ID: post.insertId}
    }else {
        ctx.status = 500;
        ctx.body = {status: ctx.status, message: "Error creating post"}
    }
}

/**
 * Routing function to update a posts contents
 * @param {object} ctx Koa requets/response context object
 */
async function updatePost(ctx){
    let postId = ctx.params.id;
    const postBody = ctx.request.body;
    let post = await posts.getPostById(postId);
    if (post.length){
        let data = post[0];
        const allowed = can.updatePost(ctx.state.user, data);
        if (!allowed.granted) {
            ctx.status = 403;
        } else{
            let result = await posts.updatePost(postId, postBody);
            if (result.affectedRows) {
                ctx.status = 200;
                ctx.body = {updated: true, ID: postId};
            }
        }
    }else{
        ctx.status = 404;
        ctx.body = {status: ctx.status, message: "Post not found"}
    }
}

/**
 * Routing function to delete a post
 * @param {object} ctx Koa requets/response context object
 */
async function deletePost(ctx){
    let postId = ctx.params.id;
    let post = await posts.getPostById(postId);
    if (post.length){
        let data = post[0];
        const allowed = can.deletePost(ctx.state.user, data);
        if (!allowed.granted){
            ctx.status = 403;
        }else{
            let result = await posts.deletePost(postId);
            ctx.status = 200;
            ctx.body = {message: "Post Deleted", ID:postId};
        }
    }else{
        ctx.status = 404;
        ctx.body = {status: ctx.status, message: "Post not found"}
    }
}

/**
 * Routing function to get number of likes for a post
 * @param {object} ctx Koa requets/response context object
 */
async function getLikes(ctx){
    let postId = ctx.params.id;
    let like = await likes.getLikes(postId);
    if (like){
        ctx.status = 200;
        ctx.body = like ? like: 0;
    }else{
        ctx.status = 404;
        ctx.body = {status: ctx.status, message: "Post not found"}
    }
}

/**
 * Routing function to add a like to a post
 * @param {object} ctx Koa requets/response context object
 */
async function addLike(ctx){
    let postId = ctx.params.id;
    let userId = ctx.state.user.ID;
    let like = await likes.addLike(userId, postId);
    if (like){
        ctx.status = 201;
        ctx.body = {ID: postId,
                    message: 'liked'};
    }else {
        ctx.status = 500;
        ctx.body = {status: ctx.status, message: "Error liking post"}
    }
}

/**
 * Routing function to remove a like from a post
 * @param {object} ctx Koa requets/response context object
 */
async function removeLike(ctx){
    let postId = ctx.params.id;
    let userId = ctx.state.user.ID;
    let like = await likes.removeLike(userId, postId);
    if (like){
        ctx.status = 200;
        ctx.body = {ID: postId,
                    message: "disliked"};
    }else {
        ctx.status = 500;
        ctx.body = {status: ctx.status, message: "Error removing like"}
    }
}

/**
 * Routing function to retrive comments for a post
 * @param {object} ctx Koa requets/response context object
 */
async function getComments(ctx){
    let id = ctx.params.id;
    let comment = await comments.getComments(id);
    if (comment.length) {
        ctx.body = comment;
        ctx.status = 200;
    }else {
        ctx.status = 404;
        ctx.body = {status: ctx.status, message: "Comments not found"}
    }
}

/**
 * Routing function to create a comment on a post
 * @param {object} ctx Koa requets/response context object
 */
async function createComment(ctx){
    
    let postId = ctx.params.id;
    let userId = ctx.state.user.ID;
    const commentBody = ctx.request.body;
    
    let comment = await comments.createComment(userId, postId, commentBody);
    
    if (comment){
        ctx.status=201;
        ctx.body = {ID: comment.insertId,
                    postID : postId,
                    body: commentBody.allText,
                message : "Comment created"}
    }else {
        ctx.status = 500;
        ctx.body = {status: ctx.status, message: "Error adding comment"}
    }
}

module.exports = router;