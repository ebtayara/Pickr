const express = require('express')
const asyncHandler = require('express-async-handler')
const { requireAuth } = require('../../utils/auth')
const { User, Comment } = require('../../db/models');
const router = express.Router();

router.post('/:photoId)', requireAuth, asyncHandler(async (req, res) => {
  const {photoId} = req.params
  // const photoId = parsInt(req.params.id, 10)
  const {body, userId} = req.body
  const newComment = await Comment.create({
      body,
      userId,
      photoId,
  })
  const comment = await Comment.findByPk(newComment.id, {
      include: User
  })
  return res.json(comment)
}));

router.get('/:photoId', asyncHandler(async (req, res) => {
  const {photoId} = req.params
  const comments = await Comment.findAll({
      where: {photoId},
      include: User
  })
  return res.json(comments)
}));

router.put('/:photoId)', requireAuth, asyncHandler(async (req, res) => {
  const {photoId} = req.params
  const {body} = req.body
  const comment = await Comment.findOne({where: {id: photoId}})
  await comment.update({body})
  return res.json(comment)
}));

router.delete('/:userId)', requireAuth, asyncHandler(async (req, res) => {
  const {commentId} = req.params
  const comment = await Comment.findByPk(commentId)
  await comment.destroy()
}));

module.exports = router;
