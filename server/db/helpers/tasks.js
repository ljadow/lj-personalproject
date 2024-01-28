const client = require("../client")
const util = require('../util');

const getAllTasks = async () => {
    try {
        const { rows }
            = await client.query(`
            SELECT *
            FROM tasks
            ORDER BY completed, deadline;
        `)
        return rows
    } catch (error) {
        throw error
    }
}

const getTaskCountbyUser = async () => {
    try {
        const { rows } = await client.query(
            `
                SELECT users.first_name as first, users.last_name as last, COUNT(tasks.task_id) as tasks, users.user_id as id, users.group_id as group_id
                FROM tasks RIGHT JOIN users ON tasks.assigned_to=users.user_id 
                GROUP BY users.first_name, users.last_name, users.user_id, users.group_id
                ORDER BY tasks DESC, users.first_name ASC;
                `
        )
        return rows;
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

const createTask = async ({ completed, assigned_to, title, details, task_type, deadline}) => {
    try {
        const {
            rows: [tasks],
        } = await client.query(
            `
                INSERT INTO tasks(completed, assigned_to, title, details, task_type, deadline)
                VALUES($1, $2, $3, $4, $5, $6)
                RETURNING *;
            `,
            [completed, assigned_to, title, details, task_type, deadline]
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

module.exports = { getAllTasks, getTaskById, getTasksByUserId, getTaskCountbyUser, createTask, updateTask, deleteTask }