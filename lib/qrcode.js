'use strict';

const qrcode = require('qrcode');
const base64Img = require('base64-img');
const dateFormat = require('dateformat');

/**
 * @method createQRCode
 * @description create QR Code Image
 */
exports.createQRCode = (id, otpURI) => {
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
