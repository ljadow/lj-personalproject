const client = require("../client")
const util = require('../util');

const getAllTasks = async () => {
    try {
        const { rows }
            = await client.query(`
            SELECT *
            FROM tasks;
        `)
        return rows
    } catch (error) {
        throw error
    }
}

const getTaskById = async (task_id) => {
    try {
        const {
            rows: [tasks]
        } = await client.query(
            `
                SELECT *
                FROM tasks
                WHERE task_id =${task_id};
            `
        )
        return tasks;
    } catch (error) {
        throw error
    }
}

const getTasksByUserId = async (user_id) => {
    try {
        const { rows } = await client.query(
            `
                SELECT *
                FROM tasks
                WHERE assigned_to=${user_id};
            `
        )
        return rows;
    } catch (error) {
        throw error
    }
}


const createTask = async ({ completed, assigned_to, title, details, task_type, deadline, location_id }) => {
    try {
        const {
            rows: [tasks],
        } = await client.query (
            `
                INSERT INTO tasks(completed, assigned_to, title, details, task_type, deadline, location_id)
                VALUES($1, $2, $3, $4, $5, $6, $7)
                RETURNING *;
            `,
            [completed, assigned_to, title, details, task_type, deadline, location_id]
        )
        return tasks
    } catch (error) {
        throw error
    }
}

const updateTask = async (id, fields = {}) => {
    const setString = Object.keys(fields).map((key, index) => `"${key}"=$${index + 1}`).join(', ');
    if (setString.length === 0) {
        return;
    }
    try {
        const { rows: [tasks] } = await client.query(`
            UPDATE tasks
            SET ${setString}
            WHERE task_id=${id}
            RETURNING *;
        `, Object.values(fields));
        return tasks;
    } catch (error) {
        throw error;
    }
}

const deleteTask = async (task_id) => {
    try {
        const { rows } = await client.query(
        `
        DELETE FROM tasks 
        WHERE task_id=$1 
        RETURNING *
        `, [task_id]);
        return rows[0];
    } catch (err) {
        throw err
    }
}

module.exports = { getAllTasks, getTaskById, getTasksByUserId, createTask, updateTask, deleteTask }