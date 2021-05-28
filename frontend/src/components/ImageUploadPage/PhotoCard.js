import './PhotoCard.css';
import {editPhoto, deletePhoto, getPhotos} from '../../store/photos';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';

const PhotoCard = ({photo, user}) => {
    const dispatch = useDispatch();

    const deleteButton = async() => {
        await dispatch(deletePhoto(photo.id))
        dispatch(getPhotos(user.id))
    }

    const history = useHistory();
    const editButton = async() => {
        let path = `/edit/${photo.id}`
        history.push(path)
    };
    //change onClick for edit to open the modal?

    return (
    <div className='img_container'>
        <img className='img' src={photo.image_url}></img>
        <div className='btn_container'>
            <button className='edit_btn' onClick={e => editButton()} type="submit">Edit</button>
            <button className='delete_btn' onClick={e => deleteButton()} type="submit">Delete</button>
        </div>
    </div>
    )
};

export default PhotoCard;
