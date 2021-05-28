import './PhotoCard.css';
import {editPhoto, deletePhoto, getPhotos} from '../../store/photos';
import {useDispatch} from 'react-redux';
import {useHistory, NavLink} from 'react-router-dom';

const PhotoCard = ({photo, user, newList}) => {
    const dispatch = useDispatch();

    const history = useHistory();

    const deleteButton = async(e) => {
        e.preventDefault()
        await dispatch(deletePhoto(photo.id))
        dispatch(getPhotos(user.id))
        history.push('/')
    }

    const editButton = async() => {
        let path = `/edit/${photo.id}`
        history.push(path)
    };

// return (
//     <div className="cardContainer">
//     {newList.map((photo) => (
//         <div>
//         <NavLink to={`/photos/${photo.id}`}>
//           <div className="card"
//             style={{
//               backgroundImage: `url("${photo.image_url}")`,
//             }}
//           ></div>
//         </NavLink>
//         <div className='btn_container'>
//             <button className='edit_btn' onClick={e => editButton(photo.id)} type="submit">Edit</button>
//             <button className='delete_btn' onClick={deleteButton} type="submit">Delete</button>
//         </div>
//         </div>
//       ))}
//     </div>
//     )

    return (
    <div className='img_container'>
        <img className='img' src={photo.image_url}></img>
        <div className='btn_container'>
            <button className='edit_btn' onClick={editButton} type="submit">Edit</button>
            <button className='delete_btn' onClick={deleteButton} type="submit">Delete</button>
        </div>
    </div>
    )
};

export default PhotoCard;
