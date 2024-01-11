const { Client } = require('pg');
const dbName = "taskapp";

const client = new Client(`postgres://localhost:54321/${dbName}`)

module.exports = client;