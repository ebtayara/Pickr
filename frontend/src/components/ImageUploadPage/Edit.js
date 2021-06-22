import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {editPhoto, getPhotos} from '../../store/photos';
import PhotoCard from './PhotoCard';
import './Edit.css';

const Edit = () => {
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
    },[dispatch, history, user])

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
    const editImage = async(e) => {
      await dispatch(editPhoto(photos.id))
      setImage(e.target.files[0]);
  };
    const submitHandler = (e) => {
    e.preventDefault();
    dispatch(editImage(image, user.id));
};
    // console.log('poop')

    return (
    <>
      <form onSubmit={submitHandler}>
        <label className="choose_file">You have plenty of options
            <input
            type="file"
            onChange={editImage}
            />
        </label>
        <button type="submit">Upload a MORE AWESOME pic</button>
        <div>
          <div className="title_container">
            <h1 className="title">
                Wrong Angle? No worries :)
            </h1>
          </div>
        </div>
      </form>
      {Object.values(photos).map(photo =>
        <PhotoCard photo={photo} user={user} newList={newList}/>
      )}
      {/* {uploadedImage && <img src={uploadedImage} alt="test" />} */}
    </>
  );
};

export default Edit;
