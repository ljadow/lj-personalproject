const client = require("../client")
const util = require('../util');

const getAllUsers = async () => {
    try {
        const { rows }
            = await client.query(`
            SELECT *
            FROM users;
        `)
        return rows
    } catch (error) {
        throw error
    }
}

const getUserById = async (user_id) => {
    try {
        const {
            rows: [users]
        } = await client.query(
            `
                SELECT *
                FROM users
                WHERE user_id =${user_id};
            `
        )
        return users;
    } catch (error) {
        throw error
    }
}

const createUser = async (body) => {
    try {
        const { rows: [users] } = await client.query(
            `INSERT INTO users (first_name, last_name, group_id)
            VALUES($1, $2, $3)
            RETURNING *;
            `,
            [body.first_name, body.last_name, body.group_id]
        );
        return users;
    } catch (error) {
        throw error
    }
}

const updateUser = async (id, fields = {}) => {
    const setString = Object.keys(fields).map((key, index) => `"${key}"=$${index + 1}`).join(', ');
    if (setString.length === 0) {
        return;
    }
    try {
        const { rows: [users] } = await client.query(`
            UPDATE users
            SET ${setString}
            WHERE user_id=${id}
            RETURNING *;
        `, Object.values(fields));
        return users;
    } catch (error) {
        throw error;
    }
}

const deleteUser = async (user_id) => {
    try {
        const { rows } = await client.query(
            `
        DELETE FROM users 
        WHERE user_id=$1 
        RETURNING *
        `, [user_id]);
        return rows[0];
    } catch (err) {
        throw err
    }
}

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser }