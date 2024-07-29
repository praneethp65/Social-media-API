/**
 * Module to control ownership of posts resources
 * @module permissions/posts
 */
const AccessControl = require('role-acl');
const ac = new AccessControl();

/**Allow users to read posts they own */
ac.grant('user').condition({Fn:'EQUALS', args: {'requester':'$.owner'}}).execute('read').on('post');
/**Allow users to update their posts */
ac.grant('user').condition({Fn:'EQUALS', args: {'requester':'$.owner'}}).execute('update').on('post',['*', '!ID', '!authorID']);
/**Allow users to delete their posts */
ac.grant('user').condition({Fn:'EQUALS', args: {'requester':'$.owner'}}).execute('delete').on('post');

/**Allow admin to delete any post */
ac.grant('admin').execute('delete').on('post');
ac.grant('admin').execute('read').on('posts');
ac.grant('admin').execute('read').on('posts');
/**Allow admin to read any post */
ac.grant('admin').execute('read').on('post');
/**Allow admin to update any post */
ac.grant('admin').execute('update').on('post');

/**
 * Check if user owns post for updating
 * @param {*} requester 
 * @param {*} data 
 * @returns {allowed?}
 */
exports.updatePost = (requester, data) => 
    ac.can(requester.role).context({requester:requester.ID, owner:data.authorID}).execute('update').sync().on('post');


/**
 * Check if user owns post for deleting
 * @param {*} requester 
 * @param {*} data 
 * @returns {allowed?}
 */
exports.deletePost = (requester, data) => 
    ac.can(requester.role).context({requester:requester.ID, owner:data.authorID}).execute('delete').sync().on('post');


