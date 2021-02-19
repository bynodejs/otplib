'use strict';

const db = require('../db');
const { qrCodeKey, qrCodeImg } = require('../lib/qrcode');
const { sendMail } = require('../lib/mailer');
const { authenticator } = require('otplib');
const { createUser, createUserOTP, loginUser, getUserOTP } = require('../services/users.service');

const verifyOTP = (token, secret) => {
    return authenticator.verify({ token, secret });
};

module.exports = {
    async createUser(req, res, next) {
        try {
            const { id, password, name } = req.body;

            const { secretKey, otpURI } = await qrCodeKey(id);
            const pngFile = await qrCodeImg(id, otpURI);

            try {
                await db.query('BEGIN')
                await createUser(id, password, name);
                await createUserOTP(id, secretKey);
                await db.query('COMMIT');

                await sendMail(id, pngFile);
                res.sendStatus(201);
            } catch (error) {
                await db.query('ROLLBACK');
                throw error;
            }
        } catch (error) {
            next(error);
        }
    },
    async loginUser(req, res, next) {
        try {
            const { id, password, otp } = req.body;

            const users = await loginUser(id, password);
            if (!users) res.sendStatus(401);

            const userOTP = await getUserOTP(id);
            if (!userOTP) {
                res.sendStatus(401);
                return;
            }
            if (!verifyOTP(otp, userOTP.secretKey)) {
                res.sendStatus(403);
                return;
            }

            res.sendStatus(200);
        } catch (error) {
            next(error);
        }
    }
};
