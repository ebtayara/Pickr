import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {uploadImage} from '../../store/photos';

const ImageUpload = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const uploadedImage = useSelector((state) => state.photos);
  const [image, setImage] = useState();
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
      {uploadedImage && <img src={uploadedImage} alt="test" />}
    </>
  );
};
export default ImageUpload;
