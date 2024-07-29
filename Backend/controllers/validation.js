/**
 * A module to execute JSON schema validation on request/response data
 * @module controller/validation
 */


const {Validator, ValidationError} = require('jsonschema');

const postSchema = require('../schemas/post.json').createPost;
const postUpdateSchema = require('../schemas/post.json').updatePost;

const userSchema = require('../schemas/user.json').user;
const userUpdateSchema = require('../schemas/user.json').updateUser;

const commentSchema = require('../schemas/comment.json').comment;

const likeSchema = require('../schemas/like.json').like;

/**
 * Wrapper that returns a validator for a given schema
 * Adapted from https://github.coventry.ac.uk/6003CEM/back-end-demo-code/blob/master/controllers/validation.js
 * @param {object} schema - The JSON schema for the resource
 * @param {string} resource - Name of the resource
 * @returns {function} - A koa handler taking (ctx, next) params
 */


const makeKoaValidator = (schema, resource) => {
    const v = new Validator();
    const validateOptions = {
        throwError: true,
        propertyName: resource
    };

/**
     * Middleware handler to execute the validation
     * @param {object} ctx - Koa request/response context object
     * @param {function} next - Koa next callback function
     * @throws {ValidationError} a specifc jsonschema exeption
*/
    const handler = async (ctx, next) => {
        const body = ctx.request.body;

        try{
            v.validate(body, schema, validateOptions);
            await next();
        } catch (error) {
            if (error instanceof ValidationError) {
                ctx.body = error;
                ctx.status = 400;
								ctx.body = error;  
            }else{
                throw error;
            }
        }
    }

    return handler;
}
/**Validate data against schema for creating posts */
exports.validatePost = makeKoaValidator(postSchema, 'createPost');
/**Validate data against schema for updating a post */
exports.validatePostUpdate = makeKoaValidator(postUpdateSchema, 'updatePost');
/**Validate data agaisnt user schema */
exports.validateUser = makeKoaValidator(userSchema, 'user');
/**Validate data against schema for updating a user */
exports.validateUserUpdate = makeKoaValidator(userUpdateSchema, 'updateUser');
/**Validate data against schema for comments */
exports.validateComment = makeKoaValidator(commentSchema, 'comment');
/**Validate data against schema for likes */
exports.validateLike = makeKoaValidator(likeSchema, 'like');