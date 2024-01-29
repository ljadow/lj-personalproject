const client = require('../client')

const createAdmin = async ({ username, password }) => {
    try {
        const {
            rows: [admin],
        } = await client.query(
            `
                INSERT INTO admins(username, password)
                VALUES($1, $2)
                RETURNING *;
            `,
            [username, password]
        )
        return admin
    } catch (error) {
        throw error
    }
}

const getAllAdmins = async () => {
    try {
        const { rows }
            = await client.query(`
            SELECT *
            FROM admins;
        `)
        return rows
    } catch (error) {
        throw error
    }
}

const getAdminbyUsername = async (username) => {
    try {
        const {
            rows: [admin],
        } = await client.query(
            `
      SELECT * 
      FROM admins
      WHERE admins.username = '${username}';
      `
        );
        return admin;
    }
    catch (error) {
        console.error("error logging in: ", error)
        throw new Error(`failed to login: ${error.message}`)
    }
};

module.exports = { createAdmin, getAllAdmins, getAdminbyUsername }