const { Client } = require('pg');
const dbName = "taskapp";

const client = new Client(`postgres://tasklist_e7f4_user:eIebfEjpQHE3ADC4cdeXHudAkXq2ruui@dpg-cmrccsol5elc73aik70g-a/tasklist_e7f4`)

module.exports = client;