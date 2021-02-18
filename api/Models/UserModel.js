const db = require('../config/db-config');

module.exports = {
    createUser,
    getUserByEmail,
    getUsersToBeApproved,
    approveUser,
    getAllUsers,
    unapproveUser,
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

function unapproveUser(id) {
    return db('users')
        .where({ id, approved: true })
        .update({ approved: false }, ['id'])
        .then(() => {
            return getUsersToBeApproved();
        })
        .catch((error) => {
            return error.message;
        });
}

function getAllUsers() {
    return db
        .select('users.id', 'users.email', 'users.admin', 'users.approved')
        .count('urls.userId')
        .from('users')
        .leftJoin('urls', 'urls.userId', 'users.id')
        .groupBy('users.id');
}
