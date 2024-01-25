const client = require('../client')

const createAdmin = async ({ username, password }) => {
    try {
        const {
            rows: [admin],
            //INSERT SQL query
        } = await client.query(
            // INSERT INTO table(column1, column2, column3)
            // VALUES(var1, var2, var3)
            // RETURNING everything
            `
                INSERT INTO admins(username, password)
                VALUES($1, $2)
                RETURNING *;
            `,
            //Kind of like a dependency array, hooks up the parameters to the dolla dolla variables
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