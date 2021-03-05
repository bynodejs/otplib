'use strict';

const db = require('../db');
const { createOTP, verifyOTP } = require('../lib/otplib');
const { createQRCode } = require('../lib/qrcode');
const { sendMail } = require('../lib/mailer');
const { createUser, createUserOTP, loginUser, getUserOTP } = require('../services/users.service');

module.exports = {
    async createUser(req, res, next) {
        try {
            const { id, password, name } = req.body;

            const { secretKey, otpURI } = await createOTP(id);
            const pngFile = await createQRCode(id, otpURI);

            try {
                await db.query('BEGIN')
                await createUser(id, password, name);
                await createUserOTP(id, secretKey);
                await sendMail(id, pngFile);
                await db.query('COMMIT');

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

            const user = await loginUser(id, password);
            if (!user) throw new Error(401, 'Not Found User');

            const userOTP = await getUserOTP(id);
            if (!userOTP) throw new Error(401, 'Not Found User OTP');

            const otpVerify = await verifyOTP(otp, userOTP.secretKey);
            if (!otpVerify) throw new Error(403, 'OTP Verification failure');

            res.sendStatus(200);
        } catch (error) {
            next(error);
        }
    }
};
