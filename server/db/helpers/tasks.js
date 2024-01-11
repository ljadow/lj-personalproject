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

const createTask = async ({ assigned_to, title, details, priority, task_type, deadline, created, location_id }) => {
    try {
        const {
            rows: [tasks],
        } = await client.query (
            `
                INSERT INTO tasks(assigned_to, title, details, priority, task_type, deadline, created, location_id)
                VALUES($1, $2, $3, $4, $5, $6, $7, $8)
                RETURNING *;
            `,
            [assigned_to, title, details, priority, task_type, deadline, created, location_id]
        )
        return tasks
    } catch (error) {
        throw error
    }
}

async function deleteTask(task_id) {
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

module.exports = { getAllTasks, getTaskById, createTask, deleteTask }