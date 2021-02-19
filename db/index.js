'use strict';

const config = require('config');
const { Pool } = require('pg');
const pool = new Pool({
    host: config.get('dbConfig.host'),
    port: config.get('dbConfig.port'),
    user: config.get('dbConfig.user'),
    password: config.get('dbConfig.password'),
    database: config.get('dbConfig.database')
});

exports.query = (query, values) => pool.query(query, values);
