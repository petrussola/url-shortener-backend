const db = require('../config/db-config');

module.exports = { createUser, getUserByEmail };

function createUser(user) {
    return db('users').insert(user, ['id', 'email']);
}

function getUserByEmail(email) {
    return db('users').where({ email }).first();
}
