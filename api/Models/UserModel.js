const db = require('../config/db-config');

module.exports = {
    createUser,
    getUserByEmail,
    getUsersToBeApproved,
    approveUser,
    getAllUsers,
};

function createUser(user) {
    return db('users').insert(user, ['id', 'email']);
}

function getUserByEmail(email) {
    return db('users').where({ email }).first();
}

function getUsersToBeApproved() {
    return db('users').where({ approved: false });
}

function approveUser(id) {
    return db('users')
        .where({ id, approved: false })
        .update({ approved: true }, ['id'])
        .then(() => {
            return getUsersToBeApproved();
        })
        .catch((error) => {
            return error.message;
        });
}

function getAllUsers() {
    return db.select('id', 'email', 'admin', 'approved').from('users');
}
