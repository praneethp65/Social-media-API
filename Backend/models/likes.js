/**
 * Module to add likes to a post
 * @module models/likes
 */
const db = require('../helpers/database');

/**
 * Async function to get number of likes for post
 * @param {number} postId 
 * @returns {object} - count of likes
 */
exports.getLikes = async function getLikes(postId){
    let query = "SELECT COUNT(*) as 'count' FROM likes WHERE postID = ?";
    let values = [postId];
    let data = await db.run_query(query, values);
    return data;
};

/**
 * Async function to add a like to a post
 * @param {number} userId 
 * @param {number} postId 
 * @returns {object} - Confirmation of success
 */
exports.addLike = async function addLike(userId, postId){
    let query = "INSERT INTO  likes SET postID=?, authorID=? ON DUPLICATE KEY UPDATE postID=postID;";
    const data = await db.run_query(query, [postId, userId]);
    return data;
		//id is postID
    //query DB to see if user already likes post
    //if not add like
    //if so do nothing
};

/**
 * Async function to remove a like from a post
 * @param {number} userId 
 * @param {number} postId 
 * @returns {object} - confirmation of removal
 */
exports.removeLike = async function removeLike(userId,postId){
    let query = "DELETE FROM likes WHERE postID=? AND authorID=?;";
    const data = await db.run_query(query, [postId, userId]);
    return data;
	  //query DB to see if a like from user exists
    //if so remove like for that post from that user
    //if not do nothing
};