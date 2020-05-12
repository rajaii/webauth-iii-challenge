const db = require('../data/db-config.js');

module.exports = {
    find,
    findBy,
    create
}

function find() {
    return db('users').select('username', 'password', 'department');
}

function create(user) {
    return db('users').insert(user);
}

function findBy(filter) {
    return db('users').where({username: filter});
}