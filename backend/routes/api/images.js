const express = require('express');
const asyncHandler = require('express-async-handler');
const { Photo, Comment } = require('../../db/models');
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

router.get('/:userId', asyncHandler(async(req, res) => {
    // const {userId} = req.params
    const photos = await Photo.findAll({where:{userId:req.params.userId},
        include: Comment
    })
    return res.json(photos);
}));

router.delete('/:photoId', asyncHandler(async(req, res) => {
    const {photoId} = req.params
    const photo = await Photo.findByPk(photoId)
    await photo.destroy()
    const photos = await Photo.findAll()
    return res.json(photos);
}));

router.put('/:photoId', singleMulterUpload('image'), asyncHandler(async(req, res) => {
    const {photoId} = req.params
    const image_url = await singlePublicFileUpload(req.file)
    const photo = await Photo.findByPk(photoId)
    photo.image_url = image_url
    await photo.save();
    return res.json(photo);
}));

module.exports = router;
