/**
 * Created by archana on 29/08/16.
 */
'use strict';

var config = require('../../config/');
var AWS = require('aws-sdk');
var multer = require('multer');
var multerS3 = require('multer-s3')
AWS.config.update({
    accessKeyId: config.s3.accessKeyId,
    secretAccessKey: config.s3.secretAccessKey,
});
var s3 = new AWS.S3();

exports.uploadFileToS3 = multer({
    storage: multerS3({
        s3: s3,
        bucket: config.s3.Bucket,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        acl: 'public-read',
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
        }
    })
});
