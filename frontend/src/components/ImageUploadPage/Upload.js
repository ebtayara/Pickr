import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {uploadImage, getPhotos} from '../../store/photos';
import PhotoCard from './PhotoCard';
import './Upload.css';

const ImageUpload = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const photos = useSelector((state) => state.photos);
    const [image, setImage] = useState();
    const history = useHistory();
  //useEffect runs our thunk every time a user goes to/refreshes page
    useEffect(() => {
        if(user) {
        dispatch(getPhotos(user.id))
        } else {
        history.push('/')
        }
    },[dispatch])

    if (!user) return null;
    const updateImage = (e) => {
    setImage(e.target.files[0]);
};
    const submitHandler = (e) => {
    e.preventDefault();
    dispatch(uploadImage(image, user.id));
};
    console.log('poop')
    return (
    <>
      <form onSubmit={submitHandler}>
        <label>Upload Image
            <input
            type="file"
            onChange={updateImage}
            />
        </label>
        <button type="submit">Upload</button>
      </form>
      {Object.values(photos).map(photo =>
        <PhotoCard photo={photo} user={user}/>
      )}
      {/* {uploadedImage && <img src={uploadedImage} alt="test" />} */}
    </>
  );
};
export default ImageUpload;
