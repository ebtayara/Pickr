import './PhotoCard.css';
import {deletePhoto, getPhotos} from '../../store/photos';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
// import {createComment} from '../../store/comments';

const PhotoCard = ({photo, user}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const editButton = () => {
        let path = `/edit/${photo.id}`
        history.push(path)
    };

    const commentButton = (e) => {
        let path = `/comment/${photo.id}`
        history.push(path)
    };

    const deleteButton = (e) => {
        e.preventDefault()
        dispatch(deletePhoto(photo.id))
        dispatch(getPhotos(user.id))
        history.push('/upload')
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
