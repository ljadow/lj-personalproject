const client = require("../client")
// const util = require('../util');

const getAllGroups = async () => {
    try {
        const { rows }
            = await client.query(`
            SELECT *
            FROM groups;
        `)
        return rows
    } catch (error) {
        throw error
    }
}

const getGroupById = async (group_id) => {
    try {
        const {
            rows: [groups]
        } = await client.query(
            `
                SELECT *
                FROM groups
                WHERE group_id =${group_id};
            `
        )
        return groups;
    } catch (error) {
        throw error
    }
}

const createGroup = async ({ name, type }) => {
    try {
        const {
            rows: [groups],
        } = await client.query(
            `
                INSERT INTO groups(name, type)
                VALUES($1, $2)
                RETURNING *;
            `,
            [name, type]
        )
        return groups
    } catch (error) {
        throw error
    }
}

const updateGroup = async (id, fields = {}) => {
    const setString = Object.keys(fields).map((key, index) => `"${key}"=$${index + 1}`).join(', ');
    if (setString.length === 0) {
        return;
    }
    try {
        const { rows: [groups] } = await client.query(`
            UPDATE groups
            SET ${setString}
            WHERE group_id=${id}
            RETURNING *;
        `, Object.values(fields));
        return groups;
    } catch (error) {
        throw error;
    }
}

const deleteGroup = async (group_id) => {
    try {
        const { rows } = await client.query(
        `
        DELETE FROM groups 
        WHERE group_id=$1 
        RETURNING *
        `, [group_id]);
        return rows[0];
    } catch (err) {
        throw err
    }
}

module.exports = { getAllGroups, getGroupById, createGroup, updateGroup, deleteGroup }