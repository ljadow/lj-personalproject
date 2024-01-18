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
        CREATE TABLE groups (
            group_id SERIAL PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            type VARCHAR(50) NOT NULL
        );
        CREATE TABLE users (
            user_id SERIAL PRIMARY KEY,
            first_name VARCHAR(50) NOT NULL,
            last_name VARCHAR(50) NOT NULL,
            group_id INTEGER REFERENCES groups(group_id) NOT NULL
        );
        CREATE TABLE locations (
            location_id SERIAL PRIMARY KEY,
            street VARCHAR(150) NOT NULL,
            city VARCHAR(100) NOT NULL,
            state CHAR(2) NOT NULL,
            zipcode INTEGER NOT NULL
        );
        CREATE TABLE tasks (
            task_id SERIAL PRIMARY KEY,
            completed BOOLEAN DEFAULT false,
            assigned_to INTEGER REFERENCES users(user_id) NOT NULL,
            title VARCHAR(50) NOT NULL,
            details TEXT,
            task_type VARCHAR(50),
            deadline DATE NOT NULL,
            location_id INTEGER REFERENCES locations(location_id)
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
        INSERT INTO groups (name, type)
        VALUES
        ('Jadow', 'family'),
        ('Friends', 'friends'),
        ('GHP', 'work')
        `);
        console.log("did groups");
        await client.query(`
        INSERT INTO users (first_name, last_name, group_id)
        VALUES
        ('Lindsay', 'Jadow', 1),
        ('Mom', 'Jadow', 1),
        ('Nick', 'Friend', 2),
        ('Julia', 'Friend', 2)
        `);
        console.log("did users");
        await client.query(`
        INSERT INTO locations (street, city, state, zipcode)
        VALUES
        ('None','','',0),
        ('444 E 86th ST','New York', 'NY', 10028),
        ('120 Park Ave','New York', 'NY', 10165),
        ('415 Brewer Branch','Mill River', 'MA', 01244)
        `);
        console.log("did locations");
        await client.query(`
        INSERT INTO tasks (assigned_to, completed, title, details, task_type, deadline, location_id)
        VALUES
        (3, false, 'vacuum apartment', 'charge vacuum beforehand', 'chore', '2024-01-30', 1),
        (3, true, 'do homework', 'check canvas for assignments', 'work', '2024-01-20', 1),
        (2, false, 'QA Lindsays homework', 'make sure homework deadline is met', 'work', '2024-02-15', 2)
        `);
        console.log("did tasks");
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

//init the rebuild function and build tables
rebuildDB()
  .catch(console.error)
  .finally(() => client.end());
