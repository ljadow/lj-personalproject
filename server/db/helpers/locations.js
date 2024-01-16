const client = require("../client")
// const util = require('../util');

const getAllLocations = async () => {
    try {
        const { rows }
            = await client.query(`
            SELECT *
            FROM locations;
        `)
        return rows
    } catch (error) {
        throw error
    }
}

const getLocationById = async (location_id) => {
    try {
        const {
            rows: [locations]
        } = await client.query(
            `
                SELECT *
                FROM locations
                WHERE location_id =${location_id};
            `
        )
        return locations;
    } catch (error) {
        throw error
    }
}

const createLocation = async ({ street, city, state, zipcode }) => {
    try {
        const {
            rows: [locations],
        } = await client.query(
            `
                INSERT INTO locations(street, city, state, zipcode)
                VALUES($1, $2, $3, $4)
                RETURNING *;
            `,
            [street, city, state, zipcode]
        )
        return locations
    } catch (error) {
        throw error
    }
}

const updateLocation = async (id, fields = {}) => {
    const setString = Object.keys(fields).map((key, index) => `"${key}"=$${index + 1}`).join(', ');
    if (setString.length === 0) {
        return;
    }
    try {
        const { rows: [locations] } = await client.query(`
            UPDATE locations
            SET ${setString}
            WHERE location_id=${id}
            RETURNING *;
        `, Object.values(fields));
        return locations;
    } catch (error) {
        throw error;
    }
}

const deleteLocation = async (location_id) => {
    try {
        const { rows } = await client.query(
        `
        DELETE FROM locations 
        WHERE location_id=$1 
        RETURNING *
        `, [location_id]);
        return rows[0];
    } catch (err) {
        throw err
    }
}

module.exports = { getAllLocations, getLocationById, createLocation, updateLocation, deleteLocation }