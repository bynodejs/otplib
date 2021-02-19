'use strict';

const qrcode = require('qrcode');
const base64Img = require('base64-img');
const dateFormat = require('dateformat');
const { authenticator } = require('@otplib/preset-default');

/**
 * @method qrCodeKey
 * @description create QR Code SecretKey
 */
exports.qrCodeKey = (id) => {
    const secretKey = authenticator.generateSecret();
    authenticator.options = { window: 3 };
    const otpURI = authenticator.keyuri(id, 'otplib-test', secretKey);

    return { secretKey, otpURI };
};

/**
 * @method qrCodeImg
 * @description create QR Code base Image
 */
exports.qrCodeImg = (id, otpURI) => {
    return new Promise((resolve, reject) => {
        qrcode.toDataURL(otpURI, (err, imageURL) => {
            if (err) reject(err);

            const pngPath = './tmp';
            const pngName = `${id}-${dateFormat(new Date(), 'yyyymmddHHMMss')}`;

            base64Img.img(
                imageURL,
                pngPath,
                pngName,
                (err, filePath) => {
                    if (err) reject(err);
                    resolve(filePath)
                }
            )
        })
    })
};
