import './PhotoCard.css';
import {editPhoto, deletePhoto, getPhotos} from '../../store/photos';
import {useDispatch} from 'react-redux';

const PhotoCard = ({photo, user}) => {
    const dispatch = useDispatch();

    const deleteButton = async() => {
        await dispatch(deletePhoto(photo.id))
        dispatch(getPhotos(user.id))
    }

    // const editButton = async() => {
    //     await dispatch(editPhoto(photo.id))
    //     dispatch(getPhotos(user.id))
    // }

    //change onClick for edit to open the modal

    return (
    <div className='img_container'>
        <img className='img' src={photo.image_url}></img>
        <div className='btn_container'>
            <button className='edit_btn' onClick={e => dispatch(editPhoto(photo.id))} type="submit">Edit</button>
            <button className='delete_btn' onClick={e => deleteButton()} type="submit">Delete</button>
        </div>
    </div>
    )
};

export default PhotoCard;
