import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import {editPhoto, getPhotos} from '../../store/photos';
import PhotoCard from './PhotoCard';
import './Edit.css';

const Edit = () => {
    const {photoId} = useParams();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const photos = useSelector((state) => Object.values(state.photos));
    const [image, setImage] = useState();
    const history = useHistory();
    const singlePhoto = photos.find((photo) => +photoId === photo.id);
  // console.log('single', singlePhoto);
  //useEffect runs our thunk every time a user goes to refresh page
    useEffect(() => {
        if(user) {
        dispatch(getPhotos(user.id))
        } else {
        history.push('/')
        }
    },[user, dispatch, history])

    const list = useSelector((state) => {
        // console.log(state);
        return state.photos
    })

    const newList = []
    for (let key in list) {
        newList.push(list[key])
    }
    // console.log(newList);

    if (!user) return null;
    const editImage = (e) => {
      setImage(e.target.files[0]);
  };
      const submitHandler = (e) => {
      e.preventDefault();
      dispatch(editPhoto(image, photoId));
      history.push('/upload')
  };
    // console.log('poop')

    return (
    <>
      <form onSubmit={submitHandler}>
        <label className="choose_file">You have plenty of options
            <input className="fileUploadBtn"
            type="file"
            onChange={editImage}
            />
        </label>
        <button className="uploadBtn" type="submit">Upload a MORE AWESOME pic</button>
        <div>
          <div className="title_container">
            <h1 className="title">
                Wrong Angle? No worries :)
            </h1>
          </div>
        </div>
      </form>
      <PhotoCard photo={singlePhoto} user={user} newList={newList} />
      {/* {Object.values(photos).map(photo =>
        <PhotoCard photo={photo} user={user} newList={newList}/>
      )} */}
      {/* {uploadedImage && <img src={uploadedImage} alt="test" />} */}
    </>
  );
};

export default Edit;
