const AWS = require('aws-sdk');

const ID = process.env.AWS_ID;
const SECRET = process.env.AWS_SECRET;
const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;

const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});

const uploadFile = (file) => {
    return new Promise( (resolve, reject) => {
        newName = Date.now().toString(36) + file.originalname
        const params = {
            Bucket: BUCKET_NAME,
            Key: newName,
            Body: file.buffer
        };
        s3.upload(params, function(err, data) {
            if (err) {
                reject(err)
            }
            console.log(`uploaded file --> ${data.Location}`);
            resolve(data.Location)
        });
    });
};

module.exports.uploadFile = uploadFile;