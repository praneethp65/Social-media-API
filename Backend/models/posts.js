/**
 * Module to perfom CRUD opertations on posts table
 * @module models/posts
 */
const db = require('../helpers/database');

/**
 * Async function to get a post by its id
 * @param {number} id - id of post
 * @returns {object} - itteratbale data object
 */

exports.getPostById = async function getPostById (id) {
    let query = "SELECT * FROM posts WHERE ID = ?";
    let values = [id];
    let data = await db.run_query(query, values);
    return data
};

/**
 * Async function to get all posts
 * @returns {object} - itteratbale data object
 */
exports.getAllPosts = async function getAllPosts() {
    let query = "SELECT * FROM posts;";
    let data = await db.run_query(query);
    return data;
};

/**
 * Async function to create a post
 * @param {number} userId 
 * @param {object} postBody 
 * @returns {object} - itteratbale data object
 */
exports.createPost = async function createPost(userId,postBody) {
    let query = "INSERT INTO posts SET ?"; 
    postBody["authorID"] = userId;
    let values = [postBody];
    let data = await db.run_query(query, values);
    return data;
};

/**
 * Async function to update a post
 * @param {number} postId 
 * @param {object} postBody 
 * @returns {object} - itteratbale data object
 */
exports.updatePost = async function updatePost(postId, postBody){
    let query = "UPDATE posts SET ? WHERE ID = ?";
    let values = [postBody, postId];
    let data = await db.run_query(query, values);
    return data;
};

/**
 * Async function to delete a post
 * @param {number} postId 
 * @returns {object} - itteratbale data object
 */
exports.deletePost = async function deletePost(postId) {
		//Delete comments for post
    //Delete likes for post
    //Delete post
    let values = [postId];
    let query = "DELETE FROM comments WHERE postID = ?"
    await db.run_query(query, values);

    query = "DELETE FROM likes WHERE postID = ?"
    await db.run_query(query, values);

    query = "DELETE FROM posts WHERE ID = ?";
    let data = await db.run_query(query, values);
    return data
};