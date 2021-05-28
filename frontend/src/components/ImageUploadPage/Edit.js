import { useDispatch } from "react-redux";
import { editPhoto, getPhotos } from "../../store/photos";
import PhotoCard from './PhotoCard';
// import PhotoCard from './PhotoCard';
// import {submitHandler}from './Upload';

const Edit = ({photo, user}) => {
    const dispatch = useDispatch();

  const editButton = async() => {
        await dispatch(editPhoto(photo.id))
        dispatch(getPhotos(user.id))
    }

    // const submitHandler = (e) => {
    //     e.preventDefault();
    //     dispatch(uploadImage(image, user.id));
    // };

// return (
//     <>
//       <form onSubmit={submitHandler}>
//         <label>Upload Image
//             <input
//             type="file"
//             onChange={updateImage}
//             />
//         </label>
//         <button type="submit">Upload</button>
//       </form>
//       {Object.values(photos).map(photo =>
//         <PhotoCard photo={photo} user={user}/>
//       )}
//       {/* {uploadedImage && <img src={uploadedImage} alt="test" />} */}
//     </>
//   );
}

export default Edit;
