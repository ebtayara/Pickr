import './PhotoCard.css';
import {useState} from 'react';
import {deletePhoto, getPhotos} from '../../store/photos';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import {createComment} from '../../store/comments'



const PhotoCard = ({photo, user}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {photoId} = useParams()
    // const user = useSelector(state => state.session.user)
    // const comments = useSelector(state => state.comments)
    // const [body, setBody] = useState('')
    const [newComment, setNewComment] = useState('')
    // const [showForm, setShowForm] = useState(false)
    // const [formId, setFormId] = useState(null)

    const editButton = async() => {
        let path = `/edit/${photo.id}`
        history.push(path)
    };

    const deleteButton = (e) => {
        e.preventDefault()
        dispatch(deletePhoto(photo.id))
        dispatch(getPhotos(user.id))
        history.push('/upload')
    };

    const commentButton = async (e) => {
        e.preventDefault()
        dispatch(createComment({
            body: newComment,
            userId: user.id,
            photoId
        }))
        setNewComment('')
    };

    return (
    <div className='img_container'>
        <img className='img' src={photo?.image_url}></img>
        <div className='btn_container'>
            <button className='edit_btn' onClick={editButton} type="submit">Edit</button>
            <button className='delete_btn' onClick={deleteButton} type="submit">Delete</button>
            <button className='comment_btn' onClick={commentButton} type="submit">Add Comment</button>
        </div>
    </div>
    )
};

export default PhotoCard;
