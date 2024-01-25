const client = require("../client")
// const util = require('../util');

//join table
const getAllUsers = async () => {
    try {
        const { rows } = await client.query(
            `
                SELECT us.user_id as user_id, us.first_name as user_fn, us.last_name as user_ln, gr.group_id as group_id, gr.name as group_name, gr.type as group_type
                FROM users us LEFT JOIN groups gr ON us.group_id=gr.group_id
                ORDER BY gr.group_id, us.first_name
            `
        )
        return rows;
    } catch (error) {
        throw error
    }
}

const getAllUsersByGroupId = async (group_id) => {
    try {
        const { rows } = await client.query(
            `
                SELECT us.user_id as user_id, us.first_name as user_fn, us.last_name as user_ln
                FROM users us RIGHT JOIN groups gr ON us.group_id=gr.group_id
                WHERE gr.group_id=${group_id}
            `
        )
        return rows;
    } catch (error) {
        throw error
    }
}

const getUserCountByGroup = async () => {
    try {
        const { rows } = await client.query(
            `
                SELECT gr.group_id as group_id, gr.name as group_name, gr.type as group_type, COUNT(us.user_id) as num_users
                FROM users us RIGHT JOIN groups gr ON us.group_id=gr.group_id
                GROUP BY gr.group_id
                ORDER BY 4 desc, 2 asc;
            `
        )
        return rows;
    } catch (error) {
        throw error
    }
}

module.exports = { getAllUsers, getAllUsersByGroupId, getUserCountByGroup }