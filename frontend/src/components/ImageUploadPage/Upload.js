import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {uploadImage, getPhotos} from '../../store/photos';
import PhotoCard from './PhotoCard';
import Comments from './Comments';
import './Upload.css';

const ImageUpload = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const photos = useSelector((state) => state.photos);
    const [image, setImage] = useState();
    const history = useHistory();
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
    const updateImage = (e) => {
    setImage(e.target.files[0]);
};
    const submitHandler = (e) => {
    e.preventDefault();
    dispatch(uploadImage(image, user.id));
};
    // console.log('poop')

    return (
    <div className="wrapper">
      <div>
        <h1 className="title">
            Show us Whatchu Got!
        </h1>
      </div>
      <form onSubmit={submitHandler}>
        <label className ="upload">
          <div class="fab fa-aws_container">
            <i class="fab fa-aws"></i>
          </div>
            <input className = "fileUploadBtn"
            type="file"
            onChange={updateImage}
            />
        </label>
            <div className="uploadBtnContainer">
              <button className="uploadBtn" type="submit">
                <div>
                  <i class="fas fa-cloud-upload-alt"></i>
                </div>
                </button>
            </div>
        <div>
      </div>
      </form>
      {Object.values(photos).map(photo =>
        <PhotoCard photo={photo} user={user} newList={newList} Comments={Comments}/>
        )}
        {/* <PhotoCard photo={photo} user={user} newList={newList} Comments={Comments.map(comment => {
          <div>
            textfield={comment.textfield}
          </div> */}
        {/* <Comments/> */}
      {/* {uploadedImage && <img src={uploadedImage} alt="test" />} */}
    </div>
  );
};
export default ImageUpload;
