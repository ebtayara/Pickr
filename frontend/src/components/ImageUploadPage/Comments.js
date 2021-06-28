import {useEffect, useState} from 'react';
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
    const [textfield, setBody] = useState('')
    const [newComment, setNewComment] = useState('')
    const [showForm, setShowForm] = useState(false)
    const [formId, setFormId] = useState(null)

    useEffect(() => {
        dispatch(getComments(photoId))
    }, [dispatch, photoId]);

    // console.log('Look at me!', comments)

    const userComment = async (e) => {
        e.preventDefault()
        dispatch(createComment({
            textfield: newComment,
            userId: user.id,
            photoId
        }))
        setNewComment('')
    };

    const updateComment = async (commentId, textfield, e) => {
        e.preventDefault()
        await dispatch(editComment(textfield, commentId))
        setBody('')
        setShowForm(false)
    };

    const deleteComment = (commentId) => {
        let alert = window.confirm('Are you sure you want to delete?')
        if (alert) {
            dispatch(removeComment(commentId))
            // console.log('DELETE THUNK', commentId)
            history.push(`/comment/${photoId}`)
        }
    };

    const openForm = (comment) => {
        setShowForm(true)
        setBody(comment.textfield)
        setFormId(comment.id)
    };

    if (!user) history.push('/');

    // if (!comments) {
    //     return (
    //         <div>
    //             <h1>No Comments!</h1>
    //         </div>
    //     )
    // };

return (
    <div>
        {comments &&
        Object.values(comments)?.map(comment => {
            return (
                <div key={comment.id} className='commentsContainer'>
                    <div>
                        <div>
                            <p>{comment.User?.firstName}</p>
                            <p>{comment.textfield}</p>
                            {user.id === comment.userId && (
                                <div>
                                    <div className='editButtonContainer'>
                                    <button className='editButton' onClick={() => openForm(comment)}>
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    </div>
                                    {showForm && comment.id === formId ?
                                        <form onSubmit={(e) => updateComment(comment.id, textfield, e)} key={comment.id}>
                                            <input type="text" value={textfield} onChange={(e) => setBody(e.target.value)} />
                                            <button className='editComment' type='submit' onSubmit={(e) => updateComment(comment.id, textfield, e)}>edit</button>
                                            <button className='deleteComment' onClick={() => deleteComment(comment.id)}>delete</button>
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
                    <button className='submitButton' type='submit'>Submit</button>

                </div>
            </form>
        </div>
    </div>
    )
}

export default Comments;
