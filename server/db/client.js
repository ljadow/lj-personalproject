const { Client } = require('pg');
const dbName = "taskapp";

const client = new Client(`postgres://tasklist_api_user:pSTEjcvbg9CY8ZmoDtjHuW46enxX3gHa@dpg-cmrchd021fec739r2r4g-a/tasklist_api`)
// const client = new Client(`https://localhost:54321/${dbName}`)

module.exports = client;