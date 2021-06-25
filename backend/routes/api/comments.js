const express = require('express')
const asyncHandler = require('express-async-handler')
const { requireAuth } = require('../../utils/auth')
const { User, Comment } = require('../../db/models');
const router = express.Router();

router.post('/:photoId', requireAuth, asyncHandler(async (req, res) => {
  // const {photoId} = req.params
  const photoId = parseInt(req.params.photoId, 10)
  // console.log('************', req.body)
  const {textfield, userId} = req.body
  // console.log('--------', textfield)
  const newComment = await Comment.create({
      textfield,
      userId,
      photoId,
  })
  const comment = await Comment.findByPk(newComment.id, {
      include: User
  })
  return res.json(comment)
}));

router.get('/:photoId', asyncHandler(async (req, res) => {
  // const {photoId} = req.params
  const photoId = parseInt(req.params.photoId, 10)
  const comments = await Comment.findAll({
      where: {photoId},
      include: User
  })
  return res.json(comments)
}));

router.put('/:photoId', requireAuth, asyncHandler(async (req, res) => {
  // const {photoId} = req.params
  const photoId = parseInt(req.params.photoId, 10)
  const {textfield} = req.body
  const comment = await Comment.findOne({where: {id: photoId}})
  await comment.update({textfield})
  return res.json(comment)
}));

router.delete('/:userId', requireAuth, asyncHandler(async (req, res) => {
  // const {commentId} = req.params
  const commentId = parseInt(req.params.commentId, 10)
  const comment = await Comment.findByPk(commentId)
  await comment.destroy()
}));

module.exports = router;
