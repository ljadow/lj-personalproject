const client = require("../client")
// const util = require('../util');

//join table
const getAllUsers = async () => {
    try {
        const { rows } = await client.query(
            `
                SELECT us.user_id as user_id, us.first_name as user_fn, us.last_name as user_ln, gr.group_id as group_id, gr.name as group_name, gr.type as group_type
                FROM users us INNER JOIN groups gr ON us.group_id=gr.group_id
            `
        )
        return rows;
    } catch (error) {
        throw error
    }
}

module.exports = { getAllUsers }