const knex = require('knex');
const configration = require('../../knexfile');

const con = knex(configration.development);

module.exports = con;