const express = require('express');
const asyncHandler = require('express-async-handler');
const { Photo } = require('../../db/models');
const router = express.Router();
const {singleMulterUpload, singlePublicFileUpload } = require('../../awsS3');

router.post('/', singleMulterUpload('image'), asyncHandler(async(req, res) => {
    const image_url = await singlePublicFileUpload(req.file)
    const newImage = await Photo.create({
        userId: req.body.userId,
        image_url
    })
    return res.json(newImage);
}));

module.exports = router;
