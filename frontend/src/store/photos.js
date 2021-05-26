import {csrfFetch} from './csrf';

const Upload = "photos/upload"
//action
const setPhoto = (photo) =>(
    {type:Upload, photo}
    );

//thunk
export const uploadImage = (photo, userId) => async(dispatch) => {
    const formData = new FormData();
    formData.append("image", photo);
    formData.append("userId", userId);
    const res = await csrfFetch('/api/images', {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });
    const image = await res.json();
    dispatch(setPhoto(image));
}

//reducer
const imagesReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
      case Upload:
         newState = {...state};
         newState[action.photo.id] = action.photo;
         return newState;
      default:
        return state;
    }
  };
  export default imagesReducer;
