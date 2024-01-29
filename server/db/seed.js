const client = require('./client');

// drop tables for tasks, users, and groups
async function dropTables() {
    try {
        console.log('Dropping All Tables...');
        await client.query(`
        DROP TABLE IF EXISTS admins;
        DROP TABLE IF EXISTS tasks;
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS groups;
    `);
    } catch (error) {
        throw error;
    }
}

// build tables for tasks, users, and groups
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
        CREATE TABLE tasks (
            task_id SERIAL PRIMARY KEY,
            completed BOOLEAN DEFAULT false NOT NULL,
            assigned_to INTEGER REFERENCES users(user_id) NOT NULL,
            title VARCHAR(50) NOT NULL,
            details TEXT,
            task_type VARCHAR(50),
            deadline DATE NOT NULL
        );
        CREATE TABLE admins (
            admin_id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
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
        INSERT INTO tasks (assigned_to, completed, title, details, task_type, deadline)
        VALUES
        (3, false, 'vacuum apartment', 'charge vacuum beforehand', 'chore', '2024-01-30'),
        (3, true, 'do homework', 'check canvas for assignments', 'work', '2024-01-20'),
        (2, false, 'QA Lindsays homework', 'make sure homework deadline is met', 'work', '2024-02-15')
        `);
        console.log("did tasks");
        await client.query(`
        INSERT INTO admins (username, password)
        VALUES
        ('admin1', '$2b$10$G1lU6l2.r93lyLPmWOytWuaa7dpekF0wXxYYLfYuIif3gMM7sFZA.')
        `);
        console.log("did admins");
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
