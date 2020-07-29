const db = require('../config/db-config');

module.exports = { createUser };

function createUser(user) {
    return db('users').insert(user, ['id', 'email']);
}
