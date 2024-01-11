const client = require('./client');

// drop tables for tasks, locations, users, and groups
async function dropTables() {
    try {
        console.log('Dropping All Tables...');
        await client.query(`
      DROP TABLE IF EXISTS tasks;
      DROP TABLE IF EXISTS locations;
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS groups;
    `);
    } catch (error) {
        throw error;
    }
}

// build tables for tasks, locations, users, and groups
async function createTables() {
    try {
        console.log('Building All Tables...');
        await client.query(`
      CREATE TABLE tasks (
        task_id SERIAL PRIMARY KEY,
        assigned_to INTEGER NOT NULL,
        title VARCHAR(50) NOT NULL,
        details TEXT NOT NULL,
        priority INTEGER NOT NULL,
        tasktype VARCHAR(50) NOT NULL,
        deadline DATE NOT NULL,
        created DATE NOT NULL,
        location_id INTEGER
        );
        CREATE TABLE users (
            user_id SERIAL PRIMARY KEY,
            firstname VARCHAR(50) NOT NULL,
            lastname VARCHAR(50) NOT NULL,
            group_id INTEGER NOT NULL,
            );
            CREATE TABLE groups (
                group_id SERIAL PRIMARY KEY,
                name VARCHAR(50) NOT NULL,
                type VARCHAR(50) NOT NULL,
                );
                CREATE TABLE locations (
                    location_id SERIAL PRIMARY KEY,
                    street VARCHAR(150) NOT NULL,
                    city VARCHAR(100) NOT NULL,
                    state CHAR(2) NOT NULL,
                    zipcode INTEGER(5) NOT NULL
                    );
        `);
    } catch (error) {
        throw error;
    }
}

// create initial data for all tables (4)
async function createInitialData() {
    try {
        console.log('Creating Initial Data...');
        await client.query(`
      INSERT INTO tasks (assigned_to, title, details, priority, task_type, deadline, created, location_id)
      VALUES
        (3, 'vacuum apartment', 'charge vacuum beforehand', 2, 'chore', '30-01-2024','10-01-2024', 1),
        (3, 'do homework', 'check canvas for assignments', 1, 'work', '20-01-2024','10-01-2024', 1),
        (2, 'QA Lindsay's homework', 'make sure homework deadline is met', 1, 'work', '15-02-2024','10-01-2024', 2)`
        );
        await client.query(`
        INSERT INTO users (first_name, last_name, group_id)
        VALUES
        ('Lindsay', 'Jadow', 1),
        ('Mom', 'Jadow', 1),
        ('Nick', 'Friend', 2),
        ('Julia', 'Friend', 2)`
        );
        await client.query(`
        INSERT INTO groups (name, type)
        VALUES
        ('Jadow', 'family'),
        ('Friends', 'friends'),
        ('GHP', 'work')
        `
        );
        await client.query(`
        INSERT INTO locations (street, city, state, zip)
        VALUES
        ('444 E 86th ST','New York', 'NY', 10028),
        ('120 Park Ave','New York', 'NY', 10165),
        ('415 Brewer Branch','Mill River', 'MA', 01244)
        `
        );
    } catch (error) {
        throw error;
    }
}

// build all tables and create initial data
async function rebuildDB() {
    try {
        client.connect();
        await dropTables();
        await createTables();
        await createInitialData();
    } catch (error) {
        throw error;
    }
}

module.exports = {
    rebuildDB
};