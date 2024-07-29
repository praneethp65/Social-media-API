/**
 * Module that with help from databaseHelper perfoms CRUD operations on the comments table.
 * @module models/comments
 */

/**Import databse helper */

const db = require('../helpers/database');

/**
 * Async function that gets comments from database
 * @param {number} id - id of post
 * @returns {object} - itteratbale data object
 */

exports.getComments = async function getComments (id) {
    let query = "SELECT * FROM comments WHERE postID = ?";
    let values = [id];
    let data = await db.run_query(query, values);
    return data;
};

/**
 * Async function to create a comment
 * @param {number} userId - id of the user creating the comment
 * @param {number} postId - id of the post
 * @param {object} commentBody - body data of comment to be created
 * @returns {object} - itteratbale data object
 */

exports.createComment = async function createComment(userId, postId, commentBody) {
    let query = "INSERT INTO comments SET ?";
    commentBody["postID"] = postId;
    commentBody["authorID"] = userId;
    let values = [commentBody];
    let data = await db.run_query(query, values);
    return data;
};

/**
 * Async function to delete a comment
 * @param {number} commentId 
 * @returns {object} - itteratbale data object
 */

exports.deleteComment = async function deleteComment(commentId) {
    let query = "DELETE FROM comments WHERE ID = ?";
    let values = [commentId];
    let data = await db.run_query(query, values);
    return data;
};

/**
 * Async function that updates a comment
 * @param {number} commentId - id of comment to update
 * @param {object} commentBody - new data to be added
 * @returns {object} - itteratbale data object
 */

exports.updateComment = async function updateComment(commentId, commentBody) {
    let query = "UPDATE comments SET ? WHERE ID = ?";
    let values = [commentBody, commentId];
    let data = await db.run_query(query, values);
    return data;
}

/**
 * Async function to get comment by id
 * @param {number} id - id of comment
 * @returns {object} - itteratbale data object
 */
exports.getCommentById = async function getCommentById(id) {
    let query = "SELECT * FROM comments WHERE ID = ?";
    let values = [id];
    let data = await db.run_query(query, values);
    return data;
}