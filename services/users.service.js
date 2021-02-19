'use strict';

const db = require('../db');

module.exports = {
    async createUser(id, password, name) {
        const query = `
            INSERT INTO
                users(
                    id,
                    password,
                    name
                )
            VALUES($1, $2, $3)
        `;

        const value = [id, password, name]

        await db.query(query, value);
    },
    async createUserOTP(id, secretKey) {
        const query = `
            INSERT INTO
                otp(
                    "userID",
                    "secretKey"
                )
            VALUES($1, $2)
        `;

        const value = [id, secretKey]

        await db.query(query, value);
    },
    async loginUser(id, password) {
        const query = `
            SELECT
                id,
                password,
                name
            FROM
                users
            WHERE
                id = $1
            AND
                password = $2
        `;
        const value = [id, password];

        const { rows } = await db.query(query, value);

        if (rows && rows.length) {
            return rows[0];
        }
        return null;
    },
    async getUserOTP(id) {
        const query = `
            SELECT
                "userID",
                "secretKey"
            FROM
                otp
            WHERE
                "userID" = $1
        `;
        const value = [id];

        const { rows } = await db.query(query, value);

        if (rows && rows.length) {
            return rows[0];
        }
        return null;
    }
}
