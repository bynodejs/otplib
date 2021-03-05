'use strict';

const { authenticator } = require('@otplib/preset-default');

/**
 * @method createOTP
 * @description create OTP SecretKey
 */
exports.createOTP = (id) => {
    const secretKey = authenticator.generateSecret();
    authenticator.options = { window: 3 };
    const otpURI = authenticator.keyuri(id, 'otplib-test', secretKey);

    return { secretKey, otpURI };
};

/**
 * @method verifyOTP
 * @description verify OTP
 */
exports.verifyOTP = (token, secret) => {
    return authenticator.verify({ token, secret });
};
