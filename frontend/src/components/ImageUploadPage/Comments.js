import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams, useHistory} from 'react-router-dom';
import {getComments, createComment, editComment, removeComment} from '../../store/comments';
// import PhotoCard from './PhotoCard';
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

    console.log('Look at me!', comments)

    const userComment = async (e) => {
        e.preventDefault()
        dispatch(createComment({
            textfield: newComment,
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
                <div key={comment.id} className='commentsContainer'>
                    <div>
                        <div>
                            <p>{comment.User?.firstName}</p>
                            <p>{comment.body}</p>
                            {user.id === comment.userId && (
                                <div>
                                    <button onClick={() => openForm(comment)} >Edit Comment</button>
                                    {showForm && comment.id === formId ?
                                        <form onSubmit={(e) => updateComment(comment.id, body, e)} key={comment.id}>
                                            <input type="text" value={body} onChange={(e) => setBody(e.target.value)} />
                                            <button type='submit' onSubmit={(e) => updateComment(comment.id, body, e)}></button>
                                            <button onClick={() => deleteComment(comment.id)}></button>
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
                <textarea className='textArea' value={newComment} onChange={(e) => setNewComment(e.target.value)} cols="30" rows="10"></textarea>
                <div>
                    <button type='submit'>Submit</button>

                </div>
            </form>
        </div>
    </div>
    )
}

export default Comments;
