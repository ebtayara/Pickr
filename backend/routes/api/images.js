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







// router.get(
//     '/:id(\\d+)/edit', requireAuth,
//     asyncHandler(async (req, res, next) => {
//         const taskId = parseInt(req.params.id, 10);
//         const task = await Task.findByPk(taskId);
//         res.render('editTask', { task })
//     })
// )

// router.post(
//     '/:id(\\d+)/edit', requireAuth,
//     asyncHandler(async (req, res, next) => {
//         const taskId = parseInt(req.params.id, 10);
//         const task = await Task.findByPk(taskId);
//         const {name, description} = req.body
//         if (task) {
//             await task.update({  name:name, description:description
//     ,userId: res.locals.user.id, completed: false  });
//         res.redirect('/tasks')
//     } else {
//         next(listNotFoundError(taskId));
//         }
//     })
// );

// router.get('/:id(\\d+)/delete', requireAuth,
//     asyncHandler(async (req, res) => {
//         const taskId = parseInt(req.params.id, 10);
//         const task = await Task.findByPk(taskId);
//         res.render('taskDelete', { task });
// }));

// router.post(
//     '/:id(\\d+)/delete',requireAuth,
//     asyncHandler(async (req, res, next) => {
//         const taskId = parseInt(req.params.id, 10);
//         const task = await Task.findByPk(taskId);

//     if (task) {
//         await task.destroy();
//         res.redirect('/tasks')
//     } else {
//         next(taskNotFoundError(taskId));
//         }
//     })
// );

module.exports = router;
