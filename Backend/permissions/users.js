/**
 * Module to control ownership of user resources
 * @module permissions/users
 */
const AccessControl = require('role-acl');
const ac = new AccessControl();

/**Allow users to read their own login details */
ac.grant('user').condition({Fn:'EQUALS', args: {'requester':'$.owner'}}).execute('read').on('user', ['*', '!password']);
/**Allow users to update their own login details */
ac.grant('user').condition({Fn:'EQUALS', args: {'requester':'$.owner'}}).execute('update').on('user', ['about', 'password', 'email']);
/**Grant admin permissions to read all users data */
ac.grant('admin').execute('read').on('users');
ac.grant('admin').execute('read').on('user');
/**Grant admins permission to update all users data */
ac.grant('admin').execute('update').on('user');
/**Grant admins permission to delete user data except their own */
ac.grant('admin').condition({Fn:'NOT_EQUALS', args:
    {'requester':'$.owner'}}).execute('delete').on('user');

/**Handle permissions for reading all users data */
exports.readAllUsers = (requester) =>
    ac.can(requester.role).execute('read').sync().on('users');

/**Users can only read their own details */
exports.readUser = (requester, data) =>
    ac.can(requester.role).context({requester:requester.ID, owner:data.ID}).execute('read').sync().on('user');

/**Users can only update their own details */
exports.updateUser = (requester, data) =>
    ac.can(requester.role).context({requester:requester.ID, owner:data.ID}).execute('update').sync().on('user');

/**Users can only delete their own details */
exports.deleteUser = (requester, data) =>
    ac.can(requester.role).context({requester:requester.ID, owner:data.ID}).execute('delete').sync().on('user');