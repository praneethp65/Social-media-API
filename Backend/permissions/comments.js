/**
 * Module to control permissions for comments
 * @module permissions/comments
 */
const AccessControl = require('role-acl');
const ac = new AccessControl();

/**Allow users to read comments */
ac.grant('user').condition({Fn:'EQUALS', args: {'requester':'$.owner'}}).execute('read').on('comment');
/**Dont let users update special fields */
ac.grant('user').condition({Fn:'EQUALS', args: {'requester':'$.owner'}}).execute('update').on('comment',['*', '!ID', '!authorID']);
/**Let users delete comments */
ac.grant('user').condition({Fn:'EQUALS', args: {'requester':'$.owner'}}).execute('delete').on('comment');


/**Allow admin to delete comments */
ac.grant('admin').execute('delete').on('comment');
ac.grant('admin').execute('read').on('comments');
/**Allow admin to read comments */
ac.grant('admin').execute('read').on('comment');
/**Allow admin to update comments */
ac.grant('admin').execute('update').on('comment');

/**
 * Check if user owns resource before update
 * @param {*} requester 
 * @param {*} data 
 * @returns {allowed?}
 */
exports.updateComment = (requester, data) => 
    ac.can(requester.role).context({requester:requester.ID, owner:data.authorID}).execute('update').sync().on('comment');

/**
 * Check if user owns rescource before deletion
 * @param {*} requester 
 * @param {*} data 
 * @returns {allowed?}
 */
exports.deleteComment = (requester, data) => 
    ac.can(requester.role).context({requester:requester.ID, owner:data.authorID}).execute('delete').sync().on('comment');


