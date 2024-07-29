/**
 * Module to perform CRUD opertations on database for users resources
 * @module models/users
 */

/**Import database helper module to query database */
const db = require('../helpers/database');

const bcrypt = require('bcrypt');
const saltRounds = 10;

/**
 * Async function that returns confirmation of succesful insert into database
 * @param {object} user - A user object containing all new user details
 * @returns {object} - Object with size>0 if user created succesfully
 */
exports.createUser = async function createUser(user) {
    let query = "INSERT INTO users SET ?";
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    user.password = hashedPassword;
    let data = await db.run_query(query, user);
    return data;
};

/**
 * Async function that returns users details based on id
 * @param {number} id The id of the user, taken from URL
 * @returns {object} - An indexable sql object containing users details
 */
exports.getUserById = async function getUserById (id) {
    let query = "SELECT * FROM users WHERE ID = ?";
    let values = [id];
    let data = await db.run_query(query, values);
    return data;
};

/**
 * Async functiion that returns users data based on username
 * @param {string} username Username of the user
 * @returns {object} An indexable sql object containing users details
 */
exports.getUserByUsername = async function getUserbyUsername (username) {
    let query = "SELECT * FROM users WHERE username = ?";
    let values = [username];
    let data = await db.run_query(query, values);
    return data;
}

/**
 * Async function that returns all users data
 * @returns {object} - An indexable sql object containing users details
 */
exports.getAllUsers = async function getAllUsers() {
    let query = "SELECT * FROM users;";
    let data = await db.run_query(query);
    return data;
};

/**
 * Async function that returns confirmation of succesful update
 * @param {object} user - Object containing details to update
 * @param {number} id - The users ID
 * @returns {object} - Object with size>0 if user updated succesfully
 */
exports.updateUser = async function updateUser(user, id){
    let query = "UPDATE users SET ? WHERE ID = ?";
    let values = [user, id];
    let data = await db.run_query(query, values);
    return data;
};

/**
 * Async function that returns confirmation of succesful delete
 * @param {number} id - The users ID
 * @returns {object} - Object with size>0 if user created succesfully
 */
exports.deleteUser = async function deleteUser(id) {
    let query = "DELETE FROM users WHERE ID = ?";
    let data = await db.run_query(query, id);
    return data
};