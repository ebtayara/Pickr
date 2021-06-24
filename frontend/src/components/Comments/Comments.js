import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams, useHistory} from 'react-router-dom';
import {getComments, createComment, editComment, removeComment} from '../../store/comments';
import './Comments.css';

function Comments() {
  const history = useHistory()
  const dispatch = useDispatch()
  const {photoId} = useParams()
  const user = useSelector(state => state.session.user)
  const comments = useSelector(state => state.comments)
  const [body, setBody] = useState('')
  const [newComment, setNewComment] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [formId, setFormId] = useState(null)

  useEffect(() => {
      dispatch(getComments(photoId))
  }, [dispatch, photoId]);

  const userComment = async (e) => {
      e.preventDefault()
      dispatch(createComment({
          body: newComment,
          userId: user.id,
          photoId
      }))
      setNewComment('')
  };

  const updateComment = async (commentId, body, e) => {
      e.preventDefault()
      await dispatch(editComment(body, commentId))
      setBody('')
      setShowForm(false)
  };

  const deleteComment = (photoId) => {
      let alert = window.confirm('Are you sure you want to delete?')
      if (alert) {
          dispatch(removeComment(photoId))
      }
  };

  const openForm = (comment) => {
      setShowForm(true)
      setBody(comment.body)
      setFormId(comment.id)
  };

  if (!user) history.push('/');

  return (
      <div>
          {Object.values(comments).map(comment => {
              return (
                  <div key={comment.id} className='comments-container'>
                      <div>
                          <div>
                              <p>{comment.User?.firstName}</p>
                              <p>{comment.body}</p>
                              {user.id === comment.userId && (
                                  <div>
                                      <button className='boton-comentario' onClick={() => openForm(comment)} >Edit Comment</button>

                                      {showForm && comment.id === formId ?
                                          <form onSubmit={(e) => updateComment(comment.id, body, e)} key={comment.id}>
                                              <input type="text" value={body} onChange={(e) => setBody(e.target.value)} />
                                              <button className='buton-plane' type='submit' onSubmit={(e) => updateComment(comment.id, body, e)}>
                                                  <i className="fas fa-paper-plane"></i></button>
                                              <button className="buton-plane" onClick={() => deleteComment(comment.id)}><i className="fas fa-trash-restore-alt"></i></button>
                                          </form>
                                          : null}
                                  </div>
                              )}
                          </div>
                      </div>
                  </div>
              )
          })}
          <div>
              <form onSubmit={userComment}>
                  <textarea className='text-area-comment' value={newComment} onChange={(e) => setNewComment(e.target.value)} cols="30" rows="10"></textarea>
                  <div>
                      <button className='boton-comentario' type='submit'>Submit</button>

                  </div>
              </form>
          </div>
      </div>
  )
}

export default Comments;
