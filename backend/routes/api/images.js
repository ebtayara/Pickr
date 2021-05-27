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

router.get('/:userId', asyncHandler(async(req, res) => {
    // const {userId} = req.params
    const photos = await Photo.findAll({where:{userId:req.params.userId}})
    return res.json(photos);
}));

router.delete('/:photoId', asyncHandler(async(req, res) => {
    const {photoId} = req.params
    const photo = await Photo.findByPk(photoId)
    photo.destroy()
    const photos = await Photo.findAll()
    return photos;
}));

router.put('/:photoId', asyncHandler(async(req, res) => {
    const {photoId} = req.params.id
    const photo = await Photo.findByPk(photoId)
    photo.image_url = newImage
    photo.save();
    return res.json(photo);
}));

module.exports = router;
